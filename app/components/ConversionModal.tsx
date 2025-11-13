'use client'

import { useState } from 'react'
import { useGenerator } from '@/app/context/GeneratorContext'

interface ConversionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConversionModal({ isOpen, onClose }: ConversionModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { companyName, primaryColor, secondaryColor, font, logo, style, removeBackground, processedLogoUrl } = useGenerator()

  const handleClose = () => {
    setStatus('idle')
    setErrorMessage('')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
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
      setEmail('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Success!
            </h2>
            <p className="text-gray-600 mb-6">
              Check your inbox! Your custom-branded filming guide is on its way.
            </p>
            <button
              onClick={handleClose}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Get Your Custom Guide
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your email to receive your personalized filming guide.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
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
