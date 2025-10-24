'use client'

import { motion } from 'framer-motion'
import { LogIn, CreditCard } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="relative w-8 h-8">
              <Image
                src="/favicon.svg"
                alt="VerifyLens"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
              VerifyLens
            </span>
          </Link>

          {/* Navigation and Actions */}
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 mr-2">
              <Link 
                href="/#features"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Features
              </Link>
              <Link 
                href="/credits"
                className={`font-medium transition-colors ${
                  pathname === '/credits' 
                    ? 'text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text' 
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                Pricing
              </Link>
              <Link 
                href="/#contact"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Buy Credits Button */}
            <motion.a
              href="/credits#packages"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              <CreditCard className="w-4 h-4" />
              <span>Buy Credits</span>
            </motion.a>

            {/* Client Login Button */}
            <motion.a
              href="https://www.verifylens.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Client Login</span>
            </motion.a>
          </div>
        </div>
      </div>
    </header>
  )
}
