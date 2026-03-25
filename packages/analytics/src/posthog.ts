interface PostHogEvent {
  distinctId: string
  event: string
  properties?: Record<string, unknown>
  timestamp?: string
}

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const POSTHOG_HOST = process.env.POSTHOG_HOST ?? 'https://app.posthog.com'

export async function capturePostHogEvent(event: PostHogEvent): Promise<void> {
  if (!POSTHOG_API_KEY) return

  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        distinct_id: event.distinctId,
        event: event.event,
        properties: event.properties ?? {},
        timestamp: event.timestamp ?? new Date().toISOString(),
      }),
    })
  } catch {
    // Silently fail — analytics should never break the app
  }
}

export async function identifyUser(
  distinctId: string,
  properties: Record<string, unknown>,
): Promise<void> {
  if (!POSTHOG_API_KEY) return

  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: POSTHOG_API_KEY,
        distinct_id: distinctId,
        event: '$identify',
        properties: {
          $set: properties,
        },
        timestamp: new Date().toISOString(),
      }),
    })
  } catch {
    // Silently fail
  }
}
