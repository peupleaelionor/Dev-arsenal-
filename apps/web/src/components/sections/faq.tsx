'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs))
}

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Is this a subscription or a one-time purchase?',
    answer:
      'DevArsenal is a one-time purchase. You pay once and own the code forever, including all future updates within your tier. No monthly fees, no per-seat charges, no royalties on revenue.',
  },
  {
    question: 'Can I use DevArsenal for client projects?',
    answer:
      'Yes. The Studio plan includes a commercial license for unlimited client projects. The Starter and Pro plans are licensed for a single product or internal use. See the license page for full details.',
  },
  {
    question: 'What stack does DevArsenal use?',
    answer:
      'Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS, Prisma ORM with PostgreSQL (or Neon/PlanetScale), Stripe, Resend, NextAuth.js v5, and Turborepo for the monorepo. All modern, battle-tested technology.',
  },
  {
    question: 'How hard is it to set up?',
    answer:
      'Most developers are running locally in under 5 minutes. Run `pnpm create devarsenal`, follow the interactive setup wizard (fills in your .env), and hit `pnpm dev`. Detailed docs cover deploying to Vercel, Railway, or any Node host.',
  },
  {
    question: 'Do you offer support?',
    answer:
      'All plans include access to our documentation and community Discord. Pro includes priority email support. Studio includes a dedicated Slack channel with a 24-hour response SLA. Enterprise includes a dedicated success manager.',
  },
  {
    question: 'What if I need a feature that isn\'t included?',
    answer:
      'DevArsenal is designed to be extended. Everything is well-typed TypeScript with clear module boundaries. If you need custom work, Enterprise plans include custom module development hours, or contact us for a quote.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'The Starter tier is completely free — not a trial, just free forever. It includes enough to build and launch a real product. Paid tiers also include a 14-day full refund guarantee if you\'re not satisfied.',
  },
  {
    question: 'Does it work with Vercel / Railway / other hosts?',
    answer:
      'Yes. DevArsenal is a standard Next.js app and deploys anywhere Next.js does: Vercel (recommended), Railway, Render, Fly.io, AWS, or your own VPS. Deployment guides are included for all major providers.',
  },
]

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-white leading-snug pr-4">
          {item.question}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-dark-400 transition-transform duration-200',
            open && 'rotate-180 text-brand-400'
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 border-t border-white/[0.05]">
          <p className="text-sm text-dark-300 leading-relaxed pt-4">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export function FAQ() {
  return (
    <section id="faq" className="section-py">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-eyebrow mb-4 inline-flex">
            <HelpCircle className="h-3 w-3" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Questions, answered.
          </h2>
          <p className="text-lg text-dark-400 max-w-xl mx-auto">
            Still have questions?{' '}
            <a href="/contact" className="text-brand-400 hover:text-brand-300 underline underline-offset-4">
              Reach out to us
            </a>
            .
          </p>
        </div>

        {/* FAQ grid */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, i) => (
            <FAQItem key={item.question} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
