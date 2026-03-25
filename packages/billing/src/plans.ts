export type PlanTier = 'starter' | 'pro' | 'studio' | 'enterprise'

export interface PlanDefinition {
  id: PlanTier
  name: string
  description: string
  price: number
  currency: string
  interval: 'monthly' | 'yearly'
  stripePriceId: string
  features: string[]
  limits: {
    projects: number
    members: number
    apiCallsPerMonth: number
    storageGB: number
  }
  highlighted?: boolean
}

export const PLANS: Record<PlanTier, PlanDefinition> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for solo developers and small projects',
    price: 2900,
    currency: 'usd',
    interval: 'monthly',
    stripePriceId: process.env.STRIPE_PRICE_STARTER ?? 'price_starter',
    features: [
      '3 projects',
      '2 team members',
      '10,000 API calls/month',
      '5 GB storage',
      'Email support',
      'API access',
    ],
    limits: { projects: 3, members: 2, apiCallsPerMonth: 10000, storageGB: 5 },
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams building serious products',
    price: 7900,
    currency: 'usd',
    interval: 'monthly',
    stripePriceId: process.env.STRIPE_PRICE_PRO ?? 'price_pro',
    highlighted: true,
    features: [
      'Unlimited projects',
      '10 team members',
      '100,000 API calls/month',
      '50 GB storage',
      'Priority support',
      'Advanced analytics',
      'Custom domains',
      'SSO (SAML)',
    ],
    limits: { projects: -1, members: 10, apiCallsPerMonth: 100000, storageGB: 50 },
  },
  studio: {
    id: 'studio',
    name: 'Studio',
    description: 'For agencies and power users',
    price: 14900,
    currency: 'usd',
    interval: 'monthly',
    stripePriceId: process.env.STRIPE_PRICE_STUDIO ?? 'price_studio',
    features: [
      'Unlimited projects',
      'Unlimited team members',
      '1,000,000 API calls/month',
      '500 GB storage',
      'Dedicated support',
      'SLA guarantee',
      'White-labeling',
      'Custom integrations',
      'Advanced audit logs',
    ],
    limits: { projects: -1, members: -1, apiCallsPerMonth: 1000000, storageGB: 500 },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 0,
    currency: 'usd',
    interval: 'monthly',
    stripePriceId: process.env.STRIPE_PRICE_ENTERPRISE ?? 'price_enterprise',
    features: [
      'Everything in Studio',
      'Custom contract',
      'On-premise deployment',
      'Custom SLA',
      'Dedicated account manager',
      'Security audit',
    ],
    limits: { projects: -1, members: -1, apiCallsPerMonth: -1, storageGB: -1 },
  },
}
