---
name: Expo Android release builds
description: Environment-specific constraints for producing local signed Android release builds from Expo artifacts.
---

For local Expo Android release builds in this workspace, use OpenJDK 17 and set both `ANDROID_HOME` and `sdk.dir` to the workspace-local Android SDK. The Android native project should be regenerated from the static Expo config before building. Do not rely on Gradle offline mode: React Native's Gradle plugin may still need the Foojay resolver plugin, and long builds can outlive a managed shell session. Even with one ABI and Ninja limited to one job, native CMake compilation may be interrupted by a workspace restart before APK assembly.

**Why:** The provisioned GraalVM JDK 19 can fail Android Gradle Plugin `JdkImageTransform` while OpenJDK 17 succeeds. Gradle otherwise reports the failure deep inside `jlink`, which obscures the runtime cause.

**How to apply:** Install the Android SDK under the ignored workspace cache, accept SDK licenses, export `JAVA_HOME` for OpenJDK 17, write `android/local.properties`, run the build with network access and constrained Gradle/CMake workers, and verify the resulting APK with `aapt` and `apksigner`. If the workspace restarts during CMake, do not claim an APK exists.

When Prefab reports an old `minSdkVersion` even though Gradle's effective Android project values are correct, invalidate only the generated CMake/Prefab metadata (`app/.cxx`, app CXX intermediates, and the affected native module CXX intermediates) before retrying. Preserve the Gradle dependency cache and source tree so the next attempt remains resumable.

**Why:** Android Gradle configuration and Prefab metadata can come from different incremental-build generations; retrying without invalidating the stale native metadata repeats the same misleading API-level error.

**How to apply:** Confirm the effective `minSdk` through Gradle first, then remove only the generated native metadata for the affected ABI/modules and rerun the constrained release script.