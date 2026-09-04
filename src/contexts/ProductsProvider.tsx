import { type ReactNode, useCallback, useMemo, useState } from "react";

import { type Product, ProductsContext } from "./ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type ProductsResponse = {
  products?: Product[];
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async (category?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (category) {
        params.set("category", category);
      }

      const queryString = params.toString();

      const response = await fetch(
        `${apiUrl}/products${queryString ? `?${queryString}` : ""}`,
      );

      const data = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        throw new Error("Não foi possível carregar os produtos.");
      }

      setProducts(data.products ?? []);
    } catch (requestError) {
      console.error(requestError);

      setProducts([]);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível carregar os produtos.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductBySlug = useCallback(
    async (slug: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = (await response.json()) as { product: Product };

        if (!response.ok) {
          throw new Error("Não foi possível carregar o produto.");
        }

        return data.product;
      } catch (requestError) {
        console.error(requestError);

        return null;
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
      getProductBySlug,
    }),
    [products, loading, error, fetchProducts, getProductBySlug],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
