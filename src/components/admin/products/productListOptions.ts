export const productSortOptions = [
  "newest",
  "oldest",
  "title-asc",
  "title-desc",
  "price-asc",
  "price-desc",
] as const;

export type ProductSortOption = (typeof productSortOptions)[number];

export function isProductSortOption(value: string): value is ProductSortOption {
  return productSortOptions.some((option) => option === value);
}

export const productStatusOptions = [
  "all",
  "active",
  "inactive",
  "available",
  "unavailable",
  "destaque",
  "not-destaque",
  "best-seller",
  "not-best-seller",
] as const;

export type ProductStatusOption = (typeof productStatusOptions)[number];

export function isProductStatusOption(
  value: string,
): value is ProductStatusOption {
  return productStatusOptions.some((option) => option === value);
}
