import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { Category, CategoryFormData } from "./CategoriesContext";

import { CategoriesContext } from "./CategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/categories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as categorias.",
        );
      }

      setCategories(Array.isArray(data) ? data : (data.categories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar categorias.",
      );

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback(
    async (id: string): Promise<Category | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/categories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a categoria.",
          );
        }

        return data.category ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createCategory = useCallback(
    async (
      categoryData: CategoryFormData,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) => [...previous, category]);

      return category;
    },
    [],
  );

  const updateCategory = useCallback(
    async (
      id: string,
      categoryData: Partial<CategoryFormData>,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) =>
        previous.map((item) => (item.id === id ? category : item)),
      );

      return category;
    },
    [],
  );

  const deleteCategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir categoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setCategories((previous) =>
        previous.filter((category) => category.id !== id),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
