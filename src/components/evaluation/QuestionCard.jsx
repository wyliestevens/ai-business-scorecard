import { motion } from 'framer-motion'

export default function QuestionCard({ question, selectedScore, onSelect, direction }) {
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  }

  return (
    <motion.div
      key={question.id}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full"
    >
      <h2 className="font-heading font-bold text-xl md:text-2xl text-white mb-8 leading-relaxed">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedScore === option.score
          const letter = String.fromCharCode(65 + i)

          return (
            <motion.button
              key={option.score}
              onClick={() => onSelect(question.id, option.score)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-teal-400/10 border-teal-400 text-white'
                  : 'bg-navy-800 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-navy-700'
              }`}
            >
              <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                isSelected ? 'bg-teal-400 text-navy-900' : 'bg-navy-700 text-gray-400'
              }`}>
                {letter}
              </span>
              <span className="text-sm md:text-base leading-relaxed pt-0.5">{option.label}</span>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
