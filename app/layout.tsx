import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-plus-jakarta'
})

export const metadata: Metadata = {
  title: 'Client-Proof Filming Guide Generator',
  description: 'Create your FREE custom-branded filming guide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${plusJakarta.variable} bg-[#1F2937]`}>{children}</body>
    </html>
  )
}
