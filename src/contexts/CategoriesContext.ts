import { createContext } from "react";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  subcategories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type CategoryFormData = {
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type CategoriesContextValue = {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<Category | null>;

  createCategory: (data: CategoryFormData, token: string) => Promise<Category>;

  updateCategory: (
    id: string,
    data: Partial<CategoryFormData>,
    token: string,
  ) => Promise<Category>;

  deleteCategory: (id: string, token: string) => Promise<void>;
};

export const CategoriesContext = createContext<
  CategoriesContextValue | undefined
>(undefined);
