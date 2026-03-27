import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../shared/Button'
import Logo from '../shared/Logo'
import Footer from '../shared/Footer'

const stats = [
  { value: '62%', text: 'of callers contact a competitor if you don\'t answer' },
  { value: '78%', text: 'of customers buy from the first business to respond' },
  { value: '$126,000', text: 'average annual revenue lost from missed calls alone' },
]

const steps = [
  { number: '1', title: 'Answer 12 Questions', desc: 'Quick multiple-choice questions about how your business operates today.' },
  { number: '2', title: 'Get Your AI Readiness Score', desc: 'See your overall score out of 100 across 6 critical business dimensions.' },
  { number: '3', title: 'See Where You\'re Losing Money', desc: 'Get a dollar-impact estimate and specific AI recommendations for your business.' },
]

const trustBadges = ['Takes 3 minutes', 'No credit card required', 'Instant results']

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <Logo />
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading font-extrabold text-4xl md:text-6xl text-white leading-tight mb-6"
          >
            How Much Revenue Is Your Business{' '}
            <span className="text-teal-400">Leaving on the Table?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          >
            Take the free 3-minute AI Business Scorecard. Find out where your business is losing money and which AI systems will fix it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="xl" onClick={() => navigate('/intake')}>
              Start Your Free Evaluation
            </Button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-8"
          >
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {badge}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 bg-navy-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center p-6 rounded-xl bg-navy-800 border border-gray-800"
            >
              <div className="font-heading font-extrabold text-3xl md:text-4xl text-teal-400 mb-3">{stat.value}</div>
              <p className="text-gray-400">{stat.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-3xl md:text-4xl text-white text-center mb-16"
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-teal-400/10 border-2 border-teal-400 flex items-center justify-center mx-auto mb-4">
                  <span className="font-heading font-bold text-xl text-teal-400">{step.number}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" onClick={() => navigate('/intake')}>
              Start Your Free Evaluation
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
