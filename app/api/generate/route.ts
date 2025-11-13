import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import PdfDocument from '@/app/components/PdfDocument'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

async function removeImageBackground(imageBuffer: ArrayBuffer): Promise<ArrayBuffer> {
  const apiKey = process.env.REMOVE_BG_API_KEY
  
  if (!apiKey) {
    console.warn('REMOVE_BG_API_KEY not found, skipping background removal')
    return imageBuffer
  }

  try {
    const formData = new FormData()
    formData.append('image_file', new Blob([imageBuffer]))
    formData.append('size', 'auto')

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    })

    if (!response.ok) {
      console.error('Remove.bg API error:', await response.text())
      return imageBuffer
    }

    return await response.arrayBuffer()
  } catch (error) {
    console.error('Background removal failed:', error)
    return imageBuffer
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const companyName = formData.get('companyName') as string
    const primaryColor = formData.get('primaryColor') as string
    const secondaryColor = formData.get('secondaryColor') as string
    const font = formData.get('font') as string
    const style = (formData.get('style') as string) || 'modern'
    const removeBackground = formData.get('removeBackground') === 'true'
    const logo = formData.get('logo') as File

    if (!email || !companyName || !primaryColor || !logo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let logoBuffer = await logo.arrayBuffer()
    let logoMimeType = logo.type

    if (removeBackground) {
      const processedBuffer = await removeImageBackground(logoBuffer)
      if (processedBuffer !== logoBuffer) {
        logoBuffer = processedBuffer
        logoMimeType = 'image/png'
      }
    }

    const logoBase64 = Buffer.from(logoBuffer).toString('base64')
    const logoDataUrl = `data:${logoMimeType};base64,${logoBase64}`

    const pdfBuffer = await renderToBuffer(
      React.createElement(PdfDocument, {
        companyName,
        primaryColor,
        secondaryColor,
        font,
        logoImageUrl: logoDataUrl,
        style: style as 'modern' | 'bold' | 'classic',
      }) as any
    )

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Here's Your Custom-Branded Filming Guide!</h1>
        <p style="font-size: 16px; color: #666;">
          Thanks for creating your guide! We've attached your personalized PDF below.
        </p>
        <p style="font-size: 16px; color: #666;">
          Send this to your clients before every video shoot to ensure you get professional-quality footage every time.
        </p>
        <div style="margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <p style="font-size: 14px; color: #666; margin: 0;">
            <strong>Pro Tip:</strong> Save this PDF and share it with every new client at the start of your project.
          </p>
        </div>
        <p style="font-size: 14px; color: #999; margin-top: 30px;">
          Powered by Hero
        </p>
      </div>
    `

    await resend.emails.send({
      from: 'Hero <onboarding@resend.dev>',
      to: [email],
      subject: "Here's your Custom-Branded Filming Guide!",
      html: emailHtml,
      attachments: [
        {
          filename: 'Your_Filming_Guide.pdf',
          content: pdfBuffer.toString('base64'),
        },
      ],
    })

    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Error generating PDF or sending email:', error)
    return NextResponse.json(
      { error: 'Failed to generate and send PDF' },
      { status: 500 }
    )
  }
}
