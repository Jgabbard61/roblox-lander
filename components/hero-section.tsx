
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ShieldCheck, Zap } from 'lucide-react'
import CalendlyModal from './calendly-modal'

export default function HeroSection() {
  const [isCalendlyModalOpen, setIsCalendlyModalOpen] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  
  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      {!videoError && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
        >
          <source src="https://raw.githubusercontent.com/Jgabbard61/roblox-lander/main/public/verifylens_hero_background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Gradient Fallback Background - always visible, video fades in over it */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-0 -z-10' : 'opacity-100 z-0'}`}></div>
      
      {/* Dark Overlay for better text readability over video */}
      <div className={`absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 transition-opacity duration-1000 ${videoLoaded && !videoError ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}></div>
      
      {/* Content Overlay */}
      <div className="relative z-20 max-w-6xl mx-auto text-center px-4 py-20 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
              <Search className="relative w-20 h-20 text-white drop-shadow-lg" />
            </div>
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-extrabold mb-6 leading-tight transition-all duration-1000 ${videoLoaded && !videoError ? 'text-white drop-shadow-2xl' : 'text-gray-900'}`}>
            Verify <span className={`text-transparent bg-gradient-to-r bg-clip-text ${videoLoaded && !videoError ? 'from-blue-300 to-purple-300' : 'from-blue-500 to-purple-600'}`}>Roblox Users</span> Instantly
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${videoLoaded && !videoError ? 'text-white/95 drop-shadow-lg' : 'text-gray-700'}`}>
            Trusted verification for law firms handling cases involving minors, gaming disputes, and digital identity verification. Get instant, accurate results with our Smart Search technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Start Verifying Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCalendlyModalOpen(true)}
              className="px-8 py-4 bg-white/95 text-gray-800 font-semibold rounded-lg shadow-2xl border-2 border-white/50 hover:bg-white hover:shadow-3xl transition-all duration-200 backdrop-blur-sm"
            >
              Schedule a Demo
            </motion.button>
          </div>
          
          {/* Calendly Modal */}
          <CalendlyModal 
            isOpen={isCalendlyModalOpen} 
            onClose={() => setIsCalendlyModalOpen(false)} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30"
            >
              <Zap className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant Results</h3>
              <p className="text-gray-600 text-sm">Get verification in seconds, not hours</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30"
            >
              <Search className="w-8 h-8 text-purple-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Smart Search</h3>
              <p className="text-gray-600 text-sm">Find users even with misspellings or variations</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-2xl border border-white/30"
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
