'use client'

import { GeneratorProvider } from '@/app/context/GeneratorContext'
import GeneratorTool from '@/app/components/GeneratorTool'
import LivePreview from '@/app/components/LivePreview'

export default function Home() {
  return (
    <GeneratorProvider>
      <main className="min-h-screen bg-[#A6A6A6] py-8 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1270px] mx-auto">
            <div className="flex justify-center">
              <GeneratorTool />
            </div>
            <div className="flex justify-center">
              <LivePreview />
            </div>
          </div>
        </div>
      </main>
    </GeneratorProvider>
  )
}
