import { createContext } from "react";

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;

  category?: {
    id: string;
    name: string;
    slug: string;
  };

  products?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type SubcategoryFormData = {
  categoryId: string;
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoryUpdateData = {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoriesContextValue = {
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;

  fetchSubcategories: () => Promise<void>;
  getSubcategoryById: (id: string) => Promise<Subcategory | null>;

  createSubcategory: (
    data: SubcategoryFormData,
    token: string,
  ) => Promise<Subcategory>;

  updateSubcategory: (
    id: string,
    data: SubcategoryUpdateData,
    token: string,
  ) => Promise<Subcategory>;

  deleteSubcategory: (id: string, token: string) => Promise<void>;
};

export const SubcategoriesContext = createContext<
  SubcategoriesContextValue | undefined
>(undefined);
