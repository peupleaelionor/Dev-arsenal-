'use client'

import { useState } from 'react'
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface AdminUser {
  id: string
  avatar: string
  name: string
  email: string
  role: string
  org: string
  plan: string
  created: string
  status: 'active' | 'suspended'
}

const mockUsers: AdminUser[] = [
  { id: '1', avatar: 'AA', name: 'Alex Admin', email: 'admin@example.com', role: 'ADMIN', org: 'Acme Corp', plan: 'Pro', created: 'Jan 5, 2025', status: 'active' },
  { id: '2', avatar: 'SF', name: 'Sam Founder', email: 'founder@example.com', role: 'MEMBER', org: 'BuildFast Studio', plan: 'Starter', created: 'Jan 3, 2025', status: 'active' },
  { id: '3', avatar: 'JM', name: 'Jordan Member', email: 'member@example.com', role: 'MEMBER', org: 'Acme Corp', plan: 'Pro', created: 'Dec 28, 2024', status: 'active' },
  { id: '4', avatar: 'TC', name: 'Taylor Chen', email: 'taylor@startup.io', role: 'MEMBER', org: 'StartupIO', plan: 'Pro', created: 'Dec 20, 2024', status: 'active' },
  { id: '5', avatar: 'MB', name: 'Morgan Blake', email: 'morgan@techco.com', role: 'MEMBER', org: 'TechCo', plan: 'Starter', created: 'Dec 15, 2024', status: 'suspended' },
  { id: '6', avatar: 'RP', name: 'Riley Park', email: 'riley@devstudio.co', role: 'ADMIN', org: 'DevStudio', plan: 'Studio', created: 'Dec 10, 2024', status: 'active' },
]

const roleBadge: Record<string, string> = {
  SUPER_ADMIN: 'text-red-400 bg-red-950 border-red-800',
  ADMIN: 'text-amber-400 bg-amber-950 border-amber-800',
  MEMBER: 'text-gray-400 bg-gray-800 border-gray-700',
}
const planBadge: Record<string, string> = {
  Starter: 'text-gray-400 bg-gray-800 border-gray-700',
  Pro: 'text-indigo-400 bg-indigo-950 border-indigo-800',
  Studio: 'text-violet-400 bg-violet-950 border-violet-800',
}

export default function UsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = mockUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchesRole = roleFilter === 'all' || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  const perPage = 5
  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Users</h1>
        <p className="mt-1 text-sm text-gray-400">Manage all registered users across the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search users…"
            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 pl-9 pr-3 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1) }}
          className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All roles</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="MEMBER">Member</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-left">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
              <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell">Role</th>
              <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell">Organization</th>
              <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Plan</th>
              <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 lg:table-cell">Created</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {paginated.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-gray-200">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-6 py-4 sm:table-cell">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${roleBadge[user.role] ?? ''}`}>
                    {user.role}
                  </span>
                </td>
                <td className="hidden px-6 py-4 text-gray-400 md:table-cell">{user.org}</td>
                <td className="hidden px-6 py-4 lg:table-cell">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${planBadge[user.plan] ?? ''}`}>
                    {user.plan}
                  </span>
                </td>
                <td className="hidden px-6 py-4 text-gray-500 lg:table-cell">{user.created}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${user.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="rounded-lg p-1.5 text-gray-600 hover:bg-gray-700 hover:text-gray-300 transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-800 px-6 py-4">
          <p className="text-xs text-gray-500">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-800 hover:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-gray-400">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-800 hover:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
