---
name: Expo Android release builds
description: Environment-specific constraints for producing local signed Android release builds from Expo artifacts.
---

For local Expo Android release builds in this workspace, use OpenJDK 17 and set both `ANDROID_HOME` and `sdk.dir` to the workspace-local Android SDK. The Android native project should be regenerated from the static Expo config before building. Do not rely on Gradle offline mode: React Native's Gradle plugin may still need the Foojay resolver plugin, and long builds can outlive a managed shell session.

**Why:** The provisioned GraalVM JDK 19 can fail Android Gradle Plugin `JdkImageTransform` while OpenJDK 17 succeeds. Gradle otherwise reports the failure deep inside `jlink`, which obscures the runtime cause.

**How to apply:** Install the Android SDK under the ignored workspace cache, accept SDK licenses, export `JAVA_HOME` for OpenJDK 17, write `android/local.properties`, run the build with network access, and verify the resulting APK with `aapt` and `apksigner`.