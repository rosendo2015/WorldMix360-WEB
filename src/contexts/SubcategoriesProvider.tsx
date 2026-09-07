import { type ReactNode, useCallback, useMemo, useState } from "react";

import type {
  Subcategory,
  SubcategoryFormData,
  SubcategoryUpdateData,
} from "./SubcategoriesContext";

import { SubcategoriesContext } from "./SubcategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function SubcategoriesProvider({ children }: { children: ReactNode }) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/subcategories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as subcategorias.",
        );
      }

      setSubcategories(Array.isArray(data) ? data : (data.subcategories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar subcategorias.",
      );

      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubcategoryById = useCallback(
    async (id: string): Promise<Subcategory | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/subcategories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a subcategoria.",
          );
        }

        return data.subcategory ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createSubcategory = useCallback(
    async (
      subcategoryData: SubcategoryFormData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) => [...previous, subcategory]);

      return subcategory;
    },
    [],
  );

  const updateSubcategory = useCallback(
    async (
      id: string,
      subcategoryData: SubcategoryUpdateData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) =>
        previous.map((item) => (item.id === id ? subcategory : item)),
      );

      return subcategory;
    },
    [],
  );

  const deleteSubcategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir subcategoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setSubcategories((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    }),
    [
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    ],
  );

  return (
    <SubcategoriesContext.Provider value={value}>
      {children}
    </SubcategoriesContext.Provider>
  );
}
