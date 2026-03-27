// Monthly revenue loss by dimension and score range
export const revenueLossTable = {
  communication: [
    { min: 1.0, max: 1.5, loss: 3000 },
    { min: 1.5, max: 2.5, loss: 2000 },
    { min: 2.5, max: 3.5, loss: 1000 },
    { min: 3.5, max: 4.5, loss: 400 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
  marketing: [
    { min: 1.0, max: 1.5, loss: 2500 },
    { min: 1.5, max: 2.5, loss: 1800 },
    { min: 2.5, max: 3.5, loss: 900 },
    { min: 3.5, max: 4.5, loss: 300 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
  reputation: [
    { min: 1.0, max: 1.5, loss: 2000 },
    { min: 1.5, max: 2.5, loss: 1200 },
    { min: 2.5, max: 3.5, loss: 600 },
    { min: 3.5, max: 4.5, loss: 200 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
  operations: [
    { min: 1.0, max: 1.5, loss: 2500 },
    { min: 1.5, max: 2.5, loss: 1500 },
    { min: 2.5, max: 3.5, loss: 700 },
    { min: 3.5, max: 4.5, loss: 250 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
  financial: [
    { min: 1.0, max: 1.5, loss: 1500 },
    { min: 1.5, max: 2.5, loss: 900 },
    { min: 2.5, max: 3.5, loss: 400 },
    { min: 3.5, max: 4.5, loss: 150 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
  technology: [
    { min: 1.0, max: 1.5, loss: 1000 },
    { min: 1.5, max: 2.5, loss: 600 },
    { min: 2.5, max: 3.5, loss: 300 },
    { min: 3.5, max: 4.5, loss: 100 },
    { min: 4.5, max: 5.0, loss: 0 },
  ],
}

// Scale factor based on monthly revenue bracket
export const revenueScaleFactors = {
  'Under $10,000': 0.5,
  '$10,000 to $25,000': 0.75,
  '$25,000 to $50,000': 1.0,
  '$50,000 to $100,000': 1.25,
  '$100,000 to $250,000': 1.5,
  '$250,000+': 2.0,
}
