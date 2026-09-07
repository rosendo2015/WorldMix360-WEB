import { useEffect, useMemo } from "react";
import { FiArrowLeft, FiArrowRight, FiGrid } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { useCategories } from "../contexts/useCategories";
import { useSubcategories } from "../contexts/useSubcategories";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();

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
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  const category = useMemo(() => {
    if (!slug) {
      return null;
    }

    return (
      categories.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase(),
      ) ?? null
    );
  }, [categories, slug]);

  const activeSubcategories = useMemo(() => {
    if (!category) {
      return [];
    }

    return subcategories
      .filter(
        (subcategory) =>
          subcategory.categoryId === category.id && subcategory.active,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [category, subcategories]);

  const loading = categoriesLoading || subcategoriesLoading;
  const error = categoriesError ?? subcategoriesError;

  if (loading) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="animate-pulse">
          {/* Hero */}
          <div className="grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
            <div className="flex flex-col justify-center p-8 md:p-10">
              <div className="h-4 w-28 rounded bg-[#e7edf5]" />
              <div className="mt-4 h-12 w-3/4 rounded bg-[#e7edf5]" />
              <div className="mt-5 h-4 w-full max-w-xl rounded bg-[#e7edf5]" />
              <div className="mt-2 h-4 w-5/6 max-w-xl rounded bg-[#e7edf5]" />
            </div>

            <div className="min-h-[240px] bg-[#edf5ff] md:min-h-full" />
          </div>

          {/* Subcategorias */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "subcategory-skeleton-1",
              "subcategory-skeleton-2",
              "subcategory-skeleton-3",
              "subcategory-skeleton-4",
              "subcategory-skeleton-5",
              "subcategory-skeleton-6",
              "subcategory-skeleton-7",
              "subcategory-skeleton-8",
            ].map((skeletonKey) => (
              <div
                key={skeletonKey}
                className="overflow-hidden rounded-[24px] border border-[#e7edf5] bg-white shadow-sm"
              >
                <div className="h-40 bg-[#edf5ff]" />
                <div className="p-5">
                  <div className="h-5 w-3/4 rounded bg-[#e7edf5]" />
                  <div className="mt-3 h-4 w-full rounded bg-[#e7edf5]" />
                  <div className="mt-2 h-4 w-5/6 rounded bg-[#e7edf5]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="rounded-[28px] border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-red-700">
            Não foi possível carregar a categoria
          </h1>

          <p className="mt-3 text-sm leading-6 text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1769e0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b3d66]"
          >
            <FiArrowLeft />
            Voltar para a Home
          </Link>
        </div>
      </main>
    );
  }

  if (!category) {
    return (
      <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-8 text-center">
          <FiGrid className="mx-auto text-4xl text-[#1769e0]" />

          <h1 className="mt-4 text-2xl font-bold text-[#071a2f]">
            Categoria não encontrada
          </h1>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#52657c]">
            A categoria que você tentou acessar não existe ou não está
            disponível.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1769e0] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0b3d66]"
          >
            <FiArrowLeft />
            Voltar para a Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      {/* Hero da categoria */}
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <Link
            to="/"
            className="mb-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#52657c] transition hover:text-[#1769e0]"
          >
            <FiArrowLeft />
            Voltar para a Home
          </Link>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Categoria
          </p>

          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {category.name}
          </h1>

          {category.description && (
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
              {category.description}
            </p>
          )}
        </div>

        <div className="relative min-h-[240px] overflow-hidden bg-[#edf5ff] md:min-h-full">
          {category.image ? (
            <>
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/10 to-transparent" />
            </>
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center">
              <FiGrid className="text-7xl text-[#1769e0]" />
            </div>
          )}
        </div>
      </div>

      {/* Subcategorias */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
          Explore
        </p>

        <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
          Explore {category.name}
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#52657c]">
          Escolha uma subcategoria para encontrar produtos relacionados.
        </p>
      </div>

      {activeSubcategories.length === 0 ? (
        <div className="rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-8 text-center">
          <FiGrid className="mx-auto text-4xl text-[#1769e0]" />

          <h3 className="mt-4 text-lg font-semibold text-[#071a2f]">
            Nenhuma subcategoria disponível
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#52657c]">
            Ainda não existem subcategorias ativas para esta categoria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {activeSubcategories.map((subcategory) => (
            <article
              key={subcategory.id}
              className="group overflow-hidden rounded-[24px] border border-[#e7edf5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
            >
              <Link
                to={`/categoria/${category.slug}/${subcategory.slug}`}
                className="block h-full"
              >
                <div className="h-40 overflow-hidden bg-[#edf5ff]">
                  {subcategory.image ? (
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <FiGrid className="text-5xl text-[#1769e0] transition duration-300 group-hover:scale-110" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <p className="mb-2 text-lg font-semibold text-[#071a2f]">
                    {subcategory.name}
                  </p>

                  {subcategory.description && (
                    <p className="line-clamp-2 text-sm leading-6 text-[#52657c]">
                      {subcategory.description}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0b3d66]">
                    Explorar seleção
                    <FiArrowRight className="transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
