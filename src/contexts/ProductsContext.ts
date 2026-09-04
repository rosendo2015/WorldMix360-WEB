import { createContext } from "react";

export type Product = {
  id: string;
  title: string;
  slug: string;

  description?: string | null;
  shortDescription?: string | null;

  imageUrl: string;

  price: number;
  originalPrice?: number | null;

  currency: string;

  rating?: number | null;
  reviewsCount: number;

  affiliateUrl: string;

  category?: string | null;

  available: boolean;
  featured: boolean;
  active: boolean;
};

export type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (category?: string) => Promise<void>;

  getProductBySlug: (slug: string) => Promise<Product | null>;
};

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);
