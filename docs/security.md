# Security Documentation

DevArsenal is designed with security as a first-class concern. This document covers the security architecture, controls in place, and recommendations for hardening your production deployment.

---

## Authentication Security

### NextAuth v5

Authentication is handled by NextAuth v5 with the following configuration:

- **Session strategy**: JWT (stateless, no DB session table needed)
- **Token expiry**: 30 days (configurable)
- **Secure cookies**: `httpOnly`, `sameSite: lax`, `secure: true` in production
- **CSRF protection**: Built into NextAuth via the double-submit cookie pattern

### Password Handling

- Passwords are hashed with **bcrypt** (cost factor 12)
- Password reset tokens are single-use and expire after 1 hour
- Minimum password length: 8 characters (enforce more if needed)
- No plaintext passwords are ever stored or logged

### Session Tokens

- JWT tokens are signed with `NEXTAUTH_SECRET`
- Tokens include the user ID, role, and organization context
- Tokens are validated on every request via middleware

---

## Authorization (RBAC)

Authorization is enforced at **two independent layers** (defense in depth):

### Layer 1: Middleware

```typescript
// middleware.ts — runs on every request before any page renders
export function middleware(request: NextRequest) {
  const token = getToken(request);
  
  if (!token && isProtectedRoute(request.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  if (isAdminRoute(request.pathname) && token?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}
```

### Layer 2: Server Components / Route Handlers

Even if middleware is bypassed (e.g., via misconfiguration), every sensitive page and API endpoint re-validates the session:

```typescript
export default async function AdminPage() {
  const session = await requireSession(); // throws 401 if not authenticated
  requireRole(session, ["SUPER_ADMIN"]);   // throws 403 if wrong role
}
```

This "trust nothing" approach means a single misconfiguration cannot expose data.

---

## Data Access Security

### Multi-Tenant Isolation

Every database query includes an `organizationId` filter. It is impossible to access another organization's data through normal application flow.

**Never query without org scoping:**

```typescript
// ✅ Safe
const data = await db.project.findMany({
  where: { organizationId: session.organizationId },
});

// ❌ Dangerous — exposes all organizations' data
const data = await db.project.findMany();
```

### Direct Database Access

- Database is not exposed to the public internet
- All DB access goes through Prisma on the server side
- Client components never have direct database access

---

## API Security

### Input Validation

All API inputs are validated using Zod before processing:

```typescript
const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

const input = schema.parse(req.body); // throws ZodError if invalid
```

### Rate Limiting

Implement rate limiting on sensitive endpoints:

```typescript
// Recommended: use upstash/ratelimit or similar
const rateLimiter = new Ratelimit({
  limiter: Ratelimit.slidingWindow(10, "1m"), // 10 requests per minute
});

const { success } = await rateLimiter.limit(ip);
if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
```

Apply to:
- `/api/auth/signin` — prevent brute force
- `/api/auth/signup` — prevent account farming
- All public API endpoints

### CORS

Next.js Route Handlers restrict origins automatically. For additional control:

```typescript
export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigins = ["https://yourdomain.com", "https://app.yourdomain.com"];
  
  if (origin && !allowedOrigins.includes(origin)) {
    return new Response("Forbidden", { status: 403 });
  }
}
```

---

## Stripe Webhook Security

All incoming Stripe webhooks are verified using the webhook signing secret:

```typescript
export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
  
  // Process event...
}
```

**Never process Stripe events without signature verification.**

---

## API Key Security

API keys follow the format: `da_live_<random>` or `da_test_<random>`

- Keys are generated using **cryptographically secure** random bytes (`crypto.randomBytes`)
- The **full key is shown only once** at creation time
- Only a **bcrypt hash** is stored in the database
- Keys have a `prefix` field to allow lookup without storing the full key

```typescript
const raw = `da_live_${randomBytes(32).toString("hex")}`;
const hash = await bcrypt.hash(raw, 12);
// Store hash, show raw to user once
```

---

## Audit Logging

Every sensitive action is recorded in the `AuditLog` table:

- User login/logout
- Member invitation and removal
- Billing changes
- API key creation/revocation
- Admin actions

Audit logs are **append-only** — they can be queried but not modified through the application.

---

## Security Headers

Add security headers in `next.config.ts`:

```typescript
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "connect-src 'self' https://api.posthog.com",
    ].join("; "),
  },
];

export default {
  headers: async () => [
    { source: "/(.*)", headers: securityHeaders },
  ],
};
```

---

## Production Hardening Checklist

Before going to production, verify:

- [ ] `NEXTAUTH_SECRET` is a random 32+ character string
- [ ] Database is not publicly accessible
- [ ] Stripe webhook signature verification is active
- [ ] All environment variables use production values (live Stripe keys, real domains)
- [ ] Rate limiting is enabled on auth endpoints
- [ ] Security headers are configured
- [ ] Error messages don't leak internal details to users
- [ ] Admin panel is on a separate domain with additional protection
- [ ] Database backups are configured
- [ ] Audit logs are being recorded

---

## Reporting Security Issues

If you discover a security vulnerability in DevArsenal, please do **not** open a public GitHub issue.

Instead, email [security@devarsenal.com](mailto:security@devarsenal.com) with:
- Description of the vulnerability
- Steps to reproduce
- Potential impact

We will respond within 48 hours and coordinate a fix and disclosure.
