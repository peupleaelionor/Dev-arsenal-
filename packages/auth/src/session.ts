import { auth } from './config'
import { UnauthorizedError } from '@devarsenal/utils'

export interface SessionUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
  role: string
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await auth()
  if (!session?.user) return null
  const user = session.user as SessionUser
  if (!user.id || !user.email) return null
  return user
}

export async function getCurrentOrganizationId(
  headers?: Headers,
): Promise<string | null> {
  const orgId =
    headers?.get('x-organization-id') ??
    headers?.get('x-org-id') ??
    null
  return orgId
}

export async function assertAuthenticated(): Promise<SessionUser> {
  const user = await getCurrentUser()
  if (!user) throw new UnauthorizedError('You must be signed in to access this resource')
  return user
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return user !== null
}
