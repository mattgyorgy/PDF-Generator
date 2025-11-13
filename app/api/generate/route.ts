import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import PdfDocument from '@/app/components/PdfDocument'
import React from 'react'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const companyName = formData.get('companyName') as string
    const brandColor = formData.get('brandColor') as string
    const style = (formData.get('style') as string) || 'modern'
    const logo = formData.get('logo') as File

    if (!email || !companyName || !brandColor || !logo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const logoBuffer = await logo.arrayBuffer()
    const logoBase64 = Buffer.from(logoBuffer).toString('base64')
    const logoDataUrl = `data:${logo.type};base64,${logoBase64}`

    const pdfBuffer = await renderToBuffer(
      React.createElement(PdfDocument, {
        companyName,
        brandColor,
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
