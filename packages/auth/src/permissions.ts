export type Role = 'OWNER' | 'ADMIN' | 'MEMBER' | 'BILLING' | 'VIEWER'

export type Action =
  | 'project:create'
  | 'project:read'
  | 'project:update'
  | 'project:delete'
  | 'member:invite'
  | 'member:remove'
  | 'member:update'
  | 'billing:read'
  | 'billing:manage'
  | 'settings:read'
  | 'settings:update'
  | 'apikey:create'
  | 'apikey:delete'
  | 'audit:read'

export const ROLE_PERMISSIONS: Record<Role, Action[]> = {
  OWNER: [
    'project:create',
    'project:read',
    'project:update',
    'project:delete',
    'member:invite',
    'member:remove',
    'member:update',
    'billing:read',
    'billing:manage',
    'settings:read',
    'settings:update',
    'apikey:create',
    'apikey:delete',
    'audit:read',
  ],
  ADMIN: [
    'project:create',
    'project:read',
    'project:update',
    'project:delete',
    'member:invite',
    'member:remove',
    'member:update',
    'billing:read',
    'settings:read',
    'settings:update',
    'apikey:create',
    'apikey:delete',
    'audit:read',
  ],
  MEMBER: [
    'project:create',
    'project:read',
    'project:update',
    'settings:read',
    'apikey:create',
    'apikey:delete',
  ],
  BILLING: [
    'billing:read',
    'billing:manage',
    'settings:read',
  ],
  VIEWER: [
    'project:read',
    'settings:read',
  ],
}

const ROLE_HIERARCHY: Role[] = ['VIEWER', 'BILLING', 'MEMBER', 'ADMIN', 'OWNER']

export function canAccess(role: Role, action: Action): boolean {
  return ROLE_PERMISSIONS[role].includes(action)
}

export function requireRole(userRole: Role, minimumRole: Role): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(minimumRole)
}

export function hasAnyPermission(role: Role, actions: Action[]): boolean {
  return actions.some((action) => canAccess(role, action))
}
