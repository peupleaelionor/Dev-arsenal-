# FAQ

**What is DevArsenal?**
A premium production-ready monorepo with auth, billing, dashboards, admin tools, and a full design system to launch SaaS products in days, not months.

**Is it production-ready?**
Yes. Architecture, security patterns, and code quality are designed for real products.

**What's included?**
4 Next.js apps (web, dashboard, admin, docs), 11 shared packages, templates, scripts, and full documentation.

**Can I use it for client work?**
Yes, with the Studio or Enterprise license.

**How do I get support?**
Open a GitHub issue or email support@devarsenal.com.

**Can I white-label it?**
Yes, with the Studio license. Every element is designed to be white-labeled.

**Does it work with my database provider?**
It uses PostgreSQL. Any provider works: Neon, Supabase, Railway, PlanetScale (via compatibility), self-hosted.

**How do I upgrade the Next.js version?**
Update the version in each app's `package.json`, run `pnpm install`, fix any breaking changes.

**Can I remove packages I don't need?**
Yes. Each package is optional. Remove it from `package.json` dependencies in the apps that don't need it.

**Is there a CLI?**
Not yet. `npx create-devarsenal-app` is on the roadmap.

**What happens if Stripe changes their API?**
The billing package abstracts all Stripe calls. Update one file to stay current.

**How do I add a new database model?**
Add it to `packages/db/prisma/schema.prisma`, run `pnpm db:generate`, then use it via `@devarsenal/db`.
