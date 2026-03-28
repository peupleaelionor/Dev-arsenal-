# Deployment Guide

DevArsenal supports three deployment targets: **Vercel** (recommended), **Docker**, and **self-hosted** with Node.js.

---

## Vercel (Recommended)

Vercel is the native deployment platform for Next.js and requires the least configuration.

### Option A: GitHub Integration (Easiest)

1. Push your code to GitHub
2. Log in to [vercel.com](https://vercel.com)
3. Click **Add New → Project**
4. Import your GitHub repository
5. Vercel auto-detects Next.js apps
6. Set up environment variables (see below)
7. Click **Deploy**

For a monorepo, deploy each app as a separate Vercel project using the Root Directory override:
- `apps/web` → your main domain
- `apps/dashboard` → `app.yourdomain.com`
- `apps/admin` → `admin.yourdomain.com`

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy the web app
cd apps/web
vercel --prod

# Deploy the dashboard
cd ../dashboard
vercel --prod

# Deploy admin
cd ../admin
vercel --prod
```

### Vercel Environment Variables

Set these in each Vercel project's **Settings → Environment Variables**:

```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_STARTER_PRICE_ID
STRIPE_PRO_PRICE_ID
STRIPE_STUDIO_PRICE_ID
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_POSTHOG_KEY
NEXT_PUBLIC_POSTHOG_HOST
```

### Build Commands

The Vercel config files in `infra/vercel/` define the build commands:

- **web**: `cd ../.. && pnpm build --filter=@devarsenal/web`
- **dashboard**: `cd ../.. && pnpm build --filter=@devarsenal/dashboard`
- **admin**: `cd ../.. && pnpm build --filter=@devarsenal/admin`

### Stripe Webhooks on Vercel

After deploying, update your Stripe webhook endpoint:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

---

## Docker

For self-hosted or containerized deployments.

### Quick Start

```bash
# Clone and enter the repo
git clone https://github.com/yourusername/devarsenal
cd devarsenal

# Copy and configure environment
cp .env.example .env

# Build and start all services
docker-compose up --build
```

Services started:
- `web` — Marketing site on port 3000
- `dashboard` — Customer app on port 3001
- `admin` — Admin panel on port 3002
- `postgres` — PostgreSQL database on port 5432

### Production Docker Build

```bash
# Build production image for the web app
docker build -f infra/docker/Dockerfile --target=runner -t devarsenal-web .

# Run with environment variables
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://yourdomain.com" \
  devarsenal-web
```

### Database Migrations in Docker

When running for the first time or after schema changes:

```bash
# Run migrations
docker-compose exec web pnpm db:migrate

# Or seed the database
docker-compose exec web pnpm db:seed
```

---

## Self-Hosted (Node.js)

For VPS deployments on services like DigitalOcean, Hetzner, AWS EC2, etc.

### Server Requirements

- Ubuntu 22.04+ (or similar Linux)
- Node.js 20+
- pnpm 9+
- PostgreSQL 14+
- Nginx (for reverse proxy)
- PM2 (for process management)

### Setup Steps

#### 1. Install dependencies on your server

```bash
# Install Node.js (using nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Install pnpm
npm install -g pnpm pm2

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib
```

#### 2. Clone and configure

```bash
git clone https://github.com/yourusername/devarsenal /opt/devarsenal
cd /opt/devarsenal
cp .env.example .env
# Edit .env with production values
nano .env
```

#### 3. Install and build

```bash
pnpm install
pnpm db:migrate
pnpm db:seed  # only on first deploy
pnpm build
```

#### 4. Start with PM2

```bash
# Start all apps
pm2 start ecosystem.config.js

# Save PM2 config to survive reboots
pm2 save
pm2 startup
```

Create `ecosystem.config.js` in the repo root:

```javascript
module.exports = {
  apps: [
    {
      name: "devarsenal-web",
      cwd: "./apps/web",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      env: { NODE_ENV: "production" },
    },
    {
      name: "devarsenal-dashboard",
      cwd: "./apps/dashboard",
      script: "node_modules/.bin/next",
      args: "start -p 3001",
      env: { NODE_ENV: "production" },
    },
    {
      name: "devarsenal-admin",
      cwd: "./apps/admin",
      script: "node_modules/.bin/next",
      args: "start -p 3002",
      env: { NODE_ENV: "production" },
    },
  ],
};
```

#### 5. Configure Nginx

```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    server_name app.yourdomain.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Install SSL with Certbot:

```bash
sudo certbot --nginx -d yourdomain.com -d app.yourdomain.com -d admin.yourdomain.com
```

---

## Continuous Deployment

DevArsenal includes a GitHub Actions CI workflow at `infra/github-actions/ci.yml` that runs on every push:

1. Lint
2. Type check
3. Test
4. Build

For automatic deployment on push to `main`, connect your GitHub repo to Vercel and enable automatic deployments.

---

## Environment-Specific Config

| Variable | Development | Production |
|----------|-------------|------------|
| `NEXTAUTH_URL` | `http://localhost:3000` | `https://yourdomain.com` |
| `DATABASE_URL` | local PostgreSQL | hosted DB (Neon/Supabase) |
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_live_...` |
| `NODE_ENV` | `development` | `production` |

Always use test keys in development and live keys in production.
