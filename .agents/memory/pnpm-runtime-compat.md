---
name: pnpm runtime compatibility
description: Keep Railway lockfile compatibility without pinning packageManager in the root workspace.
---

Railway can require a pnpm 9-compatible lockfile, but pinning `packageManager` in the root package can make Replit-managed artifact workflows invoke a native pnpm installation that aborts. Keep the lockfile generated with the Railway pnpm version and avoid the root pin unless the managed workflows support it.

**Why:** In this workspace, the pin caused the API and web workflows to fail during their automatic pnpm setup, while the lockfile itself worked correctly with pnpm 9.

**How to apply:** When changing dependencies, regenerate and validate `pnpm-lock.yaml` with pnpm 9.15.9; leave `package.json` without a `packageManager` field and let each environment select its supported pnpm runtime.