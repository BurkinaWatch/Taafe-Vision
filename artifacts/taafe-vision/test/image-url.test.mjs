import assert from "node:assert/strict";
import test from "node:test";

import {
  getImageCandidates,
  getOptimizedImageUrl,
  hasMinimumImageResolution,
} from "../.image-test-dist/image-url.js";

test("keeps local image URLs unchanged", () => {
  const localUrl = "/images/poster.jpg";

  assert.equal(getOptimizedImageUrl(localUrl), localUrl);
  assert.deepEqual(getImageCandidates(localUrl, "/images/fallback.jpg"), [
    localUrl,
    "/images/fallback.jpg",
  ]);
});

test("requests a larger variant for a supported remote provider", () => {
  const source = "https://images.unsplash.com/photo-123?w=320&q=40";
  const optimized = new URL(getOptimizedImageUrl(source));

  assert.equal(optimized.searchParams.get("w"), "1600");
  assert.equal(optimized.searchParams.get("q"), "85");
  assert.equal(optimized.searchParams.get("auto"), "format");
  assert.deepEqual(
    getImageCandidates(source, "/images/fallback.jpg"),
    [optimized.toString(), source, "/images/fallback.jpg"],
  );
});

test("falls back after an invalid or undersized remote source", () => {
  assert.deepEqual(getImageCandidates("", "/images/fallback.jpg"), [
    "/images/fallback.jpg",
  ]);
  assert.deepEqual(getImageCandidates("not-an-image-url", "/images/fallback.jpg"), [
    "/images/fallback.jpg",
  ]);
  assert.equal(hasMinimumImageResolution(479, 600), false);
  assert.equal(hasMinimumImageResolution(600, 320), true);
});