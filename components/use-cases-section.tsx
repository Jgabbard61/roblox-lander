
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Scale, UserCheck, Search, MessageSquare } from 'lucide-react'

export default function UseCasesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const scrollToContact = () => {
    document?.getElementById?.('contact')?.scrollIntoView?.({ behavior: 'smooth' })
  }

  const useCases = [
    {
      icon: Heart,
      title: "Family Law",
      description: "Verify minors' online activities and identities in custody disputes, parental controls cases, and digital safety concerns.",
      gradient: "from-pink-500 to-rose-600",
      examples: ["Child custody disputes", "Online safety assessments", "Digital parenting plans"]
    },
    {
      icon: Scale,
      title: "Gaming Disputes",
      description: "Handle disputes involving virtual assets, account ownership, digital harassment, and gaming-related conflicts.",
      gradient: "from-blue-500 to-cyan-600",
      examples: ["Virtual asset disputes", "Account ownership claims", "Gaming contract violations"]
    },
    {
      icon: UserCheck,
      title: "Client Verification",
      description: "Verify client identities and online presence for due diligence, background checks, and case preparation.",
      gradient: "from-green-500 to-emerald-600",
      examples: ["Client background checks", "Identity verification", "Due diligence investigations"]
    },
    {
      icon: Search,
      title: "Due Diligence",
      description: "Comprehensive user research for litigation support, asset searches, and investigative work in complex cases.",
      gradient: "from-purple-500 to-violet-600",
      examples: ["Litigation support", "Asset investigations", "Evidence gathering"]
    },
    {
      icon: MessageSquare,
      title: "Cyberbullying Cases",
      description: "Identify and verify users involved in cyberbullying, online harassment, and digital abuse cases.",
      gradient: "from-orange-500 to-red-600",
      examples: ["Harassment investigations", "Cyberbullying cases", "Online abuse evidence"]
    }
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Use Cases</span> for Legal Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how VerifyLens helps law firms across different practice areas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases?.slice?.(0, 3)?.map?.((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${useCase?.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase?.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{useCase?.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Common Applications:</p>
                {useCase?.examples?.map?.((example, exIndex) => (
                  <div key={exIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2"></div>
                    {example}
                  </div>
                )) ?? []}
              </div>
            </motion.div>
          )) ?? []}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {useCases?.slice?.(3)?.map?.((useCase, index) => (
            <motion.div
              key={index + 3}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: (index + 3) * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${useCase?.gradient} rounded-lg flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <useCase.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{useCase?.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{useCase?.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Common Applications:</p>
                {useCase?.examples?.map?.((example, exIndex) => (
                  <div key={exIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2"></div>
                    {example}
                  </div>
                )) ?? []}
              </div>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Don't See Your Use Case?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              VerifyLens is flexible and can be adapted to various legal scenarios involving digital identity verification.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            >
              Discuss Your Needs
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
