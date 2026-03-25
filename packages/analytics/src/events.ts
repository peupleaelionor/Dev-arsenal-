import { prisma } from '@devarsenal/db'
import { capturePostHogEvent } from './posthog'

export type AnalyticsEvent =
  | 'signup_started'
  | 'signup_completed'
  | 'login'
  | 'logout'
  | 'checkout_started'
  | 'checkout_completed'
  | 'subscription_upgraded'
  | 'subscription_downgraded'
  | 'subscription_cancelled'
  | 'first_project_created'
  | 'project_created'
  | 'feature_used'
  | 'api_key_created'
  | 'api_key_deleted'
  | 'onboarding_step_completed'
  | 'onboarding_completed'
  | 'page_view'

export interface EventProperties {
  signup_started: { method: 'email' | 'oauth'; provider?: string }
  signup_completed: { userId: string; email: string; method: 'email' | 'oauth' }
  login: { userId: string; method: 'email' | 'oauth'; provider?: string }
  logout: { userId: string }
  checkout_started: { organizationId: string; planId: string; priceId: string }
  checkout_completed: { organizationId: string; planId: string; amount: number; currency: string }
  subscription_upgraded: { organizationId: string; fromPlan: string; toPlan: string }
  subscription_downgraded: { organizationId: string; fromPlan: string; toPlan: string }
  subscription_cancelled: { organizationId: string; plan: string; reason?: string }
  first_project_created: { organizationId: string; projectId: string }
  project_created: { organizationId: string; projectId: string }
  feature_used: { feature: string; organizationId: string; userId: string }
  api_key_created: { organizationId: string; userId: string }
  api_key_deleted: { organizationId: string; userId: string; keyId: string }
  onboarding_step_completed: { step: string; organizationId: string; userId: string }
  onboarding_completed: { organizationId: string; userId: string }
  page_view: { path: string; userId?: string; organizationId?: string }
}

export async function trackEvent<T extends AnalyticsEvent>(
  event: T,
  properties: EventProperties[T],
  userId?: string,
): Promise<void> {
  const props = properties as Record<string, unknown>
  const organizationId = (props.organizationId as string | undefined) ?? null

  const saveToDb = organizationId
    ? prisma.usageEvent.create({
        data: {
          organizationId,
          userId: userId ?? null,
          event,
          properties: props,
        },
      })
    : Promise.resolve()

  const sendToPosthog = capturePostHogEvent({
    distinctId: userId ?? organizationId ?? 'anonymous',
    event,
    properties: props,
    timestamp: new Date().toISOString(),
  })

  await Promise.allSettled([saveToDb, sendToPosthog])
}
