import { useContext } from "react";

import { BlogContext } from "./BlogContext";

export function useBlog() {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog deve ser utilizado dentro de BlogProvider.");
  }

  return context;
}
