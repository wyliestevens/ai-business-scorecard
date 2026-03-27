export const tiers = {
  growth: {
    name: 'Growth System',
    buildCost: 7997,
    monthlyCost: 1497,
    includes: [
      'AI Voice Assistant (answers every call 24/7)',
      'AI Website Chatbot (engages visitors instantly)',
      'Reputation Management Engine (automated review growth)',
      'Automated Scheduling & No-Show Recovery',
      'Full CRM with lead pipeline & communication tracking',
      'Automated follow-up sequences (email + SMS)',
      'Real-time analytics dashboard',
      'Dedicated onboarding & training',
    ],
  },
  essentials: {
    name: 'Essentials System',
    buildCost: 4997,
    monthlyCost: 997,
    includes: [
      'Choose 2 core AI tools (Voice, Chatbot, or Reputation)',
      'Automated Scheduling with reminders',
      'Full CRM with lead pipeline',
      'Basic follow-up sequences',
      'Analytics dashboard',
      'Onboarding & training',
    ],
  },
}

export function getRecommendedTier(overallScore) {
  if (overallScore >= 86) {
    return {
      tier: null,
      name: 'AI-Optimized',
      reasoning: 'Your business is highly optimized. If you want to explore advanced AI strategies or a second opinion on your systems, book a strategy call.',
    }
  }
  if (overallScore >= 56) {
    return {
      tier: tiers.essentials,
      name: 'Essentials System',
      reasoning: overallScore >= 71
        ? 'You are ahead of most businesses. Target your weakest area with the Essentials System to close the remaining gap and maximize ROI.'
        : 'Your business has a solid foundation. The Essentials System lets you choose the two areas where AI will make the biggest immediate impact, without overhauling what is already working.',
    }
  }
  return {
    tier: tiers.growth,
    name: 'Growth System',
    reasoning: overallScore >= 36
      ? 'You have some systems in place but critical gaps remain. The Growth System fills every hole with AI voice, chatbot, reputation management, and automated scheduling working together.'
      : 'Your business has significant gaps across multiple areas. The Growth System addresses all three core revenue drains at once — missed calls, no-shows, and weak reviews — as one integrated system. Tackling these individually will take longer and cost more.',
  }
}
