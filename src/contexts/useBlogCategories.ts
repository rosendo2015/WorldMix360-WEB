import { useContext } from "react";

import { BlogCategoriesContext } from "./BlogCategoriesContext";

export function useBlogCategories() {
  const context = useContext(BlogCategoriesContext);

  if (!context) {
    throw new Error(
      "useBlogCategories deve ser usado dentro de BlogCategoriesProvider",
    );
  }

  return context;
}
