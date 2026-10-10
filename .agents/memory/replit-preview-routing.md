---
name: Replit preview routing
description: Distinguish Replit's artifact preview and workflows from Railway production.
---

**Rule:** When the user reports “Your app is not running” in Replit, diagnose the Replit preview and its artifact-owned workflows first; do not conflate that with Railway production status.

**Why:** The app can be served by a project-level process while Replit's artifact preview workflow is stopped or disconnected.

**How to apply:** Check the artifact-owned web and API workflow states, start them with `WorkflowsRestart`, and verify the artifact preview itself before discussing Railway.
