import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block", {
  variants: {
    animate: {
      false: "",
      true: "animate-spin",
    },
    color: {
      gray: "text-gray-400",
      blue: "text-blue-500",
      red: "text-red-500",
    },
    size: {
      md: "w-7 h-7",
      lg: "w-9 h-9",
    },
  },
  defaultVariants: {
    animate: false,
    color: "gray",
    size: "md",
  },
});
