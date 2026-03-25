import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Pricing } from '@/components/sections/pricing'
import { FAQ } from '@/components/sections/faq'
import Link from 'next/link'
import {
  Clock,
  Wrench,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  TerminalSquare,
  Rocket,
  Building2,
  Cpu,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ─── Problem section ───────────────────────────────────────────────────── */
function Problem() {
  const pains = [
    {
      icon: Clock,
      title: '3–6 months wasted',
      description:
        'The average developer spends months re-building the same infrastructure: auth, billing, email, admin — before writing a single line of product logic.',
    },
    {
      icon: Wrench,
      title: 'Duct tape architecture',
      description:
        'Stitching together tutorials, Stack Overflow answers, and outdated boilerplates leads to technical debt before you\'ve even launched.',
    },
    {
      icon: TrendingUp,
      title: 'Premature scaling problems',
      description:
        'Poorly planned foundations crumble under real traffic. Teams pivot from building features to fighting fires they didn\'t need to start.',
    },
  ]

  return (
    <section className="section-py border-y border-white/[0.04]">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Most SaaS projects die in{' '}
            <span className="text-red-400">infrastructure hell.</span>
          </h2>
          <p className="text-dark-400 leading-relaxed">
            Not from bad ideas — from spending all their energy re-implementing the same
            plumbing every single time.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((pain) => {
            const Icon = pain.icon
            return (
              <div
                key={pain.title}
                className="glass rounded-2xl p-6 border-red-500/10 hover:border-red-500/20 transition-colors"
              >
                <div className="h-10 w-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white mb-2">{pain.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{pain.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Solution section ──────────────────────────────────────────────────── */
function Solution() {
  const wins = [
    'Auth system in minutes, not weeks',
    'Billing flows that actually convert',
    'Dashboard UI your users will love',
    'AI chat, Q&A, and generation built in',
    'Audit logs and compliance tooling',
    'Admin panel for your ops team',
  ]

  return (
    <section className="section-py">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="section-eyebrow mb-4 inline-flex">
              <Rocket className="h-3 w-3" />
              The DevArsenal difference
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Skip the foundation.{' '}
              <span className="gradient-text">Ship the product.</span>
            </h2>
            <p className="text-dark-300 text-lg leading-relaxed mb-8">
              DevArsenal is a complete, production-tested codebase — not a tutorial or a starter
              template with missing pieces. Everything is wired together, typed, and ready to deploy.
            </p>
            <ul className="space-y-3">
              {wins.map((win) => (
                <li key={win} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                  <span className="text-dark-200 text-sm">{win}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="glass rounded-2xl p-1 gradient-border">
              <div className="bg-dark-900/50 rounded-xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-dark-500 font-mono ml-2">project structure</span>
                </div>
                <div className="p-5 font-mono text-xs leading-7 text-dark-400">
                  <div className="text-dark-300">devarsenal/</div>
                  <div className="ml-4">├── <span className="text-brand-400">apps/</span></div>
                  <div className="ml-8">├── web <span className="text-dark-600"># marketing</span></div>
                  <div className="ml-8">└── dashboard <span className="text-dark-600"># app</span></div>
                  <div className="ml-4">├── <span className="text-violet-400">packages/</span></div>
                  <div className="ml-8">├── ui <span className="text-dark-600"># components</span></div>
                  <div className="ml-8">├── db <span className="text-dark-600"># prisma</span></div>
                  <div className="ml-8">├── auth <span className="text-dark-600"># auth logic</span></div>
                  <div className="ml-8">└── billing <span className="text-dark-600"># stripe</span></div>
                  <div className="ml-4">├── <span className="text-emerald-400">features/</span></div>
                  <div className="ml-8">├── ai <span className="text-dark-600"># AI modules</span></div>
                  <div className="ml-8">├── teams <span className="text-dark-600"># orgs</span></div>
                  <div className="ml-8">└── analytics <span className="text-dark-600"># tracking</span></div>
                  <div className="ml-4 text-dark-500">└── turbo.json</div>
                </div>
              </div>
            </div>
            {/* Glow behind card */}
            <div
              className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-brand-500/20 rounded-3xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Use cases section ─────────────────────────────────────────────────── */
function UseCases() {
  const cases = [
    {
      icon: TerminalSquare,
      title: 'Developer Tools',
      description:
        'API-first products, CLI tools with dashboards, code review platforms, CI/CD tools — DevArsenal\'s API key system and developer-facing UI patterns are purpose-built for this.',
    },
    {
      icon: Building2,
      title: 'B2B SaaS',
      description:
        'Multi-tenant with orgs, RBAC, SSO, audit logs, and Stripe seat billing. The entire team and organization module is included and ready to go.',
    },
    {
      icon: Cpu,
      title: 'AI Products',
      description:
        'Pre-built AI chat UI, streaming responses, token usage tracking, and model selection. Build on top of OpenAI, Anthropic, or your own inference endpoint.',
    },
    {
      icon: Rocket,
      title: 'Indie Launches',
      description:
        'Validate fast. The Starter tier is free and gives you a complete app shell with auth and billing — so you can focus on the one thing that makes your product unique.',
    },
  ]

  return (
    <section className="section-py border-t border-white/[0.04]">
      <div className="section-container">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Built for how{' '}
            <span className="gradient-text">real products work.</span>
          </h2>
          <p className="text-dark-400 max-w-xl mx-auto">
            DevArsenal isn't a generic starter — it's opinionated around the patterns
            that make modern SaaS products successful.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cases.map((uc) => {
            const Icon = uc.icon
            return (
              <div
                key={uc.title}
                className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-white/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-9 w-9 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-semibold text-white">{uc.title}</h3>
                </div>
                <p className="text-sm text-dark-400 leading-relaxed">{uc.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Final CTA section ─────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="section-py">
      <div className="section-container">
        <div className="relative glass rounded-3xl p-12 text-center overflow-hidden gradient-border">
          {/* Background glow */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-violet-500/5 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-500/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <span className="section-eyebrow mb-4 inline-flex">
              <Rocket className="h-3 w-3" />
              Start building today
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Your SaaS deserves a{' '}
              <span className="gradient-text">serious foundation.</span>
            </h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop rebuilding auth and billing from scratch. Ship what matters.
              DevArsenal gives you weeks of foundational work, ready in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild href="/get-started">
                Get DevArsenal
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button size="xl" variant="secondary" asChild href="/pricing">
                View pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <UseCases />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
