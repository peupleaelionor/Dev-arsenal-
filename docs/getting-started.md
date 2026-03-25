# Getting Started with DevArsenal

This guide walks you through setting up DevArsenal from scratch, configuring your environment, and running your first development server.

---

## Prerequisites

Before you begin, make sure you have the following installed and configured:

| Requirement | Version | Notes |
|-------------|---------|-------|
| Node.js | 20+ | Use [nvm](https://github.com/nvm-sh/nvm) to manage versions |
| pnpm | 9+ | `npm install -g pnpm` |
| Git | Any | For cloning and version control |
| PostgreSQL | 14+ | Local or hosted (Neon, Supabase, Railway) |
| Stripe Account | — | For billing features |
| Resend Account | — | For transactional email |

---

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/devarsenal
cd devarsenal
```

---

## Step 2: Install Dependencies

DevArsenal uses pnpm workspaces. Install all dependencies across all apps and packages at once:

```bash
pnpm install
```

This installs dependencies for:
- All apps (`apps/web`, `apps/dashboard`, `apps/admin`)
- All packages (`@devarsenal/ui`, `@devarsenal/db`, etc.)
- All scripts and tooling

---

## Step 3: Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in the required values:

### Database

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/devarsenal"
```

For a hosted database, use the connection string from your provider (Neon, Supabase, Railway, etc.).

### Authentication

```bash
NEXTAUTH_SECRET="generate-a-32-char-random-string-here"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret:
```bash
openssl rand -base64 32
```

### Stripe

1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Create three products: Starter ($29/mo), Pro ($79/mo), Studio ($199/mo)
3. Copy each price ID

```bash
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_STUDIO_PRICE_ID="price_..."
```

### Email (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Create an API key
3. Add a verified sending domain

```bash
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@yourdomain.com"
```

### Analytics (PostHog)

1. Sign up at [posthog.com](https://posthog.com) (free tier available)
2. Copy your project API key

```bash
NEXT_PUBLIC_POSTHOG_KEY="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"
```

---

## Step 4: Set Up the Database

Push the Prisma schema to your database:

```bash
pnpm db:push
```

This creates all tables based on the schema in `packages/db/prisma/schema.prisma`.

Then seed the database with demo data:

```bash
pnpm db:seed
```

This creates:
- 3 demo users (admin, founder, member)
- Sample organizations
- Plans (Starter, Pro, Studio)
- Feature flags

---

## Step 5: Start the Development Servers

```bash
pnpm dev
```

Turborepo starts all apps in parallel:

| App | URL |
|-----|-----|
| Marketing site | [http://localhost:3000](http://localhost:3000) |
| Customer dashboard | [http://localhost:3001](http://localhost:3001) |
| Admin panel | [http://localhost:3002](http://localhost:3002) |

---

## Step 6: Log In

Use the seeded demo accounts to explore the apps:

| Email | Password | Role | App |
|-------|----------|------|-----|
| `admin@example.com` | `admin123!` | Super Admin | Admin panel |
| `founder@example.com` | `founder123!` | Org Owner | Dashboard |
| `member@example.com` | `member123!` | Team Member | Dashboard |

---

## Step 7: Set Up Stripe Webhooks (for billing)

To test billing locally, use the Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Log in
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret from the terminal output and add it to `.env.local` as `STRIPE_WEBHOOK_SECRET`.

---

## Running Individual Apps

You can also start individual apps:

```bash
# Run only the web app
pnpm --filter @devarsenal/web dev

# Run only the dashboard
pnpm --filter @devarsenal/dashboard dev

# Run only the admin
pnpm --filter @devarsenal/admin dev
```

---

## Useful Commands

```bash
# Build all apps and packages
pnpm build

# Run linting across all packages
pnpm lint

# Run type checking
pnpm typecheck

# Open Prisma Studio (database GUI)
pnpm db:studio

# Generate Prisma client after schema changes
pnpm db:generate

# Reset the database (WARNING: deletes all data)
pnpm db:reset
```

---

## Troubleshooting

### `pnpm install` fails
- Ensure you're using pnpm 9+: `pnpm --version`
- Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again

### Database connection fails
- Verify `DATABASE_URL` is correct in `.env.local`
- Ensure PostgreSQL is running: `pg_isready`
- Check that the database exists and the user has access

### Stripe webhook not receiving events
- Ensure the Stripe CLI is running with `stripe listen`
- Verify `STRIPE_WEBHOOK_SECRET` matches the CLI output

### TypeScript errors after `pnpm install`
- Run `pnpm db:generate` to regenerate the Prisma client
- Run `pnpm build` once to build all packages before developing

---

## Next Steps

- [Architecture Overview](./architecture.md) — understand how the monorepo is structured
- [Customization Guide](./customize.md) — rebrand and extend DevArsenal
- [Deploy Guide](./deploy.md) — deploy to Vercel, Docker, or self-hosted
- [Security Guide](./security.md) — harden your production deployment
