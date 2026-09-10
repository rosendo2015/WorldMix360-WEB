import { createContext } from "react";

export type BlogPostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export type BlogAuthor = {
  id: string;
  name: string;
  email: string;
};

export type BlogPostProduct = {
  id: string;
  sortOrder: number;
  product: {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string | null;
    imageUrl?: string | null;
    price: number | string;
    originalPrice?: number | string | null;
    currency?: string | null;
    rating?: number | string | null;
    reviewsCount?: number | null;
    affiliateUrl: string;
    available: boolean;
    featured: boolean;
    active: boolean;
  };
};

export type BlogPostCategory = {
  id: string;
  name: string;
  slug: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  coverImage?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: BlogPostStatus;
  publishedAt?: string | null;
  scheduledAt?: string | null;
  authorId: string;
  categoryId?: string | null;
  createdAt: string;
  updatedAt?: string | null;

  author?: BlogAuthor | null;
  category?: BlogPostCategory | null;
  products?: BlogPostProduct[];
};

export type BlogPostProductFormData = {
  productId: string;
  sortOrder?: number;
};

export type BlogPostFormData = {
  title: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: BlogPostStatus;
  publishedAt?: string;
  scheduledAt?: string;
  categoryId?: string;
  products?: BlogPostProductFormData[];
};

export type BlogPostFilters = {
  search?: string;
  categoryId?: string;
};

export type BlogPostAdminFilters = {
  search?: string;
  categoryId?: string;
  status?: BlogPostStatus;
};

export type BlogContextValue = {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;

  fetchPosts: (filters?: BlogPostFilters) => Promise<void>;

  getPostBySlug: (slug: string) => Promise<BlogPost | null>;

  getPostById: (id: string, token: string) => Promise<BlogPost | null>;

  fetchAdminPosts: (
    token: string,
    filters?: BlogPostAdminFilters,
  ) => Promise<void>;

  createPost: (data: BlogPostFormData, token: string) => Promise<BlogPost>;

  updatePost: (
    id: string,
    data: Partial<BlogPostFormData>,
    token: string,
  ) => Promise<BlogPost>;

  deletePost: (id: string, token: string) => Promise<void>;
};

export const BlogContext = createContext<BlogContextValue | undefined>(
  undefined,
);
