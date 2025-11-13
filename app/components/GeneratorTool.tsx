'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import { useState } from 'react'
import ConversionModal from './ConversionModal'
import type { StyleType, FontType } from '@/app/context/GeneratorContext'

const styles = [
  {
    id: 'modern' as StyleType,
    name: 'Modern',
    description: 'Clean and minimal',
  },
  {
    id: 'bold' as StyleType,
    name: 'Bold',
    description: 'Strong and impactful',
  },
  {
    id: 'classic' as StyleType,
    name: 'Classic',
    description: 'Traditional and elegant',
  },
]

const fonts = [
  { id: 'helvetica' as FontType, name: 'Helvetica', preview: 'Arial, sans-serif' },
  { id: 'times' as FontType, name: 'Times New Roman', preview: 'Georgia, serif' },
  { id: 'courier' as FontType, name: 'Courier', preview: 'Courier New, monospace' },
  { id: 'inter' as FontType, name: 'Inter', preview: 'Inter, sans-serif' },
  { id: 'playfair' as FontType, name: 'Playfair Display', preview: 'Playfair Display, serif' },
  { id: 'roboto' as FontType, name: 'Roboto', preview: 'Roboto, sans-serif' },
  { id: 'montserrat' as FontType, name: 'Montserrat', preview: 'Montserrat, sans-serif' },
]

export default function GeneratorTool() {
  const { companyName, setCompanyName, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, font, setFont, logo, setLogo, logoPreviewUrl, style, setStyle, removeBackground, setRemoveBackground } = useGenerator()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setLogo(file)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Create Your FREE Custom-Branded Filming Guide
        </h1>
        <p className="text-gray-600 text-lg">
          Stop getting &quot;bad&quot; video from clients. Create a 1-page guide with your logo and brand color to send to every new client.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-2">
            Your Company Name
          </label>
          <input
            type="text"
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Your Style
          </label>
          <div className="grid grid-cols-3 gap-3">
            {styles.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => setStyle(styleOption.id)}
                className={`p-4 border-2 rounded-lg transition-all text-left ${
                  style === styleOption.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="mb-2">
                  <div className={`h-16 rounded border-2 ${
                    styleOption.id === 'modern' ? 'border-gray-300 bg-white' :
                    styleOption.id === 'bold' ? 'border-gray-800 bg-gray-900' :
                    'border-gray-400 bg-gray-100'
                  }`}>
                    {styleOption.id === 'modern' && (
                      <div className="p-2 space-y-1">
                        <div className="h-1 w-8 bg-gray-400 rounded"></div>
                        <div className="h-1 w-12 bg-gray-300 rounded"></div>
                        <div className="h-1 w-6 bg-gray-200 rounded"></div>
                      </div>
                    )}
                    {styleOption.id === 'bold' && (
                      <div className="p-2 space-y-1">
                        <div className="h-2 w-10 bg-white rounded"></div>
                        <div className="h-1 w-14 bg-gray-400 rounded"></div>
                        <div className="h-1 w-8 bg-gray-500 rounded"></div>
                      </div>
                    )}
                    {styleOption.id === 'classic' && (
                      <div className="p-2 space-y-1">
                        <div className="h-1 w-10 bg-gray-600 rounded-sm"></div>
                        <div className="h-1 w-12 bg-gray-500 rounded-sm"></div>
                        <div className="h-1 w-8 bg-gray-400 rounded-sm"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-semibold text-sm text-gray-900">{styleOption.name}</div>
                <div className="text-xs text-gray-500">{styleOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose Your Font
          </label>
          <div className="grid grid-cols-2 gap-3">
            {fonts.map((fontOption) => (
              <button
                key={fontOption.id}
                onClick={() => setFont(fontOption.id)}
                className={`p-4 border-2 rounded-lg transition-all text-left ${
                  font === fontOption.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-sm text-gray-900 mb-1">{fontOption.name}</div>
                <div 
                  className="text-lg text-gray-700"
                  style={{ fontFamily: fontOption.preview }}
                >
                  The quick brown fox
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="primary-color" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="primary-color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-12 w-16 rounded-lg cursor-pointer border-2 border-gray-300"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                maxLength={7}
              />
            </div>
          </div>

          <div>
            <label htmlFor="secondary-color" className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="secondary-color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-12 w-16 rounded-lg cursor-pointer border-2 border-gray-300"
              />
              <input
                type="text"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="logo-upload" className="block text-sm font-medium text-gray-700 mb-2">
            Upload Your Logo
          </label>
          <input
            type="file"
            id="logo-upload"
            accept="image/png, image/jpeg"
            onChange={handleLogoChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />
          {logoPreviewUrl && (
            <div className="mt-3 space-y-3">
              <img
                src={logoPreviewUrl}
                alt="Logo preview"
                className="h-16 object-contain border border-gray-200 rounded p-2"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeBackground}
                  onChange={(e) => setRemoveBackground(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  ✨ Magic-Remove Background (makes your logo look clean and professional)
                </span>
              </label>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
        >
          Generate My Guide
        </button>
      </div>

      <ConversionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
