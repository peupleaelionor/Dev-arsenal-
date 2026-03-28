'use client'

import { useState } from 'react'
import { User, Bell, Shield, AlertTriangle } from 'lucide-react'

export default function SettingsPage() {
  const [name, setName] = useState('Alex Admin')
  const [email, setEmail] = useState('admin@example.com')
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [billingNotifs, setBillingNotifs] = useState(true)
  const [securityNotifs, setSecurityNotifs] = useState(true)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">Manage your account preferences and security.</p>
      </div>

      {/* Profile */}
      <section className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-gray-100">Profile</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white">
              AA
            </div>
            <button className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700">
              Change avatar
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
            Save changes
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-gray-100">Notifications</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-800">
          {[
            { label: 'Email notifications', desc: 'Receive email updates about your workspace', value: emailNotifs, set: setEmailNotifs },
            { label: 'Billing alerts', desc: 'Get notified about invoices and subscription changes', value: billingNotifs, set: setBillingNotifs },
            { label: 'Security alerts', desc: 'Important security notifications and login alerts', value: securityNotifs, set: setSecurityNotifs },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between px-6 py-4">
              <div>
                <p className="text-sm font-medium text-gray-200">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  item.value ? 'bg-indigo-600' : 'bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    item.value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border border-gray-800 bg-gray-900">
        <div className="border-b border-gray-800 px-6 py-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-400" />
            <h2 className="text-base font-semibold text-gray-100">Security</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">Current password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-100 focus:border-indigo-500 focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-300">New password</label>
              <input type="password" placeholder="••••••••" className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-gray-100 focus:border-indigo-500 focus:outline-none" />
            </div>
          </div>
          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
            Update password
          </button>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-xl border border-red-900 bg-gray-900">
        <div className="border-b border-red-900 px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h2 className="text-base font-semibold text-red-400">Danger Zone</h2>
          </div>
        </div>
        <div className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-medium text-gray-200">Delete account</p>
            <p className="text-xs text-gray-500">Permanently delete your account and all associated data.</p>
          </div>
          <button className="rounded-lg border border-red-800 bg-red-950/50 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-900/50">
            Delete account
          </button>
        </div>
      </section>
    </div>
  )
}
