import * as React from "react";
import { cn } from "@/lib/utils";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  priority?: boolean;
}

export const OptimizedImage = React.forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ className, src, fallbackSrc, priority = false, loading, decoding, onError, ...props }, ref) => {
    const [resolvedSrc, setResolvedSrc] = React.useState(src);

    React.useEffect(() => {
      setResolvedSrc(src);
    }, [src]);

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
          if (fallbackSrc && resolvedSrc !== fallbackSrc) {
            setResolvedSrc(fallbackSrc);
          }
          onError?.(event);
        }}
      />
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";