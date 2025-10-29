'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Check, Zap, Brain, Eye, Star, CreditCard, Shield, AlertCircle, HelpCircle, Mail, Loader2 } from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import RegistrationModal from '@/components/registration-modal'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CreditsContent() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [selectedPackage, setSelectedPackage] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPackage, setLoadingPackage] = useState<number | null>(null)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [registrationData, setRegistrationData] = useState<{ userId: number; customerId: number; email: string } | null>(null)
  const searchParams = useSearchParams()

  // Check if user canceled checkout
  useEffect(() => {
    const canceled = searchParams.get('canceled')
    if (canceled === 'true') {
      toast.error("Checkout canceled. You can try again whenever you're ready.")
      // Remove the query parameter from URL
      window.history.replaceState({}, '', '/credits')
    }
  }, [searchParams])

  const searchTypes = [
    {
      name: "Exact Search",
      icon: Zap,
      credits: 1,
      price: "$100",
      description: "Precise username matching for direct lookups",
      gradient: "from-blue-500 to-blue-600",
      features: [
        "Direct username verification",
        "User ID lookup",
        "Instant results",
        "No cooldown period",
        "Perfect for known usernames"
      ]
    },
    {
      name: "Smart Search",
      icon: Brain,
      credits: 2,
      price: "$200",
      description: "AI-powered fuzzy matching with ranked results",
      gradient: "from-purple-500 to-purple-600",
      popular: true,
      features: [
        "AI-powered matching",
        "Handles misspellings",
        "Confidence scoring",
        "Up to 10 ranked results",
        "Best for unknown spellings"
      ]
    },
    {
      name: "Display Search",
      icon: Eye,
      credits: "TBD",
      price: "Coming Soon",
      description: "Search by display name (under construction)",
      gradient: "from-gray-400 to-gray-500",
      comingSoon: true,
      features: [
        "Display name search",
        "Multiple matches",
        "Visual identification",
        "Coming soon",
        "Stay tuned"
      ]
    }
  ]

  const packages = [
    {
      name: "Starter",
      credits: 10,
      price: 100000, // $1,000 in cents
      pricePerCredit: 100,
      exactSearches: "10 searches",
      smartSearches: "5 searches",
      gradient: "from-blue-400 to-blue-500",
      description: "Perfect for occasional verifications"
    },
    {
      name: "Professional",
      credits: 50,
      price: 500000, // $5,000 in cents
      pricePerCredit: 100,
      exactSearches: "50 searches",
      smartSearches: "25 searches",
      gradient: "from-purple-500 to-purple-600",
      popular: true,
      description: "Most popular for regular use"
    },
    {
      name: "Business",
      credits: 100,
      price: 1000000, // $10,000 in cents
      pricePerCredit: 100,
      exactSearches: "100 searches",
      smartSearches: "50 searches",
      gradient: "from-indigo-500 to-indigo-600",
      description: "Ideal for high-volume firms"
    },
    {
      name: "Enterprise",
      credits: 200,
      price: 2000000, // $20,000 in cents
      pricePerCredit: 100,
      exactSearches: "200 searches",
      smartSearches: "100 searches",
      gradient: "from-pink-500 to-pink-600",
      description: "Maximum value for large teams"
    }
  ]

  const faqs = [
    {
      question: "How do credits work?",
      answer: "Credits are consumed when you perform searches. Each credit costs $100. Exact Search uses 1 credit ($100), while Smart Search uses 2 credits ($200) due to AI-powered processing. Credits never expire and can be used at any time."
    },
    {
      question: "What happens if a search finds no results?",
      answer: "Exact Search: If no user is found, you are NOT charged any credits. Smart Search: You will be charged 2 credits even if no results are found, as the AI processing has been performed. We recommend using Exact Search first when possible."
    },
    {
      question: "Do credits expire?",
      answer: "No, credits never expire. Once purchased, they remain in your account indefinitely until used. You can use them at your own pace without worrying about expiration dates."
    },
    {
      question: "Can I get a refund?",
      answer: "Unused credits can be refunded within 30 days of purchase. Once credits are used for searches, they cannot be refunded. Please contact our support team for refund requests."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and ACH transfers for enterprise accounts. All payments are processed securely through Stripe."
    },
    {
      question: "Can I purchase custom packages?",
      answer: "Yes! If you need more than 200 credits or have special requirements, please contact our sales team for custom pricing and volume discounts."
    }
  ]

  const scrollToContact = () => {
    window.location.href = '/#contact'
  }

  const handlePurchase = (packageIndex: number) => {
    setSelectedPackage(packageIndex)
    setShowRegistrationModal(true)
  }

  const handleRegistrationSuccess = async (data: { userId: number; customerId: number; email: string }) => {
    setRegistrationData(data)
    setShowRegistrationModal(false)
    setIsLoading(true)
    setLoadingPackage(selectedPackage)

    if (selectedPackage === null) {
      toast.error('No package selected')
      setIsLoading(false)
      setLoadingPackage(null)
      return
    }

    try {
      const pkg = packages[selectedPackage]
      
      // Create checkout session with user info
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageName: pkg.name,
          credits: pkg.credits,
          price: pkg.price, // Price in cents
          email: data.email,
          customerId: data.customerId,
          userId: data.userId,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to initialize')
      }

      // Redirect to checkout URL
      if (responseData.url) {
        window.location.href = responseData.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error: any) {
      console.error('Error initiating checkout:', error)
      toast.error(error.message || 'Failed to initiate checkout. Please try again.')
      setIsLoading(false)
      setLoadingPackage(null)
    }
  }

  return (
    <main className="w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Credit-Based</span> Pricing
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Pay only for what you use. No subscriptions, no hidden fees. Each credit costs just $100.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                View Credit Packages
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-lg shadow-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-200"
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Types Section */}
      <section className="py-20 px-4 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Understand <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Search Types</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different search types use different amounts of credits based on their complexity and AI processing requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {searchTypes.map((search, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                  search.popular ? 'ring-2 ring-purple-200' : ''
                } ${search.comingSoon ? 'opacity-75' : 'group hover:scale-105'}`}
              >
                {search.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white text-sm font-semibold px-4 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Most Used</span>
                    </div>
                  </div>
                )}
                
                {search.comingSoon && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-gray-400 to-gray-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                      Under Construction
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${search.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg ${!search.comingSoon && 'group-hover:scale-110 transition-transform duration-300'}`}>
                    <search.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{search.name}</h3>
                  <p className="text-gray-600 mb-4 min-h-[48px]">{search.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-4xl font-bold text-gray-900">{search.credits}</div>
                    <div className="text-sm text-gray-500">{typeof search.credits === 'number' ? 'credit' + (search.credits > 1 ? 's' : '') : ''}</div>
                    <div className="text-lg font-semibold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text mt-2">
                      {search.price}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {search.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <div className={`w-5 h-5 bg-gradient-to-r ${search.gradient} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Packages Section */}
      <section id="packages" className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Credit Package</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              All packages include the same $100 per credit rate. Purchase more credits at once for larger investigations.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 bg-white py-3 px-6 rounded-lg shadow-sm inline-block">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secure payment via Stripe • Credits never expire • No hidden fees</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:scale-105 ${
                  pkg.popular ? 'ring-2 ring-purple-400 ring-opacity-50' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>MOST POPULAR</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${pkg.gradient} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{pkg.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-5xl font-bold text-gray-900">{pkg.credits}</div>
                    <div className="text-sm text-gray-500 mb-3">credits</div>
                    <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                      ${pkg.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${pkg.pricePerCredit} per credit
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm bg-blue-50 p-2 rounded">
                    <span className="text-gray-700 font-medium">Exact Searches:</span>
                    <span className="text-blue-600 font-semibold">{pkg.exactSearches}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm bg-purple-50 p-2 rounded">
                    <span className="text-gray-700 font-medium">Smart Searches:</span>
                    <span className="text-purple-600 font-semibold">{pkg.smartSearches}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: loadingPackage === index ? 1 : 1.05 }}
                  whileTap={{ scale: loadingPackage === index ? 1 : 0.95 }}
                  onClick={() => handlePurchase(index)}
                  disabled={isLoading}
                  className={`w-full py-3 px-6 font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  } ${isLoading && loadingPackage !== index ? 'opacity-50 cursor-not-allowed' : ''} ${isLoading && loadingPackage === index ? 'opacity-90' : ''}`}
                >
                  {loadingPackage === index ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Purchase Package</span>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Custom Package CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-3">Need More Than 200 Credits?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact our sales team for custom enterprise packages with volume discounts and dedicated support.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 inline-flex items-center space-x-2"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Sales Team</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stripe Integration Info (Placeholder) */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-100"
          >
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Payment Processing</h3>
                <p className="text-gray-700 mb-4">
                  We use <strong>Stripe</strong> for secure payment processing. All credit card information is encrypted and handled by Stripe's PCI-compliant infrastructure. We never store your payment details.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> To purchase credits, you'll need to complete a one-time account setup. Contact us to get started, and we'll create your account with access to the purchase dashboard.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about credits and pricing
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        onSuccess={handleRegistrationSuccess}
        packageInfo={selectedPackage !== null ? {
          name: packages[selectedPackage].name,
          credits: packages[selectedPackage].credits,
          price: packages[selectedPackage].price,
        } : undefined}
      />
    </main>
  )
}

export default function CreditsPage() {
  return (
    <Suspense fallback={
      <main className="w-full">
        <Header />
        <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-xl text-gray-600">Loading...</p>
          </div>
        </section>
        <Footer />
      </main>
    }>
      <CreditsContent />
    </Suspense>
  )
}
