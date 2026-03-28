import { PrismaClient, UserRole, MemberRole, OrgPlan, PlanInterval, InvoiceStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ─── Users ─────────────────────────────────────────────────────────────────
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Alex Admin',
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
  })

  const founderUser = await prisma.user.upsert({
    where: { email: 'founder@example.com' },
    update: {},
    create: {
      email: 'founder@example.com',
      name: 'Sam Founder',
      role: UserRole.MEMBER,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
    },
  })

  const memberUser = await prisma.user.upsert({
    where: { email: 'member@example.com' },
    update: {},
    create: {
      email: 'member@example.com',
      name: 'Jordan Member',
      role: UserRole.MEMBER,
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    },
  })

  console.log('✅ Users created')

  // ─── Organizations ──────────────────────────────────────────────────────────
  const acmeCorp = await prisma.organization.upsert({
    where: { slug: 'acme-corp' },
    update: {},
    create: {
      name: 'Acme Corp',
      slug: 'acme-corp',
      plan: OrgPlan.PRO,
      subscriptionStatus: 'ACTIVE',
      stripeCustomerId: 'cus_acme_example',
    },
  })

  const buildFastStudio = await prisma.organization.upsert({
    where: { slug: 'buildfast-studio' },
    update: {},
    create: {
      name: 'BuildFast Studio',
      slug: 'buildfast-studio',
      plan: OrgPlan.STARTER,
      subscriptionStatus: 'TRIALING',
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  })

  console.log('✅ Organizations created')

  // ─── Memberships ───────────────────────────────────────────────────────────
  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: adminUser.id, organizationId: acmeCorp.id } },
    update: {},
    create: { userId: adminUser.id, organizationId: acmeCorp.id, role: MemberRole.OWNER },
  })

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: founderUser.id, organizationId: acmeCorp.id } },
    update: {},
    create: { userId: founderUser.id, organizationId: acmeCorp.id, role: MemberRole.ADMIN },
  })

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: founderUser.id, organizationId: buildFastStudio.id } },
    update: {},
    create: { userId: founderUser.id, organizationId: buildFastStudio.id, role: MemberRole.OWNER },
  })

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: memberUser.id, organizationId: acmeCorp.id } },
    update: {},
    create: { userId: memberUser.id, organizationId: acmeCorp.id, role: MemberRole.MEMBER },
  })

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: memberUser.id, organizationId: buildFastStudio.id } },
    update: {},
    create: { userId: memberUser.id, organizationId: buildFastStudio.id, role: MemberRole.MEMBER },
  })

  console.log('✅ Memberships created')

  // ─── Plans ─────────────────────────────────────────────────────────────────
  await prisma.plan.upsert({
    where: { slug: 'starter' },
    update: {},
    create: {
      name: 'Starter',
      slug: 'starter',
      description: 'Perfect for solo developers and small projects',
      price: 2900,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['3 projects', '2 team members', '10,000 API calls/month', '5 GB storage', 'Email support'],
      stripePriceId: 'price_starter_monthly',
      isActive: true,
    },
  })

  await prisma.plan.upsert({
    where: { slug: 'pro' },
    update: {},
    create: {
      name: 'Pro',
      slug: 'pro',
      description: 'For growing teams building serious products',
      price: 7900,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['Unlimited projects', '10 team members', '100,000 API calls/month', '50 GB storage', 'Priority support', 'SSO (SAML)'],
      stripePriceId: 'price_pro_monthly',
      isActive: true,
    },
  })

  await prisma.plan.upsert({
    where: { slug: 'studio' },
    update: {},
    create: {
      name: 'Studio',
      slug: 'studio',
      description: 'For agencies and power users',
      price: 14900,
      currency: 'usd',
      interval: PlanInterval.MONTHLY,
      features: ['Unlimited projects', 'Unlimited team members', '1,000,000 API calls/month', '500 GB storage', 'Dedicated support', 'SLA guarantee', 'White-labeling'],
      stripePriceId: 'price_studio_monthly',
      isActive: true,
    },
  })

  console.log('✅ Plans created')

  // ─── Projects ──────────────────────────────────────────────────────────────
  await prisma.project.upsert({
    where: { organizationId_slug: { organizationId: acmeCorp.id, slug: 'main-api' } },
    update: {},
    create: {
      organizationId: acmeCorp.id,
      name: 'Main API',
      slug: 'main-api',
      description: 'Core REST API for Acme Corp products',
      createdBy: adminUser.id,
    },
  })

  await prisma.project.upsert({
    where: { organizationId_slug: { organizationId: acmeCorp.id, slug: 'dashboard-v2' } },
    update: {},
    create: {
      organizationId: acmeCorp.id,
      name: 'Dashboard v2',
      slug: 'dashboard-v2',
      description: 'Next-generation customer dashboard',
      createdBy: founderUser.id,
    },
  })

  await prisma.project.upsert({
    where: { organizationId_slug: { organizationId: buildFastStudio.id, slug: 'client-portal' } },
    update: {},
    create: {
      organizationId: buildFastStudio.id,
      name: 'Client Portal',
      slug: 'client-portal',
      description: 'Agency client management portal',
      createdBy: founderUser.id,
    },
  })

  console.log('✅ Projects created')

  // ─── Audit Logs ────────────────────────────────────────────────────────────
  await prisma.auditLog.createMany({
    data: [
      {
        organizationId: acmeCorp.id,
        userId: adminUser.id,
        action: 'organization.created',
        resource: 'organization',
        resourceId: acmeCorp.id,
        metadata: { name: 'Acme Corp' },
      },
      {
        organizationId: acmeCorp.id,
        userId: adminUser.id,
        action: 'member.invited',
        resource: 'membership',
        resourceId: founderUser.id,
        metadata: { email: founderUser.email, role: 'ADMIN' },
      },
      {
        organizationId: acmeCorp.id,
        userId: founderUser.id,
        action: 'project.created',
        resource: 'project',
        metadata: { name: 'Dashboard v2' },
      },
      {
        organizationId: buildFastStudio.id,
        userId: founderUser.id,
        action: 'organization.created',
        resource: 'organization',
        resourceId: buildFastStudio.id,
        metadata: { name: 'BuildFast Studio' },
      },
    ],
  })

  console.log('✅ Audit logs created')
  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
