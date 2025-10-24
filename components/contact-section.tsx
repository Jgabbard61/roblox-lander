
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'
import { Send, Mail, Phone, Building, Calendar } from 'lucide-react'

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    estimatedUsage: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'schedule'>('form')

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const usageOptions = [
    { value: '', label: 'Select estimated monthly usage...' },
    { value: '1-100', label: '1-100 lookups per month' },
    { value: '100-1,000', label: '100-1,000 lookups per month' },
    { value: '1,000-10,000', label: '1,000-10,000 lookups per month' },
    { value: '10,000+', label: '10,000+ lookups per month' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e?.target ?? {}
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response?.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          companyName: '',
          phoneNumber: '',
          estimatedUsage: '',
          message: ''
        })
      } else {
        alert('There was an error submitting your form. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error submitting your form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-xl shadow-lg border border-green-100"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6 text-lg">
              Your message has been successfully submitted. Our team will review your information and contact you within 24 hours to discuss your VerifyLens needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Submit Another Inquiry
            </motion.button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50" id="contact">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Started?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Contact us to learn how VerifyLens can streamline your legal verification process and help you win more cases.
          </p>
          
          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'form'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Mail className="w-5 h-5" />
              Send Message
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </button>
          </div>
        </motion.div>

        {/* Tabbed Content */}
        {activeTab === 'form' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData?.name ?? ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData?.email ?? ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        placeholder="your@lawfirm.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                      Law Firm / Company *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        value={formData?.companyName ?? ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        placeholder="Your law firm name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData?.phoneNumber ?? ''}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="estimatedUsage" className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Monthly Usage *
                  </label>
                  <select
                    id="estimatedUsage"
                    name="estimatedUsage"
                    required
                    value={formData?.estimatedUsage ?? ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
                  >
                    {usageOptions?.map?.((option, index) => (
                      <option key={index} value={option?.value} disabled={!option?.value}>
                        {option?.label}
                      </option>
                    )) ?? []}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData?.message ?? ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200 resize-none"
                    placeholder="Tell us about your specific needs, use cases, or any questions you have..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">
                  <strong>Privacy Notice:</strong> Your information is stored securely and will only be used to contact you about VerifyLens services. We never share your data with third parties.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why Contact Us?</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Free Consultation</h4>
                    <p className="text-gray-600 text-sm">Get personalized advice on how VerifyLens can help your specific legal practice and use cases.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Custom Pricing</h4>
                    <p className="text-gray-600 text-sm">Receive tailored pricing based on your expected usage and volume requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quick Setup</h4>
                    <p className="text-gray-600 text-sm">Get your account set up immediately and start verifying users within 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">⚡ Fast Response Guarantee</h3>
              <p className="text-gray-600 mb-4">
                We understand that legal cases move quickly. That's why we guarantee:
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  Response within 2 hours during business hours
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  Account setup within 24 hours
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></div>
                  Dedicated legal support team
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
        ) : (
          /* Calendly Tab */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center mb-6">
                <Calendar className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Schedule Your Demo</h3>
                <p className="text-gray-600">
                  Book a personalized demo with our team to see how VerifyLens can help your law firm.
                </p>
              </div>
              
              {/* 
                CALENDLY INTEGRATION INSTRUCTIONS:
                ====================================
                To add your Calendly scheduling widget:
                
                1. Log in to your Calendly account at https://calendly.com
                
                2. Go to your event type (e.g., "Demo Call", "Consultation")
                
                3. Click "Share" or "Embed" on the event
                
                4. Select "Inline Embed" option
                
                5. Copy your Calendly URL (it will look like: https://calendly.com/your-username/demo)
                
                6. Replace the placeholder URL below with your actual Calendly URL
                
                7. The widget will automatically load and display your calendar
                
                Current placeholder: Replace 'YOUR_USERNAME' and 'YOUR_EVENT' with your actual Calendly details
              */}
              
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/jgabbard61/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=3b82f6"
                style={{ minWidth: '320px', height: '700px' }}
              ></div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Pro Tip:</strong> Select a time that works best for you, and you'll receive a confirmation email with meeting details.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
