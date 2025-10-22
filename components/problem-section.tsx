
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Clock, AlertCircle, Users, FileX } from 'lucide-react'

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const problems = [
    {
      icon: Clock,
      title: "Time-Consuming Manual Verification",
      description: "Hours spent searching for user information across platforms, slowing down case progress and increasing costs."
    },
    {
      icon: AlertCircle,
      title: "Inaccurate User Identification",
      description: "Difficulty verifying minors' online identities leads to incomplete case files and potential legal complications."
    },
    {
      icon: Users,
      title: "Gaming-Related Disputes",
      description: "Rising cases involving online gaming require specialized tools that traditional investigators don't have."
    },
    {
      icon: FileX,
      title: "Incomplete Documentation",
      description: "Missing or incomplete user verification creates gaps in evidence that can weaken legal arguments."
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
            The Challenges Law Firms Face with <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">Digital Verification</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Traditional investigation methods fall short when dealing with modern digital identities and gaming platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {problems?.map?.((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <problem.icon className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{problem?.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{problem?.description}</p>
                </div>
              </div>
            </motion.div>
          )) ?? []}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              These Problems Cost Law Firms Time, Money, and Cases
            </h3>
            <p className="text-gray-600 text-lg">
              VerifyLens eliminates these pain points with instant, accurate Roblox user verification designed specifically for legal professionals.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
