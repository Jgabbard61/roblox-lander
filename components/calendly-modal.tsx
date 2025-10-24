'use client'

import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface CalendlyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CalendlyModal({ isOpen, onClose }: CalendlyModalProps) {
  useEffect(() => {
    // Load Calendly widget script
    if (isOpen && typeof window !== 'undefined') {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.body.appendChild(script)

      return () => {
        // Cleanup script on unmount
        const existingScript = document.querySelector(
          'script[src="https://assets.calendly.com/assets/external/widget.js"]'
        )
        if (existingScript) {
          existingScript.remove()
        }
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-bold">Schedule Your Demo</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <p className="text-gray-600 mb-4">
            Book a personalized demo with our team to see how VerifyLens can help your law firm.
          </p>
          {/* Calendly inline widget */}
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/jgabbard61/30min?primary_color=6366f1"
            style={{ position: 'relative', minWidth: '320px', height: '700px' }}
            data-processed="true"
          >
            <div className="calendly-spinner">
              <div className="calendly-bounce1"></div>
              <div className="calendly-bounce2"></div>
              <div className="calendly-bounce3"></div>
            </div>
            <iframe
              src={`https://calendly.com/jgabbard61/30min?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'verifylens.com'}&embed_type=Inline&primary_color=6366f1`}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Select a Date & Time - Calendly"
            ></iframe>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
