'use client'

import { useGenerator } from '@/app/context/GeneratorContext'
import { useState } from 'react'
import ConversionModal from './ConversionModal'
import type { StyleType, FontType } from '@/app/context/GeneratorContext'
import Image from 'next/image'
import heroLogo from '@/attached_assets/Hero_Logo_Primary - Color_1763064397750.png'

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
  { id: 'arial' as FontType, name: 'Arial', preview: 'Arial, sans-serif' },
  { id: 'georgia' as FontType, name: 'Georgia', preview: 'Georgia, serif' },
  { id: 'times' as FontType, name: 'Times New Roman', preview: 'Georgia, serif' },
  { id: 'courier' as FontType, name: 'Courier', preview: 'Courier New, monospace' },
  { id: 'inter' as FontType, name: 'Inter', preview: 'Inter, sans-serif' },
  { id: 'lato' as FontType, name: 'Lato', preview: 'Lato, sans-serif' },
  { id: 'opensans' as FontType, name: 'Open Sans', preview: 'Open Sans, sans-serif' },
  { id: 'poppins' as FontType, name: 'Poppins', preview: 'Poppins, sans-serif' },
  { id: 'raleway' as FontType, name: 'Raleway', preview: 'Raleway, sans-serif' },
  { id: 'playfair' as FontType, name: 'Playfair Display', preview: 'Playfair Display, serif' },
  { id: 'merriweather' as FontType, name: 'Merriweather', preview: 'Merriweather, serif' },
  { id: 'roboto' as FontType, name: 'Roboto', preview: 'Roboto, sans-serif' },
  { id: 'montserrat' as FontType, name: 'Montserrat', preview: 'Montserrat, sans-serif' },
  { id: 'nunito' as FontType, name: 'Nunito', preview: 'Nunito, sans-serif' },
  { id: 'worksans' as FontType, name: 'Work Sans', preview: 'Work Sans, sans-serif' },
]

const colorPalette = [
  '#FFFFFF', '#E5E5E5', '#A3A3A3', '#737373', '#404040', '#000000',
  '#DBEAFE', '#93C5FD', '#3B82F6', '#2563EB', '#1E40AF', '#1E3A8A',
  '#D1FAE5', '#6EE7B7', '#10B981', '#059669', '#047857', '#064E3B',
  '#FEE2E2', '#FCA5A5', '#EF4444', '#DC2626', '#B91C1C', '#7F1D1D',
  '#FEF3C7', '#FCD34D', '#F59E0B', '#D97706', '#B45309', '#78350F',
  '#E9D5FF', '#C084FC', '#9333EA', '#7C3AED', '#6B21A8', '#581C87',
]

export default function GeneratorTool() {
  const { companyName, setCompanyName, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, font, setFont, logo, setLogo, logoPreviewUrl, processedLogoUrl, setProcessedLogoUrl, logoAlign, setLogoAlign, style, setStyle, removeBackground, setRemoveBackground, isProcessingLogo, setIsProcessingLogo } = useGenerator()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showPrimaryPalette, setShowPrimaryPalette] = useState(false)
  const [showSecondaryPalette, setShowSecondaryPalette] = useState(false)

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setLogo(file)
    }
  }

  const handleBackgroundRemovalToggle = async (checked: boolean) => {
    setRemoveBackground(checked)

    if (!checked) {
      setProcessedLogoUrl(null)
      return
    }

    if (!logo) return

    setIsProcessingLogo(true)

    try {
      const formData = new FormData()
      formData.append('image', logo)

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to remove background')
      }

      const data = await response.json()
      setProcessedLogoUrl(data.dataUrl)
    } catch (error) {
      console.error('Background removal error:', error)
      setRemoveBackground(false)
      alert('Failed to remove background. Please try again.')
    } finally {
      setIsProcessingLogo(false)
    }
  }

  return (
    <div className="bg-black rounded-lg shadow-lg p-6 w-full max-w-[595px] overflow-y-auto" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif', maxHeight: '842px' }}>
      <div className="mb-6">
        <Image 
          src={heroLogo} 
          alt="Hero Network" 
          className="h-8 w-auto mb-5"
          priority
        />
        <h1 className="text-2xl font-bold text-white mb-2">
          Create Your Client-Ready Filming Guide
        </h1>
        <p className="text-gray-300 text-sm">
          Stop getting &quot;bad&quot; video from clients. Create a 1-page guide with your logo and brand color to send to every new client.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="company-name" className="block text-xs font-medium text-gray-300 mb-1.5">
            Your Company Name
          </label>
          <input
            type="text"
            id="company-name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:border-transparent outline-none transition focus:ring-[#D4FB5D] text-sm"
          />
        </div>

        <div>
          <label htmlFor="logo-upload" className="block text-xs font-medium text-gray-300 mb-1.5">
            Upload Your Logo
          </label>
          <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
            <input
              type="file"
              id="logo-upload"
              accept="image/png, image/jpeg"
              onChange={handleLogoChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:text-gray-900 file:bg-[#D4FB5D] hover:file:opacity-90 cursor-pointer text-sm"
            />
            {logoPreviewUrl && (
              <div className="relative w-16 h-10">
                <img
                  src={processedLogoUrl || logoPreviewUrl}
                  alt="Logo preview"
                  className="w-full h-full object-contain border border-gray-700 rounded p-1 bg-gray-800"
                />
                {isProcessingLogo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/75 rounded">
                    <div className="w-4 h-4 border-2 border-[#D4FB5D] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            )}
          </div>
          {logoPreviewUrl && (
            <div className="mt-3 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={removeBackground}
                  onChange={(e) => handleBackgroundRemovalToggle(e.target.checked)}
                  disabled={isProcessingLogo}
                  className="w-3.5 h-3.5 border-gray-600 rounded focus:ring-2 accent-[#D4FB5D] disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-xs text-gray-300">
                  ✨ Magic-Remove Background
                  {isProcessingLogo && <span className="ml-1">(Processing...)</span>}
                </span>
              </label>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1.5">
                  Logo Alignment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLogoAlign('left')}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      logoAlign === 'left'
                        ? 'bg-[#D4FB5D] text-gray-900 border-[#D4FB5D]'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    Left
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoAlign('center')}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      logoAlign === 'center'
                        ? 'bg-[#D4FB5D] text-gray-900 border-[#D4FB5D]'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    Center
                  </button>
                  <button
                    type="button"
                    onClick={() => setLogoAlign('right')}
                    className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                      logoAlign === 'right'
                        ? 'bg-[#D4FB5D] text-gray-900 border-[#D4FB5D]'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    Right
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5">
            Choose Your Style
          </label>
          <div className="grid grid-cols-3 gap-2">
            {styles.map((styleOption) => (
              <button
                key={styleOption.id}
                onClick={() => setStyle(styleOption.id)}
                className={`p-2.5 border-2 rounded-lg transition-all text-left ${
                  style === styleOption.id
                    ? 'bg-gray-800 ring-2 ring-[#D4FB5D]'
                    : 'border-gray-700 hover:border-gray-600 bg-gray-800/50 hover:bg-gray-800'
                }`}
                style={style === styleOption.id ? { borderColor: '#D4FB5D' } : {}}
              >
                <div className="mb-1.5">
                  <div className={`h-12 rounded border-2 ${
                    styleOption.id === 'modern' ? 'border-gray-600 bg-gray-700' :
                    styleOption.id === 'bold' ? 'border-gray-800 bg-black' :
                    'border-gray-600 bg-gray-700'
                  }`}>
                    {styleOption.id === 'modern' && (
                      <div className="p-1.5 space-y-0.5">
                        <div className="h-1 w-6 bg-gray-400 rounded"></div>
                        <div className="h-1 w-9 bg-gray-500 rounded"></div>
                        <div className="h-1 w-5 bg-gray-600 rounded"></div>
                      </div>
                    )}
                    {styleOption.id === 'bold' && (
                      <div className="p-1.5 space-y-0.5">
                        <div className="h-1.5 w-8 bg-white rounded"></div>
                        <div className="h-1 w-10 bg-gray-400 rounded"></div>
                        <div className="h-1 w-6 bg-gray-500 rounded"></div>
                      </div>
                    )}
                    {styleOption.id === 'classic' && (
                      <div className="p-1.5 space-y-0.5">
                        <div className="h-1 w-8 bg-gray-500 rounded-sm"></div>
                        <div className="h-1 w-9 bg-gray-500 rounded-sm"></div>
                        <div className="h-1 w-6 bg-gray-600 rounded-sm"></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="font-semibold text-xs text-white">{styleOption.name}</div>
                <div className="text-[10px] text-gray-400">{styleOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="font-select" className="block text-xs font-medium text-gray-300 mb-1.5">
            Choose Your Font
          </label>
          <select
            id="font-select"
            value={font}
            onChange={(e) => setFont(e.target.value as FontType)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:border-transparent outline-none transition cursor-pointer text-sm"
          >
            {fonts.map((fontOption) => (
              <option key={fontOption.id} value={fontOption.id}>
                {fontOption.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPrimaryPalette(!showPrimaryPalette)}
                  className="h-9 w-9 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-gray-600 transition-colors"
                  style={{ backgroundColor: primaryColor }}
                  aria-label="Select primary color"
                />
                {showPrimaryPalette && (
                  <div className="absolute z-10 bottom-full mb-2 p-2.5 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-xl">
                    <div className="grid grid-cols-6 gap-1.5 w-48">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setPrimaryColor(color)
                            setShowPrimaryPalette(false)
                          }}
                          className="w-7 h-7 rounded border border-gray-600 hover:border-gray-400 transition-colors hover:scale-110"
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
                className="flex-1 min-w-0 px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent outline-none font-mono text-xs"
                maxLength={7}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5">
              Secondary Color
            </label>
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSecondaryPalette(!showSecondaryPalette)}
                  className="h-9 w-9 rounded-lg border-2 border-gray-700 cursor-pointer hover:border-gray-600 transition-colors"
                  style={{ backgroundColor: secondaryColor }}
                  aria-label="Select secondary color"
                />
                {showSecondaryPalette && (
                  <div className="absolute z-10 bottom-full mb-2 p-2.5 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-xl">
                    <div className="grid grid-cols-6 gap-1.5 w-48">
                      {colorPalette.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setSecondaryColor(color)
                            setShowSecondaryPalette(false)
                          }}
                          className="w-7 h-7 rounded border border-gray-600 hover:border-gray-400 transition-colors hover:scale-110"
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
                className="flex-1 min-w-0 px-2.5 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent outline-none font-mono text-xs"
                maxLength={7}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full font-bold py-3 px-5 rounded-lg text-base transition-all shadow-lg hover:shadow-xl text-gray-900 hover:opacity-90"
          style={{ backgroundColor: '#D4FB5D' }}
        >
          Generate My Guide
        </button>
      </div>

      <ConversionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
