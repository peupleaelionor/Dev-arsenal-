<div align="center">
  <h1>⚡ DevArsenal</h1>
  <p><strong>The premium launch system for SaaS, AI tools, and marketplaces.</strong></p>
  <p>
    Ship faster. Build serious products. Start from a foundation worth 10x.
  </p>
  <p>
    <a href="#quick-start">Quick Start</a> · 
    <a href="#whats-inside">What's Inside</a> · 
    <a href="#stack">Stack</a> · 
    <a href="#deploy">Deploy</a> · 
    <a href="#license">License</a>
  </p>
  <br />
  <p>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript&logoColor=white" />
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white" />
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" />
    <img alt="Prisma" src="https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white" />
    <img alt="Stripe" src="https://img.shields.io/badge/Stripe-Billing-635bff?style=flat-square&logo=stripe&logoColor=white" />
    <img alt="License" src="https://img.shields.io/badge/License-Commercial-gold?style=flat-square" />
  </p>
</div>

---

## What is DevArsenal?

DevArsenal is not a generic boilerplate. It is a **production-ready launch system** built for serious founders, engineers, and agencies who ship premium software.

It gives you the architectural foundation, the design system, the auth, the billing, the admin tools, and the entire product infrastructure to go from zero to launch in days — not months.

> Stop rebuilding auth, billing, and dashboards for every project. Start from a foundation that's already worth selling.

---

## Who is it for?

| Role | Use Case |
|------|----------|
| **SaaS Founders** | Launch a subscription product with billing on day one |
| **Indie Hackers** | Ship a premium micro-SaaS without months of setup |
| **AI Tool Builders** | Drop in the AI module and launch a monetized AI product |
| **Agencies** | Build client portals faster, using a proven white-label base |
| **Technical Founders** | Start your MVP from a serious codebase, not a tutorial |
| **Template Sellers** | Fork and sell premium products using the commercial license |

---

## What's Inside

### Apps
| App | Description | Port |
|-----|-------------|------|
| `apps/web` | Premium landing page + public marketing site | 3000 |
| `apps/dashboard` | Customer-facing product dashboard | 3001 |
| `apps/admin` | Internal admin panel (users, billing, analytics) | 3002 |
| `apps/docs` | Product documentation site | 3003 |

### Packages
| Package | Description |
|---------|-------------|
| `@devarsenal/ui` | Premium shared design system (tokens, components, primitives) |
| `@devarsenal/db` | Prisma schema (14 models), client singleton, seed data |
| `@devarsenal/auth` | NextAuth v5, roles, RBAC, session utilities |
| `@devarsenal/billing` | Stripe checkout, subscriptions, webhooks, portal |
| `@devarsenal/analytics` | Typed event tracking, PostHog, funnel analysis |
| `@devarsenal/emails` | Resend templates (welcome, invoice, password reset) |
| `@devarsenal/utils` | Formatting, validation, typed errors, helpers |
| `@devarsenal/ai` | AI abstraction layer for OpenAI/Anthropic |
| `@devarsenal/storage` | File upload with Vercel Blob |
| `@devarsenal/notifications` | In-app, email, webhook notifications |
| `@devarsenal/permissions` | Multi-tenant ACL, ownership, scoping |

### Templates
| Template | Description |
|----------|-------------|
| `saas-starter` | Full SaaS product foundation |
| `ai-tool-starter` | AI-powered product starter |
| `marketplace-starter` | Two-sided marketplace foundation |
| `agency-dashboard` | Client portal for agencies |
| `admin-boilerplate` | Internal admin panel starter |

---

## Stack

```
Framework:   Next.js 15 (App Router)
Language:    TypeScript 5.7 (strict mode)
Styling:     Tailwind CSS 3.4
Database:    PostgreSQL + Prisma 6
Auth:        NextAuth v5 (credentials + OAuth)
Billing:     Stripe (subscriptions, webhooks, portal)
Email:       Resend
Analytics:   PostHog
Storage:     Vercel Blob
Deployment:  Netlify / Vercel
Package Mgr: pnpm workspaces
Build:       Turborepo
```

---

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- PostgreSQL database
- Stripe account
- Resend account (email)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/devarsenal
cd devarsenal

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# → Edit .env.local with your credentials

# Set up the database
pnpm db:push
pnpm db:seed

# Start development
pnpm dev
```

This starts:
- **Landing page**: [http://localhost:3000](http://localhost:3000)
- **Dashboard**: [http://localhost:3001](http://localhost:3001)
- **Admin**: [http://localhost:3002](http://localhost:3002)

### Demo Accounts

After seeding, these accounts are available:

| Email | Password | Role |
|-------|----------|------|
| `admin@example.com` | `admin123!` | Super Admin |
| `founder@example.com` | `founder123!` | Org Owner |
| `member@example.com` | `member123!` | Team Member |

---

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_SECRET="your-secret-32-chars-min"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_STUDIO_PRICE_ID="price_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Analytics (PostHog)
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
```

See `.env.example` for the complete list.

---

## Database Setup

DevArsenal uses PostgreSQL with Prisma.

```bash
# Push schema to database
pnpm db:push

# Run migrations (production)
pnpm db:migrate

# Seed with demo data
pnpm db:seed

# Open Prisma Studio
pnpm db:studio
```

### Schema Overview

The database models:
- **User** — authentication, profile, roles
- **Organization** — workspaces, plans, billing
- **Membership** — user-to-org relationships with roles
- **Subscription** — Stripe subscription state
- **Plan** — pricing tier definitions
- **Invoice** — billing history
- **Project** — user-created resources
- **ApiKey** — programmatic access (hashed)
- **AuditLog** — full audit trail
- **Notification** — in-app notifications
- **FileAsset** — uploaded files
- **UsageEvent** — analytics tracking
- **FeatureFlag** — feature gating
- **SupportTicket** — customer support

---

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create products and prices for each plan tier:
   - **Starter**: $29/month
   - **Pro**: $79/month  
   - **Studio**: $199/month
3. Copy price IDs to `.env.local`
4. Set up webhook endpoint: `POST /api/webhooks/stripe`
5. Add webhook events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`

---

## Deploy

### Netlify (Recommended)

The project includes a `netlify.toml` for one-click deployment of the web app.

1. **Connect your repo** — Go to [app.netlify.com](https://app.netlify.com), click "Add new site" → "Import an existing project" → select your GitHub repository.
2. **Environment variables** — In Site settings → Environment variables, add the variables from `.env.example` that your web app needs (at minimum, `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_DASHBOARD_URL`).
3. **Deploy** — Netlify will auto-detect `netlify.toml` and build using the configured settings.

The `netlify.toml` configures:
- **Build**: `pnpm install` + `turbo build` scoped to `@devarsenal/web`
- **Plugin**: `@netlify/plugin-nextjs` for full Next.js 15 support (SSR, ISR, middleware)
- **Smart builds**: Only rebuilds when `apps/web/` or `packages/ui/` change
- **Security headers**: HSTS, X-Frame-Options, CSP-related headers
- **Caching**: Aggressive caching for static assets and images

```bash
# Or deploy via Netlify CLI
npm i -g netlify-cli
netlify login
netlify init   # Link the repo
netlify deploy --build --prod
```

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy web app
cd apps/web && vercel

# Deploy dashboard
cd apps/dashboard && vercel

# Deploy admin
cd apps/admin && vercel
```

Or connect your GitHub repository in the Vercel dashboard and it will deploy automatically.

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Self-hosted

```bash
# Build all apps
pnpm build

# Start production servers
pnpm start
```

---

## Customization

### Branding

1. Update brand colors in `packages/ui/src/tokens.ts`
2. Update logo in `apps/web/src/components/layout/navbar.tsx`
3. Update metadata in each `apps/*/src/app/layout.tsx`
4. Update copy in `apps/web/src/app/page.tsx`

### Adding a Module

1. Create a new package in `packages/your-module/`
2. Add it to `pnpm-workspace.yaml` (already included via glob)
3. Import it in apps as `@devarsenal/your-module`

### Adding an App

1. Create a new Next.js app in `apps/your-app/`
2. Reference shared packages as `workspace:*`
3. Add to `turbo.json` if needed

---

## Architecture

```
devarsenal/
├── apps/
│   ├── web/          ← Marketing site + landing page
│   ├── dashboard/    ← Customer app (auth required)
│   ├── admin/        ← Internal admin (admin role required)
│   └── docs/         ← Documentation
├── packages/
│   ├── ui/           ← Design system (Tailwind + React)
│   ├── db/           ← Prisma ORM + schema
│   ├── auth/         ← NextAuth + RBAC
│   ├── billing/      ← Stripe integration
│   ├── analytics/    ← Event tracking
│   ├── emails/       ← Email templates (Resend)
│   └── utils/        ← Shared utilities
├── templates/        ← Product templates
├── features/         ← Feature modules
├── infra/            ← Deployment configs
├── docs/             ← Documentation files
├── scripts/          ← Setup and release scripts
└── launch/           ← Go-to-market assets
```

**Design Principles:**
- **Monorepo** — shared code, isolated apps, independent deployment
- **Multi-tenant** — every resource is scoped to an organization
- **Role-based** — OWNER, ADMIN, MEMBER, BILLING, VIEWER roles
- **Type-safe** — strict TypeScript throughout
- **Secure by default** — auth gates, CSRF, rate limiting, audit logs

---

## Monetization

DevArsenal is designed for commercial use. Here's how to monetize:

### Sell as a Digital Product
Sell the starter kit on Gumroad, Lemon Squeezy, or your own site.

### License to Clients
Use the commercial license to deliver white-label builds for agencies and clients.

### Launch Your Own SaaS
Use DevArsenal as your product foundation and launch immediately.

### Build on Top
Add your domain-specific features to the solid foundation and ship a premium SaaS.

---

## Roadmap

See [`docs/roadmap.md`](./docs/roadmap.md) for the public roadmap.

Current priorities:
- [ ] OAuth providers (Google, GitHub)
- [ ] Team invitations flow
- [ ] AI module (OpenAI + Anthropic)
- [ ] Full onboarding flow
- [ ] Marketplace template
- [ ] Dark/light mode toggle
- [ ] Mobile app (React Native)
- [ ] CLI (`npx create-devarsenal-app`)

---

## License

DevArsenal is available under a **Commercial License**.

- ✅ Personal use
- ✅ Commercial use
- ✅ Client projects
- ✅ SaaS products
- ✅ White-label / resale (Studio license)
- ❌ Redistributing the source code as a competing starter kit

See [`LICENSE`](./LICENSE) for full terms.

---

## FAQ

**What is DevArsenal?**
A premium production-ready monorepo that gives you auth, billing, dashboards, admin tools, and a full design system to launch SaaS products faster.

**Is it ready for production?**
Yes. The architecture, security patterns, and code quality are designed for real products.

**Can I use it for client work?**
Yes, with the Studio or Enterprise license.

**How do I get support?**
Open an issue on GitHub or contact [support@devarsenal.com](mailto:support@devarsenal.com).

**Can I customize the branding?**
Absolutely. Every element is designed to be white-labeled.

---

<div align="center">
  <h3>Launch faster. Ship premium. Build something worth selling.</h3>
  <br />
  <a href="https://devarsenal.com">Website</a> · 
  <a href="https://devarsenal.com/docs">Documentation</a> · 
  <a href="https://devarsenal.com/demo">Live Demo</a>
</div>
