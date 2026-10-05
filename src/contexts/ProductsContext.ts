import { createContext } from "react";

export type ProductImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export type ProductImageFormData = {
  imageUrl: string;
  sortOrder?: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;

  createdAt: string;

  description?: string | null;
  shortDescription?: string | null;

  imageUrl: string;

  images?: ProductImage[];

  price: number;
  originalPrice?: number | null;

  currency: string;

  rating?: number | null;
  reviewsCount: number;

  affiliateUrl: string;

  subcategoryId?: string;
  marketplaceId?: string;

  category?: string | null;

  available: boolean;

  // Seção "Ofertas em destaque"
  destaque: boolean;

  // Seção "Produtos mais vendidos"
  bestSeller: boolean;

  active: boolean;

  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type ProductFormData = {
  title: string;
  description?: string;
  shortDescription?: string;

  imageUrl: string;

  images?: ProductImageFormData[];

  price: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl: string;

  subcategoryId: string;
  marketplaceId: string;

  // Seção "Ofertas em destaque"
  destaque?: boolean;

  // Seção "Produtos mais vendidos"
  bestSeller?: boolean;

  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductUpdateData = {
  title?: string;
  description?: string;
  shortDescription?: string;

  imageUrl?: string;

  images?: ProductImageFormData[];

  price?: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl?: string;

  subcategoryId?: string;
  marketplaceId?: string;

  // Seção "Ofertas em destaque"
  destaque?: boolean;

  // Seção "Produtos mais vendidos"
  bestSeller?: boolean;

  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductStatusData = {
  active?: boolean;
  available?: boolean;

  // Seção "Ofertas em destaque"
  destaque?: boolean;

  // Seção "Produtos mais vendidos"
  bestSeller?: boolean;
};

export type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (category?: string, search?: string) => Promise<void>;

  fetchAdminProducts: (
    token: string,
    filters?: {
      search?: string;
      subcategoryId?: string;
      marketplaceId?: string;

      // Filtros das seções da loja
      destaque?: boolean;
      bestSeller?: boolean;

      active?: boolean;
      available?: boolean;
    },
  ) => Promise<void>;

  getProductBySlug: (slug: string) => Promise<Product | null>;

  getProductById: (id: string, token: string) => Promise<Product | null>;

  createProduct: (data: ProductFormData, token: string) => Promise<Product>;

  updateProduct: (
    id: string,
    data: ProductUpdateData,
    token: string,
  ) => Promise<Product>;

  deleteProduct: (id: string, token: string) => Promise<void>;

  updateProductStatus: (
    id: string,
    data: ProductStatusData,
    token: string,
  ) => Promise<Product>;
};

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);
