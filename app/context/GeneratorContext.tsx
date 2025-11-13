'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type StyleType = 'modern' | 'bold' | 'classic'
export type FontType = 'helvetica' | 'times' | 'courier' | 'inter' | 'playfair' | 'roboto' | 'montserrat'

interface GeneratorContextType {
  companyName: string
  setCompanyName: (name: string) => void
  primaryColor: string
  setPrimaryColor: (color: string) => void
  secondaryColor: string
  setSecondaryColor: (color: string) => void
  font: FontType
  setFont: (font: FontType) => void
  logo: File | null
  setLogo: (file: File | null) => void
  logoPreviewUrl: string | null
  processedLogoUrl: string | null
  setProcessedLogoUrl: (url: string | null) => void
  style: StyleType
  setStyle: (style: StyleType) => void
  removeBackground: boolean
  setRemoveBackground: (remove: boolean) => void
  isProcessingLogo: boolean
  setIsProcessingLogo: (processing: boolean) => void
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined)

export function GeneratorProvider({ children }: { children: ReactNode }) {
  const [companyName, setCompanyName] = useState('')
  const [primaryColor, setPrimaryColor] = useState('#3b82f6')
  const [secondaryColor, setSecondaryColor] = useState('#10b981')
  const [font, setFont] = useState<FontType>('helvetica')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)
  const [processedLogoUrl, setProcessedLogoUrl] = useState<string | null>(null)
  const [style, setStyle] = useState<StyleType>('modern')
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isProcessingLogo, setIsProcessingLogo] = useState(false)

  useEffect(() => {
    if (logo) {
      const url = URL.createObjectURL(logo)
      setLogoPreviewUrl(url)
      setProcessedLogoUrl(null)
      setRemoveBackground(false)
      return () => URL.revokeObjectURL(url)
    } else {
      setLogoPreviewUrl(null)
      setProcessedLogoUrl(null)
    }
  }, [logo])

  return (
    <GeneratorContext.Provider
      value={{
        companyName,
        setCompanyName,
        primaryColor,
        setPrimaryColor,
        secondaryColor,
        setSecondaryColor,
        font,
        setFont,
        logo,
        setLogo,
        logoPreviewUrl,
        processedLogoUrl,
        setProcessedLogoUrl,
        style,
        setStyle,
        removeBackground,
        setRemoveBackground,
        isProcessingLogo,
        setIsProcessingLogo,
      }}
    >
      {children}
    </GeneratorContext.Provider>
  )
}

export function useGenerator() {
  const context = useContext(GeneratorContext)
  if (context === undefined) {
    throw new Error('useGenerator must be used within a GeneratorProvider')
  }
  return context
}
