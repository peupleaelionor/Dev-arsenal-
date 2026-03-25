import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'DevArsenal – Build Premium SaaS Faster',
    template: '%s | DevArsenal',
  },
  description:
    'DevArsenal gives you the core systems every serious product needs: auth, billing, dashboards, AI modules, admin tools, analytics, and production-ready architecture.',
  keywords: [
    'SaaS starter kit',
    'Next.js boilerplate',
    'TypeScript SaaS',
    'auth billing dashboard',
    'production ready',
    'developer tools',
  ],
  authors: [{ name: 'DevArsenal' }],
  creator: 'DevArsenal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devarsenal.com',
    siteName: 'DevArsenal',
    title: 'DevArsenal – Build Premium SaaS Faster',
    description:
      'The complete production-ready foundation for serious SaaS products. Ship in days, not months.',
    images: [
      {
        url: 'https://devarsenal.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DevArsenal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevArsenal – Build Premium SaaS Faster',
    description:
      'The complete production-ready foundation for serious SaaS products. Ship in days, not months.',
    images: ['https://devarsenal.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0d0d11',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className="font-sans bg-dark-950 text-white antialiased"
      >
        {children}
      </body>
    </html>
  )
}
