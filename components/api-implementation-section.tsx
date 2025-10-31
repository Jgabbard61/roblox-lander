
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Zap, Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import RegistrationModal from '@/components/registration-modal'

export default function ApiImplementationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "REST API Integration",
      description: "Simple RESTful endpoints with comprehensive documentation and code examples in multiple languages."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Verification",
      description: "Lightning-fast verification responses with smart caching to minimize costs and latency."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure API Keys",
      description: "Enterprise-grade API key authentication with automatic rotation and usage monitoring."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rate Limiting",
      description: "Built-in cooldowns prevent abuse while ensuring optimal performance for your applications."
    }
  ]

  const useCases = [
    {
      title: "CRM Integration",
      description: "Automatically verify users during case intake and client onboarding processes.",
      icon: "🔗"
    },
    {
      title: "Automated Workflows", 
      description: "Build verification into your existing legal practice management systems.",
      icon: "⚡"
    },
    {
      title: "Bulk Verification",
      description: "Process multiple user verifications efficiently for large cases or investigations.",
      icon: "📊"
    },
    {
      title: "Third-party Apps",
      description: "Power verification features in custom applications and client portals.",
      icon: "🔧"
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 text-blue-600 text-sm font-medium mb-6"
          >
            <Code className="w-4 h-4" />
            <span>Developer Integration</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Integrate VerifyLens Into
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text block">
              Your System
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            Powerful REST API that brings Roblox user verification directly into your CRM, 
            practice management system, or custom applications.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              Get API Access
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                    {feature?.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{feature?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature?.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Perfect For Your Use Case
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From simple integrations to complex workflows, our API adapts to your needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases?.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
              >
                <div className="text-4xl mb-4">{useCase?.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{useCase?.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{useCase?.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 text-center shadow-xl border border-white/50"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Same credit system as our web platform. No monthly fees or hidden costs.
          </p>
          
          <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                $100
              </div>
              <div className="text-sm text-gray-600">per verification</div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-900">✓ Smart & Exact Search</div>
              <div className="text-sm text-gray-600">Same pricing for all endpoints</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>No subscription fees</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free duplicate detection</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>30-day result caching</span>
            </div>
          </div>

          <Button 
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Get Started with API Access
          </Button>
        </motion.div>
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode="api"
      />
    </section>
  )
}
