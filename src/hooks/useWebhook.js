const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL

export function sendResultsWebhook(data) {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes('WEBHOOK_ID_HERE')) return
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...data,
      source: 'ai-business-scorecard-results',
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {})
}
