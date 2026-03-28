import Link from 'next/link'
import { Zap, Github, Twitter } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Roadmap', href: '/roadmap' },
  ],
  Developers: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/docs/api' },
    { label: 'GitHub', href: 'https://github.com/devarsenal' },
    { label: 'Status', href: 'https://status.devarsenal.com' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
    { label: 'Cookies', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-dark-950">
      <div className="section-container py-16">
        {/* Top row */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 shadow-lg shadow-brand-500/30">
                <Zap className="h-4 w-4 text-white" fill="currentColor" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                Dev<span className="text-brand-400">Arsenal</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-dark-400 leading-relaxed max-w-xs">
              The complete production-ready foundation for serious SaaS products. Ship in days, not
              months.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://twitter.com/devarsenal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-dark-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/devarsenal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-dark-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-dark-500 mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-dark-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-8">
          <p className="text-sm text-dark-500">
            © {new Date().getFullYear()} DevArsenal. All rights reserved.
          </p>
          <p className="text-sm text-dark-500">
            Built with{' '}
            <span className="text-brand-400">♥</span>
            {' '}for developers who ship.
          </p>
        </div>
      </div>
    </footer>
  )
}
