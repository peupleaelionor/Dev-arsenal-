'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Plus, Copy, Trash2, AlertTriangle } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  prefix: string
  lastUsed: string | null
  created: string
}

const mockKeys: ApiKey[] = [
  { id: '1', name: 'Production', prefix: 'dak_prod_****', lastUsed: '2 hours ago', created: 'Jan 5, 2025' },
  { id: '2', name: 'Development', prefix: 'dak_dev_****', lastUsed: '5 days ago', created: 'Dec 28, 2024' },
  { id: '3', name: 'CI/CD Pipeline', prefix: 'dak_ci_****', lastUsed: null, created: 'Dec 10, 2024' },
]

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>(mockKeys)
  const [showCreate, setShowCreate] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newKeyName.trim()) return
    const newKey = `dak_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 18)}`
    setCreatedKey(newKey)
    setKeys((prev) => [
      {
        id: String(Date.now()),
        name: newKeyName.trim(),
        prefix: `${newKey.slice(0, 12)}****`,
        lastUsed: null,
        created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
      ...prev,
    ])
    setNewKeyName('')
    setShowCreate(false)
  }

  function handleCopy() {
    if (createdKey) {
      navigator.clipboard.writeText(createdKey).catch(() => {})
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  function handleDelete(id: string) {
    setKeys((prev) => prev.filter((k) => k.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">API Keys</h1>
          <p className="mt-1 text-sm text-gray-400">Manage authentication keys for the DevArsenal API.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" />
          Create API Key
        </button>
      </div>

      {/* Security Warning */}
      <div className="flex gap-3 rounded-xl border border-yellow-800 bg-yellow-950/30 p-4">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
        <p className="text-sm text-yellow-300">
          <strong>Keep your API keys secret.</strong> Never share them in public repositories or client-side code.
          If a key is compromised, delete it immediately.
        </p>
      </div>

      {/* Create Key Form */}
      {showCreate && (
        <div className="rounded-xl border border-indigo-800 bg-indigo-950/30 p-6">
          <h2 className="mb-4 text-base font-semibold text-gray-100">Create New API Key</h2>
          <form onSubmit={handleCreate} className="flex gap-3">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g. Production)"
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Created Key Display */}
      {createdKey && (
        <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-5">
          <p className="mb-2 text-sm font-semibold text-emerald-400">
            ✓ API key created — copy it now, you won&apos;t see it again.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 font-mono text-sm text-gray-200 break-all">
              {createdKey}
            </code>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
            >
              <Copy className="h-3.5 w-3.5" />
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            onClick={() => setCreatedKey(null)}
            className="mt-3 text-xs text-gray-600 hover:text-gray-400"
          >
            I&apos;ve saved this key, dismiss
          </button>
        </div>
      )}

      {/* Keys Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <p className="text-sm text-gray-400">{keys.length} key{keys.length !== 1 ? 's' : ''}</p>
        </div>
        {keys.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-gray-500">No API keys yet. Create one to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {keys.map((key) => (
              <div key={key.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 bg-gray-800">
                    <span className="text-base">🔑</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">{key.name}</p>
                    <p className="font-mono text-xs text-gray-500">{key.prefix}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-500">Last used</p>
                    <p className="text-xs font-medium text-gray-300">{key.lastUsed ?? 'Never'}</p>
                  </div>
                  <div className="hidden text-right sm:block">
                    <p className="text-xs text-gray-500">Created</p>
                    <p className="text-xs font-medium text-gray-300">{key.created}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-red-950/50 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
