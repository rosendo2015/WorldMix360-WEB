import { cva } from "class-variance-authority";

export const productGridVariants = cva(
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  {
    variants: {
      gap: {
        default: "gap-6",
        compact: "gap-5",
      },
    },
    defaultVariants: {
      gap: "default",
    },
  },
);
