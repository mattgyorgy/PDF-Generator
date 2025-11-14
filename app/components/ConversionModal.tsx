'use client'

import { useState, useEffect } from 'react'
import { useGenerator } from '@/app/context/GeneratorContext'

interface ConversionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConversionModal({ isOpen, onClose }: ConversionModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { companyName, primaryColor, secondaryColor, font, logo, logoAlign, style, removeBackground, processedLogoUrl } = useGenerator()

  useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
        handleClose()
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [status])

  const handleClose = () => {
    setStatus('idle')
    setErrorMessage('')
    setName('')
    setEmail('')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name) {
      setErrorMessage('Please enter your name')
      setStatus('error')
      return
    }

    if (!email) {
      setErrorMessage('Please enter your email address')
      setStatus('error')
      return
    }

    if (!logo) {
      setErrorMessage('Please upload a logo first')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('companyName', companyName || 'Your Company')
      formData.append('primaryColor', primaryColor)
      formData.append('secondaryColor', secondaryColor)
      formData.append('font', font)
      formData.append('logoAlign', logoAlign)
      formData.append('style', style)
      
      if (processedLogoUrl) {
        const response = await fetch(processedLogoUrl)
        const blob = await response.blob()
        formData.append('logo', blob, 'logo.png')
        formData.append('removeBackground', 'false')
      } else {
        formData.append('logo', logo)
        formData.append('removeBackground', removeBackground.toString())
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to generate PDF')
      }

      setStatus('success')
      setName('')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-black rounded-lg shadow-2xl max-w-md w-full p-8 relative border border-gray-800">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-[#D4FB5D] text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Success!
            </h2>
            <p className="text-gray-300 mb-6">
              Check your inbox! Your custom-branded filming guide is on its way.
            </p>
            <button
              onClick={handleClose}
              className="bg-[#D4FB5D] hover:opacity-90 text-gray-900 font-bold py-3 px-6 rounded-lg transition-opacity"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2">
              Get Your Custom Guide
            </h2>
            <p className="text-gray-300 mb-6">
              Enter your email to receive your personalized filming guide.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={status === 'loading'}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent outline-none transition disabled:bg-gray-900 disabled:cursor-not-allowed text-sm"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  disabled={status === 'loading'}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-[#D4FB5D] focus:border-transparent outline-none transition disabled:bg-gray-900 disabled:cursor-not-allowed text-sm"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#D4FB5D] hover:opacity-90 text-gray-900 font-bold py-3 px-6 rounded-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span>
                    Building your PDF...
                  </span>
                ) : (
                  'Send My PDF'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
