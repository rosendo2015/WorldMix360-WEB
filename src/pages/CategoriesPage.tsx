import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function CategoryPage() {
  const { slug } = useParams();

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
    void fetchCategories();
    void fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  const category = useMemo(() => {
    if (!slug) return null;

    return (
      categories.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase(),
      ) ?? null
    );
  }, [categories, slug]);

  useEffect(() => {
    if (!category) return;

    void fetchProducts(category.slug);
  }, [category, fetchProducts]);

  const categorySubcategories = useMemo(() => {
    if (!category) return [];

    return subcategories
      .filter(
        (subcategory) =>
          subcategory.categoryId === category.id && subcategory.active,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [category, subcategories]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    return products.filter((product) => product.active && product.available);
  }, [category, products]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError ?? subcategoriesError ?? productsError ?? null;

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#52657c]">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Não foi possível carregar a categoria
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

  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#071a2f]">
            Categoria não encontrada
          </h1>

          <p className="mt-2 text-sm text-[#52657c]">
            A categoria que você está procurando não existe ou não está
            disponível.
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
      {/* Hero da categoria */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-[#e7edf5] bg-white shadow-sm">
        <div className="grid min-h-[260px] md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1769e0]">
              Categoria
            </p>

            <h1 className="text-3xl font-bold text-[#071a2f] md:text-4xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657c]">
                {category.description}
              </p>
            )}
          </div>

          {category.image && (
            <div className="min-h-[220px] bg-[#f8fafc]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Subcategorias */}
      {categorySubcategories.length > 0 && (
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#071a2f]">Subcategorias</h2>

            <p className="mt-1 text-sm text-[#52657c]">
              Explore os produtos por subcategoria.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorySubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/categoria/${encodeURIComponent(
                  category.slug,
                )}/${encodeURIComponent(subcategory.slug)}`}
                className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                  {subcategory.name}
                </h3>

                {subcategory.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52657c]">
                    {subcategory.description}
                  </p>
                )}

                <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                  Ver subcategoria →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produtos da categoria */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Produtos de {category.name}
          </h2>

          <p className="mt-1 text-sm text-[#52657c]">
            {categoryProducts.length > 0
              ? `${categoryProducts.length} ${
                  categoryProducts.length === 1
                    ? "produto encontrado"
                    : "produtos encontrados"
                }`
              : "Nenhum produto disponível nesta categoria no momento."}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-[#071a2f]">
              Nenhum produto disponível
            </h3>

            <p className="mt-2 text-sm text-[#52657c]">
              Ainda não existem produtos ativos e disponíveis nesta categoria.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}
