# AGENTS.md — DWS Vault V1 (public principles repository)

Rules for every agent (Claude Code, OpenCode, opencode-loop) working here. Governing standard:
`docs/DWS_REPOSITORY_STANDARD.md` in the private `blogtheristo/dws6` repository (class: public
open-specification repository).

1. **Principles are public; the implementation is not.** This repository holds principles,
   conformance checks and mappings only. Code, database schema, deployment scripts, commands,
   host names, file paths and audit evidence belong to the implementation in `blogtheristo/dws6`
   (or `dws7`). CI enforces it: `node scripts/check-public-boundary.mjs`.
2. **No secret values, ever** — not even examples that look real.
3. **Every principle has a check.** A new or changed principle (P*) comes with its conformance
   check (C*) in the same pull request, and a `CHANGELOG.md` entry; bump `VERSION` (semver).
4. **No compliance claims.** Write "supports" or "maps to" NIS2 / GDPR / EU AI Act, never
   "compliant" or "certified".
5. **Pull requests only.** No direct push to `main`. Branches: `claude/*`, `opencode/*`, `feature/*`.
6. **Language:** English for the principles; Finnish lines in `README.md` are allowed for the
   Finnish audience.
7. Handoffs: `.claude/handoffs/<branch>.md`. Loop task specs: `.claude/done/<branch>.json`.
