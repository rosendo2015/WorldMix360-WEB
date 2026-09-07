import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Marketplace,
  type MarketplaceFormData,
  MarketplacesContext,
  type MarketplaceUpdateData,
} from "./MarketplacesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function MarketplacesProvider({ children }: { children: ReactNode }) {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchMarketplaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/marketplaces`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar os marketplaces.",
        );
      }

      setMarketplaces(Array.isArray(data) ? data : (data.marketplaces ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar marketplaces.",
      );

      setMarketplaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMarketplaceById = useCallback(
    async (id: string): Promise<Marketplace | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/marketplaces/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o marketplace.",
          );
        }

        return data.marketplace ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createMarketplace = useCallback(
    async (
      marketplaceData: MarketplaceFormData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) => [...previous, marketplace]);

      return marketplace;
    },
    [],
  );

  const updateMarketplace = useCallback(
    async (
      id: string,
      marketplaceData: MarketplaceUpdateData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) =>
        previous.map((item) => (item.id === id ? marketplace : item)),
      );

      return marketplace;
    },
    [],
  );

  const deleteMarketplace = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir marketplace.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setMarketplaces((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    }),
    [
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    ],
  );

  return (
    <MarketplacesContext.Provider value={value}>
      {children}
    </MarketplacesContext.Provider>
  );
}
