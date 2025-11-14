'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import VideocamIcon from '@mui/icons-material/Videocam'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import GridViewIcon from '@mui/icons-material/GridView'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// Helper function to determine if a color is light or dark
const isLightColor = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
  return luminance > 0.5
}

const rules = [
  {
    icon: WbSunnyIcon,
    title: 'LIGHT: Find the Light',
    doText: 'Good light is your best friend. Film near windows or in brightly-lit areas.',
    dontText: 'Don\'t film in dark, shadowy corners. If your video looks grainy, you need more light!',
  },
  {
    icon: VideocamIcon,
    title: 'STABILITY: Stay Steady & Move Smoothly',
    doText: 'Film both vertical (for social media) and horizontal. Keep your phone as steady as possible—use two hands or prop it on a surface.',
    dontText: 'Avoid shaky, random camera movements. If you move, pan slowly and smoothly in one direction.',
  },
  {
    icon: FiberManualRecordIcon,
    title: 'RECORD: Hold Each Shot for 10 Seconds',
    doText: 'This is the most important tip! Hit record and hold your shot perfectly still for at least 10 seconds.',
    dontText: 'Don\'t just tap "record" and "stop." We need those long, stable clips to edit with!',
  },
  {
    icon: GridViewIcon,
    title: 'VARIETY: Get 3 Angles of Everything',
    doText: 'For every one subject, capture at least three different shots:',
    varietyShots: [
      { label: 'WIDE', description: 'Show the whole room or scene.' },
      { label: 'MEDIUM', description: 'Show the subject or action.' },
      { label: 'TIGHT', description: 'Get a close-up of the details (hands, a product, a sign).' },
    ],
    varietyNote: 'More angles and options are always better!',
    dontText: '',
  },
  {
    icon: CloudUploadIcon,
    title: 'SEND: Use the Special Link',
    doText: 'Use the secure upload link I\'ve provided. This sends the full, original, high-quality file.',
    dontText: 'Don\'t text or email the video. (Those services shrink and ruin your file!)',
  },
]

export default function LivePreview() {
  const { companyName, primaryColor, secondaryColor, font, logoPreviewUrl, processedLogoUrl, logoAlign, style } = useGenerator()
  
  const displayLogoUrl = processedLogoUrl || logoPreviewUrl
  
  const getLogoAlignmentClass = () => {
    if (logoAlign === 'left') return 'mr-auto'
    if (logoAlign === 'right') return 'ml-auto'
    return 'mx-auto'
  }
  
  const logoAlignClass = getLogoAlignmentClass()
  
  const fontMapping: Record<string, string> = {
    helvetica: 'Arial, sans-serif',
    arial: 'Arial, sans-serif',
    georgia: 'Georgia, serif',
    times: 'Georgia, serif',
    courier: 'Courier New, monospace',
    inter: 'Inter, sans-serif',
    lato: 'Lato, sans-serif',
    opensans: 'Open Sans, sans-serif',
    poppins: 'Poppins, sans-serif',
    raleway: 'Raleway, sans-serif',
    playfair: 'Playfair Display, serif',
    merriweather: 'Merriweather, serif',
    roboto: 'Roboto, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    nunito: 'Nunito, sans-serif',
    worksans: 'Work Sans, sans-serif',
  }
  
  const fontFamily = fontMapping[font] || 'Arial, sans-serif'

  const renderModernStyle = () => {
    const bodyTextColor = '#333333' // Modern style always has white background
    
    return (
      <div className="p-9 flex flex-col min-h-full" style={{ fontFamily }}>
        <div className="text-center mb-5">
          {displayLogoUrl ? (
            <img
              src={displayLogoUrl}
              alt="Company logo"
              className={`h-10 ${logoAlignClass} mb-2 object-contain`}
            />
          ) : (
            <div className="h-10 mb-2 flex items-center justify-center text-gray-400 text-sm">
              [Your Logo]
            </div>
          )}
          <h1 className="text-lg font-bold mb-1" style={{ color: primaryColor, fontFamily }}>
            How to Film Pro-Quality Video on Your Phone
          </h1>
          <p className="text-[11px]" style={{ fontFamily, color: bodyTextColor }}>
            A 5-step guide from your friends at {companyName || '[Your Company]'}
          </p>
        </div>

        <div className="space-y-3">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <div key={index} className="border-l-[3px] pl-2.5 py-0.5" style={{ borderColor: primaryColor }}>
                <div className="flex items-center gap-2 mb-0.5">
                  <Icon style={{ color: secondaryColor, fontSize: '16px' }} />
                  <h3 className="font-bold text-[11px]" style={{ color: primaryColor }}>
                    {index + 1}. {rule.title}
                  </h3>
                </div>
                <p className="text-[11px] mb-0.5" style={{ color: bodyTextColor }}>
                  <span className="font-semibold" style={{ color: secondaryColor }}>Do:</span> {rule.doText}
                </p>
                {rule.varietyShots && (
                  <div className="ml-3 my-1 space-y-0.5">
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <p key={idx} className="text-[11px]" style={{ color: bodyTextColor }}>
                        <span className="font-semibold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                      </p>
                    ))}
                    <p className="text-[11px] italic mt-0.5" style={{ color: bodyTextColor }}>{rule.varietyNote}</p>
                  </div>
                )}
                {rule.dontText && (
                  <p className="text-[11px]" style={{ color: bodyTextColor }}>
                    <span className="font-semibold" style={{ color: secondaryColor }}>Don&apos;t:</span> {rule.dontText}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderBoldStyle = () => {
    const bodyTextColor = isLightColor(primaryColor) ? '#000000' : '#ffffff'
    
    return (
      <div className="p-9 flex flex-col min-h-full" style={{ fontFamily, backgroundColor: primaryColor }}>
        <div className="text-center mb-4">
          {displayLogoUrl ? (
            <img
              src={displayLogoUrl}
              alt="Company logo"
              className={`h-11 ${logoAlignClass} mb-2 object-contain`}
            />
          ) : (
            <div className="h-11 mb-2 flex items-center justify-center text-sm" style={{ color: bodyTextColor, opacity: 0.5 }}>
              [Your Logo]
            </div>
          )}
          <h1 className="text-lg font-black mb-1 uppercase tracking-tight" style={{ color: secondaryColor, fontFamily }}>
            Video Filming Tips
          </h1>
          <p className="text-[11px] font-semibold" style={{ fontFamily, color: bodyTextColor }}>
            From {companyName || '[Your Company]'}
          </p>
        </div>

        <div className="space-y-3">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <div key={index} className="p-2.5">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center font-black text-[9px]" style={{ backgroundColor: secondaryColor, color: isLightColor(secondaryColor) ? '#000000' : '#ffffff' }}>
                    {index + 1}
                  </div>
                  <h3 className="font-black text-[11px] uppercase" style={{ color: secondaryColor }}>
                    {rule.title}
                  </h3>
                </div>
                <p className="text-[11px] mb-0.5" style={{ color: bodyTextColor }}>
                  <span className="font-semibold text-sm" style={{ color: secondaryColor }}>✓</span> {rule.doText}
                </p>
                {rule.varietyShots && (
                  <div className="ml-4 my-1 space-y-0.5">
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <p key={idx} className="text-[11px]" style={{ color: bodyTextColor }}>
                        <span className="font-semibold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                      </p>
                    ))}
                    <p className="text-[11px] italic mt-0.5" style={{ color: bodyTextColor }}>{rule.varietyNote}</p>
                  </div>
                )}
                {rule.dontText && (
                  <p className="text-[11px]" style={{ color: bodyTextColor }}>
                    <span className="font-semibold text-sm" style={{ color: secondaryColor }}>✗</span> {rule.dontText}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const renderClassicStyle = () => {
    const bodyTextColor = '#333333' // Classic style always has light amber background
    
    return (
      <div className="p-9 flex flex-col min-h-full bg-amber-50" style={{ fontFamily }}>
        <div className="text-center mb-5 pb-3 border-b-2 border-gray-400">
          {displayLogoUrl ? (
            <img
              src={displayLogoUrl}
              alt="Company logo"
              className={`h-11 ${logoAlignClass} mb-2 object-contain opacity-90`}
            />
          ) : (
            <div className="h-11 mb-2 flex items-center justify-center text-gray-400 text-sm">
              [Your Logo]
            </div>
          )}
          <h1 className="text-base font-serif font-bold mb-1 tracking-wide" style={{ color: primaryColor, fontFamily }}>
            Professional Video Guidelines
          </h1>
          <p className="text-[11px] italic" style={{ fontFamily, color: bodyTextColor }}>
            Presented by {companyName || '[Your Company]'}
          </p>
        </div>

        <div className="space-y-3">
          {rules.map((rule, index) => {
            const Icon = rule.icon
            return (
              <div key={index} className="pb-2 border-b border-gray-300">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center font-bold text-[8px]" style={{ borderColor: primaryColor, color: primaryColor }}>
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-[11px] uppercase tracking-wide" style={{ color: primaryColor }}>
                    {rule.title}
                  </h3>
                </div>
                <p className="text-[11px] mb-0.5 ml-6" style={{ color: bodyTextColor }}>
                  <span className="font-semibold" style={{ color: secondaryColor }}>Recommended:</span> {rule.doText}
                </p>
                {rule.varietyShots && (
                  <div className="ml-6 my-1 space-y-0.5">
                    {rule.varietyShots.map((shot: any, idx: number) => (
                      <p key={idx} className="text-[11px]" style={{ color: bodyTextColor }}>
                        <span className="font-semibold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                      </p>
                    ))}
                    <p className="text-[11px] italic mt-0.5" style={{ color: bodyTextColor }}>{rule.varietyNote}</p>
                  </div>
                )}
                {rule.dontText && (
                  <p className="text-[11px] ml-6" style={{ color: bodyTextColor }}>
                    <span className="font-semibold" style={{ color: secondaryColor }}>Avoid:</span> {rule.dontText}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-y-auto w-full max-w-[595px] h-[842px]">
      {style === 'modern' && renderModernStyle()}
      {style === 'bold' && renderBoldStyle()}
      {style === 'classic' && renderClassicStyle()}
    </div>
  )
}
