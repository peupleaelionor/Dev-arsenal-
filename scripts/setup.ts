#!/usr/bin/env node
/**
 * DevArsenal setup script — checks prerequisites and initializes the project.
 */
import { execSync, spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const ROOT = path.resolve(__dirname, "..");

function log(msg: string) { console.log(`\n✓ ${msg}`); }
function warn(msg: string) { console.warn(`\n⚠ ${msg}`); }
function fail(msg: string) { console.error(`\n✗ ${msg}`); process.exit(1); }

function run(cmd: string, cwd = ROOT): string {
  const result = spawnSync(cmd, { shell: true, cwd, encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || result.stdout);
  return result.stdout.trim();
}

function checkNodeVersion() {
  const v = process.version;
  const major = parseInt(v.slice(1).split(".")[0]);
  if (major < 20) fail(`Node.js 20+ required. You have ${v}`);
  log(`Node.js ${v}`);
}

function checkPnpm() {
  try {
    const v = run("pnpm --version");
    const major = parseInt(v.split(".")[0]);
    if (major < 9) warn(`pnpm 9+ recommended. You have ${v}`);
    else log(`pnpm ${v}`);
  } catch {
    fail("pnpm not found. Install with: npm install -g pnpm");
  }
}

function checkEnvFile() {
  const envLocal = path.join(ROOT, ".env.local");
  const envExample = path.join(ROOT, ".env.example");
  if (!fs.existsSync(envLocal)) {
    if (fs.existsSync(envExample)) {
      fs.copyFileSync(envExample, envLocal);
      warn(".env.local created from .env.example — please fill in your credentials");
    } else {
      warn(".env.local not found — create it before running the app");
    }
  } else {
    log(".env.local found");
  }
}

function installDependencies() {
  console.log("\n→ Installing dependencies with pnpm...");
  run("pnpm install");
  log("Dependencies installed");
}

function generatePrismaClient() {
  console.log("\n→ Generating Prisma client...");
  try {
    run("pnpm db:generate");
    log("Prisma client generated");
  } catch (e) {
    warn("Could not generate Prisma client. Ensure DATABASE_URL is set.");
  }
}

async function main() {
  console.log("\n⚡ DevArsenal Setup\n" + "=".repeat(40));

  checkNodeVersion();
  checkPnpm();
  checkEnvFile();
  installDependencies();
  generatePrismaClient();

  console.log("\n" + "=".repeat(40));
  console.log("✅ Setup complete!\n");
  console.log("Next steps:");
  console.log("  1. Edit .env.local with your credentials");
  console.log("  2. Run: pnpm db:push");
  console.log("  3. Run: pnpm db:seed");
  console.log("  4. Run: pnpm dev\n");
}

main().catch((e) => { console.error(e); process.exit(1); });
