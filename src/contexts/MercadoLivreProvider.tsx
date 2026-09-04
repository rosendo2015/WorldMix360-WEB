import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  MercadoLivreContext,
  type MercadoLivreProduct,
} from "./MercadoLivreContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type ApiProduct = {
  id: string;
  title: string;
  price?: number | string;
  imageUrl?: string | null;
  thumbnail?: string | null;
  pictures?: Array<{
    url: string;
  }>;
  affiliateUrl?: string | null;
  permalink?: string | null;
};

function normalizeProduct(item: ApiProduct): MercadoLivreProduct {
  return {
    id: item.id,
    title: item.title,
    price: Number(item.price ?? 0),
    image:
      item.imageUrl ??
      item.thumbnail ??
      item.pictures?.[0]?.url ??
      "https://http2.mlstatic.com/storage/developers-site-cms-admin/CDN/MLB-592089271-mlb-banner.jpg",
    rating: 4.5,
    marketplace: "mercado-livre",
    affiliateUrl: item.affiliateUrl ?? item.permalink ?? "#",
  };
}

export function MercadoLivreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<MercadoLivreProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/products?search=${encodeURIComponent(term)}`,
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar produtos no Mercado Livre");
      }

      const data = await response.json();

      const mappedProducts = (data.products ?? [])
        .slice(0, 8)
        .map(normalizeProduct);

      setProducts(mappedProducts);
    } catch (requestError) {
      console.error(requestError);
      setError("Não foi possível carregar os produtos no momento.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      search,
    }),
    [products, loading, error, search],
  );

  return (
    <MercadoLivreContext.Provider value={value}>
      {children}
    </MercadoLivreContext.Provider>
  );
}
