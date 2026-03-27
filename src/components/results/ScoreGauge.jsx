import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getScoreColor } from '../../utils/calculateScore'

export default function ScoreGauge({ score, size = 280 }) {
  const [displayScore, setDisplayScore] = useState(0)
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = radius * Math.PI // semicircle
  const center = size / 2

  useEffect(() => {
    const duration = 2500
    const start = performance.now()
    function animate(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setDisplayScore(Math.round(eased * score))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [score])

  const progress = displayScore / 100
  const dashOffset = circumference * (1 - progress)
  const color = getScoreColor(displayScore)

  return (
    <div className="relative inline-flex flex-col items-center" style={{ width: size, height: size * 0.65 }}>
      <svg width={size} height={size * 0.6} viewBox={`0 0 ${size} ${size * 0.6}`} className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${strokeWidth / 2} ${size * 0.55} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size * 0.55}`}
          fill="none"
          stroke="#1a2332"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Colored arc */}
        <motion.path
          d={`M ${strokeWidth / 2} ${size * 0.55} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size * 0.55}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: size * 0.08 }}>
        <div className="text-center">
          <span className="font-heading font-extrabold text-white" style={{ fontSize: size * 0.25 }}>
            {displayScore}
          </span>
          <span className="font-heading font-bold text-gray-500" style={{ fontSize: size * 0.08 }}>/100</span>
        </div>
      </div>
    </div>
  )
}
