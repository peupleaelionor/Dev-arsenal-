#!/usr/bin/env node
/**
 * Standalone seed script — populates the database with demo data.
 * Can be run directly: npx ts-node scripts/seed.ts
 */
import path from "path";

async function seed() {
  // Import the seed logic from the db package
  const seedModule = path.resolve(__dirname, "../packages/db/prisma/seed.ts");
  console.log("→ Running seed from:", seedModule);

  const { execSync } = await import("child_process");
  execSync(`npx ts-node --project packages/db/tsconfig.json ${seedModule}`, {
    stdio: "inherit",
    cwd: path.resolve(__dirname, ".."),
  });

  console.log("✅ Seed complete");
}

seed().catch((e) => { console.error(e); process.exit(1); });
