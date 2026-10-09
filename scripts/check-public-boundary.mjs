#!/usr/bin/env node
// Keeps this public repository to principles only: no implementation, no internal
// infrastructure detail, no secrets. Runs in CI on every pull request.
// Usage: node scripts/check-public-boundary.mjs   (exit 1 on any finding)
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const SELF = "scripts/check-public-boundary.mjs";

// Every tracked file must match one of these.
const ALLOWED_FILES = [
  /^(LICENSE|VERSION|\.gitignore)$/,
  /\.md$/,
  /^images\/.+\.(jpe?g|png|svg|webp)$/,
  /^scripts\/[^/]+\.mjs$/,
  /^\.github\/(workflows\/[^/]+\.yml|dependabot\.yml|CODEOWNERS)$/,
  /^\.claude\/(handoffs|done)\/(\.gitkeep|[^/]+\.(md|json))$/,
];

// Text that belongs to the implementation or the operator's infrastructure, or is a secret.
const FORBIDDEN_TEXT = [
  [
    /\b(10|192\.168|172\.(1[6-9]|2\d|3[01]))\.\d{1,3}\.\d{1,3}\b/,
    "private IP address",
  ],
  [/\/(home|srv|opt|var\/lib)\/[a-z0-9_-]+/i, "host filesystem path"],
  [/\/etc\/(dws|audit)/i, "host configuration path"],
  [
    /\b(admin100|gn100|dgx-spark|ocl-[a-z0-9-]+)\b/i,
    "internal host or account name",
  ],
  [
    /\b(docker\s+(exec|compose)|psql\s|auditctl|ausearch|systemctl)\b/,
    "operational command (implementation)",
  ],
  [
    /\b(CREATE|ALTER)\s+(TABLE|SCHEMA|FUNCTION|TRIGGER)\b/i,
    "database schema (implementation)",
  ],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "private key"],
  [/AGE-SECRET-KEY-1[0-9A-Z]+/, "age private key"],
  [/\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\./, "JSON web token"],
  [/\b(sk|rk)_(live|test)_[A-Za-z0-9]{16,}/, "API key"],
];

const files = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split("\n")
  .filter(Boolean);
const findings = [];

for (const file of files) {
  if (!ALLOWED_FILES.some((re) => re.test(file))) {
    findings.push(
      `${file}: file type not allowed in the public principles repository`,
    );
    continue;
  }
  if (file === SELF || /\.(jpe?g|png|webp)$/.test(file) || file === "LICENSE")
    continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const [re, what] of FORBIDDEN_TEXT) {
      if (re.test(line)) findings.push(`${file}:${i + 1}: ${what}`);
    }
  });
}

if (findings.length) {
  console.error(
    "Public boundary check FAILED. Principles are public; the implementation is not.\n",
  );
  for (const f of findings) console.error(`  ${f}`);
  process.exit(1);
}
console.log(`Public boundary check passed (${files.length} files).`);
