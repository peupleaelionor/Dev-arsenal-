import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Features } from '@/components/sections/features'
import {
  ArrowRight,
  Zap,
  Code2,
  Package,
  GitBranch,
  Star,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Explore every module included in DevArsenal — auth, billing, AI, teams, admin, analytics, and more.',
}

const highlights = [
  {
    icon: Zap,
    title: 'Turborepo monorepo',
    description:
      'Organized as a Turborepo monorepo with shared packages for UI, auth, billing, and database — keeping code DRY across your apps.',
  },
  {
    icon: Code2,
    title: '100% TypeScript',
    description:
      'Every module is written in strict TypeScript. Enjoy full autocomplete, type safety across package boundaries, and confidence at every refactor.',
  },
  {
    icon: Package,
    title: 'Tree-shakeable packages',
    description:
      'Each feature is a standalone package. Import only what you use. Dead code is eliminated at build time for minimal bundle sizes.',
  },
  {
    icon: GitBranch,
    title: 'Clean architecture',
    description:
      'Server components, server actions, and API routes are logically separated. The codebase is a reference implementation of Next.js best practices.',
  },
]

function HighlightGrid() {
  return (
    <section className="section-py border-b border-white/[0.06]">
      <div className="section-container">
        <div className="text-center mb-14">
          <span className="section-eyebrow mb-4 inline-flex">
            <Star className="h-3 w-3" />
            Architecture
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
            Built for real{' '}
            <span className="gradient-text">production systems.</span>
          </h1>
          <p className="text-dark-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Every module is designed with scalability, maintainability, and developer experience
            in mind. This is what serious SaaS infrastructure looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {highlights.map((h) => {
            const Icon = h.icon
            return (
              <div key={h.title} className="glass rounded-2xl p-5">
                <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{h.title}</h3>
                <p className="text-xs text-dark-400 leading-relaxed">{h.description}</p>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button size="lg" asChild href="/get-started">
            Get DevArsenal
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <HighlightGrid />
        <Features />
      </main>
      <Footer />
    </>
  )
}
