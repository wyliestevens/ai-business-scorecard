import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './components/landing/LandingPage'
import IntakeForm from './components/intake/IntakeForm'
import EvaluationFlow from './components/evaluation/EvaluationFlow'
import ScoreReveal from './components/results/ScoreReveal'
import ResultsDashboard from './components/results/ResultsDashboard'

export default function App() {
  const [businessInfo, setBusinessInfo] = useState({})
  const [answers, setAnswers] = useState({})

  const handleIntakeSubmit = useCallback((info) => {
    setBusinessInfo(info)
  }, [])

  const handleAnswer = useCallback((questionId, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/intake" element={<IntakeForm onSubmit={handleIntakeSubmit} />} />
        <Route
          path="/evaluate"
          element={
            businessInfo.email
              ? <EvaluationFlow answers={answers} onAnswer={handleAnswer} />
              : <Navigate to="/intake" replace />
          }
        />
        <Route
          path="/score"
          element={<ScoreReveal answers={answers} businessInfo={businessInfo} />}
        />
        <Route
          path="/results"
          element={<ResultsDashboard answers={answers} businessInfo={businessInfo} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
