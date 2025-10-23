
'use client'

import { motion } from 'framer-motion'
import { Search, ShieldCheck, Zap } from 'lucide-react'

export default function HeroSection() {
  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 pt-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <Search className="relative w-20 h-20 text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Verify <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Roblox Users</span> Instantly for Your Legal Cases
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            Trusted verification for law firms handling cases involving minors, gaming disputes, and digital identity verification. Get instant, accurate results with our Smart Search technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Start Verifying Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200"
            >
              Schedule Demo
            </motion.button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
            >
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get verification in seconds, not hours</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
            >
              <Search className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600 text-sm">Find users even with misspellings or variations</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
            >
              <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Compliant</h3>
              <p className="text-gray-600 text-sm">Professional-grade security for legal work</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
