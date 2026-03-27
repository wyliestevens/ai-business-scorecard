import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { formatCurrency } from '../../utils/formatCurrency'

function AnimatedAmount({ target, delay = 0 }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 1500
      const start = performance.now()
      function tick(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * target))
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(timeout)
  }, [target, delay])

  return formatCurrency(display)
}

export default function DollarImpact({ totalMonthly, totalAnnual }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-2xl p-8 text-center"
    >
      <p className="text-gray-400 text-lg mb-4">
        Based on your responses, your business is leaving an estimated
      </p>
      <div className="font-heading font-extrabold text-4xl md:text-5xl text-red-400 mb-2">
        <AnimatedAmount target={totalMonthly} delay={400} />/month
      </div>
      <div className="font-heading font-bold text-xl text-orange-400 mb-6">
        (<AnimatedAmount target={totalAnnual} delay={600} />/year)
      </div>
      <p className="text-gray-400 max-w-lg mx-auto">
        on the table from gaps that AI automation addresses directly.
      </p>
    </motion.div>
  )
}
