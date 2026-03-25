import type { Metadata } from 'next'
import { Users, Building2, DollarSign, CreditCard, CheckCircle, Zap, Mail } from 'lucide-react'

export const metadata: Metadata = { title: 'Admin Overview' }

const systemStats = [
  { title: 'Total Users', value: '1,247', icon: <Users className="h-5 w-5 text-indigo-400" />, trend: '+34 this week' },
  { title: 'Organizations', value: '389', icon: <Building2 className="h-5 w-5 text-violet-400" />, trend: '+12 this week' },
  { title: 'MRR', value: '$31,240', icon: <DollarSign className="h-5 w-5 text-emerald-400" />, trend: '+$2,450 vs last month' },
  { title: 'Active Subscriptions', value: '312', icon: <CreditCard className="h-5 w-5 text-sky-400" />, trend: '81% conversion' },
]

const systemHealth = [
  { label: 'API Uptime', value: '99.9%', status: 'healthy', icon: <Zap className="h-4 w-4" /> },
  { label: 'DB Response', value: '12ms', status: 'healthy', icon: <CheckCircle className="h-4 w-4" /> },
  { label: 'Email Delivery', value: '98.2%', status: 'healthy', icon: <Mail className="h-4 w-4" /> },
]

const recentSignups = [
  { name: 'Taylor Chen', email: 'taylor@startup.io', plan: 'Pro', date: '2 min ago', avatar: 'TC' },
  { name: 'Morgan Blake', email: 'morgan@techco.com', plan: 'Starter', date: '18 min ago', avatar: 'MB' },
  { name: 'Riley Park', email: 'riley@devstudio.co', plan: 'Studio', date: '1 hour ago', avatar: 'RP' },
  { name: 'Casey Jordan', email: 'casey@builders.dev', plan: 'Pro', date: '3 hours ago', avatar: 'CJ' },
  { name: 'Avery Smith', email: 'avery@cloud.io', plan: 'Starter', date: '5 hours ago', avatar: 'AS' },
]

const planColors: Record<string, string> = {
  Starter: 'text-gray-400 bg-gray-800 border-gray-700',
  Pro: 'text-indigo-400 bg-indigo-950 border-indigo-800',
  Studio: 'text-violet-400 bg-violet-950 border-violet-800',
  Enterprise: 'text-amber-400 bg-amber-950 border-amber-800',
}

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">System Overview</h1>
        <p className="mt-1 text-sm text-gray-400">
          Real-time platform metrics and health monitoring.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors"
          >
            <div className="mb-4 flex items-start justify-between">
              <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-950">
                {stat.icon}
              </div>
            </div>
            <p className="mb-1 text-3xl font-bold tracking-tight text-gray-100">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-5 text-base font-semibold text-gray-100">System Health</h2>
          <div className="space-y-3">
            {systemHealth.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-300">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-100">{item.value}</span>
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Signups */}
        <div className="rounded-xl border border-gray-800 bg-gray-900">
          <div className="border-b border-gray-800 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-100">Recent Signups</h2>
          </div>
          <ul className="divide-y divide-gray-800">
            {recentSignups.map((user) => (
              <li key={user.email} className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                    {user.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${planColors[user.plan] ?? ''}`}
                  >
                    {user.plan}
                  </span>
                  <span className="text-xs text-gray-600">{user.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chart Placeholders */}
      <div className="grid gap-6 lg:grid-cols-2">
        {['MRR Growth', 'User Acquisition'].map((label) => (
          <div key={label} className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <h2 className="mb-4 text-base font-semibold text-gray-100">{label}</h2>
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-gray-700 bg-gray-950">
              <p className="text-sm text-gray-600">Chart integration coming soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
