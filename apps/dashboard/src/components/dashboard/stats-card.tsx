import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  description?: string
}

export function StatsCard({ title, value, icon, trend, description }: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-700">
      <div className="mb-4 flex items-start justify-between">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-950">
          {icon}
        </div>
      </div>
      <p className="mb-1 text-3xl font-bold tracking-tight text-gray-100">{value}</p>
      <div className="flex items-center gap-2">
        {trend && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${
              trend.isPositive ? 'text-emerald-400' : 'text-red-400'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {trend.value}%
          </span>
        )}
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </div>
  )
}
