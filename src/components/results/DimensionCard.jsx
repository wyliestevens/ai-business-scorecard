import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getLetterGrade, getGradeColor } from '../../utils/calculateScore'
import { formatCurrency } from '../../utils/formatCurrency'
import { dimensions } from '../../data/dimensions'

export default function DimensionCard({ dimensionKey, score, loss, index }) {
  const [isOpen, setIsOpen] = useState(false)
  const dim = dimensions[dimensionKey]
  const grade = getLetterGrade(score)
  const gradeColor = getGradeColor(grade)
  const pct = ((score / 5) * 100)
  const roundedScore = Math.round(score * 10) / 10
  const scoreDesc = dim.scoreDescriptions[Math.round(score)] || dim.scoreDescriptions[Math.max(1, Math.min(5, Math.round(score)))]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-navy-800 border border-gray-700/50 rounded-xl overflow-hidden"
    >
      {/* Header - always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center gap-4 hover:bg-navy-700/50 transition-colors cursor-pointer"
      >
        {/* Grade badge */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-heading font-extrabold text-xl"
          style={{ backgroundColor: `${gradeColor}20`, color: gradeColor }}
        >
          {grade}
        </div>

        {/* Name and bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-white text-sm md:text-base truncate pr-2">{dim.name}</h3>
            <span className="text-sm text-gray-400 flex-shrink-0">{roundedScore}/5</span>
          </div>
          <div className="w-full h-2 bg-navy-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, backgroundColor: gradeColor }}
            />
          </div>
        </div>

        {/* Chevron */}
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-gray-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-gray-700/50 pt-5">
              {/* Your Score */}
              <div>
                <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-2">Your Score</h4>
                <p className="text-gray-300">{roundedScore} out of 5 — {scoreDesc}</p>
              </div>

              {/* Cost */}
              <div>
                <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider mb-2">What This Is Costing You</h4>
                <p className="text-white font-heading font-bold text-lg">{formatCurrency(loss)}/month ({formatCurrency(loss * 12)}/year)</p>
              </div>

              {/* Industry Stat */}
              <div>
                <h4 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Industry Data</h4>
                <p className="text-gray-300 text-sm">{dim.stat}</p>
              </div>

              {/* AI Fix */}
              <div>
                <h4 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">What AI Fixes This</h4>
                <p className="text-gray-300 text-sm">{dim.aiFix}</p>
              </div>

              {/* AI Peak Biz Solution */}
              <div className="bg-teal-400/5 border border-teal-400/20 rounded-lg p-4">
                <h4 className="text-sm font-bold text-teal-400 uppercase tracking-wider mb-2">
                  <a href="https://aipeakbiz.com" target="_blank" rel="noopener noreferrer" className="hover:underline">AI Peak Biz</a> Solution
                </h4>
                <p className="text-gray-300 text-sm">{dim.aiPeakBiz}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
