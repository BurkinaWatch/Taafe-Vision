---
name: GitHub pushes with generated SDKs
description: Handling GitHub synchronization when local Android toolchains or other generated artifacts are present.
---

Generated Android toolchains should remain local and ignored rather than being added to the project history. GitHub rejects individual blobs over 100 MB, and an authenticated Replit connector does not automatically provide credentials to terminal `git push`.

**Why:** Release-build toolchains can contain very large native binaries and thousands of files. They are build inputs for the workspace, not portable application source, and can make an otherwise valid push fail.

**How to apply:** Before synchronizing, inspect the diff for generated toolchains and oversized blobs, keep the remote history as the base, publish only source/configuration changes through the authenticated GitHub path, and verify local/remote branch alignment plus the absence of oversized remote blobs.