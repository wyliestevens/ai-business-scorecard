import { useMemo } from 'react'
import {
  calculateDimensionScores,
  calculateOverallScore,
  calculateRevenueLoss,
  getMaturityLevel,
  getBenchmark,
  getLowestDimensions,
} from '../utils/calculateScore'
import { getRecommendedTier } from '../data/tierRecommendations'

export function useScoring(answers, monthlyRevenue) {
  return useMemo(() => {
    const dimensionScores = calculateDimensionScores(answers)
    const overallScore = calculateOverallScore(dimensionScores)
    const revenueLoss = calculateRevenueLoss(dimensionScores, monthlyRevenue)
    const maturity = getMaturityLevel(overallScore)
    const benchmark = getBenchmark(overallScore)
    const { lowest, secondLowest } = getLowestDimensions(dimensionScores)
    const recommendation = getRecommendedTier(overallScore)

    return {
      dimensionScores,
      overallScore,
      revenueLoss,
      maturity,
      benchmark,
      lowestDimension: lowest,
      secondLowestDimension: secondLowest,
      recommendation,
    }
  }, [answers, monthlyRevenue])
}
