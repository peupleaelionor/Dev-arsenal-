# Architecture Overview

This document explains the architectural decisions behind DevArsenal — how the monorepo is structured, how multi-tenancy works, how authorization is enforced, and how data flows through the system.

---

## Monorepo Structure

DevArsenal is organized as a **pnpm workspace monorepo** powered by **Turborepo** for task orchestration.

```
devarsenal/
├── apps/                   ← Deployable Next.js applications
│   ├── web/                ← Public marketing site (port 3000)
│   ├── dashboard/          ← Authenticated user app (port 3001)
│   ├── admin/              ← Internal admin panel (port 3002)
│   └── docs/               ← Documentation site (port 3003)
├── packages/               ← Shared libraries (never deployed alone)
│   ├── ui/                 ← Component library + design tokens
│   ├── db/                 ← Prisma schema + client
│   ├── auth/               ← Authentication + RBAC
│   ├── billing/            ← Stripe integration
│   ├── analytics/          ← Event tracking
│   ├── emails/             ← Email templates
│   ├── utils/              ← Shared helpers
│   └── ai/                 ← AI provider abstraction
├── features/               ← Domain feature modules
│   ├── onboarding/         ← User onboarding flow logic
│   ├── api-keys/           ← API key management
│   ├── audit-logs/         ← Action audit trail
│   └── teams/              ← Team invitations + management
├── templates/              ← Product starter templates
├── infra/                  ← Deployment configuration
├── scripts/                ← Developer tooling
└── launch/                 ← GTM and marketing assets
```

### Why a Monorepo?

1. **Shared types** — the Prisma schema generates types used by every app and package. No type drift.
2. **Shared components** — the UI library is built once and used everywhere.
3. **Atomic commits** — a feature touching the DB schema, an API, and the UI lives in one PR.
4. **Independent deployments** — each app deploys independently to Vercel. Changing the admin doesn't redeploy the marketing site.

---

## Application Architecture

Each `apps/*` application is a **Next.js 15 App Router** project with:

- **Server Components** by default — data fetching happens on the server
- **Route Handlers** for API endpoints (`app/api/**`)
- **Middleware** for auth gates and redirect logic
- **TypeScript strict mode** throughout

### Request Lifecycle

```
Browser
  └─▶ Next.js Middleware (auth check, redirect)
        └─▶ Server Component (data fetch via Prisma)
              └─▶ Client Component (interactivity)
                    └─▶ Server Action / Route Handler (mutations)
                          └─▶ Prisma (PostgreSQL)
```

---

## Multi-Tenancy

DevArsenal implements **organization-based multi-tenancy**. Every user-created resource is scoped to an **Organization**.

### Data Model

```
User
 └─▶ Membership (role: OWNER | ADMIN | MEMBER | BILLING | VIEWER)
       └─▶ Organization
             ├─▶ Subscription (Stripe)
             ├─▶ Projects
             ├─▶ ApiKeys
             ├─▶ AuditLogs
             └─▶ Members
```

### Tenancy Rules

1. **Every resource has an `organizationId`** — queries always filter by org
2. **Users belong to one or more organizations** — multi-org is supported
3. **Switching orgs** changes the active context in the session
4. **Billing is per-organization** — not per-user
5. **API keys are scoped to an organization** — not to individual users

### Query Scoping Pattern

All database queries follow this pattern:

```typescript
// ✅ Correct — always scope to org
const projects = await db.project.findMany({
  where: {
    organizationId: session.user.organizationId,
  },
});

// ❌ Wrong — never query without org scope
const projects = await db.project.findMany();
```

---

## Role-Based Access Control (RBAC)

Permissions are enforced at three layers:

### 1. Middleware (Route-level)

```typescript
// middleware.ts
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};

export function middleware(request: NextRequest) {
  const session = getSession(request);
  if (!session) return NextResponse.redirect("/login");
  if (isAdminRoute(request) && !isAdmin(session)) {
    return NextResponse.redirect("/dashboard");
  }
}
```

### 2. Server Components (Data-level)

```typescript
export default async function BillingPage() {
  const session = await requireSession(); // throws if not authenticated
  requireRole(session, ["OWNER", "BILLING"]); // throws if wrong role
  // ...
}
```

### 3. UI (Display-level)

```tsx
<Can perform="billing:manage" on={organization}>
  <BillingSettings />
</Can>
```

### Role Hierarchy

| Role | Can Do |
|------|--------|
| `OWNER` | Everything, including deleting the org |
| `ADMIN` | Manage members, settings, projects |
| `BILLING` | Manage subscriptions and invoices |
| `MEMBER` | Create and manage their own resources |
| `VIEWER` | Read-only access |

---

## Package Architecture

### `@devarsenal/db`

The single source of truth for the database. Contains:
- `prisma/schema.prisma` — all 14 models
- `src/index.ts` — exports the Prisma client singleton
- `prisma/seed.ts` — demo data seeding

The client is a singleton to prevent connection exhaustion in development:

```typescript
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

### `@devarsenal/auth`

Wraps NextAuth v5. Exports:
- `auth()` — gets the current session
- `requireSession()` — asserts auth, throws if unauthenticated
- `requireRole(session, roles)` — asserts role membership
- Auth config with credentials + OAuth providers

### `@devarsenal/billing`

Wraps the Stripe SDK. Exports:
- `createCheckoutSession()` — initiates upgrade flow
- `createPortalSession()` — opens billing portal
- `handleWebhook()` — processes Stripe webhook events
- `PLANS` — pricing tier definitions

### `@devarsenal/ui`

A Tailwind-based component library. Components are pure React with no framework coupling. They work in any Next.js app.

---

## Data Flow: Subscription Upgrade

```
User clicks "Upgrade"
  └─▶ POST /api/billing/checkout
        └─▶ createCheckoutSession(userId, priceId)
              └─▶ Stripe Checkout page
                    └─▶ User completes payment
                          └─▶ Stripe sends webhook: checkout.session.completed
                                └─▶ POST /api/webhooks/stripe
                                      └─▶ handleWebhook(event)
                                            └─▶ db.subscription.upsert(...)
                                                  └─▶ User now has active subscription
```

---

## Security Architecture

See [security.md](./security.md) for the full security documentation.

Key points:
- All mutations go through Server Actions or Route Handlers — never direct DB from client
- Auth is checked in middleware AND in server components (defense in depth)
- Stripe webhook signature is verified on every incoming event
- API keys are stored as bcrypt hashes — never as plaintext
- Audit logs capture every sensitive action

---

## Build System

Turborepo orchestrates builds with dependency awareness:

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    }
  }
}
```

`^build` means "build my dependencies first." So when building `apps/web`, Turborepo first builds `@devarsenal/ui`, `@devarsenal/auth`, etc.

Turborepo caches task outputs. On a cache hit, the build completes in milliseconds.
