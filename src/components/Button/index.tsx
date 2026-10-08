import type { VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "tailwind-variants";

import { buttonVariants } from "./buttonVariants";

interface ButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
}

export function Button({
  children,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ size, variant }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
