import Stripe from 'stripe'
import { prisma } from '@devarsenal/db'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function createCheckoutSession(
  organizationId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string,
): Promise<Stripe.Checkout.Session> {
  const organization = await prisma.organization.findUniqueOrThrow({
    where: { id: organizationId },
  })

  const customer = organization.stripeCustomerId
    ? organization.stripeCustomerId
    : undefined

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { organizationId },
    subscription_data: {
      metadata: { organizationId },
    },
  })

  return session
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
): Promise<Stripe.BillingPortal.Session> {
  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export async function createOrGetStripeCustomer(
  organizationId: string,
  email: string,
  name: string,
): Promise<Stripe.Customer> {
  const organization = await prisma.organization.findUniqueOrThrow({
    where: { id: organizationId },
  })

  if (organization.stripeCustomerId) {
    const existing = await stripe.customers.retrieve(organization.stripeCustomerId)
    if (!existing.deleted) return existing as Stripe.Customer
  }

  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { organizationId },
  })

  await prisma.organization.update({
    where: { id: organizationId },
    data: { stripeCustomerId: customer.id },
  })

  return customer
}

export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
}

export async function handleWebhookEvent(
  rawBody: string,
  signature: string,
): Promise<{ received: boolean }> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    throw new Error(`Webhook signature verification failed: ${message}`)
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const organizationId = session.metadata?.organizationId
      if (!organizationId || !session.subscription || !session.customer) break

      await prisma.organization.update({
        where: { id: organizationId },
        data: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          subscriptionStatus: 'ACTIVE',
        },
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      const organizationId = subscription.metadata?.organizationId
      if (!organizationId) break

      await prisma.subscription.upsert({
        where: { stripeSubscriptionId: subscription.id },
        create: {
          organizationId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0]?.price.id ?? '',
          stripeCustomerId: subscription.customer as string,
          status: subscription.status.toUpperCase() as never,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
        update: {
          status: subscription.status.toUpperCase() as never,
          currentPeriodStart: new Date(subscription.current_period_start * 1000),
          currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        },
      })

      await prisma.organization.update({
        where: { id: organizationId },
        data: { subscriptionStatus: subscription.status.toUpperCase() as never },
      })
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      const organizationId = subscription.metadata?.organizationId
      if (!organizationId) break

      await prisma.organization.update({
        where: { id: organizationId },
        data: { subscriptionStatus: 'CANCELED' },
      })
      break
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice
      const organizationId = (invoice.subscription_details?.metadata?.organizationId ??
        invoice.metadata?.organizationId) as string | undefined
      if (!organizationId || !invoice.id) break

      await prisma.invoice.upsert({
        where: { stripeInvoiceId: invoice.id },
        create: {
          organizationId,
          stripeInvoiceId: invoice.id,
          amount: invoice.amount_paid,
          currency: invoice.currency,
          status: 'PAID',
          paidAt: invoice.status_transitions?.paid_at
            ? new Date(invoice.status_transitions.paid_at * 1000)
            : new Date(),
        },
        update: {
          status: 'PAID',
          paidAt: invoice.status_transitions?.paid_at
            ? new Date(invoice.status_transitions.paid_at * 1000)
            : new Date(),
        },
      })
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const organizationId = (invoice.subscription_details?.metadata?.organizationId ??
        invoice.metadata?.organizationId) as string | undefined
      if (!organizationId) break

      await prisma.organization.update({
        where: { id: organizationId },
        data: { subscriptionStatus: 'PAST_DUE' },
      })
      break
    }

    default:
      break
  }

  return { received: true }
}
