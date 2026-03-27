import { motion } from 'framer-motion'

export default function ProgressBar({ current, total }) {
  const pct = ((current) / total) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400 font-medium">Question {current} of {total}</span>
        <span className="text-sm text-teal-400 font-medium">{Math.round(pct)}%</span>
      </div>
      <div className="w-full h-2 bg-navy-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
