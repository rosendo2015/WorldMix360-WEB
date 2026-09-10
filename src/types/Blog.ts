export type BlogPostStatus = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

export type BlogProduct = {
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

export type BlogAuthor = {
  id: string;
  name: string;
  email: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  postsCount?: number;
  createdAt?: string;
  updatedAt?: string | null;
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

  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;

  products?: BlogProduct[];
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

export type BlogPostUpdateData = {
  title?: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  status?: BlogPostStatus;
  publishedAt?: string;
  scheduledAt?: string;
  categoryId?: string;
  products?: BlogPostProductFormData[];
};

export type BlogPostListFilters = {
  search?: string;
  categoryId?: string;
};

export type BlogPostAdminFilters = {
  search?: string;
  categoryId?: string;
  status?: BlogPostStatus;
};

export type BlogCategoryFormData = {
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type BlogCategoryUpdateData = {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type BlogCategoryFilters = {
  search?: string;
  active?: boolean;
};
