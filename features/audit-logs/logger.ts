export type AuditAction =
  | "user.login"
  | "user.logout"
  | "user.updated"
  | "user.deleted"
  | "org.created"
  | "org.updated"
  | "org.deleted"
  | "member.invited"
  | "member.joined"
  | "member.removed"
  | "member.role_changed"
  | "billing.subscribed"
  | "billing.cancelled"
  | "billing.plan_changed"
  | "api_key.created"
  | "api_key.revoked"
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "admin.user_banned"
  | "admin.user_unbanned";

export interface AuditLogEntry {
  userId: string;
  organizationId: string;
  action: AuditAction;
  resource?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Logs a sensitive action to the audit trail.
 * Designed to be fire-and-forget — errors are caught and logged but not thrown.
 */
export async function logAction(entry: AuditLogEntry): Promise<void> {
  try {
    // Dynamic import to avoid requiring db in all contexts
    const { db } = await import("@devarsenal/db");
    await db.auditLog.create({
      data: {
        userId: entry.userId,
        organizationId: entry.organizationId,
        action: entry.action,
        resource: entry.resource,
        resourceId: entry.resourceId,
        metadata: entry.metadata ? JSON.stringify(entry.metadata) : undefined,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });
  } catch (error) {
    // Audit logging must never crash the main request
    console.error("[AuditLog] Failed to write audit log:", error);
  }
}

/**
 * Formats an audit action for human-readable display.
 */
export function formatAuditAction(action: AuditAction): string {
  const labels: Record<AuditAction, string> = {
    "user.login": "Logged in",
    "user.logout": "Logged out",
    "user.updated": "Updated profile",
    "user.deleted": "Deleted account",
    "org.created": "Created organization",
    "org.updated": "Updated organization",
    "org.deleted": "Deleted organization",
    "member.invited": "Invited member",
    "member.joined": "Joined organization",
    "member.removed": "Removed member",
    "member.role_changed": "Changed member role",
    "billing.subscribed": "Started subscription",
    "billing.cancelled": "Cancelled subscription",
    "billing.plan_changed": "Changed plan",
    "api_key.created": "Created API key",
    "api_key.revoked": "Revoked API key",
    "project.created": "Created project",
    "project.updated": "Updated project",
    "project.deleted": "Deleted project",
    "admin.user_banned": "Banned user",
    "admin.user_unbanned": "Unbanned user",
  };
  return labels[action] ?? action;
}
