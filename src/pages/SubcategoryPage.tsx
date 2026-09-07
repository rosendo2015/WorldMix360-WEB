import { useEffect, useMemo } from "react";
import { FiArrowLeft, FiArrowRight, FiGrid, FiHome } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();

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

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProducts();

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
    if (!categorySlug) {
      return undefined;
    }

    return categories.find(
      (item) =>
        item.slug.toLowerCase() === categorySlug.toLowerCase() && item.active,
    );
  }, [categories, categorySlug]);

  const subcategory = useMemo(() => {
    if (!subcategorySlug || !category) {
      return undefined;
    }

    return subcategories.find(
      (item) =>
        item.slug.toLowerCase() === subcategorySlug.toLowerCase() &&
        item.categoryId === category.id &&
        item.active,
    );
  }, [subcategories, subcategorySlug, category]);

  useEffect(() => {
    if (category) {
      void fetchProducts(category.name);
    }
  }, [category, fetchProducts]);

  const visibleProducts = useMemo(() => {
    if (!subcategory) {
      return [];
    }

    return products
      .filter(
        (product) =>
          product.subcategoryId === subcategory.id &&
          product.active &&
          product.available,
      )
      .slice(0, 4);
  }, [products, subcategory]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError || subcategoriesError || productsError;

  /*
   * Estado de carregamento
   */
  if (loading && !category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="animate-pulse">
          <div className="mb-6 h-5 w-40 rounded bg-slate-200" />

          <div className="grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 p-8 md:p-12">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-12 w-3/4 rounded bg-slate-200" />
              <div className="h-20 w-full rounded bg-slate-200" />
            </div>

            <div className="min-h-[260px] bg-slate-200" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["one", "two", "three", "four"].map((item) => (
              <div
                key={`subcategory-product-skeleton-${item}`}
                className="h-[360px] rounded-[24px] bg-slate-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
   * Categoria não encontrada
   */
  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Categoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A categoria que você está procurando não existe ou não está
            disponível no momento.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiHome />
            Voltar para o início
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Subcategoria não encontrada
   */
  if (!subcategory) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-slate-900">
            Início
          </Link>

          <span>/</span>

          <Link
            to={`/categoria/${category.slug}`}
            className="transition hover:text-slate-900"
          >
            {category.name}
          </Link>
        </div>

        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Subcategoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A subcategoria que você está procurando não existe ou não está
            disponível nesta categoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiArrowLeft />
            Voltar para {category.name}
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Erro
   */
  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="rounded-[32px] border border-red-100 bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FiGrid className="text-2xl text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Não foi possível carregar esta seleção
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Ocorreu um problema ao carregar os produtos. Tente novamente em
            alguns instantes.
          </p>

          <button
            type="button"
            onClick={() => {
              void fetchProducts(category.name);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link to="/" className="transition hover:text-slate-900">
          Início
        </Link>

        <span>/</span>

        <Link
          to={`/categoria/${category.slug}`}
          className="transition hover:text-slate-900"
        >
          {category.name}
        </Link>

        <span>/</span>

        <span className="font-medium text-slate-900">{subcategory.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12 grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
        {/* Conteúdo */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Subcategoria
          </span>

          <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {subcategory.name}
          </h1>

          {subcategory.description && (
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {subcategory.description}
            </p>
          )}

          <div className="mt-7">
            <Link
              to={`/categoria/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              <FiArrowLeft />
              Voltar para {category.name}
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative min-h-[280px] overflow-hidden bg-slate-100 md:min-h-full">
          {subcategory.image ? (
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center">
              <FiGrid className="text-7xl text-slate-300" />
            </div>
          )}
        </div>
      </div>

      {/* Cabeçalho dos produtos */}
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Ofertas encontradas
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Escolha o que combina com você
          </h2>
        </div>

        <span className="text-sm text-slate-400">
          Links patrocinados identificados
        </span>
      </div>

      {/* Produtos */}
      {productsLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["one", "two", "three", "four"].map((item) => (
            <div
              key={`product-skeleton-${item}`}
              className="h-[360px] animate-pulse rounded-[24px] bg-slate-100"
            />
          ))}
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-[24px] border border-[#e7edf5] bg-white px-6 py-12 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-xl text-slate-500" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Nenhum produto disponível
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Ainda não encontramos produtos ativos e disponíveis nesta
            subcategoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Ver outras subcategorias
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleProducts.length === 4 && (
            <div className="mt-8 flex justify-center">
              <Link
                to={`/categoria/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Voltar para a categoria
                <FiArrowRight />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
