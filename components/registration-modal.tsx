
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, User, Building, Phone, MessageSquare, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: 'contact' | 'api' // Determine which form to show
  onSuccess?: (data: { userId: number; customerId: number; email: string }) => void // For backward compatibility
  packageInfo?: {
    name: string
    credits: number
    price: number
  } // For backward compatibility
}

export default function RegistrationModal({ isOpen, onClose, mode = 'contact', onSuccess, packageInfo }: RegistrationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    estimatedUsage: '',
    message: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          message: mode === 'api' 
            ? `API Access Request: ${formData?.message || 'Requesting access to VerifyLens API integration.'}`
            : formData?.message
        })
      })

      const data = await response.json()

      if (response.ok && data?.success) {
        toast.success(
          mode === 'api' 
            ? 'API access request submitted successfully! We\'ll contact you soon with your credentials.'
            : 'Contact form submitted successfully! We\'ll be in touch soon.'
        )
        setFormData({
          name: '',
          email: '',
          companyName: '',
          phoneNumber: '',
          estimatedUsage: '',
          message: ''
        })
        onClose()
      } else {
        throw new Error(data?.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = formData?.name?.trim() && 
                     formData?.email?.trim() && 
                     formData?.companyName?.trim() && 
                     formData?.estimatedUsage

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'api' ? 'Get API Access' : 'Contact Us'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {mode === 'api' 
                    ? 'Request access to VerifyLens API integration'
                    : 'Get in touch with our team'
                  }
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="name"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                  {mode === 'api' ? 'Company Name *' : 'Law Firm/Company *'}
                </Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="companyName"
                    type="text"
                    value={formData?.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={mode === 'api' ? 'Your company name' : 'Your law firm or company name'}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData?.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              {/* Estimated Usage */}
              <div className="space-y-2">
                <Label htmlFor="estimatedUsage" className="text-sm font-medium text-gray-700">
                  Estimated Monthly Usage *
                </Label>
                <Select value={formData?.estimatedUsage} onValueChange={(value) => handleInputChange('estimatedUsage', value)}>
                  <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your expected usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-100">1-100 verifications</SelectItem>
                    <SelectItem value="100-1,000">100-1,000 verifications</SelectItem>
                    <SelectItem value="1,000-10,000">1,000-10,000 verifications</SelectItem>
                    <SelectItem value="10,000+">10,000+ verifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  {mode === 'api' ? 'Integration Details' : 'Message'}
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Textarea
                    id="message"
                    value={formData?.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="pl-10 pt-3 min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    placeholder={
                      mode === 'api' 
                        ? 'Tell us about your integration requirements, existing systems, or specific use cases...'
                        : 'Tell us about your needs, questions, or how we can help...'
                    }
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  mode === 'api' ? 'Request API Access' : 'Send Message'
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to be contacted by our team regarding your request.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
