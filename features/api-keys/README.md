# API Keys Module

Manages programmatic access keys for organizations.

## Features
- Secure key generation with `da_live_` / `da_test_` prefix
- bcrypt hashing — full key shown only once
- Per-org scoping
- Revocation support
- Last-used tracking

## Usage

```typescript
import { generateApiKey, verifyApiKey } from "@/features/api-keys/generate";

// Create a key
const { raw, hash, prefix } = await generateApiKey("live");
// Store hash + prefix in DB, return raw to user once

// Verify an incoming key
const isValid = await verifyApiKey(incomingKey, storedHash);
```
