---
name: Server smoke-test lifecycle
description: Reliability constraints for smoke checks that launch nested Node development servers.
---

Smoke checks that launch a package-script server should reject an already-occupied port before spawning and terminate the full child process group afterward.

**Why:** A nested npm process can outlive its direct child, leaving output pipes open or allowing an existing server to produce a false-positive response.

**How to apply:** Use a preflight TCP availability check, isolate the launched process group where supported, and force-clean it on timeout.