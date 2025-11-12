'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { 
  Code, 
  Zap, 
  Lock, 
  Globe, 
  CheckCircle, 
  ArrowRight,
  Terminal,
  Smartphone,
  Server,
  GitBranch,
  Boxes,
  ShieldCheck,
  Search,
  Clock,
  Users,
  BarChart,
  Webhook,
  Activity
} from 'lucide-react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import RegistrationModal from '@/components/registration-modal'
import { useRouter } from 'next/navigation'

export default function ApiImplementationPage() {
  const router = useRouter()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false)

  const handleRegistrationSuccess = (data: { userId: number; customerId: number; email: string }) => {
    setIsRegistrationModalOpen(false)
    // Redirect to main app dashboard
    window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?welcome=api`
  }

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second response times with globally distributed infrastructure",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Lock,
      title: "Secure Authentication",
      description: "API key authentication with rate limiting and usage tracking",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Globe,
      title: "RESTful Design",
      description: "Clean, intuitive API endpoints following REST best practices",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Intelligent fuzzy matching handles misspellings and variations",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Webhook,
      title: "Real-time Updates",
      description: "Server-Sent Events for balance updates and notifications",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: Activity,
      title: "Comprehensive Logging",
      description: "Full request/response tracking with audit trails",
      gradient: "from-teal-500 to-teal-600"
    }
  ]

  const useCases = [
    {
      icon: Terminal,
      title: "Automated Workflows",
      description: "Integrate user verification into your existing case management systems",
      example: "Verify users automatically when new cases are opened"
    },
    {
      icon: Smartphone,
      title: "Mobile Applications",
      description: "Build mobile apps with on-the-go verification capabilities",
      example: "Field investigators can verify users from anywhere"
    },
    {
      icon: Server,
      title: "Backend Integration",
      description: "Seamlessly integrate with your firm's backend infrastructure",
      example: "Batch verify multiple users in your database"
    },
    {
      icon: GitBranch,
      title: "Third-Party Integrations",
      description: "Connect with CRM, document management, and billing systems",
      example: "Auto-populate case files with verified user data"
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: "Save Time",
      description: "Automate manual verification processes and reduce investigation time by 90%"
    },
    {
      icon: Boxes,
      title: "Scale Effortlessly",
      description: "Handle hundreds of verifications per day without additional staff"
    },
    {
      icon: Users,
      title: "Improve Accuracy",
      description: "Eliminate human error with consistent, reliable API results"
    },
    {
      icon: BarChart,
      title: "Track Everything",
      description: "Monitor usage, costs, and performance with detailed analytics"
    }
  ]

  const codeExamples = [
    {
      language: "JavaScript",
      code: `// Search for a Roblox user
const response = await fetch(
  'https://www.verifylens.com/api/v1/search?query=username123',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    }
  }
);

const data = await response.json();
console.log(data.results);`
    },
    {
      language: "Python",
      code: `import requests

# Search for a Roblox user
response = requests.get(
    'https://www.verifylens.com/api/v1/search',
    params={'query': 'username123'},
    headers={'Authorization': 'Bearer YOUR_API_KEY'}
)

data = response.json()
print(data['results'])`
    },
    {
      language: "PHP",
      code: `<?php
// Search for a Roblox user
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 
    'https://www.verifylens.com/api/v1/search?query=username123');
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY'
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$data = json_decode($response, true);
print_r($data['results']);
?>`
    },
    {
      language: "cURL",
      code: `curl -X GET "https://www.verifylens.com/api/v1/search?query=username123" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
    }
  ]

  const [selectedCodeExample, setSelectedCodeExample] = useState(0)

  return (
    <main className="w-full">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/50 to-slate-900"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-20 pt-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Developer API</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight text-white">
              Build with the{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                VerifyLens API
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-300">
              Powerful, secure, and easy-to-use API for integrating Roblox user verification into your applications. 
              Built for developers, trusted by law firms.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegistrationModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get API Access
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.a
                href={`${process.env.NEXT_PUBLIC_APP_URL}/api-docs`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                View Documentation
                <Terminal className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10"
              >
                <div className="text-3xl font-bold text-blue-400 mb-2">&lt;500ms</div>
                <p className="text-gray-300 text-sm">Average Response Time</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10"
              >
                <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                <p className="text-gray-300 text-sm">Uptime Guarantee</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10"
              >
                <div className="text-3xl font-bold text-green-400 mb-2">RESTful</div>
                <p className="text-gray-300 text-sm">Industry Standard</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white" ref={ref}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Enterprise-Grade{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                API Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with security, performance, and developer experience in mind.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Elegant{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                Integration
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our comprehensive API. Code samples in your favorite language.
            </p>
          </motion.div>

          {/* Language Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {codeExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setSelectedCodeExample(index)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  selectedCodeExample === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                }`}
              >
                {example.language}
              </button>
            ))}
          </div>

          {/* Code Display */}
          <motion.div
            key={selectedCodeExample}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-900 rounded-2xl p-8 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-gray-400 text-sm font-mono">
                example.{codeExamples[selectedCodeExample].language.toLowerCase()}
              </span>
            </div>
            <pre className="text-sm text-gray-300 font-mono overflow-x-auto">
              <code>{codeExamples[selectedCodeExample].code}</code>
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/api-docs`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-purple-600 font-semibold transition-colors"
            >
              View full API documentation
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Endless{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                Possibilities
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how law firms are using the VerifyLens API to transform their workflows.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 hover:shadow-xl transition-all"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                  <p className="text-gray-700 mb-4">{useCase.description}</p>
                  <div className="flex items-start gap-2 text-sm text-gray-600 bg-white/50 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="italic">Example: {useCase.example}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
                VerifyLens API
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading law firms for mission-critical user verification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <ShieldCheck className="w-16 h-16 mx-auto mb-6 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Security & Compliance Built In
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade security features to protect your data and maintain compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <Lock className="w-10 h-10 mb-4 text-blue-400" />
              <h3 className="text-xl font-bold mb-3">Encrypted API Keys</h3>
              <p className="text-gray-300">
                All API keys are encrypted at rest and in transit using industry-standard encryption.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <Activity className="w-10 h-10 mb-4 text-purple-400" />
              <h3 className="text-xl font-bold mb-3">Audit Logs</h3>
              <p className="text-gray-300">
                Comprehensive logging of all API requests for compliance and debugging purposes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
            >
              <ShieldCheck className="w-10 h-10 mb-4 text-green-400" />
              <h3 className="text-xl font-bold mb-3">Rate Limiting</h3>
              <p className="text-gray-300">
                Built-in rate limiting to protect against abuse and ensure fair usage for all customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join leading law firms using the VerifyLens API. Create your account and get your API key in minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegistrationModalOpen(true)}
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-2xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.a
                href={`${process.env.NEXT_PUBLIC_APP_URL}/api-docs`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Read Documentation
                <Terminal className="w-5 h-5" />
              </motion.a>
            </div>

            <p className="mt-8 text-white/80 text-sm">
              No credit card required • Free API access included with your account
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onSuccess={handleRegistrationSuccess}
      />
    </main>
  )
}
