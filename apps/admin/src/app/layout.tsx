import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'DevArsenal Admin', template: '%s | DevArsenal Admin' },
  description: 'DevArsenal administration panel',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
