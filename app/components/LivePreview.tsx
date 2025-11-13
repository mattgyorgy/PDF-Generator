'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import VideocamIcon from '@mui/icons-material/Videocam'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import GridViewIcon from '@mui/icons-material/GridView'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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
  const { companyName, primaryColor, secondaryColor, font, logoPreviewUrl, style } = useGenerator()
  
  const fontMapping: Record<string, string> = {
    helvetica: 'Arial, sans-serif',
    times: 'Georgia, serif',
    courier: 'Courier New, monospace',
    inter: 'Inter, sans-serif',
    playfair: 'Playfair Display, serif',
    roboto: 'Roboto, sans-serif',
    montserrat: 'Montserrat, sans-serif',
  }
  
  const fontFamily = fontMapping[font] || 'Arial, sans-serif'

  const renderModernStyle = () => (
    <div className="p-8 flex flex-col" style={{ fontFamily }}>
      <div className="text-center mb-6">
        {logoPreviewUrl ? (
          <img
            src={logoPreviewUrl}
            alt="Company logo"
            className="h-12 mx-auto mb-4 object-contain"
          />
        ) : (
          <div className="h-12 mb-4 flex items-center justify-center text-gray-400 text-sm">
            [Your Logo]
          </div>
        )}
        <h1 className="text-xl font-bold mb-2" style={{ color: primaryColor, fontFamily }}>
          How to Film Pro-Quality Video on Your Phone
        </h1>
        <p className="text-sm text-gray-600" style={{ fontFamily }}>
          A 5-step guide from your friends at {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="border-l-4 pl-3 py-1" style={{ borderColor: primaryColor }}>
              <div className="flex items-center gap-2 mb-1">
                <Icon style={{ color: secondaryColor, fontSize: '18px' }} />
                <h3 className="font-bold text-xs" style={{ color: primaryColor }}>
                  {index + 1}. {rule.title}
                </h3>
              </div>
              <p className="text-xs text-gray-700 mb-1">
                <span className="font-semibold" style={{ color: secondaryColor }}>Do:</span> {rule.doText}
              </p>
              {rule.varietyShots && (
                <div className="ml-4 my-2 space-y-1">
                  {rule.varietyShots.map((shot: any, idx: number) => (
                    <p key={idx} className="text-xs text-gray-700">
                      <span className="font-semibold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                    </p>
                  ))}
                  <p className="text-xs text-gray-700 italic mt-1">{rule.varietyNote}</p>
                </div>
              )}
              {rule.dontText && (
                <p className="text-xs text-gray-700">
                  <span className="font-semibold" style={{ color: secondaryColor }}>Don&apos;t:</span> {rule.dontText}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">Powered by Hero</p>
      </div>
    </div>
  )

  const renderBoldStyle = () => (
    <div className="p-6 flex flex-col bg-gray-50" style={{ fontFamily }}>
      <div className="text-center mb-6 bg-gray-900 text-white p-4 -mx-6 -mt-6">
        {logoPreviewUrl ? (
          <img
            src={logoPreviewUrl}
            alt="Company logo"
            className="h-14 mx-auto mb-3 object-contain filter brightness-0 invert"
          />
        ) : (
          <div className="h-14 mb-3 flex items-center justify-center text-gray-400 text-sm">
            [Your Logo]
          </div>
        )}
        <h1 className="text-2xl font-black mb-2 uppercase tracking-tight" style={{ color: primaryColor, fontFamily }}>
          Pro Video Tips
        </h1>
        <p className="text-xs font-semibold opacity-90" style={{ fontFamily }}>
          From {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-3 mt-4">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderColor: primaryColor }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-xs" style={{ backgroundColor: primaryColor }}>
                  {index + 1}
                </div>
                <h3 className="font-black text-xs uppercase" style={{ color: primaryColor }}>
                  {rule.title}
                </h3>
              </div>
              <p className="text-xs text-gray-800 mb-1 font-semibold">
                <span style={{ color: secondaryColor }}>✓</span> {rule.doText}
              </p>
              {rule.varietyShots && (
                <div className="ml-6 my-2 space-y-1">
                  {rule.varietyShots.map((shot: any, idx: number) => (
                    <p key={idx} className="text-xs text-gray-700">
                      <span className="font-bold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                    </p>
                  ))}
                  <p className="text-xs text-gray-700 italic mt-1">{rule.varietyNote}</p>
                </div>
              )}
              {rule.dontText && (
                <p className="text-xs text-gray-600">
                  <span style={{ color: secondaryColor }}>✗</span> {rule.dontText}
                </p>
              )}
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4 pt-3 border-t-2 border-gray-900">
        <p className="text-xs font-bold text-gray-900">POWERED BY HERO</p>
      </div>
    </div>
  )

  const renderClassicStyle = () => (
    <div className="p-10 flex flex-col bg-amber-50" style={{ fontFamily }}>
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-300">
        {logoPreviewUrl ? (
          <img
            src={logoPreviewUrl}
            alt="Company logo"
            className="h-16 mx-auto mb-4 object-contain opacity-90"
          />
        ) : (
          <div className="h-16 mb-4 flex items-center justify-center text-gray-400 text-sm">
            [Your Logo]
          </div>
        )}
        <h1 className="text-lg font-serif font-bold mb-2 tracking-wide" style={{ color: primaryColor, fontFamily }}>
          Professional Video Guidelines
        </h1>
        <p className="text-xs text-gray-700 italic" style={{ fontFamily }}>
          Presented by {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-5">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="pb-4 border-b border-gray-300">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5" style={{ borderColor: primaryColor, color: primaryColor }}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xs mb-2 uppercase tracking-wide" style={{ color: primaryColor }}>
                    {rule.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1 leading-relaxed">
                    <span className="font-semibold" style={{ color: secondaryColor }}>Recommended:</span> {rule.doText}
                  </p>
                  {rule.varietyShots && (
                    <div className="ml-4 my-2 space-y-1">
                      {rule.varietyShots.map((shot: any, idx: number) => (
                        <p key={idx} className="text-xs text-gray-700 leading-relaxed">
                          <span className="font-semibold" style={{ color: secondaryColor }}>{idx + 1}. {shot.label}:</span> {shot.description}
                        </p>
                      ))}
                      <p className="text-xs text-gray-700 italic mt-1 leading-relaxed">{rule.varietyNote}</p>
                    </div>
                  )}
                  {rule.dontText && (
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <span className="font-semibold" style={{ color: secondaryColor }}>Avoid:</span> {rule.dontText}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-6 pt-4 border-t-2 border-gray-300">
        <p className="text-xs text-gray-600 italic">Powered by Hero</p>
      </div>
    </div>
  )

  return (
    <div className="rounded-lg p-4 md:p-8 flex justify-center items-start sticky top-8">
      <div className="bg-white shadow-2xl overflow-y-auto w-full max-w-[595px]" style={{ maxHeight: '842px' }}>
        {style === 'modern' && renderModernStyle()}
        {style === 'bold' && renderBoldStyle()}
        {style === 'classic' && renderClassicStyle()}
      </div>
    </div>
  )
}
