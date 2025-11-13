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

const colorPalette = [
  '#2563EB', '#DC2626', '#059669', '#D97706', '#7C3AED', '#DB2777',
  '#0891B2', '#EA580C', '#65A30D', '#CA8A04', '#9333EA', '#E11D48',
  '#0E7490', '#C2410C', '#4D7C0F', '#A16207', '#7E22CE', '#BE123C',
  '#1E40AF', '#991B1B', '#047857', '#92400E', '#6B21A8', '#9F1239',
  '#1E3A8A', '#7F1D1D', '#065F46', '#78350F', '#581C87', '#831843',
  '#1E293B', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#000000',
]

export default function GeneratorTool() {
  const { companyName, setCompanyName, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, font, setFont, logo, setLogo, logoPreviewUrl, style, setStyle, removeBackground, setRemoveBackground } = useGenerator()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPrimaryPalette, setShowPrimaryPalette] = useState(false)
  const [showSecondaryPalette, setShowSecondaryPalette] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setLogo(file)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
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
          <label htmlFor="font-select" className="block text-sm font-medium text-gray-700 mb-2">
            Choose Your Font
          </label>
          <select
            id="font-select"
            value={font}
            onChange={(e) => setFont(e.target.value as FontType)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white cursor-pointer"
          >
            {fonts.map((fontOption) => (
              <option key={fontOption.id} value={fontOption.id}>
                {fontOption.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPrimaryPalette(!showPrimaryPalette)}
                  className="h-12 w-12 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Select primary color"
                />
                {showPrimaryPalette && (
                  <div className="absolute z-10 mt-2 p-3 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
                    <div className="grid grid-cols-6 gap-2 w-56">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setPrimaryColor(color)
                            setShowPrimaryPalette(false)
                          }}
                          className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors hover:scale-110"
                          style={{ backgroundColor: color }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color
            </label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSecondaryPalette(!showSecondaryPalette)}
                  className="h-12 w-12 rounded-lg border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors"
                  style={{ backgroundColor: secondaryColor }}
                  aria-label="Select secondary color"
                />
                {showSecondaryPalette && (
                  <div className="absolute z-10 mt-2 p-3 bg-white border-2 border-gray-300 rounded-lg shadow-xl">
                    <div className="grid grid-cols-6 gap-2 w-56">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setSecondaryColor(color)
                            setShowSecondaryPalette(false)
                          }}
                          className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors hover:scale-110"
                          style={{ backgroundColor: color }}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
