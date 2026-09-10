import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type SearchCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
};

type SearchSubcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
};

type SearchResponse = {
  query: string;
  products: Product[];
  categories: SearchCategory[];
  subcategories: SearchSubcategory[];
};

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [subcategories, setSubcategories] = useState<SearchSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSearchResults() {
      setLoading(true);
      setError(null);

      try {
        if (!search) {
          const response = await fetch(`${apiUrl}/products`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ?? "Não foi possível carregar os produtos.",
            );
          }

          if (!cancelled) {
            setProducts(data.products ?? []);
            setCategories([]);
            setSubcategories([]);
          }

          return;
        }

        const response = await fetch(
          `${apiUrl}/search?q=${encodeURIComponent(search)}`,
        );

        const data: SearchResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            (data as { message?: string }).message ??
              "Não foi possível realizar a pesquisa.",
          );
        }

        if (!cancelled) {
          setProducts(data.products ?? []);
          setCategories(data.categories ?? []);
          setSubcategories(data.subcategories ?? []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Erro ao realizar a pesquisa.",
          );

          setProducts([]);
          setCategories([]);
          setSubcategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSearchResults();

    return () => {
      cancelled = true;
    };
  }, [search]);

  const hasResults =
    products.length > 0 || categories.length > 0 || subcategories.length > 0;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          {search ? `Resultados para "${search}"` : "Produtos"}
        </h1>

        {search && !loading && !error && (
          <p className="mt-2 text-sm text-[#52657c]">
            {[
              categories.length > 0 &&
                `${categories.length} ${
                  categories.length === 1 ? "categoria" : "categorias"
                }`,
              subcategories.length > 0 &&
                `${subcategories.length} ${
                  subcategories.length === 1 ? "subcategoria" : "subcategorias"
                }`,
              products.length > 0 &&
                `${products.length} ${
                  products.length === 1 ? "produto" : "produtos"
                }`,
            ]
              .filter(Boolean)
              .join(" • ")}
          </p>
        )}
      </div>

      {loading && (
        <div className="py-16 text-center">
          <p className="text-sm text-[#52657c]">
            {search ? "Pesquisando..." : "Carregando produtos..."}
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Não foi possível carregar os resultados.
          </p>

          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && !hasResults && (
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#071a2f]">
            Nenhum resultado encontrado
          </h2>

          <p className="mt-2 text-sm text-[#52657c]">
            {search
              ? `Não encontramos categorias, subcategorias ou produtos para "${search}".`
              : "Ainda não existem produtos disponíveis no catálogo."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {!loading && !error && hasResults && (
        <div className="space-y-12">
          {categories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Categorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${encodeURIComponent(category.slug)}`}
                    className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                        {category.description}
                      </p>
                    )}

                    <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                      Ver categoria →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {subcategories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Subcategorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {subcategories.map((subcategory) => {
                  const categorySlug = subcategory.category?.slug;

                  if (!categorySlug) {
                    return (
                      <div
                        key={subcategory.id}
                        className="rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-[#071a2f]">
                          {subcategory.name}
                        </h3>

                        {subcategory.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={subcategory.id}
                      to={`/categoria/${encodeURIComponent(
                        categorySlug,
                      )}/${encodeURIComponent(subcategory.slug)}`}
                      className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                        {subcategory.name}
                      </h3>

                      {subcategory.category && (
                        <p className="mt-1 text-xs font-medium text-[#1769e0]">
                          {subcategory.category.name}
                        </p>
                      )}

                      {subcategory.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                          {subcategory.description}
                        </p>
                      )}

                      <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                        Ver subcategoria →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">Produtos</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}
