import { createContext } from "react";

import type {
  BlogCategory,
  BlogCategoryFilters,
  BlogCategoryFormData,
  BlogCategoryUpdateData,
} from "../types/Blog";

export type BlogCategoriesContextValue = {
  categories: BlogCategory[];
  loading: boolean;
  error: string | null;

  fetchCategories: (filters?: BlogCategoryFilters) => Promise<void>;

  getCategoryById: (id: string, token: string) => Promise<BlogCategory | null>;

  getCategoryBySlug: (slug: string) => Promise<BlogCategory | null>;

  createCategory: (
    data: BlogCategoryFormData,
    token: string,
  ) => Promise<BlogCategory>;

  updateCategory: (
    id: string,
    data: BlogCategoryUpdateData,
    token: string,
  ) => Promise<BlogCategory>;

  deleteCategory: (id: string, token: string) => Promise<void>;
};

export const BlogCategoriesContext = createContext<
  BlogCategoriesContextValue | undefined
>(undefined);
