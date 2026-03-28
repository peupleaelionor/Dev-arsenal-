#!/usr/bin/env node
/**
 * Release script — bumps version, creates git tag, generates changelog.
 */
import { execSync, spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const ROOT = path.resolve(__dirname, "..");

function run(cmd: string): string {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8" }).trim();
}

function bumpVersion(current: string, type: "patch" | "minor" | "major"): string {
  const [major, minor, patch] = current.split(".").map(Number);
  if (type === "patch") return `${major}.${minor}.${patch + 1}`;
  if (type === "minor") return `${major}.${minor + 1}.0`;
  return `${major + 1}.0.0`;
}

function generateChangelog(version: string): string {
  const commits = run('git log --oneline --no-merges $(git describe --tags --abbrev=0 HEAD~1)..HEAD 2>/dev/null || git log --oneline --no-merges -20');
  const date = new Date().toISOString().split("T")[0];
  return `## v${version} — ${date}\n\n${commits.split("\n").map((c) => `- ${c}`).join("\n")}\n`;
}

async function main() {
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const current: string = pkg.version ?? "0.0.0";

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const question = (q: string) => new Promise<string>((resolve) => rl.question(q, resolve));

  console.log(`\nCurrent version: ${current}`);
  const bumpType = (await question("Bump type (patch/minor/major): ")).trim() as "patch" | "minor" | "major";
  rl.close();

  const nextVersion = bumpVersion(current, bumpType);
  console.log(`\n→ Bumping to v${nextVersion}`);

  pkg.version = nextVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");

  const changelog = generateChangelog(nextVersion);
  const changelogPath = path.join(ROOT, "CHANGELOG.md");
  const existing = fs.existsSync(changelogPath) ? fs.readFileSync(changelogPath, "utf8") : "";
  fs.writeFileSync(changelogPath, `# Changelog\n\n${changelog}\n${existing.replace("# Changelog\n\n", "")}`);

  run(`git add package.json CHANGELOG.md`);
  run(`git commit -m "chore: release v${nextVersion}"`);
  run(`git tag -a v${nextVersion} -m "v${nextVersion}"`);

  console.log(`\n✅ Released v${nextVersion}`);
  console.log(`→ Push with: git push origin main --tags`);
}

main().catch((e) => { console.error(e); process.exit(1); });
