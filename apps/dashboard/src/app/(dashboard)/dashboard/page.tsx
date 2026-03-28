import type { Metadata } from 'next'
import { LayoutGrid, CreditCard, Key, Users } from 'lucide-react'
import { StatsCard } from '@/components/dashboard/stats-card'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import type { ActivityItem } from '@/components/dashboard/activity-feed'

export const metadata: Metadata = { title: 'Dashboard' }

const stats = [
  {
    title: 'Total Projects',
    value: 12,
    icon: <LayoutGrid className="h-5 w-5 text-indigo-400" />,
    trend: { value: 16, isPositive: true },
    description: 'Across all workspaces',
  },
  {
    title: 'Active Subscriptions',
    value: 1,
    icon: <CreditCard className="h-5 w-5 text-violet-400" />,
    description: 'Pro plan · Next billing Feb 1',
  },
  {
    title: 'API Calls',
    value: '45.2K',
    icon: <Key className="h-5 w-5 text-sky-400" />,
    trend: { value: 8, isPositive: true },
    description: 'This month',
  },
  {
    title: 'Team Members',
    value: 4,
    icon: <Users className="h-5 w-5 text-emerald-400" />,
    trend: { value: 1, isPositive: true },
    description: 'Active this week',
  },
]

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'project_created',
    title: 'New project created',
    description: 'Dashboard v2 was created in Acme Corp',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    user: { name: 'Sam Founder' },
  },
  {
    id: '2',
    type: 'member_joined',
    title: 'New team member',
    description: 'Jordan Member joined Acme Corp',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    user: { name: 'Jordan Member' },
  },
  {
    id: '3',
    type: 'api_key_created',
    title: 'API key created',
    description: 'Production key was generated',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    user: { name: 'Alex Admin' },
  },
  {
    id: '4',
    type: 'invoice_paid',
    title: 'Invoice paid',
    description: 'Pro plan invoice #INV-2024-001 paid — $79.00',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    type: 'subscription_updated',
    title: 'Plan upgraded',
    description: 'Upgraded from Starter to Pro',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    user: { name: 'Alex Admin' },
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Welcome back, Alex 👋</h1>
        <p className="mt-1 text-sm text-gray-400">Here&apos;s what&apos;s happening in your workspace.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <ActivityFeed items={recentActivity} />
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-base font-semibold text-gray-100">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: 'New Project', icon: '＋', href: '/dashboard/projects/new' },
              { label: 'Invite Team Member', icon: '✉', href: '/dashboard/team/invite' },
              { label: 'View API Docs', icon: '📖', href: 'https://docs.devarsenal.com' },
              { label: 'Manage API Keys', icon: '🔑', href: '/dashboard/keys' },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950/50 px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-indigo-800 hover:bg-indigo-950/30 hover:text-indigo-300"
              >
                <span className="text-base">{action.icon}</span>
                {action.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
