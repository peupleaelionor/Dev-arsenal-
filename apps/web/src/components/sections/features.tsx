import {
  ShieldCheck,
  CreditCard,
  LayoutDashboard,
  Bot,
  BarChart3,
  Users,
  Bell,
  Key,
  FileText,
  Globe,
  Webhook,
  Layers,
  Mail,
  Lock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Feature {
  icon: React.ElementType
  title: string
  description: string
  badge?: string
  badgeVariant?: 'brand' | 'success' | 'warning'
}

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: 'Authentication & SSO',
    description:
      'Email/password, magic links, OAuth (Google, GitHub, Slack), SAML SSO, and 2FA out of the box. Powered by your choice of provider.',
    badge: 'Included',
    badgeVariant: 'success',
  },
  {
    icon: CreditCard,
    title: 'Billing & Subscriptions',
    description:
      'Stripe integration with plans, usage-based billing, seat licensing, trial periods, upgrade flows, and customer portal.',
    badge: 'Included',
    badgeVariant: 'success',
  },
  {
    icon: LayoutDashboard,
    title: 'Dashboard & Admin',
    description:
      'Production-ready dashboard shell with sidebar, command palette, notifications, user settings, and a full admin panel.',
    badge: 'Included',
    badgeVariant: 'success',
  },
  {
    icon: Bot,
    title: 'AI Modules',
    description:
      'Pre-built AI chat, document Q&A, content generation, and streaming response UI. Works with OpenAI, Anthropic, or any provider.',
    badge: 'New',
    badgeVariant: 'brand',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Metrics',
    description:
      'PostHog integration for product analytics, feature flags, session recording, A/B testing, and custom event tracking.',
  },
  {
    icon: Users,
    title: 'Teams & Organizations',
    description:
      'Multi-tenant architecture with org invites, role-based access control (RBAC), member management, and audit logs.',
    badge: 'Pro+',
    badgeVariant: 'warning',
  },
  {
    icon: Mail,
    title: 'Transactional Email',
    description:
      'Beautiful email templates with Resend. Welcome emails, password reset, billing receipts, invite flows, and digest notifications.',
  },
  {
    icon: Webhook,
    title: 'Webhooks & Events',
    description:
      'Outbound webhook system with delivery logs, retries, and signature verification. Svix-powered or self-hosted.',
    badge: 'Pro+',
    badgeVariant: 'warning',
  },
  {
    icon: Key,
    title: 'API Key Management',
    description:
      'Create, revoke, and scope API keys with rate limiting and per-key analytics. Perfect for developer-facing products.',
  },
  {
    icon: FileText,
    title: 'Docs & Changelog',
    description:
      'MDX-powered documentation site and public changelog. Ship transparent, polished developer docs from day one.',
  },
  {
    icon: Globe,
    title: 'Internationalization',
    description:
      'First-class i18n support with next-intl. Add any language in minutes with structured locale files and locale detection.',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description:
      'CSP headers, rate limiting, input sanitization, audit logging, and GDPR-ready data export/deletion tooling.',
  },
]

export function Features() {
  return (
    <section id="features" className="section-py relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="section-eyebrow mb-4 inline-flex">
            <Layers className="h-3 w-3" />
            Everything included
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Every system your product{' '}
            <span className="gradient-text">actually needs.</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto leading-relaxed">
            Stop building infrastructure. DevArsenal ships with 14 production-grade modules
            pre-integrated, tested, and ready to customize.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="glass rounded-2xl p-5 group hover:-translate-y-1 hover:border-white/15 transition-all duration-300 hover:shadow-[0_0_40px_rgba(51,102,255,0.08)]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 group-hover:bg-brand-500/20 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  {feature.badge && (
                    <Badge variant={feature.badgeVariant ?? 'default'}>
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{feature.title}</h3>
                <p className="text-xs text-dark-400 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 glass rounded-2xl p-8 text-center gradient-border">
          <p className="text-dark-300 text-base">
            All modules are{' '}
            <span className="text-white font-semibold">fully typed with TypeScript</span>,
            {' '}follow{' '}
            <span className="text-white font-semibold">Next.js App Router</span>{' '}
            conventions, and are designed to be{' '}
            <span className="text-white font-semibold">ejected and customized</span> freely.
          </p>
        </div>
      </div>
    </section>
  )
}
