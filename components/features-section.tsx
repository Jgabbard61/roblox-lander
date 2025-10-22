
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, Brain, Shield, Users, FileText, BarChart } from 'lucide-react'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  const features = [
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Get comprehensive user verification results in seconds, not hours. Stop waiting and start winning cases.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "Smart Search",
      description: "Our flagship feature handles misspellings, variations, and fuzzy matching when exact usernames are unknown.",
      gradient: "from-purple-500 to-purple-600",
      highlight: true
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Professional-grade security with data encryption, compliance tracking, and audit trails for legal requirements.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      title: "Multi-User Access",
      description: "Team collaboration with role-based access controls. Perfect for law firms with multiple investigators.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: FileText,
      title: "Detailed Reports",
      description: "Professional reports with comprehensive user data, verification status, and legal documentation support.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: BarChart,
      title: "Usage Tracking",
      description: "Monitor your verification usage, track costs, and generate billing reports for client cases.",
      gradient: "from-teal-500 to-teal-600"
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Legal Professionals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to verify Roblox users efficiently and professionally.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map?.((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 ${
                feature?.highlight ? 'ring-2 ring-purple-200 ring-opacity-50' : ''
              }`}
            >
              {feature?.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    🌟 Main Differentiator
                  </div>
                </div>
              )}
              
              <div className={`w-12 h-12 bg-gradient-to-r ${feature?.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature?.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature?.description}</p>
              
              {feature?.highlight && (
                <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
                  <p className="text-sm text-purple-700 font-medium">
                    💡 Perfect for cases where you only have partial or misspelled usernames
                  </p>
                </div>
              )}
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Ready to Experience the Power of Smart Search?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              See why Smart Search is changing how law firms handle digital verification. Try it free today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Start Free Trial
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200"
              >
                View Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
