import Link from 'next/link'
import { Check, Minus, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PricingTier {
  name: string
  price: number | 'Custom'
  period?: string
  description: string
  badge?: string
  highlighted?: boolean
  cta: string
  ctaHref: string
  features: string[]
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    price: 0,
    description: 'Everything you need to validate your idea fast.',
    cta: 'Start free',
    ctaHref: '/get-started?plan=starter',
    features: [
      'Next.js 15 App Router base',
      'Authentication (email + OAuth)',
      'Basic Stripe billing',
      'Prisma + PostgreSQL',
      'Email with Resend',
      'Tailwind UI components',
      'Dashboard shell',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: 149,
    description: 'The full arsenal for products that need to scale.',
    badge: 'Most popular',
    highlighted: true,
    cta: 'Get Pro',
    ctaHref: '/get-started?plan=pro',
    features: [
      'Everything in Starter',
      'Teams & organizations',
      'RBAC & permissions',
      'AI modules (chat, Q&A, generation)',
      'Webhook system',
      'API key management',
      'Advanced analytics',
      'Audit logs',
      'Priority email support',
    ],
  },
  {
    name: 'Studio',
    price: 299,
    description: 'Maximum firepower for agencies and power builders.',
    cta: 'Get Studio',
    ctaHref: '/get-started?plan=studio',
    features: [
      'Everything in Pro',
      'Unlimited projects',
      'White-label ready',
      'SAML SSO',
      'i18n & multi-language',
      'Custom domain support',
      'Admin super panel',
      'Changelog & docs site',
      'Dedicated Slack channel',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Custom contracts, SLAs, and hands-on onboarding.',
    cta: 'Contact us',
    ctaHref: '/contact?plan=enterprise',
    features: [
      'Everything in Studio',
      'Custom SLA',
      'Security review',
      'Architecture consulting',
      'Custom module development',
      'Annual billing discount',
      'Dedicated success manager',
      'On-site onboarding',
    ],
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="section-py relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-eyebrow mb-4 inline-flex">
            <Zap className="h-3 w-3" fill="currentColor" />
            Simple pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Pay once.{' '}
            <span className="gradient-text">Own it forever.</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            No subscriptions. No royalties. One-time purchase gets you lifetime access to the
            codebase plus future updates in your tier.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={[
                'relative rounded-2xl p-6 flex flex-col',
                tier.highlighted
                  ? 'bg-brand-500/10 border border-brand-500/40 shadow-[0_0_60px_rgba(51,102,255,0.2)]'
                  : 'glass',
              ].join(' ')}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="brand" className="shadow-lg shadow-brand-500/20">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-dark-400 leading-relaxed mb-4">{tier.description}</p>
                <div className="flex items-end gap-1">
                  {tier.price === 'Custom' ? (
                    <span className="text-3xl font-bold text-white">Custom</span>
                  ) : (
                    <>
                      <span className="text-sm text-dark-400 mb-2">$</span>
                      <span className="text-4xl font-bold text-white leading-none">
                        {tier.price}
                      </span>
                      <span className="text-sm text-dark-400 mb-1.5">one-time</span>
                    </>
                  )}
                </div>
              </div>

              <Button
                variant={tier.highlighted ? 'primary' : 'secondary'}
                fullWidth
                asChild
                href={tier.ctaHref}
                className="mb-6"
              >
                {tier.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>

              <ul className="space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                    <span className="text-sm text-dark-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Money-back */}
        <p className="mt-10 text-center text-sm text-dark-500">
          All plans include a{' '}
          <span className="text-white">14-day refund guarantee</span>. No questions asked.
        </p>
      </div>
    </section>
  )
}
