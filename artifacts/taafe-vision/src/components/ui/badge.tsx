import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Whitespace-nowrap: Badges should never wrap.
  "whitespace-nowrap inline-flex items-center rounded-full border px-3 py-1 text-[0.7rem] font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2" +
  " hover:-translate-y-0.5 " ,
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary/15 text-foreground",
        secondary: "border-secondary/40 bg-secondary/70 text-secondary-foreground",
        destructive:
          "border-destructive/20 bg-destructive/15 text-destructive",

        outline: "border-foreground/20 bg-card/50 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants }
