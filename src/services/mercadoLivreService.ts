const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export type MercadoLivreOffer = {
  itemId: string;
  sellerId: string;
  price: number;
  originalPrice?: number | null;
  currencyId: string;

  categoryId?: string;
  warranty?: string;
  condition?: string;
  listingTypeId?: string;
  officialStoreId?: string | null;

  freeShipping?: boolean;

  shipping?: {
    freeShipping?: boolean;
    logisticType?: string;
  };

  userProductId?: string;
};

export type MercadoLivreAnalyzeResult = {
  externalLink: string;
  catalogProductId: string;
  requestedItemId: string | null;
  requestedWid: string | null;
  catalogStatus: string | null;
  title: string;
  permalink: string | null;
  imageUrls: string[];
  offers: MercadoLivreOffer[];
  selectedOffer: MercadoLivreOffer | null;
  requiresOfferSelection: boolean;
  noOffersFound: boolean;
};

export type ImportMercadoLivreProductInput = {
  affiliateUrl: string;
  externalLink: string;

  catalogProductId: string;
  itemId: string;
  sellerId: string;

  subcategoryId: string;

  title?: string;
  description?: string;
  shortDescription?: string;

  imageUrl?: string;

  images?: Array<{
    imageUrl: string;
    sortOrder?: number;
  }>;

  price?: number;
  originalPrice?: number;
  currency?: string;

  rating?: number;
  reviewsCount?: number;

  featured?: boolean;
  destaque?: boolean;
  bestSeller?: boolean;
  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type UpdateMercadoLivreProductOfferInput = {
  externalLink: string;
  catalogProductId: string;
  itemId: string;
  sellerId: string;
};

async function parseResponse(response: Response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ?? "Não foi possível concluir a operação no Mercado Livre.",
    );
  }

  return data;
}

export async function analyzeMercadoLivreProduct(
  externalLink: string,
  token: string,
): Promise<MercadoLivreAnalyzeResult> {
  const response = await fetch(`${apiUrl}/mercado-livre/products/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      externalLink,
    }),
  });

  const data = await parseResponse(response);

  return {
    ...data,

    offers: Array.isArray(data.offers)
      ? data.offers.map((offer: MercadoLivreOffer) => ({
          ...offer,
          freeShipping:
            offer.freeShipping ?? offer.shipping?.freeShipping ?? false,
        }))
      : [],
  };
}

export async function importMercadoLivreProduct(
  data: ImportMercadoLivreProductInput,
  token: string,
) {
  const response = await fetch(`${apiUrl}/mercado-livre/products/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await parseResponse(response);

  return result.product;
}

export async function updateMercadoLivreProductOffer(
  productId: string,
  data: UpdateMercadoLivreProductOfferInput,
  token: string,
) {
  const response = await fetch(
    `${apiUrl}/mercado-livre/products/${encodeURIComponent(productId)}/offer`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result = await parseResponse(response);

  return result.product;
}
