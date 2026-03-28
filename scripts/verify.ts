#!/usr/bin/env node
/**
 * Verification script — checks env vars, DB connection, and TypeScript.
 */
import { spawnSync } from "child_process";
import * as path from "path";

const ROOT = path.resolve(__dirname, "..");
let exitCode = 0;

function check(label: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${label}`);
  } catch (e) {
    console.error(`✗ ${label}: ${(e as Error).message}`);
    exitCode = 1;
  }
}

const REQUIRED_ENV_VARS = [
  "DATABASE_URL",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
];

function checkEnvVars() {
  const missing = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);
  if (missing.length > 0) throw new Error(`Missing: ${missing.join(", ")}`);
}

function checkTypeScript() {
  const result = spawnSync("pnpm typecheck", { shell: true, cwd: ROOT, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || "TypeScript errors found");
}

function checkBuild() {
  const result = spawnSync("pnpm build", { shell: true, cwd: ROOT, encoding: "utf8" });
  if (result.status !== 0) throw new Error("Build failed");
}

console.log("\n⚡ DevArsenal Verification\n" + "=".repeat(40));
check("Required environment variables", checkEnvVars);
check("TypeScript", checkTypeScript);
check("Build", checkBuild);
console.log("=".repeat(40));

if (exitCode === 0) {
  console.log("✅ All checks passed\n");
} else {
  console.error("❌ Some checks failed\n");
}
process.exit(exitCode);
