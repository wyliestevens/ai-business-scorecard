import jsPDF from 'jspdf'
import { dimensions, dimensionOrder } from '../../data/dimensions'
import { getLetterGrade } from '../../utils/calculateScore'
import { formatCurrency } from '../../utils/formatCurrency'

export async function generatePDF({ businessInfo, scoring }) {
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let y = 20

  // Helper functions
  const addText = (text, x, yPos, { size = 10, color = [200, 200, 200], font = 'helvetica', style = 'normal', maxWidth = contentWidth } = {}) => {
    pdf.setFont(font, style)
    pdf.setFontSize(size)
    pdf.setTextColor(...color)
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, yPos)
    return lines.length * size * 0.4
  }

  // Background
  pdf.setFillColor(10, 15, 28)
  pdf.rect(0, 0, 210, 297, 'F')

  // Header
  addText('AI BUSINESS SCORECARD', margin, y, { size: 24, color: [0, 212, 170], style: 'bold' })
  y += 12
  addText(`Prepared for ${businessInfo.business_name}`, margin, y, { size: 12, color: [255, 255, 255] })
  y += 6
  addText(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), margin, y, { size: 9, color: [150, 150, 150] })
  y += 12

  // Divider
  pdf.setDrawColor(0, 212, 170)
  pdf.setLineWidth(0.5)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 10

  // Overall Score
  addText('OVERALL SCORE', margin, y, { size: 14, color: [0, 212, 170], style: 'bold' })
  y += 10
  addText(`${scoring.overallScore}/100 — ${scoring.maturity.level}`, margin, y, { size: 20, color: [255, 255, 255], style: 'bold' })
  y += 10
  const descHeight = addText(scoring.maturity.description, margin, y, { size: 10, color: [180, 180, 180] })
  y += descHeight + 10

  // Revenue Impact
  addText('ESTIMATED REVENUE IMPACT', margin, y, { size: 14, color: [239, 68, 68], style: 'bold' })
  y += 10
  addText(`${formatCurrency(scoring.revenueLoss.totalMonthly)}/month (${formatCurrency(scoring.revenueLoss.totalAnnual)}/year)`, margin, y, { size: 16, color: [255, 255, 255], style: 'bold' })
  y += 12

  // Dimension Breakdown
  addText('CATEGORY BREAKDOWN', margin, y, { size: 14, color: [0, 212, 170], style: 'bold' })
  y += 10

  for (const key of dimensionOrder) {
    if (y > 250) {
      pdf.addPage()
      pdf.setFillColor(10, 15, 28)
      pdf.rect(0, 0, 210, 297, 'F')
      y = 20
    }

    const dim = dimensions[key]
    const score = scoring.dimensionScores[key]
    const grade = getLetterGrade(score)
    const loss = scoring.revenueLoss.byDimension[key]
    const roundedScore = Math.round(score * 10) / 10

    addText(`${dim.name}`, margin, y, { size: 11, color: [255, 255, 255], style: 'bold' })
    addText(`Grade: ${grade} | Score: ${roundedScore}/5 | Cost: ${formatCurrency(loss)}/mo`, margin + contentWidth * 0.01, y + 5, { size: 9, color: [180, 180, 180] })
    y += 12

    const statHeight = addText(dim.stat, margin + 5, y, { size: 8, color: [150, 150, 150], maxWidth: contentWidth - 10 })
    y += statHeight + 4
    const fixHeight = addText(`AI Solution: ${dim.aiFix}`, margin + 5, y, { size: 8, color: [150, 180, 200], maxWidth: contentWidth - 10 })
    y += fixHeight + 8
  }

  // Recommendation
  if (y > 230) {
    pdf.addPage()
    pdf.setFillColor(10, 15, 28)
    pdf.rect(0, 0, 210, 297, 'F')
    y = 20
  }

  addText('RECOMMENDED SYSTEM', margin, y, { size: 14, color: [0, 212, 170], style: 'bold' })
  y += 10
  addText(scoring.recommendation.name, margin, y, { size: 16, color: [255, 255, 255], style: 'bold' })
  y += 8
  const reasonHeight = addText(scoring.recommendation.reasoning, margin, y, { size: 10, color: [180, 180, 180] })
  y += reasonHeight + 15

  // Footer
  pdf.setDrawColor(0, 212, 170)
  pdf.line(margin, y, pageWidth - margin, y)
  y += 8
  addText('AI Peak Biz | aipeakbiz.com', margin, y, { size: 10, color: [0, 212, 170] })
  y += 5
  addText('928.628.6080 | wylie@aipeakbiz.com | Kingman, Arizona', margin, y, { size: 8, color: [150, 150, 150] })

  pdf.save(`AI-Business-Scorecard-${businessInfo.business_name.replace(/\s+/g, '-')}.pdf`)
}
