import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { questions } from '../../data/questions'
import ProgressBar from './ProgressBar'
import QuestionCard from './QuestionCard'
import Button from '../shared/Button'
import Logo from '../shared/Logo'

export default function EvaluationFlow({ answers, onAnswer }) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const question = questions[currentIndex]

  const goNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setDirection(1)
      setCurrentIndex((i) => i + 1)
    } else {
      navigate('/score')
    }
  }, [currentIndex, navigate])

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex((i) => i - 1)
    }
  }, [currentIndex])

  function handleSelect(questionId, score) {
    onAnswer(questionId, score)
    // Auto-advance after a brief delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setDirection(1)
        setCurrentIndex((i) => i + 1)
      } else {
        navigate('/score')
      }
    }, 300)
  }

  return (
    <div className="min-h-screen bg-navy-900 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Logo />
        </div>

        <ProgressBar current={currentIndex + 1} total={questions.length} />

        <div className="min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <QuestionCard
              key={question.id}
              question={question}
              selectedScore={answers[question.id]}
              onSelect={handleSelect}
              direction={direction}
            />
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={goBack}
            className={currentIndex === 0 ? 'invisible' : ''}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </Button>

          {answers[question.id] && (
            <Button variant="secondary" size="sm" onClick={goNext}>
              {currentIndex === questions.length - 1 ? 'See My Score' : 'Next'}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
