import { FolderPlus, UserPlus, Key, RefreshCw, Receipt } from 'lucide-react'

export interface ActivityItem {
  id: string
  type: 'project_created' | 'member_joined' | 'api_key_created' | 'subscription_updated' | 'invoice_paid'
  title: string
  description: string
  timestamp: string
  user?: { name: string; avatar?: string }
}

const typeConfig: Record<
  ActivityItem['type'],
  { icon: React.ReactNode; color: string }
> = {
  project_created: {
    icon: <FolderPlus className="h-4 w-4" />,
    color: 'bg-indigo-950 border-indigo-800 text-indigo-400',
  },
  member_joined: {
    icon: <UserPlus className="h-4 w-4" />,
    color: 'bg-emerald-950 border-emerald-800 text-emerald-400',
  },
  api_key_created: {
    icon: <Key className="h-4 w-4" />,
    color: 'bg-sky-950 border-sky-800 text-sky-400',
  },
  subscription_updated: {
    icon: <RefreshCw className="h-4 w-4" />,
    color: 'bg-violet-950 border-violet-800 text-violet-400',
  },
  invoice_paid: {
    icon: <Receipt className="h-4 w-4" />,
    color: 'bg-yellow-950 border-yellow-800 text-yellow-400',
  },
}

function getRelativeTime(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

interface ActivityFeedProps {
  items: ActivityItem[]
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900">
      <div className="border-b border-gray-800 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-100">Recent Activity</h2>
      </div>
      <ul className="divide-y divide-gray-800">
        {items.map((item) => {
          const config = typeConfig[item.type]
          return (
            <li key={item.id} className="flex items-start gap-4 px-6 py-4">
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.color}`}
              >
                {config.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-medium text-gray-200">{item.title}</p>
                  <span className="shrink-0 text-xs text-gray-600">
                    {getRelativeTime(item.timestamp)}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500">{item.description}</p>
                {item.user && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-[8px] font-bold text-white">
                      {item.user.name[0]}
                    </div>
                    <span className="text-xs text-gray-600">{item.user.name}</span>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
