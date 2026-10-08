import { Link } from "react-router-dom";

type DashboardMetricCardsProps = {
  totalProducts: number;
  activeProducts: number;
  totalCategories: number;
  activeCategories: number;
  totalSubcategories: number;
  activeSubcategories: number;
  totalMarketplaces: number;
  activeMarketplaces: number;
  totalPosts: number;
  publishedPosts: number;
};

export function DashboardMetricCards({
  totalProducts,
  activeProducts,
  totalCategories,
  activeCategories,
  totalSubcategories,
  activeSubcategories,
  totalMarketplaces,
  activeMarketplaces,
  totalPosts,
  publishedPosts,
}: DashboardMetricCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Link
        to="/admin/products"
        className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Produtos</p>
            <p className="mt-2 text-3xl font-bold text-navy">{totalProducts}</p>
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

      <Link
        to="/admin/blog"
        className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Blog</p>
            <p className="mt-2 text-3xl font-bold text-navy">{totalPosts}</p>
          </div>
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
            📝
          </span>
        </div>
        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-gray-500">{publishedPosts} publicados</span>
          <span className="font-semibold text-blue group-hover:underline">
            Gerenciar →
          </span>
        </div>
      </Link>
    </div>
  );
}

export function DashboardQuickActions() {
  return (
    <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-navy">Ações rápidas</h2>
        <p className="mt-1 text-sm text-gray-500">
          Acesse rapidamente as principais áreas de gerenciamento.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
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

        <Link
          to="/admin/blog"
          className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
        >
          <span className="text-xl">📝</span>
          <p className="mt-2 font-semibold text-navy">Gerenciar Blog</p>
          <p className="mt-1 text-xs text-gray-500">
            Gerenciar os artigos e conteúdos.
          </p>
        </Link>
      </div>
    </section>
  );
}
