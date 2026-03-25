# Customization Guide

DevArsenal is designed to be fully white-labeled and extended. This guide covers rebranding, adding new modules, customizing auth, and theming.

---

## Branding

### 1. Brand Colors

All design tokens live in `packages/ui/src/tokens.ts`. Update the color palette to match your brand:

```typescript
export const colors = {
  brand: {
    50:  "#eff6ff",
    100: "#dbeafe",
    500: "#3b82f6",   // ← Primary brand color
    600: "#2563eb",   // ← Hover state
    700: "#1d4ed8",   // ← Active state
    900: "#1e3a8a",
  },
  // ...
};
```

Then update the Tailwind config in each app to use these tokens:

```typescript
// apps/web/tailwind.config.ts
import { colors } from "@devarsenal/ui/tokens";

export default {
  theme: {
    extend: {
      colors: {
        brand: colors.brand,
      },
    },
  },
};
```

### 2. Logo

Replace the logo component in each app:

```tsx
// apps/web/src/components/layout/navbar.tsx
import Image from "next/image";

export function Logo() {
  return (
    <Image
      src="/logo.svg"          // ← Put your logo in public/logo.svg
      alt="Your Product Name"
      width={120}
      height={32}
    />
  );
}
```

Place your logo at:
- `apps/web/public/logo.svg`
- `apps/dashboard/public/logo.svg`
- `apps/admin/public/logo.svg`

### 3. Product Name and Metadata

Update metadata in each app's root layout:

```tsx
// apps/web/src/app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "YourProduct – Your Tagline",
    template: "%s | YourProduct",
  },
  description: "Your product description.",
  openGraph: {
    title: "YourProduct",
    description: "Your product description.",
    url: "https://yourproduct.com",
    siteName: "YourProduct",
  },
};
```

### 4. Landing Page Copy

Edit `apps/web/src/app/page.tsx` to update all marketing copy, headlines, and feature descriptions.

---

## Adding a New Package

To create a new shared package (e.g., `@devarsenal/search`):

### Step 1: Create the package directory

```bash
mkdir -p packages/search/src
```

### Step 2: Create `package.json`

```json
{
  "name": "@devarsenal/search",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.7.3"
  }
}
```

### Step 3: Create `tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

### Step 4: Create `src/index.ts`

```typescript
export * from "./search";
```

### Step 5: Use it in an app

```json
// apps/dashboard/package.json
{
  "dependencies": {
    "@devarsenal/search": "workspace:*"
  }
}
```

No need to update `pnpm-workspace.yaml` — the glob `packages/*` already includes it.

---

## Adding a New App

To add a new Next.js application (e.g., a docs site):

```bash
# Scaffold a new Next.js app
cd apps
pnpm create next-app docs --typescript --tailwind --app --no-src-dir
```

Then update its `package.json`:

```json
{
  "name": "@devarsenal/docs",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@devarsenal/ui": "workspace:*"
  }
}
```

---

## Extending Authentication

### Adding OAuth Providers

Add providers in `packages/auth/src/config.ts`:

```typescript
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    // existing providers...
  ],
};
```

Add the environment variables:

```bash
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### Adding Custom Roles

Update the role enum in `packages/db/prisma/schema.prisma`:

```prisma
enum MembershipRole {
  OWNER
  ADMIN
  BILLING
  MEMBER
  VIEWER
  CUSTOM_ROLE  // ← Add your role
}
```

Then update the permission checks in `packages/auth/src/permissions.ts`.

---

## Theming

### Dark Mode

DevArsenal supports Tailwind's dark mode using the `class` strategy.

Enable it in `tailwind.config.ts`:

```typescript
export default {
  darkMode: "class",
  // ...
};
```

Toggle dark mode in the root layout:

```tsx
// To enable dark mode, add 'dark' class to <html>
<html className={isDark ? "dark" : ""}>
```

### Custom Fonts

Add fonts to each app's layout:

```tsx
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
```

Update Tailwind config:

```typescript
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-inter)"],
      display: ["var(--font-jakarta)"],
    },
  },
},
```

---

## Custom Billing Plans

Update plan definitions in `packages/billing/src/plans.ts`:

```typescript
export const PLANS = {
  starter: {
    name: "Starter",
    price: 29,
    priceId: process.env.STRIPE_STARTER_PRICE_ID!,
    features: ["5 projects", "2 team members", "Basic analytics"],
    limits: { projects: 5, members: 2 },
  },
  pro: {
    name: "Pro",
    price: 79,
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    features: ["Unlimited projects", "10 team members", "Advanced analytics"],
    limits: { projects: -1, members: 10 },
  },
  studio: {
    name: "Studio",
    price: 199,
    priceId: process.env.STRIPE_STUDIO_PRICE_ID!,
    features: ["Everything in Pro", "Unlimited members", "White-label"],
    limits: { projects: -1, members: -1 },
  },
};
```

---

## Email Templates

Customize email templates in `packages/emails/src/templates/`:

```typescript
// packages/emails/src/templates/welcome.ts
export function welcomeEmail(name: string, productName: string): EmailTemplate {
  return {
    subject: `Welcome to ${productName}`,
    html: `
      <h1>Welcome, ${name}!</h1>
      <p>You've just joined ${productName}. Here's how to get started...</p>
    `,
    text: `Welcome, ${name}! You've just joined ${productName}.`,
  };
}
```
