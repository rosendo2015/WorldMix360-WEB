import { type ReactNode, useCallback, useMemo, useState } from "react";

import type {
  BlogCategory,
  BlogCategoryFilters,
  BlogCategoryFormData,
  BlogCategoryUpdateData,
} from "../types/Blog";
import { BlogCategoriesContext } from "./BlogCategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function BlogCategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Listagem pública das categorias do Blog.
   */
  const fetchCategories = useCallback(async (filters?: BlogCategoryFilters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters?.search) {
        params.set("search", filters.search);
      }

      if (filters?.active !== undefined) {
        params.set("active", String(filters.active));
      }

      const queryString = params.toString();

      const response = await fetch(
        `${apiUrl}/blog/categories${queryString ? `?${queryString}` : ""}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as categorias do Blog.",
        );
      }

      setCategories(data.categories ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao carregar categorias do Blog.",
      );

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Busca uma categoria pelo ID.
   * Operação administrativa.
   */
  const getCategoryById = useCallback(
    async (id: string, token: string): Promise<BlogCategory | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/blog/categories/${encodeURIComponent(id)}`,
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
            data.message ?? "Não foi possível carregar a categoria do Blog.",
          );
        }

        return data.category ?? null;
      } catch {
        return null;
      }
    },
    [],
  );

  /**
   * Busca uma categoria pelo slug.
   * Operação pública.
   */
  const getCategoryBySlug = useCallback(
    async (slug: string): Promise<BlogCategory | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/blog/categories/slug/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a categoria do Blog.",
          );
        }

        return data.category ?? null;
      } catch {
        return null;
      }
    },
    [],
  );

  /**
   * Cria uma categoria.
   */
  const createCategory = useCallback(
    async (
      categoryData: BlogCategoryFormData,
      token: string,
    ): Promise<BlogCategory> => {
      const response = await fetch(`${apiUrl}/blog/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar categoria do Blog.");
      }

      setCategories((currentCategories) => [
        ...currentCategories,
        data.category,
      ]);

      return data.category;
    },
    [],
  );

  /**
   * Atualiza uma categoria.
   */
  const updateCategory = useCallback(
    async (
      id: string,
      categoryData: BlogCategoryUpdateData,
      token: string,
    ): Promise<BlogCategory> => {
      const response = await fetch(
        `${apiUrl}/blog/categories/${encodeURIComponent(id)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(categoryData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar categoria do Blog.");
      }

      setCategories((currentCategories) =>
        currentCategories.map((category) =>
          category.id === id ? data.category : category,
        ),
      );

      return data.category;
    },
    [],
  );

  /**
   * Exclui uma categoria.
   */
  const deleteCategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(
        `${apiUrl}/blog/categories/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao excluir categoria do Blog.");
      }

      setCategories((currentCategories) =>
        currentCategories.filter((category) => category.id !== id),
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
      getCategoryBySlug,
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
      getCategoryBySlug,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <BlogCategoriesContext.Provider value={value}>
      {children}
    </BlogCategoriesContext.Provider>
  );
}
