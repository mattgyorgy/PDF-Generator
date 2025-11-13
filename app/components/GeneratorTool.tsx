'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import { useState } from 'react'
import ConversionModal from './ConversionModal'
import type { StyleType } from '@/app/context/GeneratorContext'

const presetColors = [
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Red', value: '#ef4444' },
  { name: 'Purple', value: '#8b5cf6' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Pink', value: '#ec4899' },
]

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

export default function GeneratorTool() {
  const { companyName, setCompanyName, brandColor, setBrandColor, logo, setLogo, logoPreviewUrl, style, setStyle } = useGenerator()
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Brand Color
          </label>
          <div className="grid grid-cols-6 gap-3 mb-3">
            {presetColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setBrandColor(color.value)}
                className={`h-12 rounded-lg transition-all ${
                  brandColor === color.value
                    ? 'ring-4 ring-offset-2 ring-blue-400'
                    : 'hover:scale-105 border-2 border-gray-200'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="custom-color" className="text-sm text-gray-600 whitespace-nowrap">
              Or enter HEX:
            </label>
            <input
              type="text"
              id="custom-color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              placeholder="#000000"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm"
              maxLength={7}
            />
            <div
              className="w-10 h-10 rounded-lg border-2 border-gray-300"
              style={{ backgroundColor: brandColor }}
            />
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
            <div className="mt-3">
              <img
                src={logoPreviewUrl}
                alt="Logo preview"
                className="h-16 object-contain border border-gray-200 rounded p-2"
              />
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
