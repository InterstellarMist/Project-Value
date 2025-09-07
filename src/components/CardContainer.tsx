import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const CardContainer = ({
  children,
  className,
  variant = "glass",
  ...props
}: ComponentProps<"div"> & {
  children: React.ReactNode;
  className?: string;
  variant?: "glass" | "solid";
}) => {
  const variants: Record<string, string> = {
    glass: `bg-white/50 glass-shadow border-white/80 ${className}`,
    solid: `bg-white/80 border-gray-300 ${className}`,
  };

  return (
    <div
      className={cn("rounded-2xl p-4 border", variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
};
