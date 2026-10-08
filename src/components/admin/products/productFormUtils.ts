import type { ProductImageForm } from "./types";
import { parseCurrencyBRL } from "../../../utils/formatCurrency";

export type ProductMarketplaceLink = {
  id?: string;
  marketplaceId?: string | null;
  externalLink?: string | null;
  affiliateUrl?: string | null;
};

export type ProductWithMarketplaceLinks = {
  marketplaceProducts?: ProductMarketplaceLink[] | null;
};

export type ProductFormData = {
  title: string;
  description?: string;
  shortDescription?: string;
  imageUrl: string;
  images: ProductImageForm[];
  price: number;
  originalPrice?: number;
  currency: string;
  rating?: number;
  reviewsCount: number;
  affiliateUrl: string;
  subcategoryId: string;
  marketplaceId: string;
  destaque: boolean;
  bestSeller: boolean;
  available: boolean;
  active: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function cleanDescription(value: string): string | undefined {
  const trimmedValue = value.trim();

  if (trimmedValue === "<p></p>") {
    return undefined;
  }

  return trimmedValue || undefined;
}

export function cleanGalleryImages(
  images: ProductImageForm[],
): ProductImageForm[] {
  return images
    .map((image) => ({
      id: image.id,
      imageUrl: image.imageUrl.trim(),
      sortOrder: image.sortOrder,
    }))
    .filter((image) => image.imageUrl);
}

export function validateUrl(value: string, errorMessage: string): void {
  try {
    new URL(value.trim());
  } catch {
    throw new Error(errorMessage);
  }
}

export function parsePrice(value: string, errorMessage: string): number {
  const parsedValue = parseCurrencyBRL(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    throw new Error(errorMessage);
  }

  return parsedValue;
}

export function parseOptionalPrice(
  value: string,
  errorMessage: string,
): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  return parsePrice(value, errorMessage);
}

export function parseOptionalRating(value: string): number | undefined {
  if (!value.trim()) {
    return undefined;
  }

  const parsedRating = Number(value);

  if (!Number.isFinite(parsedRating) || parsedRating < 0 || parsedRating > 5) {
    throw new Error("A avaliação deve estar entre 0 e 5.");
  }

  return parsedRating;
}

export function parseReviewsCount(value: string): number {
  const parsedReviewsCount = Number(value);

  if (!Number.isInteger(parsedReviewsCount) || parsedReviewsCount < 0) {
    throw new Error("A quantidade de avaliações deve ser um número inteiro.");
  }

  return parsedReviewsCount;
}

export function validateGalleryImages(
  images: ProductImageForm[],
): ProductImageForm[] {
  const cleanImages = cleanGalleryImages(images);

  for (const image of cleanImages) {
    try {
      new URL(image.imageUrl);
    } catch {
      throw new Error(
        `Informe uma URL válida para a imagem da galeria na posição ${
          image.sortOrder + 1
        }.`,
      );
    }
  }

  return cleanImages;
}
