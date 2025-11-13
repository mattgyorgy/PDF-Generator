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
  const { companyName, brandColor, logoPreviewUrl } = useGenerator()

  return (
    <div className="bg-gray-100 rounded-lg p-8 flex justify-center items-start sticky top-8">
      <div className="bg-white shadow-2xl" style={{ width: '400px', aspectRatio: '1/1.414' }}>
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
      </div>
    </div>
  )
}
