import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

import { useCategories } from "../contexts/useCategories";
import { useSubcategories } from "../contexts/useSubcategories";

export function AllCategoriesPage() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
    fetchSubcategories,
  } = useSubcategories();

  useEffect(() => {
    void fetchCategories();
    void fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  const activeCategories = useMemo(() => {
    return categories
      .filter((category) => category.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [categories]);

  const getCategorySubcategories = (categoryId: string) => {
    return subcategories
      .filter(
        (subcategory) =>
          subcategory.categoryId === categoryId && subcategory.active,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  };

  const loading = categoriesLoading || subcategoriesLoading;

  const error = categoriesError ?? subcategoriesError ?? null;

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#52657c]">Carregando categorias...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Não foi possível carregar as categorias
          </h1>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  if (activeCategories.length === 0) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#071a2f]">
            Nenhuma categoria disponível
          </h1>

          <p className="mt-2 text-sm text-[#52657c]">
            Ainda não existem categorias disponíveis no momento.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      {/* Cabeçalho */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1769e0]">
          Explore o WorldMix360
        </p>

        <h1 className="text-3xl font-bold text-[#071a2f] md:text-4xl">
          Todas as categorias
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[#52657c]">
          Encontre produtos organizados por categorias e subcategorias.
        </p>
      </div>

      {/* Categorias */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeCategories.map((category) => {
          const categorySubcategories = getCategorySubcategories(category.id);

          return (
            <article
              key={category.id}
              className="overflow-hidden rounded-2xl border border-[#e7edf5] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {/* Imagem */}
              {category.image ? (
                <Link to={`/categoria/${encodeURIComponent(category.slug)}`}>
                  <div className="h-48 overflow-hidden bg-[#f8fafc]">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
              ) : (
                <div className="flex h-48 items-center justify-center bg-[#f8fafc]">
                  <span className="text-sm font-medium text-[#8a9aab]">
                    Sem imagem
                  </span>
                </div>
              )}

              {/* Conteúdo */}
              <div className="p-6">
                <Link
                  to={`/categoria/${encodeURIComponent(category.slug)}`}
                  className="group"
                >
                  <h2 className="text-xl font-bold text-[#071a2f] transition group-hover:text-[#1769e0]">
                    {category.name}
                  </h2>
                </Link>

                {category.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52657c]">
                    {category.description}
                  </p>
                )}

                {/* Subcategorias */}
                {categorySubcategories.length > 0 && (
                  <div className="mt-5 border-t border-[#e7edf5] pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#8a9aab]">
                      {categorySubcategories.length}{" "}
                      {categorySubcategories.length === 1
                        ? "subcategoria"
                        : "subcategorias"}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {categorySubcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/categoria/${encodeURIComponent(
                            category.slug,
                          )}/${encodeURIComponent(subcategory.slug)}`}
                          className="rounded-lg bg-[#f4f7fb] px-3 py-2 text-sm font-medium text-[#52657c] transition hover:bg-[#1769e0] hover:text-white"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Link da categoria */}
                <Link
                  to={`/categoria/${encodeURIComponent(category.slug)}`}
                  className="mt-5 inline-flex text-sm font-semibold text-[#1769e0] transition hover:text-[#0f58c7]"
                >
                  Ver produtos da categoria →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
