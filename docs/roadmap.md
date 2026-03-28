# Product Roadmap

This is the public roadmap for DevArsenal. Items are organized by status and priority.

Last updated: January 2025

---

## 🚀 Now (In Progress)

These features are actively being built for the next release.

- **OAuth Providers** — Google and GitHub login via NextAuth v5
- **Team Invitations** — invite members to an organization via email link
- **Full Onboarding Flow** — guided post-signup setup wizard
- **AI Module** — `@devarsenal/ai` with OpenAI and Anthropic abstractions
- **Dark Mode** — system-aware + manual toggle for all apps

---

## 📅 Next (Planned)

These are scoped and scheduled for upcoming releases.

- **Marketplace Template** — two-sided marketplace with seller/buyer flows
- **CLI Tool** — `npx create-devarsenal-app` for instant project scaffolding
- **Webhook Management UI** — configure outgoing webhooks from the dashboard
- **API Reference Docs** — auto-generated API docs from route handlers
- **Advanced Audit Logs** — filterable, exportable audit trail in admin panel
- **Custom Domains** — per-organization custom domain support
- **Usage Metering** — per-org API usage tracking and billing by consumption

---

## 🔭 Later (Exploring)

Ideas under consideration for future releases. Not yet committed.

- **Mobile App** — React Native companion app (iOS + Android)
- **React Native Template** — starter for mobile SaaS products
- **Real-Time Features** — WebSocket support for live dashboards
- **Internationalization (i18n)** — multi-language support framework
- **SSO / SAML** — enterprise single sign-on
- **SOC 2 Compliance Module** — compliance tooling and audit reports
- **Self-Hosted AI** — Ollama integration for on-premise AI inference
- **Visual Email Builder** — drag-and-drop email template editor
- **A/B Testing Module** — built-in experiment framework
- **Customer Success Tools** — in-app messaging, NPS surveys, churn prevention

---

## ✅ Done (Released)

Core features that are complete and stable.

- [x] Next.js 15 monorepo with Turborepo
- [x] `@devarsenal/db` — Prisma schema with 14 models
- [x] `@devarsenal/auth` — NextAuth v5 with RBAC
- [x] `@devarsenal/billing` — Stripe subscriptions, webhooks, portal
- [x] `@devarsenal/ui` — Premium component library with design tokens
- [x] `@devarsenal/analytics` — PostHog event tracking
- [x] `@devarsenal/emails` — Resend email templates
- [x] `@devarsenal/utils` — Shared validation, formatting, error utilities
- [x] `apps/web` — Marketing landing page
- [x] `apps/dashboard` — Customer-facing dashboard
- [x] `apps/admin` — Internal admin panel
- [x] Multi-tenant organization model
- [x] Role-based access control (OWNER, ADMIN, MEMBER, BILLING, VIEWER)
- [x] Database seed with demo accounts
- [x] Docker Compose configuration
- [x] GitHub Actions CI pipeline
- [x] Vercel deployment configs
- [x] Commercial license

---

## 💡 Suggest a Feature

Have an idea for DevArsenal?

- Open a [GitHub Discussion](https://github.com/yourusername/devarsenal/discussions)
- Email [feedback@devarsenal.com](mailto:feedback@devarsenal.com)

Features with strong community interest get prioritized.

---

## Release Schedule

DevArsenal follows a **rolling release** model:

- **Minor updates** — every 2–4 weeks (new features, improvements)
- **Patch releases** — as needed (bug fixes, security patches)
- **Major versions** — when framework versions change (e.g., Next.js 16)

All license holders receive free updates within their major version.
