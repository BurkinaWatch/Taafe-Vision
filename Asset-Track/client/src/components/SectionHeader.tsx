import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = false, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full" />
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
