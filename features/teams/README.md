# Teams Module

Handles team member management: invitations, role changes, and removal.

## Features
- Email-based invitations with secure tokens
- Token expiry (48 hours)
- Role assignment on join
- Duplicate invitation prevention

## Usage

```typescript
import { createInvitation, validateInvitationToken, acceptInvitation } from "@/features/teams/invite";

// Send an invitation
const invitation = await createInvitation({
  email: "newmember@example.com",
  organizationId: "org_123",
  role: "MEMBER",
  invitedById: "usr_456",
});
// Send invitation.token via email

// Validate token when user clicks the link
const invite = await validateInvitationToken(token);

// Accept and create membership
await acceptInvitation(token, userId);
```
