---
name: Imported artifact registration
description: Replit-specific behavior when a GitHub import contains artifact metadata but no registered artifact.
---

Imported web artifacts can contain valid `.replit-artifact/artifact.toml` files without appearing in the artifact catalog. When that happens, configure descriptive frontend and API workflows directly; do not create a duplicate artifact directory. If the frontend and API are running as separate manual workflows, add a development proxy for `/api` so browser requests remain same-origin.

**Why:** Without catalog registration, managed path routing and artifact presentation are unavailable even though the source and metadata are present. A direct frontend workflow otherwise serves the UI while API requests miss the backend.

**How to apply:** Check the artifact catalog before relying on managed workflows. If it is empty for an imported app, preserve the existing stack, use explicit PORT/BASE_PATH values, configure only the needed workflows, and verify `/api/healthz` through the frontend port.