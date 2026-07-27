---
name: Imported Node app setup
description: A setup lesson for imported Node projects whose workflow starts before dependencies are present.
---

When a GitHub-imported Node workflow fails with a missing local binary such as `tsx`, check for `node_modules` and install from the existing package manifest/lockfile before changing application code.

**Why:** Imported repositories commonly omit installed dependencies, so the first workflow failure can be an environment setup issue rather than an application defect.

**How to apply:** Confirm the declared package manager files, install with the package-management flow, then run the existing type/build checks and restart the workflow before debugging runtime behavior.