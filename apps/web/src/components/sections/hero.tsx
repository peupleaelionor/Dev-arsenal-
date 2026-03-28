import Link from 'next/link'
import { ArrowRight, Play, Sparkles, GitBranch, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const trustedBy = [
  'Stripe', 'Vercel', 'Linear', 'Figma', 'Railway', 'PlanetScale',
]

const stats = [
  { value: '14+', label: 'Core modules' },
  { value: '< 5min', label: 'Setup time' },
  { value: '100%', label: 'TypeScript' },
  { value: '2024', label: 'Stack' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100" aria-hidden="true" />
      <div className="absolute inset-0 bg-radial-brand" aria-hidden="true" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="section-container relative z-10 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          {/* Eyebrow badge */}
          <div className="animate-fade-in mb-6">
            <span className="section-eyebrow">
              <Sparkles className="h-3 w-3" />
              Production-ready SaaS foundation
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-slide-up text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
            Build premium{' '}
            <span className="gradient-text">SaaS products</span>{' '}
            faster.
          </h1>

          {/* Subheadline */}
          <p className="animate-slide-up text-lg sm:text-xl lg:text-2xl text-dark-300 leading-relaxed max-w-3xl mb-10">
            DevArsenal gives you the core systems every serious product needs: auth, billing,
            dashboards, AI modules, admin tools, analytics, and production-ready architecture.
          </p>

          {/* CTAs */}
          <div className="animate-slide-up flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Button size="xl" asChild href="/get-started">
              Get DevArsenal
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button size="xl" variant="secondary" asChild href="/demo">
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <Play className="h-3 w-3 fill-current ml-0.5" />
                </span>
                View demo
              </span>
            </Button>
          </div>

          {/* Stats bar */}
          <div className="animate-fade-in w-full max-w-2xl mb-16">
            <div className="glass rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-dark-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust bar */}
          <div className="animate-fade-in w-full">
            <p className="text-xs uppercase tracking-widest text-dark-500 mb-6">
              Built with the same stack trusted by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {trustedBy.map((company) => (
                <span
                  key={company}
                  className="text-sm font-semibold text-dark-600 hover:text-dark-400 transition-colors cursor-default tracking-wide"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Code preview card */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="glass rounded-2xl overflow-hidden gradient-border">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-dark-500 font-mono">devarsenal — terminal</span>
              </div>
            </div>
            {/* Terminal body */}
            <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
              <div className="flex gap-3">
                <span className="text-emerald-400 select-none">$</span>
                <span className="text-dark-300">
                  pnpm dlx create-devarsenal my-saas
                </span>
              </div>
              <div className="flex gap-3 mt-1">
                <span className="text-dark-600 select-none">→</span>
                <span className="text-dark-400">Scaffolding monorepo...</span>
              </div>
              <div className="flex gap-3">
                <span className="text-dark-600 select-none">→</span>
                <span className="text-dark-400">
                  Installing{' '}
                  <span className="text-brand-400">14 production modules</span>...
                </span>
              </div>
              <div className="flex gap-3">
                <span className="text-dark-600 select-none">→</span>
                <span className="text-dark-400">
                  Configuring{' '}
                  <span className="text-violet-400">auth</span>,{' '}
                  <span className="text-violet-400">billing</span>,{' '}
                  <span className="text-violet-400">AI</span>...
                </span>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-emerald-400 select-none">✓</span>
                <span className="text-white font-semibold">
                  Ready in <span className="text-emerald-400">4.2s</span>.
                  Run{' '}
                  <span className="text-brand-300">cd my-saas && pnpm dev</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
