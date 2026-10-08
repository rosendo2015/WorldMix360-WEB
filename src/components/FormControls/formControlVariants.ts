import { cva } from "class-variance-authority";

export const formControlVariants = cva(
  "w-full rounded-lg border border-gray-300 text-sm text-gray-900 outline-none transition disabled:bg-gray-100",
  {
    variants: {
      focusStyle: {
        ring: "focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        border: "focus:border-blue-500",
      },
      size: {
        default: "px-4 py-3",
        compact: "px-3 py-2.5",
      },
      resize: {
        none: "",
        vertical: "resize-y",
      },
    },
    defaultVariants: {
      focusStyle: "ring",
      size: "default",
      resize: "none",
    },
  },
);
