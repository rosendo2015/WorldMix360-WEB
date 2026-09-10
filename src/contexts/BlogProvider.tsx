import { type ReactNode, useCallback, useMemo, useState } from "react";

import type {
  BlogContextValue,
  BlogPost,
  BlogPostAdminFilters,
  BlogPostFilters,
  BlogPostFormData,
} from "./BlogContext";

import { BlogContext } from "./BlogContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (filters?: BlogPostFilters) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (filters?.search) {
        params.set("search", filters.search);
      }

      if (filters?.categoryId) {
        params.set("categoryId", filters.categoryId);
      }

      const queryString = params.toString();

      const response = await fetch(
        `${apiUrl}/blog${queryString ? `?${queryString}` : ""}`,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar os posts do blog.",
        );
      }

      setPosts(Array.isArray(data) ? data : (data.posts ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar os posts do blog.",
      );

      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPostBySlug = useCallback(
    async (slug: string): Promise<BlogPost | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/blog/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message ?? "Não foi possível carregar o post.");
        }

        return data.post ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const getPostById = useCallback(
    async (id: string, token: string): Promise<BlogPost | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/blog/id/${encodeURIComponent(id)}`,
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
          throw new Error(data.message ?? "Não foi possível carregar o post.");
        }

        return data.post ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const fetchAdminPosts = useCallback(
    async (token: string, filters?: BlogPostAdminFilters) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (filters?.search) {
          params.set("search", filters.search);
        }

        if (filters?.categoryId) {
          params.set("categoryId", filters.categoryId);
        }

        if (filters?.status) {
          params.set("status", filters.status);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/blog/admin${queryString ? `?${queryString}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ??
              "Não foi possível carregar os posts administrativos.",
          );
        }

        setPosts(Array.isArray(data) ? data : (data.posts ?? []));
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Erro ao carregar os posts administrativos.",
        );

        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const createPost = useCallback(
    async (postData: BlogPostFormData, token: string): Promise<BlogPost> => {
      const response = await fetch(`${apiUrl}/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar post.");
      }

      const post = data.post ?? data;

      setPosts((previous) => [post, ...previous]);

      return post;
    },
    [],
  );

  const updatePost = useCallback(
    async (
      id: string,
      postData: Partial<BlogPostFormData>,
      token: string,
    ): Promise<BlogPost> => {
      const response = await fetch(`${apiUrl}/blog/${encodeURIComponent(id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar post.");
      }

      const post = data.post ?? data;

      setPosts((previous) =>
        previous.map((item) => (item.id === id ? post : item)),
      );

      return post;
    },
    [],
  );

  const deletePost = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/blog/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir post.";

        try {
          const data = await response.json();

          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setPosts((previous) => previous.filter((post) => post.id !== id));
    },
    [],
  );

  const value = useMemo<BlogContextValue>(
    () => ({
      posts,
      loading,
      error,
      fetchPosts,
      getPostBySlug,
      getPostById,
      fetchAdminPosts,
      createPost,
      updatePost,
      deletePost,
    }),
    [
      posts,
      loading,
      error,
      fetchPosts,
      getPostBySlug,
      getPostById,
      fetchAdminPosts,
      createPost,
      updatePost,
      deletePost,
    ],
  );

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
