import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    const apiKey = process.env.REMOVE_BG_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Background removal service not configured' },
        { status: 503 }
      )
    }

    const imageBuffer = await image.arrayBuffer()
    const bgFormData = new FormData()
    bgFormData.append('image_file', new Blob([imageBuffer]))
    bgFormData.append('size', 'auto')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: bgFormData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Remove.bg API error:', errorText)
      return NextResponse.json(
        { error: 'Background removal failed' },
        { status: response.status }
      )
    }

    const processedBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(processedBuffer).toString('base64')
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({ dataUrl }, { status: 200 })
  } catch (error) {
    console.error('Background removal error:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}
