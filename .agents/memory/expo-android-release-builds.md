---
name: Expo Android release builds
description: Environment-specific constraints for producing local signed Android release builds from Expo artifacts.
---

For local Expo Android release builds in this workspace, use OpenJDK 17 and set both `ANDROID_HOME` and `sdk.dir` to the workspace-local Android SDK. The Android native project should be regenerated from the static Expo config before building. Do not rely on Gradle offline mode: React Native's Gradle plugin may still need the Foojay resolver plugin, and long builds can outlive a managed shell session. Even with one ABI and Ninja limited to one job, native CMake compilation may be interrupted by a workspace restart before APK assembly.

**Why:** The provisioned GraalVM JDK 19 can fail Android Gradle Plugin `JdkImageTransform` while OpenJDK 17 succeeds. Gradle otherwise reports the failure deep inside `jlink`, which obscures the runtime cause.

**How to apply:** Install the Android SDK under the ignored workspace cache, accept SDK licenses, export `JAVA_HOME` for OpenJDK 17, write `android/local.properties`, run the build with network access and constrained Gradle/CMake workers, and verify the resulting APK with `aapt` and `apksigner`. If the workspace restarts during CMake, do not claim an APK exists.