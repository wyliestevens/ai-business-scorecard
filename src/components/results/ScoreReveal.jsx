import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ScoreGauge from './ScoreGauge'
import Button from '../shared/Button'
import Logo from '../shared/Logo'
import { useScoring } from '../../hooks/useScoring'
import { sendResultsWebhook } from '../../hooks/useWebhook'
import { dimensions } from '../../data/dimensions'

export default function ScoreReveal({ answers, businessInfo }) {
  const navigate = useNavigate()
  const webhookSent = useRef(false)
  const scoring = useScoring(answers, businessInfo?.monthly_revenue)

  useEffect(() => {
    if (webhookSent.current) return
    webhookSent.current = true

    sendResultsWebhook({
      overall_score: scoring.overallScore,
      maturity_level: scoring.maturity.level,
      communication_score: scoring.dimensionScores.communication,
      marketing_score: scoring.dimensionScores.marketing,
      reputation_score: scoring.dimensionScores.reputation,
      operations_score: scoring.dimensionScores.operations,
      financial_score: scoring.dimensionScores.financial,
      technology_score: scoring.dimensionScores.technology,
      estimated_monthly_revenue_loss: scoring.revenueLoss.totalMonthly,
      estimated_annual_revenue_loss: scoring.revenueLoss.totalAnnual,
      lowest_scoring_dimension: dimensions[scoring.lowestDimension]?.name || '',
      second_lowest_dimension: dimensions[scoring.secondLowestDimension]?.name || '',
      recommended_tier: scoring.recommendation.name,
    })
  }, [scoring])

  // Redirect if no answers
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

  return (
    <div className="min-h-screen bg-navy-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <Logo />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg mb-8"
          >
            Your AI Business Readiness Score
          </motion.p>

          <div className="flex justify-center mb-8">
            <ScoreGauge score={scoring.overallScore} size={320} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <h2 className="font-heading font-bold text-3xl text-white mb-3">
              {scoring.maturity.level}
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-6">
              {scoring.maturity.description}
            </p>
            <p className="text-gray-500 text-sm mb-12">
              {scoring.benchmark}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.6 }}
            className="bg-navy-800 border border-gray-700 rounded-2xl p-8 max-w-lg mx-auto"
          >
            <h3 className="font-heading font-bold text-xl text-white mb-3">
              Get Your Full Report with Dollar-Impact Analysis and AI Recommendations
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Your detailed report is ready. We will also email you a copy.
            </p>
            <Button size="lg" className="w-full" onClick={() => navigate('/results')}>
              View My Full Report
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
