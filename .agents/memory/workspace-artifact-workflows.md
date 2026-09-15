---
name: Workspace artifact workflows
description: Environment behavior to remember when verifying migrated web artifacts.
---

Managed artifact workflows inject the runtime port and base path expected by Vite services. A direct package build from the shell may fail without those variables even when the workflow preview is healthy.

**Why:** Artifact routing is configured outside the package command, so workflow verification is the authoritative runtime check for this workspace.

**How to apply:** Restart the exact managed artifact workflow after code or configuration changes and use its preview/logs for final verification. If the project-level workflow is already serving the same artifact port, do not start the individual artifact workflow in parallel; it will fail with a port-in-use error.