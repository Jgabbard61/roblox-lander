
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ProblemSection from '@/components/problem-section'
import HowItWorksSection from '@/components/how-it-works-section'
import FeaturesSection from '@/components/features-section'
import UseCasesSection from '@/components/use-cases-section'
import PricingSection from '@/components/pricing-section'
import TrustSection from '@/components/trust-section'
import FAQSection from '@/components/faq-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <main className="w-full">
      <Header />
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <PricingSection />
      <TrustSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
