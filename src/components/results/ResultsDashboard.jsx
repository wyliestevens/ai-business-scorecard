import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScoring } from '../../hooks/useScoring'
import { dimensionOrder } from '../../data/dimensions'
import ScoreGauge from './ScoreGauge'
import RadarChart from './RadarChart'
import DollarImpact from './DollarImpact'
import DimensionCard from './DimensionCard'
import RecommendedTier from './RecommendedTier'
import CTASection from './CTASection'
import Footer from '../shared/Footer'
import Logo from '../shared/Logo'
import Button from '../shared/Button'
import { generatePDF } from './PDFReport'

export default function ResultsDashboard({ answers, businessInfo }) {
  const navigate = useNavigate()
  const scoring = useScoring(answers, businessInfo?.monthly_revenue)

  if (Object.keys(answers).length < 12) {
    return (
      <div className="min-h-screen bg-navy-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="font-heading font-bold text-2xl text-white mb-4">Please complete the evaluation first</h2>
          <Button onClick={() => navigate('/evaluate')}>Go to Evaluation</Button>
        </div>
      </div>
    )
  }

  function handleDownloadPDF() {
    generatePDF({ businessInfo, scoring })
  }

  return (
    <div className="min-h-screen bg-navy-900 pb-24">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-5xl mx-auto">
          <Logo />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4">
        {/* Section 1: Score Summary */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-white mb-2">
              Your AI Business Scorecard Results
            </h1>
            <p className="text-gray-400">
              Prepared for <span className="text-white font-medium">{businessInfo?.business_name || 'Your Business'}</span>
            </p>
          </motion.div>

          <div className="flex justify-center mb-8">
            <ScoreGauge score={scoring.overallScore} size={280} />
          </div>

          <RadarChart dimensionScores={scoring.dimensionScores} />

          <p className="text-center text-gray-400 text-lg mt-4">
            Here is where your business stands and what it is costing you.
          </p>
        </section>

        {/* Section 2: Dollar Impact */}
        <section className="mb-16">
          <DollarImpact
            totalMonthly={scoring.revenueLoss.totalMonthly}
            totalAnnual={scoring.revenueLoss.totalAnnual}
          />
        </section>

        {/* Section 3: Category Breakdown */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-2xl text-white mb-6"
          >
            Category-by-Category Breakdown
          </motion.h2>
          <p className="text-gray-400 mb-8">Click each category to see detailed analysis, industry data, and AI solutions.</p>

          <div className="space-y-3">
            {dimensionOrder.map((key, i) => (
              <DimensionCard
                key={key}
                dimensionKey={key}
                score={scoring.dimensionScores[key]}
                loss={scoring.revenueLoss.byDimension[key]}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Section 4: Recommended Tier */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-2xl text-white mb-6"
          >
            Your Recommended{' '}
            <a href="https://aipeakbiz.com" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">AI Peak Biz</a>
            {' '}System
          </motion.h2>
          <RecommendedTier
            recommendation={scoring.recommendation}
            totalMonthlyLoss={scoring.revenueLoss.totalMonthly}
          />
        </section>

        {/* Section 5: CTA */}
        <section className="mb-16">
          <CTASection
            overallScore={scoring.overallScore}
            totalMonthlyLoss={scoring.revenueLoss.totalMonthly}
            businessName={businessInfo.business_name}
            onDownloadPDF={handleDownloadPDF}
          />
        </section>

        <Footer />
      </div>
    </div>
  )
}
