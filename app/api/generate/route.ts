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
    const logoAlign = (formData.get('logoAlign') as string) || 'center'
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
        logoAlign: logoAlign as 'left' | 'center' | 'right',
        style: style as 'modern' | 'bold' | 'classic',
      }) as any
    )

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              
              <!-- Main Container -->
              <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                
                <!-- Header with Logo -->
                <tr>
                  <td style="background-color: #000000; padding: 40px 40px 30px; text-align: center;">
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 32px; font-weight: 700; color: #D4FB5D; letter-spacing: -0.5px;">
                      hero<span style="color: #D4FB5D;">»</span>
                    </div>
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; font-size: 11px; font-weight: 600; color: #D4FB5D; letter-spacing: 2px; margin-top: 4px;">
                      NETWORK
                    </div>
                  </td>
                </tr>
                
                <!-- Lime Green Accent Bar -->
                <tr>
                  <td style="background-color: #D4FB5D; height: 6px; padding: 0;"></td>
                </tr>
                
                <!-- Main Content -->
                <tr>
                  <td style="padding: 50px 40px;">
                    <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; color: #000000; line-height: 1.3;">
                      Your Custom Filming Guide is Ready! 🎬
                    </h1>
                    
                    <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                      Great job creating your personalized filming guide! We've attached your professional PDF below.
                    </p>
                    
                    <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #333333;">
                      Send this to your clients before every video shoot to ensure you get high-quality footage every single time.
                    </p>
                    
                    <!-- Pro Tip Box -->
                    <table role="presentation" style="width: 100%; background-color: #f8f8f8; border-left: 4px solid #D4FB5D; border-radius: 6px; margin: 0 0 30px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0; font-size: 15px; color: #000000;">
                            <strong style="color: #000000;">💡 Pro Tip:</strong> Save this PDF to your cloud storage and share it with every new client at the start of your project. Consistent quality starts with clear guidelines.
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="margin: 0 0 30px;">
                      <tr>
                        <td style="text-align: center;">
                          <a href="https://heronetwork.io" style="display: inline-block; background-color: #D4FB5D; color: #000000; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-size: 16px; font-weight: 700; transition: opacity 0.2s;">
                            Learn More About Hero
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #666666;">
                      Questions or need help? Visit <a href="https://heronetwork.io" style="color: #000000; text-decoration: none; font-weight: 600;">heronetwork.io</a> to learn how we help teams create effortless video content.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f8f8; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 8px; font-size: 13px; color: #999999;">
                      Powered by <strong style="color: #000000;">Hero Network</strong>
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #999999;">
                      Effortless Video Storytelling For Teams That Move Fast
                    </p>
                  </td>
                </tr>
                
              </table>
              
            </td>
          </tr>
        </table>
      </body>
      </html>
    `

    const { data, error } = await resend.emails.send({
      from: 'Hero Network <hello@heronetwork.io>',
      to: [email],
      subject: "Your Custom Filming Guide is Ready! 🎬",
      html: emailHtml,
      attachments: [
        {
          filename: `${companyName.replace(/[^a-z0-9]/gi, '_')}_Filming_Guide.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json(
        { error: 'Failed to send email via Resend' },
        { status: 500 }
      )
    }

    console.log('Email sent successfully:', data)
    return NextResponse.json({ status: 'ok' }, { status: 200 })
  } catch (error) {
    console.error('Error generating PDF or sending email:', error)
    return NextResponse.json(
      { error: 'Failed to generate and send PDF' },
      { status: 500 }
    )
  }
}
