const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_KEY
const PIPEDRIVE_BASE_URL = 'https://api.pipedrive.com/v1'

interface Organization {
  id: number
  name: string
}

interface Person {
  id: number
  name: string
  email: string
  org_id: number
}

interface Lead {
  id: string
  title: string
}

export async function searchOrganization(companyName: string): Promise<Organization | null> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/organizations/search?term=${encodeURIComponent(companyName)}&api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Pipedrive search organization error:', await response.text())
      return null
    }

    const result = await response.json()
    
    if (result.success && result.data?.items && result.data.items.length > 0) {
      const exactMatch = result.data.items.find(
        (item: any) => item.item.name.toLowerCase() === companyName.toLowerCase()
      )
      
      if (exactMatch) {
        return {
          id: exactMatch.item.id,
          name: exactMatch.item.name,
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error searching organization:', error)
    return null
  }
}

export async function createOrganization(companyName: string): Promise<number | null> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/organizations?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: companyName,
        }),
      }
    )

    if (!response.ok) {
      console.error('Pipedrive create organization error:', await response.text())
      return null
    }

    const result = await response.json()
    
    if (result.success && result.data?.id) {
      console.log('Created organization:', result.data.id)
      return result.data.id
    }

    return null
  } catch (error) {
    console.error('Error creating organization:', error)
    return null
  }
}

export async function getOrCreateOrganization(companyName: string): Promise<number | null> {
  const existing = await searchOrganization(companyName)
  
  if (existing) {
    console.log('Found existing organization:', existing.id)
    return existing.id
  }

  return await createOrganization(companyName)
}

export async function createPerson(
  name: string,
  email: string,
  orgId: number
): Promise<number | null> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/persons?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: [{ value: email, primary: true }],
          org_id: orgId,
        }),
      }
    )

    if (!response.ok) {
      console.error('Pipedrive create person error:', await response.text())
      return null
    }

    const result = await response.json()
    
    if (result.success && result.data?.id) {
      console.log('Created person:', result.data.id)
      return result.data.id
    }

    return null
  } catch (error) {
    console.error('Error creating person:', error)
    return null
  }
}

async function findOrCreateLeadLabel(labelName: string): Promise<string | null> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/leadLabels?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('Pipedrive get lead labels error:', await response.text())
      return null
    }

    const result = await response.json()
    
    if (result.success && result.data) {
      const existingLabel = result.data.find(
        (label: any) => label.name.toLowerCase() === labelName.toLowerCase()
      )
      
      if (existingLabel) {
        console.log(`Found existing label: ${existingLabel.id}`)
        return existingLabel.id
      }
    }

    const createResponse = await fetch(
      `${PIPEDRIVE_BASE_URL}/leadLabels?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: labelName,
          color: 'green',
        }),
      }
    )

    if (!createResponse.ok) {
      console.error('Pipedrive create lead label error:', await createResponse.text())
      return null
    }

    const createResult = await createResponse.json()
    
    if (createResult.success && createResult.data?.id) {
      console.log(`Created new label: ${createResult.data.id}`)
      return createResult.data.id
    }

    return null
  } catch (error) {
    console.error('Error finding/creating lead label:', error)
    return null
  }
}

export async function createLead(
  personId: number,
  orgId: number,
  companyName: string,
  hasLogo: boolean
): Promise<string | null> {
  try {
    const currentDate = new Date().toISOString().split('T')[0]
    
    const labelId = await findOrCreateLeadLabel('Video Guide Lead')
    
    const leadData: any = {
      title: `Video Guide Lead - ${companyName}`,
      person_id: personId,
      organization_id: orgId,
    }

    if (labelId) {
      leadData.label_ids = [labelId]
    }

    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/leads?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      }
    )

    if (!response.ok) {
      console.error('Pipedrive create lead error:', await response.text())
      return null
    }

    const result = await response.json()
    
    if (result.success && result.data?.id) {
      console.log('Created lead:', result.data.id)
      
      if (result.data.id) {
        await addNoteToLead(
          result.data.id,
          `Downloaded filming guide on ${currentDate}. Logo uploaded: ${hasLogo ? 'Yes' : 'No'}.`
        )
      }
      
      return result.data.id
    }

    return null
  } catch (error) {
    console.error('Error creating lead:', error)
    return null
  }
}

async function addNoteToLead(leadId: string, noteContent: string): Promise<void> {
  try {
    const response = await fetch(
      `${PIPEDRIVE_BASE_URL}/notes?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: noteContent,
          lead_id: leadId,
        }),
      }
    )

    if (!response.ok) {
      console.error('Pipedrive add note error:', await response.text())
    } else {
      console.log('Added note to lead')
    }
  } catch (error) {
    console.error('Error adding note to lead:', error)
  }
}

export async function captureLead(
  name: string,
  email: string,
  companyName: string,
  hasLogo: boolean
): Promise<boolean> {
  try {
    console.log(`Starting Pipedrive lead capture for ${name} at ${companyName}`)

    const orgId = await getOrCreateOrganization(companyName)
    if (!orgId) {
      console.error('Failed to get or create organization')
      return false
    }

    const personId = await createPerson(name, email, orgId)
    if (!personId) {
      console.error('Failed to create person')
      return false
    }

    const leadId = await createLead(personId, orgId, companyName, hasLogo)
    if (!leadId) {
      console.error('Failed to create lead')
      return false
    }

    console.log(`Successfully captured lead in Pipedrive: ${leadId}`)
    return true
  } catch (error) {
    console.error('Error in captureLead:', error)
    return false
  }
}
