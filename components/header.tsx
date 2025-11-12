'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, CreditCard, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
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
              {/* Navigation Links - Desktop Only */}
              <nav className="hidden md:flex items-center space-x-6 mr-2">
                <Link 
                  href="/#features"
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  Features
                </Link>
                <Link 
                  href="/api-implementation"
                  className={`font-medium transition-colors ${
                    pathname === '/api-implementation' 
                      ? 'text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text' 
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  API
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

              {/* Buy Credits Button - Desktop Only */}
              <motion.a
                href="/credits#packages"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
              >
                <CreditCard className="w-4 h-4" />
                <span>Buy Credits</span>
              </motion.a>

              {/* Mobile Hamburger Menu Button - Mobile Only */}
              <motion.button
                onClick={toggleMobileMenu}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden inline-flex items-center justify-center p-2 text-gray-700 hover:text-purple-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>

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
                <span className="hidden sm:inline">Client Login</span>
                <span className="sm:hidden">Login</span>
              </motion.a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed top-16 left-0 right-0 z-40 bg-white shadow-lg border-b border-gray-200 md:hidden"
            >
              <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                {/* Features Link */}
                <Link
                  href="/#features"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 font-medium rounded-lg transition-all"
                >
                  Features
                </Link>

                {/* API Link */}
                <Link
                  href="/api-implementation"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 font-medium rounded-lg transition-all ${
                    pathname === '/api-implementation'
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600'
                  }`}
                >
                  API
                </Link>

                {/* Pricing Link */}
                <Link
                  href="/credits"
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 font-medium rounded-lg transition-all ${
                    pathname === '/credits'
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600'
                  }`}
                >
                  Pricing
                </Link>

                {/* Contact Link */}
                <Link
                  href="/#contact"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-purple-600 font-medium rounded-lg transition-all"
                >
                  Contact
                </Link>

                {/* Buy Credits Link - Mobile */}
                <Link
                  href="/credits#packages"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-all text-center"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Buy Credits</span>
                  </span>
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
