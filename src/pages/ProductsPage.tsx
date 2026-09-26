import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/ProductsContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const PAGE_SIZE = 24;

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type ProductsResponse = {
  products: Product[];
  pagination: Pagination;
  message?: string;
};

type SortOption = "recent" | "price_asc" | "price_desc" | "rating";

export function ProductsPage() {
  const [skeletonKeys] = useState(() =>
    Array.from({ length: 7 }, () => crypto.randomUUID()),
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const sort = (searchParams.get("sort") ?? "recent") as SortOption;

  const requestedPage = Number(searchParams.get("page"));
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });

  const [searchInput, setSearchInput] = useState(search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(PAGE_SIZE),
          sort,
        });

        if (search.trim()) {
          params.set("search", search.trim());
        }

        if (category) {
          params.set("category", category);
        }

        const response = await fetch(
          `${API_URL}/products?${params.toString()}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error(
            `Não foi possível carregar os produtos (${response.status}).`,
          );
        }

        const data: ProductsResponse = await response.json();

        console.log("PRODUCTS PAGE - resposta da API:", data);
        console.log("PRODUCTS PAGE - quantidade:", data.products?.length);

        if (!data.pagination || !Number.isInteger(data.pagination.totalPages)) {
          throw new Error(
            "A API ainda não está retornando a paginação. " +
              "Atualize o endpoint GET /products.",
          );
        }

        if (controller.signal.aborted) return;

        setProducts(data.products ?? []);
        setPagination(data.pagination);
      } catch (err) {
        if (controller.signal.aborted) return;

        setError(
          err instanceof Error ? err.message : "Erro ao carregar os produtos.",
        );

        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, [page, search, category, sort]);

  function updateFilters(changes: Record<string, string | null>) {
    const next = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value) {
        next.set(key, value);
      } else {
        next.delete(key);
      }
    });

    if ("search" in changes) {
      setSearchInput(changes.search ?? "");
    }

    next.delete("page");
    setSearchParams(next);
  }

  function changePage(nextPage: number) {
    if (nextPage < 1 || nextPage > pagination.totalPages || nextPage === page) {
      return;
    }

    const next = new URLSearchParams(searchParams);
    next.set("page", String(nextPage));

    setSearchParams(next);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateFilters({
      search: searchInput.trim() || null,
    });
  }

  const startItem =
    pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;

  const endItem = Math.min(
    pagination.page * pagination.limit,
    pagination.total,
  );

  const pageNumbers = Array.from(
    {
      length: Math.min(5, pagination.totalPages),
    },
    (_, index) => {
      const first = Math.max(1, Math.min(page - 2, pagination.totalPages - 4));

      return first + index;
    },
  );

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-blue">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Produtos</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          {search ? `Resultados para "${search}"` : "Todos os produtos"}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Explore os produtos disponíveis no WorldMix360.
        </p>
      </header>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Buscar produtos..."
            aria-label="Buscar produtos"
            className="min-w-0 flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue px-6 py-3 font-semibold text-white transition hover:bg-navy"
          >
            Buscar
          </button>
        </form>

        <div className="mt-4 flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600" aria-live="polite">
            {!loading && !error
              ? `${pagination.total} produtos encontrados`
              : loading
                ? "Carregando produtos..."
                : "Não foi possível carregar os produtos"}
          </p>

          <div className="flex items-center gap-2">
            <label
              htmlFor="product-sort"
              className="shrink-0 text-sm text-gray-600"
            >
              Ordenar por
            </label>

            <select
              id="product-sort"
              value={sort}
              onChange={(event) =>
                updateFilters({
                  sort: event.target.value,
                })
              }
              className="min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue"
            >
              <option value="recent">Mais recentes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="rating">Melhor avaliação</option>
            </select>
          </div>
        </div>

        {(search || category) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {search && (
              <button
                type="button"
                onClick={() => updateFilters({ search: null })}
                className="rounded-full bg-blue/10 px-3 py-1 text-sm text-blue"
              >
                Pesquisa: {search} ×
              </button>
            )}

            {category && (
              <button
                type="button"
                onClick={() => updateFilters({ category: null })}
                className="rounded-full bg-blue/10 px-3 py-1 text-sm text-blue"
              >
                Categoria: {category} ×
              </button>
            )}

            <Link
              to="/produtos"
              className="text-sm font-medium text-gray-600 underline"
            >
              Limpar filtros
            </Link>
          </div>
        )}
      </div>

      {loading && (
        <div
          role="status"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          aria-label="Carregando produtos"
        >
          {skeletonKeys.map((key) => (
            <div
              key={`product-skeleton-${key}`}
              className="h-[420px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
        >
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-semibold text-[#071a2f]">
            Nenhum produto encontrado
          </h2>

          <p className="mt-2 text-gray-500">
            Tente alterar sua pesquisa ou os filtros.
          </p>

          <Link
            to="/produtos"
            className="mt-6 inline-flex rounded-lg bg-blue px-6 py-3 font-semibold text-white hover:bg-navy"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <>
          <p className="mb-5 text-sm text-gray-500">
            Exibindo {startItem}–{endItem} de {pagination.total} produtos
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <nav
              aria-label="Paginação de produtos"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => changePage(page - 1)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => changePage(number)}
                  aria-label={`Página ${number}`}
                  aria-current={page === number ? "page" : undefined}
                  className={
                    page === number
                      ? "rounded-lg bg-blue px-4 py-2 font-semibold text-white"
                      : "rounded-lg border border-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  }
                >
                  {number}
                </button>
              ))}

              <button
                type="button"
                disabled={page >= pagination.totalPages}
                onClick={() => changePage(page + 1)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                Próxima
              </button>
            </nav>
          )}
        </>
      )}
    </main>
  );
}
