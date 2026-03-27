import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { dimensions, dimensionOrder } from '../../data/dimensions'
import { motion } from 'framer-motion'

export default function RadarChart({ dimensionScores }) {
  const data = dimensionOrder.map((key) => ({
    dimension: dimensions[key].shortName,
    score: dimensionScores[key] || 0,
    fullMark: 5,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full"
      style={{ minHeight: 400 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#243044" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: '#9CA3AF', fontSize: 13, fontFamily: '"DM Sans", sans-serif' }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: '#4B5563', fontSize: 11 }}
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#00D4AA"
            fill="#00D4AA"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </motion.div>
  )
}
