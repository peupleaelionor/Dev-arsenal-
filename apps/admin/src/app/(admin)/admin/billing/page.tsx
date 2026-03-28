import type { Metadata } from 'next'
import { TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Billing' }

const transactions = [
  { org: 'Acme Corp', amount: '$79.00', plan: 'Pro', date: 'Jan 1, 2025', status: 'paid' },
  { org: 'DevStudio', amount: '$149.00', plan: 'Studio', date: 'Jan 1, 2025', status: 'paid' },
  { org: 'StartupIO', amount: '$79.00', plan: 'Pro', date: 'Jan 1, 2025', status: 'paid' },
  { org: 'TechCo', amount: '$29.00', plan: 'Starter', date: 'Jan 1, 2025', status: 'failed' },
  { org: 'BuildFast Studio', amount: '$29.00', plan: 'Starter', date: 'Dec 31, 2024', status: 'paid' },
]

const planDist = [
  { plan: 'Starter', count: 180, pct: 58, color: 'bg-gray-500' },
  { plan: 'Pro', count: 105, pct: 34, color: 'bg-indigo-500' },
  { plan: 'Studio', count: 24, pct: 8, color: 'bg-violet-500' },
]

const statusStyle: Record<string, string> = {
  paid: 'text-emerald-400 bg-emerald-950 border-emerald-800',
  failed: 'text-red-400 bg-red-950 border-red-800',
  pending: 'text-yellow-400 bg-yellow-950 border-yellow-800',
}

const planStyle: Record<string, string> = {
  Starter: 'text-gray-400 bg-gray-800 border-gray-700',
  Pro: 'text-indigo-400 bg-indigo-950 border-indigo-800',
  Studio: 'text-violet-400 bg-violet-950 border-violet-800',
}

export default function AdminBillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Billing Overview</h1>
        <p className="mt-1 text-sm text-gray-400">Platform revenue metrics and subscription analytics.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Monthly Recurring Revenue',
            value: '$31,240',
            icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
            trend: { val: '+8.4%', positive: true },
          },
          {
            title: 'Active Subscriptions',
            value: '312',
            icon: <Users className="h-5 w-5 text-indigo-400" />,
            trend: { val: '+5.2%', positive: true },
          },
          {
            title: 'Churn Rate',
            value: '2.1%',
            icon: <TrendingDown className="h-5 w-5 text-red-400" />,
            trend: { val: '-0.3%', positive: true },
          },
          {
            title: 'ARPU',
            value: '$100.13',
            icon: <TrendingUp className="h-5 w-5 text-sky-400" />,
            trend: { val: '+$3.20', positive: true },
          },
        ].map((m) => (
          <div key={m.title} className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors">
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-gray-400">{m.title}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-950">
                {m.icon}
              </div>
            </div>
            <p className="mb-1 text-3xl font-bold tracking-tight text-gray-100">{m.value}</p>
            <p className={`text-xs font-semibold ${m.trend.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {m.trend.val} vs last month
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Plan Distribution */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-5 text-base font-semibold text-gray-100">Plan Distribution</h2>
          <div className="space-y-4">
            {planDist.map((p) => (
              <div key={p.plan}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-300">{p.plan}</span>
                  <span className="text-gray-500">{p.count} orgs · {p.pct}%</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-800">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${p.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-100">Recent Transactions</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-left">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Organization</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Amount</th>
                <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Plan</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-3">
                    <p className="font-medium text-gray-200">{t.org}</p>
                    <p className="text-xs text-gray-600">{t.date}</p>
                  </td>
                  <td className="px-6 py-3 font-semibold text-gray-200">{t.amount}</td>
                  <td className="hidden px-6 py-3 sm:table-cell">
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${planStyle[t.plan] ?? ''}`}>
                      {t.plan}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${statusStyle[t.status] ?? ''}`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
