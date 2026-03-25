# Audit Logs Module

Records every sensitive action in the system for compliance and debugging.

## Usage

```typescript
import { logAction } from "@/features/audit-logs/logger";

await logAction({
  userId: "usr_123",
  organizationId: "org_456",
  action: "api_key.created",
  resource: "api_key",
  resourceId: "key_789",
  metadata: { environment: "live" },
});
```

## Querying Logs

```typescript
const logs = await db.auditLog.findMany({
  where: { organizationId, action: { startsWith: "billing." } },
  orderBy: { createdAt: "desc" },
  take: 50,
});
```
