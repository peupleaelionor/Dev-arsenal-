import crypto from "crypto";

export type InvitationRole = "ADMIN" | "MEMBER" | "BILLING" | "VIEWER";

export interface InvitationData {
  email: string;
  organizationId: string;
  role: InvitationRole;
  invitedById: string;
}

export interface Invitation {
  id: string;
  token: string;
  email: string;
  organizationId: string;
  role: InvitationRole;
  invitedById: string;
  expiresAt: Date;
}

const EXPIRY_HOURS = 48;

/**
 * Generates a secure invitation token and stores the invitation.
 */
export async function createInvitation(data: InvitationData): Promise<Invitation> {
  const { db } = await import("@devarsenal/db");

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + EXPIRY_HOURS * 60 * 60 * 1000);

  // Remove any existing pending invitation for this email+org
  await db.invitation.deleteMany({
    where: { email: data.email, organizationId: data.organizationId },
  });

  const invitation = await db.invitation.create({
    data: {
      token,
      email: data.email,
      organizationId: data.organizationId,
      role: data.role,
      invitedById: data.invitedById,
      expiresAt,
    },
  });

  return invitation as Invitation;
}

/**
 * Validates an invitation token and returns the invitation if valid.
 * Throws if the token is invalid, expired, or already used.
 */
export async function validateInvitationToken(token: string): Promise<Invitation> {
  const { db } = await import("@devarsenal/db");

  const invitation = await db.invitation.findUnique({ where: { token } });

  if (!invitation) {
    throw new Error("Invitation not found or already used.");
  }

  if (invitation.expiresAt < new Date()) {
    throw new Error("Invitation has expired. Please request a new one.");
  }

  return invitation as Invitation;
}

/**
 * Accepts an invitation: creates membership and deletes the invitation.
 */
export async function acceptInvitation(token: string, userId: string): Promise<void> {
  const { db } = await import("@devarsenal/db");

  const invitation = await validateInvitationToken(token);

  await db.$transaction([
    db.membership.create({
      data: {
        userId,
        organizationId: invitation.organizationId,
        role: invitation.role,
      },
    }),
    db.invitation.delete({ where: { token } }),
  ]);
}

/**
 * Revokes a pending invitation by ID.
 */
export async function revokeInvitation(id: string, organizationId: string): Promise<void> {
  const { db } = await import("@devarsenal/db");

  await db.invitation.deleteMany({ where: { id, organizationId } });
}
