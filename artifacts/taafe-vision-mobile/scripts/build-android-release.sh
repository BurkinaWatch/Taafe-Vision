#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKSPACE_ROOT="$(cd "$APP_DIR/../.." && pwd)"
ANDROID_DIR="$APP_DIR/android"
APK_PATH="$ANDROID_DIR/app/build/outputs/apk/release/app-release.apk"
BUILD_DIR="$APP_DIR/.android-build"
LOG_PATH="$BUILD_DIR/release-build.log"

# Keep Gradle and build logs in the project workspace so a later invocation can
# reuse them after a workspace restart. Both paths are ignored by Git.
export GRADLE_USER_HOME="${GRADLE_USER_HOME:-$WORKSPACE_ROOT/.gradle-cache}"
export CMAKE_BUILD_PARALLEL_LEVEL="${CMAKE_BUILD_PARALLEL_LEVEL:-1}"
export ANDROID_HOME="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-$WORKSPACE_ROOT/.android-sdk}}"
export ANDROID_SDK_ROOT="${ANDROID_SDK_ROOT:-$ANDROID_HOME}"

mkdir -p "$BUILD_DIR/logs" "$GRADLE_USER_HOME"
exec 9>"$BUILD_DIR/release.lock"
if ! flock -n 9; then
  echo "Another Android release build is already running. Reuse its log: $LOG_PATH" >&2
  exit 2
fi

exec > >(tee -a "$LOG_PATH") 2>&1

echo "=== Taafé Vision Android release build ==="
echo "Started: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "Workspace: $WORKSPACE_ROOT"
echo "Gradle cache: $GRADLE_USER_HOME"
echo "Android SDK: $ANDROID_HOME"
echo "CMake parallelism: $CMAKE_BUILD_PARALLEL_LEVEL"

if [[ ! -x "$ANDROID_DIR/gradlew" ]]; then
  echo "Missing Android Gradle wrapper: $ANDROID_DIR/gradlew" >&2
  exit 1
fi

if [[ ! -d "$ANDROID_HOME" ]]; then
  echo "Android SDK not found at $ANDROID_HOME. Set ANDROID_HOME or ANDROID_SDK_ROOT." >&2
  exit 1
fi

printf 'sdk.dir=%s\n' "$ANDROID_HOME" > "$ANDROID_DIR/local.properties"

# Do not run expo prebuild --clean here: it deletes the native and CMake
# intermediates that make a restarted build resumable.
"$ANDROID_DIR/gradlew" \
  -p "$ANDROID_DIR" \
  assembleRelease \
  --no-daemon \
  --max-workers=1 \
  --stacktrace \
  -PreactNativeArchitectures="${ANDROID_ARCHITECTURES:-arm64-v8a}"

if [[ ! -s "$APK_PATH" ]]; then
  echo "Gradle completed without producing $APK_PATH" >&2
  exit 1
fi

find_latest_tool() {
  local tool="$1"
  local candidate
  candidate="$(find "$ANDROID_HOME/build-tools" -type f -name "$tool" -perm -u+x 2>/dev/null | sort -V | tail -n 1 || true)"
  if [[ -n "$candidate" ]]; then
    printf '%s\n' "$candidate"
  else
    command -v "$tool" || true
  fi
}

AAPT="$(find_latest_tool aapt)"
APKSIGNER="$(find_latest_tool apksigner)"
if [[ -z "$AAPT" || -z "$APKSIGNER" ]]; then
  echo "Could not find both aapt and apksigner for APK validation." >&2
  exit 1
fi

"$AAPT" dump badging "$APK_PATH" >/dev/null
"$APKSIGNER" verify --verbose "$APK_PATH"

echo "APK ready: $APK_PATH"
echo "APK size: $(stat -c '%s bytes' "$APK_PATH")"
echo "Finished: $(date -u +%Y-%m-%dT%H:%M:%SZ)"