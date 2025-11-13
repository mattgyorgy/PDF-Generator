'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import StayCurrentLandscapeIcon from '@mui/icons-material/StayCurrentLandscape'
import CleanHandsIcon from '@mui/icons-material/CleanHands'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const rules = [
  {
    icon: WbSunnyIcon,
    title: 'LIGHT: Face a Window',
    doText: 'Your best light is free. Set up your phone and then face the nearest window.',
    dontText: 'Never film with a window behind you.',
  },
  {
    icon: GraphicEqIcon,
    title: 'SOUND: Find a Quiet Room',
    doText: 'A small room with a rug or curtains is perfect (even a closet!).',
    dontText: 'Avoid big, empty rooms like kitchens or garages (they echo!).',
  },
  {
    icon: StayCurrentLandscapeIcon,
    title: 'FRAME: Prop Your Phone Up',
    doText: 'Film horizontally (turn your phone sideways!). Prop it on a stack of books and look at the camera lens, not at your own face on the screen.',
    dontText: 'Never film holding the phone in your hand (it\'s shaky).',
  },
  {
    icon: CleanHandsIcon,
    title: 'CLEAN: Wipe Your Lens',
    doText: 'Your phone lens is dirty. Use your t-shirt or a soft cloth to wipe the front and back camera lenses.',
    dontText: 'A blurry video is usually just a smudged lens!',
  },
  {
    icon: CloudUploadIcon,
    title: 'SEND: Use the Special Link',
    doText: 'Use the secure upload link I\'ve provided. This sends the full, original, high-quality file.',
    dontText: 'Never text or email the video. (Those services shrink and ruin your file!)',
  },
]

export default function LivePreview() {
  const { companyName, brandColor, logoPreviewUrl, style } = useGenerator()

  const renderModernStyle = () => (
    <div className="p-8 h-full flex flex-col">
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
        <h1 className="text-xl font-bold mb-2" style={{ color: brandColor }}>
          How to Film Pro-Quality Video on Your Phone
        </h1>
        <p className="text-sm text-gray-600">
          A 5-step guide from your friends at {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="border-l-4 pl-3 py-1" style={{ borderColor: brandColor }}>
              <div className="flex items-center gap-2 mb-1">
                <Icon style={{ color: brandColor, fontSize: '18px' }} />
                <h3 className="font-bold text-xs" style={{ color: brandColor }}>
                  {index + 1}. {rule.title}
                </h3>
              </div>
              <p className="text-xs text-gray-700 mb-1">
                <span className="font-semibold">Do:</span> {rule.doText}
              </p>
              <p className="text-xs text-gray-700">
                <span className="font-semibold">Don&apos;t:</span> {rule.dontText}
              </p>
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
    <div className="p-6 h-full flex flex-col bg-gray-50">
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
        <h1 className="text-2xl font-black mb-2 uppercase tracking-tight" style={{ color: brandColor }}>
          Pro Video Tips
        </h1>
        <p className="text-xs font-semibold opacity-90">
          From {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-3 flex-1 mt-4">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderColor: brandColor }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-white text-xs" style={{ backgroundColor: brandColor }}>
                  {index + 1}
                </div>
                <h3 className="font-black text-xs uppercase" style={{ color: brandColor }}>
                  {rule.title}
                </h3>
              </div>
              <p className="text-xs text-gray-800 mb-1 font-semibold">
                ✓ {rule.doText}
              </p>
              <p className="text-xs text-gray-600">
                ✗ {rule.dontText}
              </p>
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
    <div className="p-10 h-full flex flex-col bg-amber-50">
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
        <h1 className="text-lg font-serif font-bold mb-2 tracking-wide" style={{ color: brandColor }}>
          Professional Video Guidelines
        </h1>
        <p className="text-xs text-gray-700 italic">
          Presented by {companyName || '[Your Company]'}
        </p>
      </div>

      <div className="space-y-5 flex-1">
        {rules.map((rule, index) => {
          const Icon = rule.icon
          return (
            <div key={index} className="pb-4 border-b border-gray-300">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5" style={{ borderColor: brandColor, color: brandColor }}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xs mb-2 uppercase tracking-wide" style={{ color: brandColor }}>
                    {rule.title}
                  </h3>
                  <p className="text-xs text-gray-700 mb-1 leading-relaxed">
                    <span className="font-semibold">Recommended:</span> {rule.doText}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    <span className="font-semibold">Avoid:</span> {rule.dontText}
                  </p>
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
    <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-start sticky top-8">
      <div className="bg-white shadow-2xl overflow-hidden" style={{ width: '400px', aspectRatio: '1/1.414' }}>
        {style === 'modern' && renderModernStyle()}
        {style === 'bold' && renderBoldStyle()}
        {style === 'classic' && renderClassicStyle()}
      </div>
    </div>
  )
}
