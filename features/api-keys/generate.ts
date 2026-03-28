import crypto from "crypto";
import { createHash } from "crypto";

export type ApiKeyEnvironment = "live" | "test";

export interface GeneratedApiKey {
  raw: string;
  hash: string;
  prefix: string;
  environment: ApiKeyEnvironment;
}

/**
 * Generates a new API key. The raw key is shown once; only the hash is stored.
 */
export async function generateApiKey(
  environment: ApiKeyEnvironment = "live"
): Promise<GeneratedApiKey> {
  const randomPart = crypto.randomBytes(32).toString("hex");
  const raw = `da_${environment}_${randomPart}`;
  const prefix = raw.substring(0, 12);

  // SHA-256 hash for fast lookup; use bcrypt for high-security contexts
  const hash = createHash("sha256").update(raw).digest("hex");

  return { raw, hash, prefix, environment };
}

/**
 * Verifies an incoming API key against a stored hash.
 */
export function verifyApiKey(raw: string, storedHash: string): boolean {
  const hash = createHash("sha256").update(raw).digest("hex");
  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(storedHash, "hex")
  );
}

/**
 * Extracts the prefix from a raw API key for DB lookup.
 */
export function extractKeyPrefix(raw: string): string {
  return raw.substring(0, 12);
}

/**
 * Masks an API key for display: da_live_abc...xyz
 */
export function maskApiKey(raw: string): string {
  if (raw.length < 16) return "****";
  return `${raw.substring(0, 12)}...${raw.substring(raw.length - 4)}`;
}
