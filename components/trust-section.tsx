
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Clock, Shield, Headphones } from 'lucide-react'

export default function TrustSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const trustFactors = [
    {
      icon: Award,
      title: "Professional Accuracy",
      description: "99.9% accuracy rate with comprehensive verification data sourced directly from Roblox's official systems.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Get results in seconds, not days. No more waiting weeks for private investigators or manual research.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Secure Data Handling",
      description: "Enterprise-grade security with encryption, compliance tracking, and audit trails meeting legal industry standards.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Headphones,
      title: "Dedicated Legal Support",
      description: "Expert support team trained specifically on legal requirements and digital evidence best practices.",
      gradient: "from-orange-500 to-orange-600"
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
            Why Law Firms <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Trust VerifyLens</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for legal professionals who need reliable, fast, and secure verification solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {trustFactors?.map?.((factor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${factor?.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <factor.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{factor?.title}</h3>
              <p className="text-gray-600 leading-relaxed">{factor?.description}</p>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">500+</div>
                <div className="text-gray-600">Law Firms Trust Us</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">50k+</div>
                <div className="text-gray-600">Verifications Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text">99.9%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Trusted by Legal Professionals Nationwide
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From family law practices to large litigation firms, VerifyLens is the go-to solution for digital verification needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="font-semibold text-gray-900 mb-2">💼 Enterprise Ready</div>
                <div className="text-gray-600">SOC 2 compliance, dedicated support, and custom integrations available.</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="font-semibold text-gray-900 mb-2">⚖️ Legal Industry Focused</div>
                <div className="text-gray-600">Built with legal professionals' workflows and requirements in mind.</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="font-semibold text-gray-900 mb-2">🔒 Data Protection</div>
                <div className="text-gray-600">Attorney-client privilege protection and confidential data handling.</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="font-semibold text-gray-900 mb-2">📈 Proven Results</div>
                <div className="text-gray-600">Helping law firms win cases with faster, more accurate verification.</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
