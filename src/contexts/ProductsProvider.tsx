import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Product,
  type ProductFormData,
  type ProductStatusData,
  ProductsContext,
  type ProductUpdateData,
} from "./ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listagem pública
  const fetchProducts = useCallback(
    async (category?: string, search?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (category) {
          params.set("category", category);
        }

        if (search) {
          params.set("search", search);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products${queryString ? `?${queryString}` : ""}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar produtos.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Listagem administrativa
  const fetchAdminProducts = useCallback(
    async (
      token: string,
      filters?: {
        search?: string;
        subcategoryId?: string;
        marketplaceId?: string;
        featured?: boolean;
        active?: boolean;
        available?: boolean;
      },
    ) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (filters?.search) {
          params.set("search", filters.search);
        }

        if (filters?.subcategoryId) {
          params.set("subcategoryId", filters.subcategoryId);
        }

        if (filters?.marketplaceId) {
          params.set("marketplaceId", filters.marketplaceId);
        }

        if (filters?.featured !== undefined) {
          params.set("featured", String(filters.featured));
        }

        if (filters?.active !== undefined) {
          params.set("active", String(filters.active));
        }

        if (filters?.available !== undefined) {
          params.set("available", String(filters.available));
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products/admin${queryString ? `?${queryString}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os produtos.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Detalhe por slug
  const getProductBySlug = useCallback(
    async (slug: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Não foi possível carregar o produto.");
        }

        return data.product;
      } catch {
        return null;
      }
    },
    [],
  );

  // Detalhe por ID
  const getProductById = useCallback(
    async (id: string, token: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/id/${encodeURIComponent(id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o produto.",
          );
        }

        return data.product ?? null;
      } catch {
        return null;
      }
    },
    [],
  );

  // Criar
  const createProduct = useCallback(
    async (productData: ProductFormData, token: string): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar produto");
      }

      setProducts((prev) => [...prev, data.product]);

      return data.product;
    },
    [],
  );

  // Atualizar
  const updateProduct = useCallback(
    async (
      id: string,
      productData: ProductUpdateData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar produto");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  // Atualizar status
  const updateProductStatus = useCallback(
    async (
      id: string,
      statusData: ProductStatusData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar status");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    }),
    [
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
