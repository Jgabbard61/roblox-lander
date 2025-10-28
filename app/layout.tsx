
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: 'VerifyLens - Verify Roblox Users Instantly for Your Legal Cases',
  description: 'Professional Roblox user verification tool for law firms. Instant verification with Smart Search technology for gaming disputes, family law, and client verification.',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'https://verifylens.com'),
  openGraph: {
    title: 'VerifyLens - Verify Roblox Users Instantly for Your Legal Cases',
    description: 'Professional Roblox user verification tool for law firms. Instant verification with Smart Search technology.',
    url: '/',
    siteName: 'VerifyLens',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VerifyLens - Verify Roblox Users Instantly for Your Legal Cases',
    description: 'Professional Roblox user verification tool for law firms.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {children}
        </div>
      </body>
    </html>
  )
}
