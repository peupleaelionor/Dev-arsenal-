import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Pricing } from '@/components/sections/pricing'
import { FAQ } from '@/components/sections/faq'
import { Check, Minus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'One-time purchase. Own the code forever. Choose the DevArsenal tier that fits your product stage.',
}

/* ─── Comparison table ──────────────────────────────────────────────────── */
const comparisonRows: { feature: string; starter: boolean | string; pro: boolean | string; studio: boolean | string; enterprise: boolean | string }[] = [
  { feature: 'Next.js 15 App Router', starter: true, pro: true, studio: true, enterprise: true },
  { feature: 'Authentication (email + OAuth)', starter: true, pro: true, studio: true, enterprise: true },
  { feature: 'Stripe billing', starter: 'Basic', pro: 'Full', studio: 'Full', enterprise: 'Full' },
  { feature: 'Dashboard shell', starter: true, pro: true, studio: true, enterprise: true },
  { feature: 'Email with Resend', starter: true, pro: true, studio: true, enterprise: true },
  { feature: 'Tailwind UI components', starter: true, pro: true, studio: true, enterprise: true },
  { feature: 'Teams & organizations', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'RBAC & permissions', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'AI modules', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'Webhook system', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'API key management', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'Audit logs', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'Advanced analytics', starter: false, pro: true, studio: true, enterprise: true },
  { feature: 'White-label ready', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'SAML SSO', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'i18n & multi-language', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'Admin super panel', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'Changelog & docs site', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'Unlimited projects', starter: false, pro: false, studio: true, enterprise: true },
  { feature: 'Custom SLA', starter: false, pro: false, studio: false, enterprise: true },
  { feature: 'Architecture consulting', starter: false, pro: false, studio: false, enterprise: true },
  { feature: 'Custom module development', starter: false, pro: false, studio: false, enterprise: true },
]

type CellValue = boolean | string

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <Check className="h-4 w-4 text-emerald-400 mx-auto" />
  if (value === false) return <Minus className="h-4 w-4 text-dark-700 mx-auto" />
  return <span className="text-xs text-brand-400 font-medium">{value}</span>
}

function ComparisonTable() {
  return (
    <section className="section-py border-t border-white/[0.06]">
      <div className="section-container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
          Full feature comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr>
                <th className="text-left pb-4 text-dark-400 font-medium w-1/3">Feature</th>
                {['Starter', 'Pro', 'Studio', 'Enterprise'].map((tier) => (
                  <th key={tier} className="text-center pb-4 text-white font-semibold">
                    {tier}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? 'bg-white/[0.015]' : ''}
                >
                  <td className="py-3 pl-2 text-dark-300 rounded-l-lg">{row.feature}</td>
                  <td className="py-3 text-center"><Cell value={row.starter} /></td>
                  <td className="py-3 text-center"><Cell value={row.pro} /></td>
                  <td className="py-3 text-center"><Cell value={row.studio} /></td>
                  <td className="py-3 text-center rounded-r-lg"><Cell value={row.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Pricing />
        <ComparisonTable />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
