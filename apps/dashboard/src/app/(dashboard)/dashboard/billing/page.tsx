import type { Metadata } from 'next'
import { ExternalLink, ArrowUpRight, Zap, HardDrive, Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Billing' }

const invoices = [
  { id: 'INV-2024-003', date: 'Jan 1, 2025', amount: '$79.00', status: 'Paid', statusColor: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
  { id: 'INV-2024-002', date: 'Dec 1, 2024', amount: '$79.00', status: 'Paid', statusColor: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
  { id: 'INV-2024-001', date: 'Nov 1, 2024', amount: '$29.00', status: 'Paid', statusColor: 'text-emerald-400 bg-emerald-950 border-emerald-800' },
]

const usageMetrics = [
  { label: 'API Calls', used: 45200, limit: 100000, icon: <Zap className="h-4 w-4 text-sky-400" /> },
  { label: 'Storage', used: 12.4, limit: 50, unit: 'GB', icon: <HardDrive className="h-4 w-4 text-violet-400" /> },
  { label: 'Team Members', used: 4, limit: 10, icon: <Users className="h-4 w-4 text-emerald-400" /> },
]

function UsageMeter({ label, used, limit, unit, icon }: { label: string; used: number; limit: number; unit?: string; icon: React.ReactNode }) {
  const pct = Math.min((used / limit) * 100, 100)
  const color = pct > 90 ? 'bg-red-500' : pct > 70 ? 'bg-yellow-500' : 'bg-indigo-500'
  const formatted = unit ? `${used} ${unit} / ${limit} ${unit}` : `${used.toLocaleString()} / ${limit.toLocaleString()}`

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium text-gray-300">{label}</span>
        </div>
        <span className="text-xs text-gray-500">{formatted}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export default function BillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Billing</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your subscription and billing information.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Plan */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-indigo-800 bg-gradient-to-br from-indigo-950/50 to-gray-900 p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Current Plan</p>
                <p className="mt-1 text-3xl font-bold text-gray-100">Pro</p>
              </div>
              <span className="rounded-full border border-emerald-800 bg-emerald-950 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
                Active
              </span>
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-100">
              $79<span className="text-base font-normal text-gray-400">/mo</span>
            </p>
            <p className="mb-6 text-sm text-gray-500">Next billing: February 1, 2025</p>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
              <ArrowUpRight className="h-4 w-4" />
              Upgrade Plan
            </button>
            <button className="mt-2 w-full rounded-lg px-4 py-2 text-sm text-gray-500 transition-colors hover:text-gray-300">
              Manage in Stripe →
            </button>
          </div>
        </div>

        {/* Usage */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-5 text-base font-semibold text-gray-100">Usage This Month</h2>
            <div className="space-y-5">
              {usageMetrics.map((m) => (
                <UsageMeter key={m.label} {...m} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Invoices */}
      <div className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-100">Invoice History</h2>
        </div>
        <div className="divide-y divide-gray-800">
          {invoices.map((inv) => (
            <div key={inv.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-200">{inv.id}</p>
                  <p className="text-xs text-gray-500">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${inv.statusColor}`}>
                  {inv.status}
                </span>
                <span className="text-sm font-semibold text-gray-200">{inv.amount}</span>
                <button className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-800 hover:text-gray-300">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
