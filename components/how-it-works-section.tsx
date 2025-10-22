
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Search, Zap, FileText } from 'lucide-react'

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  const steps = [
    {
      step: 1,
      icon: Search,
      title: "Enter Username",
      description: "Simply enter the Roblox username you need to verify. Don't worry about exact spelling - our Smart Search handles variations.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      step: 2,
      icon: Zap,
      title: "Get Instant Results",
      description: "Our system instantly searches and verifies the user, providing comprehensive results in seconds, not hours.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      step: 3,
      icon: FileText,
      title: "Access Detailed Information",
      description: "Receive detailed user information, verification status, and professional reports ready for legal documentation.",
      gradient: "from-green-500 to-green-600"
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">VerifyLens</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, fast, and reliable verification in just three steps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps?.map?.((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              {/* Connection line */}
              {index < steps?.length - 1 && (
                <div className="hidden md:block absolute top-16 left-full w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200 z-10 transform -translate-x-4"></div>
              )}
              
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step?.gradient} rounded-full flex items-center justify-center mx-auto shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step?.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step?.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step?.description}</p>
              </div>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Start verifying users in under 60 seconds
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of law firms who trust VerifyLens for their digital verification needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Try VerifyLens Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
