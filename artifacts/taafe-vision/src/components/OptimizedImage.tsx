import * as React from "react";
import { cn } from "@/lib/utils";
import {
  getImageCandidates,
  hasMinimumImageResolution,
  isRemoteImageUrl,
  MIN_REMOTE_IMAGE_HEIGHT,
  MIN_REMOTE_IMAGE_WIDTH,
  REMOTE_IMAGE_WIDTH,
} from "@/lib/image-url";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  priority?: boolean;
  minWidth?: number;
  minHeight?: number;
  remoteWidth?: number;
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      className,
      src,
      fallbackSrc,
      priority = false,
      loading,
      decoding,
      onError,
      onLoad,
      minWidth = MIN_REMOTE_IMAGE_WIDTH,
      minHeight = MIN_REMOTE_IMAGE_HEIGHT,
      remoteWidth = REMOTE_IMAGE_WIDTH,
      ...props
    },
    ref,
  ) => {
    const candidates = React.useMemo(
      () => getImageCandidates(src, fallbackSrc, remoteWidth),
      [fallbackSrc, remoteWidth, src],
    );
    const [candidateIndex, setCandidateIndex] = React.useState(0);

    React.useEffect(() => {
      setCandidateIndex(0);
    }, [candidates]);

    const resolvedSrc = candidates[candidateIndex];

    return (
      <img
        ref={ref}
        {...props}
        src={resolvedSrc}
        loading={priority ? "eager" : loading ?? "lazy"}
        decoding={decoding ?? "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn("media-image", className)}
        onError={(event) => {
          if (candidateIndex < candidates.length - 1) {
            setCandidateIndex((index) => index + 1);
          }
          onError?.(event);
        }}
        onLoad={(event) => {
          const image = event.currentTarget;
          const isTooSmall =
            isRemoteImageUrl(resolvedSrc) &&
            !hasMinimumImageResolution(image.naturalWidth, image.naturalHeight, minWidth, minHeight);

          if (isTooSmall && candidateIndex < candidates.length - 1) {
            setCandidateIndex((index) => index + 1);
          }
          onLoad?.(event);
        }}
      />
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";