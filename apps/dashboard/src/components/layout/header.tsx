'use client'

import { useState } from 'react'
import { Bell, Search } from 'lucide-react'

export function Header() {
  const [query, setQuery] = useState('')

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-800 bg-gray-950 px-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, docs…"
          className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2 pl-9 pr-4 text-sm text-gray-300 placeholder-gray-600 transition-colors focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-gray-200">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-indigo-500" />
        </button>

        {/* Avatar Dropdown */}
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white transition-opacity hover:opacity-80">
          AA
        </button>
      </div>
    </header>
  )
}
