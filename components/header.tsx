'use client'

import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
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
          </div>

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
    </header>
  )
}
