#!/usr/bin/env bash
set -euo pipefail

export CI=true

# A merge can update pnpm-workspace.yaml and pnpm-lock.yaml in separate commits.
# Prefer the reproducible path, but repair a lockfile/config mismatch
# non-interactively so post-merge setup does not strand the workspace.
if ! pnpm install --frozen-lockfile --reporter=append-only; then
  echo "Frozen pnpm install could not use the current lockfile; repairing it." >&2
  pnpm install --no-frozen-lockfile --reporter=append-only
fi

pnpm --filter @workspace/db run push
