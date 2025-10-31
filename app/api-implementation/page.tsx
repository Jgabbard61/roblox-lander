
import Header from '@/components/header'
import ApiImplementationSection from '@/components/api-implementation-section'
import Footer from '@/components/footer'

export default function ApiImplementationPage() {
  return (
    <main className="w-full">
      <Header />
      <div className="pt-16"> {/* Add padding for fixed header */}
        <ApiImplementationSection />
      </div>
      <Footer />
    </main>
  )
}
