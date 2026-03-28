'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Building2,
  CreditCard,
  Flag,
  ScrollText,
  Settings,
  Zap,
  ShieldAlert,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/organizations', label: 'Organizations', icon: Building2 },
  { href: '/admin/billing', label: 'Billing', icon: CreditCard },
  { href: '/admin/flags', label: 'Feature Flags', icon: Flag },
  { href: '/admin/audit', label: 'Audit Logs', icon: ScrollText },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-gray-800 bg-gray-950">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-800 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-gray-100">DevArsenal</span>
          <span className="ml-2 rounded border border-red-800 bg-red-950 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
            Admin
          </span>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="mx-3 mt-3 flex items-center gap-2 rounded-lg border border-amber-800 bg-amber-950/40 px-3 py-2">
        <ShieldAlert className="h-3.5 w-3.5 shrink-0 text-amber-400" />
        <p className="text-xs font-medium text-amber-300">Admin Access Only</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || (href !== '/admin' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/50'
                      : 'text-gray-400 hover:bg-gray-900 hover:text-gray-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-indigo-400' : 'text-gray-500'}`} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="border-t border-gray-800 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 text-xs font-bold text-white">
            SA
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-200">Super Admin</p>
            <p className="truncate text-xs text-gray-500">admin@devarsenal.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
