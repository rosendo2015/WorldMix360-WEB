import { useContext } from "react";

import { SubcategoriesContext } from "./SubcategoriesContext";

export function useSubcategories() {
  const context = useContext(SubcategoriesContext);

  if (!context) {
    throw new Error(
      "useSubcategories deve ser utilizado dentro de SubcategoriesProvider.",
    );
  }

  return context;
}
