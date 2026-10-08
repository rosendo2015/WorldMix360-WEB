import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-blue text-white hover:bg-navy",
        auth: "bg-blue text-white hover:bg-[#0f56bd]",
        secondary:
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
        danger: "text-danger hover:bg-red-50",
        chip: "rounded-full bg-blue/10 text-blue",
        pagination:
          "border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-40",
      },
      size: {
        xs: "px-3 py-1 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
