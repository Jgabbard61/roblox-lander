
'use client'

import { motion } from 'framer-motion'
import { Search, Mail, Shield, FileText } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">VerifyLens</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional Roblox user verification for law firms. Instant, accurate, and secure verification solutions designed for legal professionals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Instant Verification</li>
              <li className="hover:text-white transition-colors cursor-pointer">Smart Search</li>
              <li className="hover:text-white transition-colors cursor-pointer">Secure & Compliant</li>
              <li className="hover:text-white transition-colors cursor-pointer">Multi-User Access</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Use Cases</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white transition-colors cursor-pointer">Family Law</li>
              <li className="hover:text-white transition-colors cursor-pointer">Gaming Disputes</li>
              <li className="hover:text-white transition-colors cursor-pointer">Client Verification</li>
              <li className="hover:text-white transition-colors cursor-pointer">Due Diligence</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@verifylens.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Legal Industry Focused</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          >
            <p className="text-gray-400 text-sm">
              © 2025 VerifyLens. Professional verification solutions for legal professionals.
            </p>
            <div className="text-gray-400 text-sm">
              <span>Trusted by 500+ law firms nationwide</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
