
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [openIndex, setOpenIndex] = useState(0)

  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  const faqs = [
    {
      question: "What information can VerifyLens verify about Roblox users?",
      answer: "VerifyLens provides comprehensive user verification including username confirmation, account creation dates, user ID verification, display name information, and account status. We also provide detailed reports suitable for legal documentation and evidence collection."
    },
    {
      question: "How accurate is the verification data?",
      answer: "Our verification data maintains a 99.9% accuracy rate by sourcing information directly from Roblox's official systems. All data is real-time and verified against multiple checkpoints to ensure reliability for legal proceedings."
    },
    {
      question: "Is VerifyLens compliant with legal industry requirements?",
      answer: "Yes, VerifyLens is built specifically for legal professionals. We maintain SOC 2 compliance, provide audit trails, ensure attorney-client privilege protection, and follow all data handling requirements for the legal industry."
    },
    {
      question: "What's the difference between Basic Lookup and Smart Search?",
      answer: "Basic Lookup requires exact username matches and provides standard verification. Smart Search uses advanced fuzzy matching to find users even with misspellings, variations, or partial usernames - perfect when you're not sure of the exact spelling or when dealing with similar usernames."
    },
    {
      question: "What happens if I search the same username multiple times?",
      answer: "We don't charge you for usernames you've already searched. If you search for a username that you've previously looked up, we'll instantly retrieve the cached results at no additional cost, ensuring you never pay twice for the same information."
    },
    {
      question: "How quickly can I get verification results?",
      answer: "VerifyLens provides instant results in seconds, not hours or days. Once you enter a username, our system immediately processes the verification and provides comprehensive results that you can use immediately in your legal work."
    },
    {
      question: "Can multiple team members access VerifyLens?",
      answer: "Yes, VerifyLens supports multi-user access with role-based permissions. You can add team members, assign different access levels, and track usage across your entire law firm while maintaining security and compliance."
    },
    {
      question: "How do I get started with VerifyLens?",
      answer: "Getting started is simple: contact our team for a free consultation, we'll set up your account with appropriate permissions, and you can start verifying users immediately. No setup fees, no long-term contracts, and no technical setup required."
    },
    {
      question: "Do you offer support for legal professionals?",
      answer: "Yes, we provide dedicated legal support with team members trained specifically on legal requirements, digital evidence best practices, and courtroom-ready documentation. We're here to help you succeed with your cases."
    }
  ]

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about VerifyLens and how it can help your legal practice.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs?.map?.((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq?.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                </motion.div>
              </button>
              
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: openIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq?.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our legal support team is here to help. Contact us for personalized assistance with your verification needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
