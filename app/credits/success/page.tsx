'use client'

import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, Home } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <main className="w-full min-h-screen flex flex-col">
      <Header />
      
      <section className="flex-1 pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2 
              }}
              className="flex justify-center mb-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </motion.div>

            {/* Success Message */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Payment <span className="text-transparent bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text">Successful!</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Thank you for your purchase! Your credits will be added to your account shortly.
            </p>

            {/* Info Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">What's Next?</h3>
                    <p className="text-gray-700">
                      You'll receive a confirmation email shortly with your purchase details. Your credits are being processed and will be available in your account within a few minutes.
                    </p>
                  </div>
                </div>

                {sessionId && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      <strong>Session ID:</strong> {sessionId}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Save this ID for your records. If you have any issues, please contact support with this session ID.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="https://www.verifylens.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <span>Go to VerifyLens App</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.a
                href="/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200 inline-flex items-center justify-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </motion.a>
            </motion.div>

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <p className="text-gray-600">
                Need help? <a href="/#contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact our support team</a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="w-full min-h-screen flex flex-col">
        <Header />
        <section className="flex-1 pt-32 pb-20 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
