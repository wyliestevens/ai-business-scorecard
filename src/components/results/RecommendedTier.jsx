import { motion } from 'framer-motion'
import { formatCurrency } from '../../utils/formatCurrency'
import Button from '../shared/Button'

const BOOKING_URL = 'https://link.aipeakbiz.com/widget/bookings/aipeakbiz'

export default function RecommendedTier({ recommendation, totalMonthlyLoss }) {
  const { tier, name, reasoning } = recommendation

  // High-score / no hard sell case
  if (!tier) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
      >
        <h3 className="font-heading font-bold text-2xl text-white mb-4">{name}</h3>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">{reasoning}</p>
        <Button href={BOOKING_URL} size="lg">
          Book a Strategy Call
        </Button>
      </motion.div>
    )
  }

  const paybackWeeks = totalMonthlyLoss > 0
    ? Math.ceil((tier.buildCost / totalMonthlyLoss) * 4.33)
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-teal-400/10 to-blue-500/10 border border-teal-400/30 rounded-2xl p-8"
    >
      <div className="text-center mb-6">
        <p className="text-teal-400 text-sm font-bold uppercase tracking-wider mb-2">Recommended For You</p>
        <h3 className="font-heading font-extrabold text-3xl text-white mb-2">{tier.name}</h3>
        <div className="flex items-center justify-center gap-3 text-lg">
          <span className="text-white font-heading font-bold">{formatCurrency(tier.buildCost)} build</span>
          <span className="text-gray-500">+</span>
          <span className="text-white font-heading font-bold">{formatCurrency(tier.monthlyCost)}/mo</span>
        </div>
      </div>

      <p className="text-gray-300 text-center max-w-lg mx-auto mb-8">{reasoning}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-3">What's Included</h4>
          <ul className="space-y-2">
            {tier.includes.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <svg className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {paybackWeeks && totalMonthlyLoss > 0 && (
          <div className="bg-navy-900/50 rounded-xl p-6">
            <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-3">ROI Estimate</h4>
            <p className="text-gray-300 text-sm mb-4">
              If this system recovers {formatCurrency(totalMonthlyLoss)} per month, it pays for the build cost within:
            </p>
            <div className="text-center">
              <span className="font-heading font-extrabold text-4xl text-teal-400">{paybackWeeks}</span>
              <span className="text-gray-400 text-lg ml-2">weeks</span>
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <Button href={BOOKING_URL} size="lg">
          Book Your Free AI Strategy Session
        </Button>
      </div>
    </motion.div>
  )
}
