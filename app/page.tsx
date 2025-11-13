'use client'

import { GeneratorProvider } from '@/app/context/GeneratorContext'
import GeneratorTool from '@/app/components/GeneratorTool'
import LivePreview from '@/app/components/LivePreview'

export default function Home() {
  return (
    <GeneratorProvider>
      <main className="min-h-screen bg-[#1F2937] py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <GeneratorTool />
            </div>
            <div>
              <LivePreview />
            </div>
          </div>
        </div>
      </main>
    </GeneratorProvider>
  )
}
