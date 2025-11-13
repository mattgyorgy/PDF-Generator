'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface GeneratorContextType {
  companyName: string
  setCompanyName: (name: string) => void
  brandColor: string
  setBrandColor: (color: string) => void
  logo: File | null
  setLogo: (file: File | null) => void
  logoPreviewUrl: string | null
}

const GeneratorContext = createContext<GeneratorContextType | undefined>(undefined)

export function GeneratorProvider({ children }: { children: ReactNode }) {
  const [companyName, setCompanyName] = useState('')
  const [brandColor, setBrandColor] = useState('#3b82f6')
  const [logo, setLogo] = useState<File | null>(null)
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (logo) {
      const url = URL.createObjectURL(logo)
      setLogoPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setLogoPreviewUrl(null)
    }
  }, [logo])

  return (
    <GeneratorContext.Provider
      value={{
        companyName,
        setCompanyName,
        brandColor,
        setBrandColor,
        logo,
        setLogo,
        logoPreviewUrl,
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
