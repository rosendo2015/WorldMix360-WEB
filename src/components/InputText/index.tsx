import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "tailwind-variants";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function InputText({
  icon,
  iconPosition = "left",
  className,
  ...props
}: InputTextProps) {
  const hasIcon = Boolean(icon);

  return (
    <div className="relative w-full">
      {hasIcon && iconPosition === "left" && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={cn(
          "w-full rounded-lg border-gray-100 border-2 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-colors duration-200",
          "focus:border-blue focus:ring-2 focus:ring-blue/10",
          hasIcon && iconPosition === "left" && "pl-10",
          hasIcon && iconPosition === "right" && "pr-10",
          className,
        )}
      />

      {hasIcon && iconPosition === "right" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          {icon}
        </div>
      )}
    </div>
  );
}
