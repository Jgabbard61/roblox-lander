
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Zap, Brain, Star } from 'lucide-react'

export default function PricingSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  const plans = [
    {
      name: "Basic Lookup",
      icon: Zap,
      price: "$100",
      unit: "per lookup",
      description: "Standard verification for exact username matches",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Instant user verification",
        "Basic user information",
        "Standard reporting",
        "Email support",
        "API access"
      ]
    },
    {
      name: "Smart Search",
      icon: Brain,
      price: "$100",
      unit: "per lookup",
      description: "Advanced fuzzy matching for misspelled or unknown usernames",
      gradient: "from-purple-500 to-purple-600",
      popular: true,
      features: [
        "Everything in Basic Lookup",
        "Fuzzy username matching",
        "Alternative spelling detection",
        "Partial username search",
        "Advanced reporting",
        "Priority support",
        "Bulk processing"
      ]
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
            Simple, <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Pay-Per-Use</span> Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No subscriptions, no setup fees. Pay only for what you use with transparent pricing designed for legal professionals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans?.map?.((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 ${
                plan?.popular ? 'ring-2 ring-purple-200 ring-opacity-50' : ''
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-semibold px-6 py-2 rounded-full flex items-center space-x-2">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan?.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan?.name}</h3>
                <p className="text-gray-600 mb-4">{plan?.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan?.price}</span>
                  <span className="text-gray-600 ml-2">{plan?.unit}</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {plan?.features?.map?.((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 bg-gradient-to-r ${plan?.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                )) ?? []}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className={`w-full py-3 px-6 font-semibold rounded-lg shadow-lg transition-all duration-200 ${
                  plan?.popular
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                }`}
              >
                Start Using {plan?.name}
              </motion.button>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No Hidden Fees, No Contracts
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Start using VerifyLens immediately with no setup fees, no monthly minimums, and no long-term contracts. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Schedule a Demo
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200"
              >
                Contact Sales
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
