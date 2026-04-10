import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'
import Logo from '../shared/Logo'

export default function IntakeForm({ onSubmit }) {
  const navigate = useNavigate()
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Load GHL form embed script
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://link.aipeakbiz.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Listen for GHL form submission via postMessage
  useEffect(() => {
    function handleMessage(event) {
      if (event.origin !== 'https://link.aipeakbiz.com') return
      const data = event.data
      if (
        data &&
        (data.type === 'form:submit' ||
          data.formSubmitted === true ||
          (typeof data === 'string' && data.includes('submit')))
      ) {
        setFormSubmitted(true)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  function handleContinue() {
    onSubmit()
    navigate('/evaluate')
  }

  return (
    <div className="min-h-screen bg-navy-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Logo />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">
            Tell Us About Your Business
          </h1>
          <p className="text-gray-400 mb-8">
            Fill out the form below to get started with your free AI Business Scorecard.
          </p>

          {/* GHL Embedded Form */}
          <div className="bg-navy-800 border border-gray-700 rounded-2xl p-4 mb-8" style={{ minHeight: '874px' }}>
            <iframe
              src="https://link.aipeakbiz.com/widget/form/QIficAgWo5MUx9gS2eU1"
              style={{ width: '100%', height: '874px', border: 'none', borderRadius: '3px' }}
              id="inline-QIficAgWo5MUx9gS2eU1"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Website Builder Setup"
              data-height="874"
              data-layout-iframe-id="inline-QIficAgWo5MUx9gS2eU1"
              data-form-id="QIficAgWo5MUx9gS2eU1"
              title="Website Builder Setup"
            />
          </div>

          {/* Continue button */}
          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Button size="lg" className="w-full" onClick={handleContinue}>
                Start My Assessment
              </Button>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-3">
                Complete the form above, then continue to your assessment.
              </p>
              <button
                onClick={handleContinue}
                className="text-teal-400 text-sm underline underline-offset-2 hover:text-teal-300 transition-colors"
              >
                I've already submitted the form
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
