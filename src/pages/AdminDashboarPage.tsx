// src/pages/admin/AdminDashboardPage.tsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";
import { useMarketplaces } from "../contexts/useMarketplaces";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export default function AdminDashboardPage() {
  const { token } = useAuth();

  const {
    products,
    fetchAdminProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    subcategories,
    fetchSubcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useSubcategories();

  const {
    marketplaces,
    fetchMarketplaces,
    loading: marketplacesLoading,
    error: marketplacesError,
  } = useMarketplaces();

  /**
   * Carrega os dados necessários para o Dashboard.
   *
   * Produtos administrativos precisam do token.
   * Categorias, subcategorias e marketplaces possuem
   * endpoints públicos de leitura.
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    void Promise.all([
      fetchAdminProducts(token),
      fetchCategories(),
      fetchSubcategories(),
      fetchMarketplaces(),
    ]);
  }, [
    token,
    fetchAdminProducts,
    fetchCategories,
    fetchSubcategories,
    fetchMarketplaces,
  ]);

  // ================================
  // Estatísticas de produtos
  // ================================

  const totalProducts = products.length;

  const activeProducts = products.filter((product) => product.active).length;

  const availableProducts = products.filter(
    (product) => product.available,
  ).length;

  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  // ================================
  // Estatísticas de categorias
  // ================================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.active,
  ).length;

  // ================================
  // Estatísticas de subcategorias
  // ================================

  const totalSubcategories = subcategories.length;

  const activeSubcategories = subcategories.filter(
    (subcategory) => subcategory.active,
  ).length;

  // ================================
  // Estatísticas de marketplaces
  // ================================

  const totalMarketplaces = marketplaces.length;

  const activeMarketplaces = marketplaces.filter(
    (marketplace) => marketplace.active,
  ).length;

  const isLoading =
    productsLoading ||
    categoriesLoading ||
    subcategoriesLoading ||
    marketplacesLoading;

  const errors = [
    productsError,
    categoriesError,
    subcategoriesError,
    marketplacesError,
  ].filter(Boolean);

  return (
    <section className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* ========================================
          CABEÇALHO
      ======================================== */}

      <header className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue">WorldMix360</p>

            <h1 className="text-2xl font-bold text-navy sm:text-3xl">
              Dashboard Administrativo
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Visão geral do catálogo e das principais áreas do sistema.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue/90"
            >
              + Novo produto
            </Link>

            <Link
              to="/admin/categories/new"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              + Nova categoria
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================
          CARREGAMENTO
      ======================================== */}

      {isLoading && (
        <div className="mb-6 rounded-xl border border-blue-light bg-blue-light px-5 py-4">
          <p className="text-sm font-medium text-blue">
            Atualizando informações do painel...
          </p>
        </div>
      )}

      {/* ========================================
          ERROS
      ======================================== */}

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="font-semibold text-red-700">
            Algumas informações não puderam ser carregadas.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Verifique a conexão com a API e tente novamente.
          </p>
        </div>
      )}

      {/* ========================================
          CARDS PRINCIPAIS
      ======================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Produtos */}

        <Link
          to="/admin/products"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Produtos</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📦
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeProducts} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Categorias */}

        <Link
          to="/admin/categories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Categorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalCategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🗂️
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeCategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Subcategorias */}

        <Link
          to="/admin/subcategories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Subcategorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalSubcategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📁
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeSubcategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Marketplaces */}

        <Link
          to="/admin/marketplaces"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Marketplaces</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalMarketplaces}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🛒
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeMarketplaces} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>
      </div>

      {/* ========================================
          RESUMO DO CATÁLOGO
      ======================================== */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Resumo dos produtos */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy">
                Resumo dos produtos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Situação atual do catálogo de produtos.
              </p>
            </div>

            <Link
              to="/admin/products"
              className="text-sm font-semibold text-blue hover:underline"
            >
              Ver produtos
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Total</p>

              <p className="mt-1 text-2xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Ativos</p>

              <p className="mt-1 text-2xl font-bold text-green">
                {activeProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Disponíveis</p>

              <p className="mt-1 text-2xl font-bold text-blue">
                {availableProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Destaques</p>

              <p className="mt-1 text-2xl font-bold text-yellow">
                {featuredProducts}
              </p>
            </div>
          </div>
        </section>

        {/* Resumo do catálogo */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-navy">
              Estrutura do catálogo
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Organização atual das categorias e canais de venda.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/admin/categories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🗂️
                </span>

                <div>
                  <p className="font-semibold text-navy">Categorias</p>

                  <p className="text-xs text-gray-500">
                    {activeCategories} ativas de {totalCategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/subcategories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  📁
                </span>

                <div>
                  <p className="font-semibold text-navy">Subcategorias</p>

                  <p className="text-xs text-gray-500">
                    {activeSubcategories} ativas de {totalSubcategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/marketplaces"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🛒
                </span>

                <div>
                  <p className="font-semibold text-navy">Marketplaces</p>

                  <p className="text-xs text-gray-500">
                    {activeMarketplaces} ativos de {totalMarketplaces}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ========================================
          AÇÕES RÁPIDAS
      ======================================== */}

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-navy">Ações rápidas</h2>

          <p className="mt-1 text-sm text-gray-500">
            Acesse rapidamente as principais áreas de gerenciamento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/products/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📦</span>

            <p className="mt-2 font-semibold text-navy">Cadastrar produto</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um novo produto ao catálogo.
            </p>
          </Link>

          <Link
            to="/admin/categories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🗂️</span>

            <p className="mt-2 font-semibold text-navy">Nova categoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Criar uma nova categoria.
            </p>
          </Link>

          <Link
            to="/admin/subcategories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📁</span>

            <p className="mt-2 font-semibold text-navy">Nova subcategoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Organizar melhor o catálogo.
            </p>
          </Link>

          <Link
            to="/admin/marketplaces/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🛒</span>

            <p className="mt-2 font-semibold text-navy">Novo marketplace</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um canal de venda.
            </p>
          </Link>
        </div>
      </section>
    </section>
  );
}
