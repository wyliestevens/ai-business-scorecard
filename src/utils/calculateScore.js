import { dimensions, dimensionOrder } from '../data/dimensions'
import { revenueLossTable, revenueScaleFactors } from '../data/revenueMultipliers'

export function calculateDimensionScores(answers) {
  const scores = {}
  for (const key of dimensionOrder) {
    const dim = dimensions[key]
    const qScores = dim.questionIds.map((qid) => answers[qid] || 0).filter((s) => s > 0)
    scores[key] = qScores.length > 0 ? qScores.reduce((a, b) => a + b, 0) / qScores.length : 0
  }
  return scores
}

export function calculateOverallScore(dimensionScores) {
  let weightedSum = 0
  for (const key of dimensionOrder) {
    weightedSum += (dimensionScores[key] || 0) * dimensions[key].weight
  }
  const normalized = ((weightedSum - 1) / 4) * 100
  return Math.round(Math.max(0, Math.min(100, normalized)))
}

export function getLetterGrade(score) {
  if (score >= 4.5) return 'A'
  if (score >= 3.5) return 'B'
  if (score >= 2.5) return 'C'
  if (score >= 1.5) return 'D'
  return 'F'
}

export function getGradeColor(grade) {
  const colors = { A: '#22c55e', B: '#84cc16', C: '#eab308', D: '#f97316', F: '#ef4444' }
  return colors[grade] || '#6b7280'
}

export function getMaturityLevel(score) {
  if (score <= 20) return { level: 'Manual Mode', description: 'Your business runs on phone calls, paper, and personal memory. You are leaving significant revenue on the table.' }
  if (score <= 40) return { level: 'Basic Digital', description: 'You use some digital tools, but they are disconnected. Major gaps exist in your customer experience and lead capture.' }
  if (score <= 60) return { level: 'Semi-Automated', description: 'Some automation is in place, but critical systems are still manual. There is room for substantial improvement.' }
  if (score <= 80) return { level: 'AI-Enhanced', description: 'AI is supporting parts of your business. Optimizing and connecting your systems will drive the next level of growth.' }
  return { level: 'AI-Optimized', description: 'Your business runs on AI across most functions. Focus on refinement and advanced strategies.' }
}

export function getBenchmark(score) {
  if (score < 40) return 'Your business is in the bottom 30% of service businesses we have evaluated.'
  if (score <= 60) return 'Your business is in the middle 40% of service businesses we have evaluated.'
  return 'Your business is in the top 30% of service businesses we have evaluated.'
}

export function calculateRevenueLoss(dimensionScores, monthlyRevenue) {
  const scaleFactor = revenueScaleFactors[monthlyRevenue] || 1.0
  const losses = {}
  let totalMonthly = 0

  for (const key of dimensionOrder) {
    const score = dimensionScores[key] || 0
    const table = revenueLossTable[key]
    let loss = 0
    for (const bracket of table) {
      if (score >= bracket.min && score < bracket.max) {
        loss = bracket.loss
        break
      }
      if (score === 5.0 && bracket.max === 5.0) {
        loss = bracket.loss
        break
      }
    }
    losses[key] = Math.round(loss * scaleFactor)
    totalMonthly += losses[key]
  }

  return {
    byDimension: losses,
    totalMonthly,
    totalAnnual: totalMonthly * 12,
  }
}

export function getLowestDimensions(dimensionScores) {
  const sorted = dimensionOrder
    .map((key) => ({ key, score: dimensionScores[key] || 0 }))
    .sort((a, b) => a.score - b.score)
  return { lowest: sorted[0]?.key, secondLowest: sorted[1]?.key }
}

export function getScoreColor(score) {
  if (score <= 20) return '#ef4444'
  if (score <= 40) return '#f97316'
  if (score <= 60) return '#eab308'
  if (score <= 80) return '#84cc16'
  return '#22c55e'
}
