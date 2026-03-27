import { motion } from 'framer-motion'
import Button from '../shared/Button'
import { formatCurrency } from '../../utils/formatCurrency'

const BOOKING_URL = 'https://link.aipeakbiz.com/widget/bookings/aipeakbiz'

export default function CTASection({ overallScore, totalMonthlyLoss, businessName, onDownloadPDF }) {
  const shareText = `I just scored ${overallScore}/100 on the AI Business Scorecard. Find out how much revenue your business is leaving on the table`
  const shareUrl = 'https://scorecard.aipeakbiz.com'
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareUrl)

  return (
    <div className="space-y-12">
      {/* Three Paths */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="font-heading font-bold text-2xl text-white text-center">Three Paths Forward</h2>

        {/* Option 1: Book */}
        <div className="bg-gradient-to-r from-teal-400/10 to-blue-500/10 border border-teal-400/30 rounded-2xl p-8 text-center">
          <h3 className="font-heading font-bold text-xl text-white mb-3">Book Your Free AI Strategy Session</h3>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            In 30 minutes, we walk through your scorecard results, show you the exact system built for your business, and answer every question. No pressure.
          </p>
          <Button href={BOOKING_URL} size="lg">
            Book My Free Session
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option 2: PDF */}
          <div className="bg-navy-800 border border-gray-700 rounded-xl p-6 text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-3">Download Your Full Report</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get a branded PDF with your scores, dollar-impact analysis, and AI recommendations.
            </p>
            <Button variant="secondary" size="md" onClick={onDownloadPDF}>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF Report
            </Button>
          </div>

          {/* Option 3: Share */}
          <div className="bg-navy-800 border border-gray-700 rounded-xl p-6 text-center">
            <h3 className="font-heading font-bold text-lg text-white mb-3">Share Your Results</h3>
            <p className="text-gray-400 text-sm mb-4">
              Challenge other business owners to take the scorecard.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&summary=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-700 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-700 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-navy-700 border border-gray-600 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sticky footer CTA (visible on scroll) */}
      <div className="fixed bottom-0 left-0 right-0 bg-navy-900/95 backdrop-blur-sm border-t border-gray-800 px-4 py-3 z-50 md:py-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white font-heading font-bold text-sm md:text-base">
            Ready to stop losing {formatCurrency(totalMonthlyLoss)}/month?
          </p>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-sm text-gray-400">
              <a href="tel:9286286080" className="hover:text-teal-400 transition-colors">928.628.6080</a>
              <span>|</span>
              <a href="mailto:wylie@aipeakbiz.com" className="hover:text-teal-400 transition-colors">wylie@aipeakbiz.com</a>
            </div>
            <Button href={BOOKING_URL} size="sm">
              Book Your Free Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
