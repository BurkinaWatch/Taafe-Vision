export const REMOTE_IMAGE_WIDTH = 1600;
export const MIN_REMOTE_IMAGE_WIDTH = 480;
export const MIN_REMOTE_IMAGE_HEIGHT = 320;

const REMOTE_IMAGE_HOSTS_WITH_WIDTH_VARIANTS = [
  "images.unsplash.com",
  "images.pexels.com",
];

const WIDTH_QUERY_KEYS = ["w", "width", "wid"];
const QUALITY_QUERY_KEYS = ["q", "quality"];

function asTrimmedString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function isRemoteImageUrl(value: unknown): boolean {
  const source = asTrimmedString(value);
  if (!source) return false;

  try {
    const url = new URL(source);
    return (url.protocol === "http:" || url.protocol === "https:") && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function isLocalImageUrl(value: unknown): value is string {
  const source = asTrimmedString(value);
  if (!source || isRemoteImageUrl(source)) return false;

  return (
    source.startsWith("/") ||
    source.startsWith("./") ||
    source.startsWith("../") ||
    source.startsWith("data:") ||
    source.startsWith("blob:")
  );
}

function ensureMinimumQueryValue(url: URL, keys: string[], minimum: number): boolean {
  const key = keys.find((candidate) => url.searchParams.has(candidate));
  if (!key) return false;

  const currentValue = Number(url.searchParams.get(key));
  if (!Number.isFinite(currentValue) || currentValue < minimum) {
    url.searchParams.set(key, String(minimum));
  }
  return true;
}

function addWidthVariant(url: URL, width: number): void {
  if (!ensureMinimumQueryValue(url, WIDTH_QUERY_KEYS, width)) {
    url.searchParams.set("w", String(width));
  }
}

/**
 * Requests a larger source only for providers known to support URL variants.
 * For other hosts, an existing width parameter is raised but the URL shape is
 * otherwise left untouched so API URLs that do not accept query parameters
 * keep working.
 */
export function getOptimizedImageUrl(
  value: string | undefined | null,
  width = REMOTE_IMAGE_WIDTH,
): string | undefined {
  const source = asTrimmedString(value);
  if (!source || !isRemoteImageUrl(source)) return source;

  const url = new URL(source);
  const hostname = url.hostname.toLowerCase();
  const supportsWidthVariant =
    REMOTE_IMAGE_HOSTS_WITH_WIDTH_VARIANTS.some(
      (knownHost) => hostname === knownHost || hostname.endsWith(`.${knownHost}`),
    ) ||
    hostname.includes("imgix");

  if (supportsWidthVariant) {
    addWidthVariant(url, width);
    if (!ensureMinimumQueryValue(url, QUALITY_QUERY_KEYS, 85)) {
      url.searchParams.set("q", "85");
    }

    if (hostname.includes("unsplash.com") && !url.searchParams.has("auto")) {
      url.searchParams.set("auto", "format");
    }
    if (hostname.includes("pexels.com")) {
      url.searchParams.set("auto", "compress");
      url.searchParams.set("cs", "tinysrgb");
    }
  } else {
    // Some API providers already expose a width parameter. Prefer the larger
    // source without inventing an unsupported query string for other hosts.
    ensureMinimumQueryValue(url, WIDTH_QUERY_KEYS, width);
  }

  return url.toString();
}

export function getImageCandidates(
  source: string | undefined | null,
  fallbackSrc: string | undefined | null,
  width = REMOTE_IMAGE_WIDTH,
): string[] {
  const sourceValue = asTrimmedString(source);
  const fallbackValue = asTrimmedString(fallbackSrc);
  const candidates: string[] = [];

  const addCandidate = (candidate: string | undefined): void => {
    if (candidate && !candidates.includes(candidate)) candidates.push(candidate);
  };

  if (sourceValue && (isLocalImageUrl(sourceValue) || isRemoteImageUrl(sourceValue))) {
    const optimizedSource = getOptimizedImageUrl(sourceValue, width);
    addCandidate(optimizedSource);
    if (optimizedSource !== sourceValue) addCandidate(sourceValue);
  }

  if (fallbackValue && (isLocalImageUrl(fallbackValue) || isRemoteImageUrl(fallbackValue))) {
    addCandidate(fallbackValue);
  }

  return candidates;
}

export function hasMinimumImageResolution(
  naturalWidth: number,
  naturalHeight: number,
  minWidth = MIN_REMOTE_IMAGE_WIDTH,
  minHeight = MIN_REMOTE_IMAGE_HEIGHT,
): boolean {
  return naturalWidth >= minWidth && naturalHeight >= minHeight;
}