import { useMemo, useState } from "react";
import {
  FiCheck,
  FiChevronRight,
  FiFilter,
  FiGrid,
  FiList,
  FiRotateCcw,
  FiSearch,
  FiStar,
  FiTag,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { useCategories } from "../../contexts/useCategories";
import { useMarketplaces } from "../../contexts/useMarketplaces";
import { useProducts } from "../../contexts/useProducts";
import { useSubcategories } from "../../contexts/useSubcategories";

type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "newest";

export function ProductsPage() {
  const { products, loading: loadingProducts } = useProducts();
  const { categories } = useCategories();
  const { subcategories } = useSubcategories();
  const { marketplaces } = useMarketplaces();

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedMarketplace, setSelectedMarketplace] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);

  // Flags de Status
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [onlyDestaque, setOnlyDestaque] = useState(false);
  const [onlyBestSeller, setOnlyBestSeller] = useState(false);

  // Estado de Ordenação e Layout
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtrar subcategorias disponíveis com base na categoria selecionada
  const availableSubcategories = useMemo(() => {
    if (!selectedCategory) return subcategories;
    return subcategories.filter(
      (sub) =>
        sub.category?.id === selectedCategory ||
        sub.categoryId === selectedCategory,
    );
  }, [subcategories, selectedCategory]);

  // Aplicar Filtros e Ordenação nos Produtos
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Busca Textual
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = product.title.toLowerCase().includes(query);
          const matchesDesc =
            product.description?.toLowerCase().includes(query) ?? false;
          if (!matchesTitle && !matchesDesc) return false;
        }

        // Categoria
        if (selectedCategory) {
          const productSubcat = subcategories.find(
            (s) => s.id === product.subcategoryId,
          );
          const categoryId =
            productSubcat?.category?.id || productSubcat?.categoryId;
          if (categoryId !== selectedCategory) return false;
        }

        // Subcategoria
        if (
          selectedSubcategory &&
          product.subcategoryId !== selectedSubcategory
        ) {
          return false;
        }

        // Marketplace
        if (
          selectedMarketplace &&
          product.marketplaceId !== selectedMarketplace
        ) {
          return false;
        }

        // Faixa de Preço
        const price = Number(product.price) || 0;
        if (minPrice !== "" && price < Number(minPrice)) return false;
        if (maxPrice !== "" && price > Number(maxPrice)) return false;

        // Avaliação Mínima
        if (minRating !== null && (product.rating ?? 0) < minRating)
          return false;

        // Flags
        if (onlyFeatured && !product.featured) return false;
        if (onlyDestaque && !product.destaque) return false;
        if (onlyBestSeller && !product.bestSeller) return false;

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;

        switch (sortBy) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "rating-desc":
            return ratingB - ratingA;
          case "newest":
            return (
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime()
            );
          case "relevance":
          default:
            return 0;
        }
      });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedMarketplace,
    minPrice,
    maxPrice,
    minRating,
    onlyFeatured,
    onlyDestaque,
    onlyBestSeller,
    sortBy,
    subcategories,
  ]);

  // Lógica da Paginação
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Contagem de filtros ativos
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery) count++;
    if (selectedCategory) count++;
    if (selectedSubcategory) count++;
    if (selectedMarketplace) count++;
    if (minPrice !== "") count++;
    if (maxPrice !== "") count++;
    if (minRating !== null) count++;
    if (onlyFeatured) count++;
    if (onlyDestaque) count++;
    if (onlyBestSeller) count++;
    return count;
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
    selectedMarketplace,
    minPrice,
    maxPrice,
    minRating,
    onlyFeatured,
    onlyDestaque,
    onlyBestSeller,
  ]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedMarketplace("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating(null);
    setOnlyFeatured(false);
    setOnlyDestaque(false);
    setOnlyBestSeller(false);
    setCurrentPage(1);
  };

  const formatPrice = (val: number | string) => {
    const num = typeof val === "string" ? parseFloat(val) : val;
    return isNaN(num)
      ? "R$ 0,00"
      : num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // Componente Reutilizável de Filtros (usado tanto no desktop quanto no drawer mobile)
  const FilterControls = () => (
    <div className="space-y-6">
      {/* Busca rápida */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Buscar por nome
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Ex.: Smartphone, Air Fryer..."
            className="w-full rounded-xl border border-[#e7edf5] bg-white py-2.5 pl-9 pr-3 text-sm text-[#071a2f] outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/10"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Categorias */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Categoria
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedSubcategory(""); // Reseta a subcategoria ao trocar de categoria
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-[#e7edf5] bg-white px-3 py-2.5 text-sm text-[#071a2f] outline-none transition focus:border-blue"
        >
          <option value="">Todas as Categorias</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategorias */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Subcategoria
        </label>
        <select
          value={selectedSubcategory}
          onChange={(e) => {
            setSelectedSubcategory(e.target.value);
            setCurrentPage(1);
          }}
          disabled={availableSubcategories.length === 0}
          className="w-full rounded-xl border border-[#e7edf5] bg-white px-3 py-2.5 text-sm text-[#071a2f] outline-none transition focus:border-blue disabled:bg-gray-100"
        >
          <option value="">Todas as Subcategorias</option>
          {availableSubcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* Marketplaces */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Marketplace
        </label>
        <select
          value={selectedMarketplace}
          onChange={(e) => {
            setSelectedMarketplace(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full rounded-xl border border-[#e7edf5] bg-white px-3 py-2.5 text-sm text-[#071a2f] outline-none transition focus:border-blue"
        >
          <option value="">Todos os Parceiros</option>
          {marketplaces.map((mkt) => (
            <option key={mkt.id} value={mkt.id}>
              {mkt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Faixa de Preço */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Faixa de Preço (R$)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Mínimo"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-[#e7edf5] bg-white px-3 py-2 text-sm text-[#071a2f] outline-none transition focus:border-blue"
          />
          <input
            type="number"
            placeholder="Máximo"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full rounded-xl border border-[#e7edf5] bg-white px-3 py-2 text-sm text-[#071a2f] outline-none transition focus:border-blue"
          />
        </div>
      </div>

      {/* Avaliação Mínima */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Avaliação Mínima
        </label>
        <div className="flex items-center justify-between gap-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => {
                setMinRating(minRating === rating ? null : rating);
                setCurrentPage(1);
              }}
              className={`flex flex-1 items-center justify-center gap-1 rounded-lg border py-1.5 text-xs font-semibold transition ${
                minRating === rating
                  ? "border-blue bg-blue/10 text-blue"
                  : "border-[#e7edf5] bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span>{rating}</span>
              <FiStar className="fill-yellow-400 text-yellow-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Flags e Filtros Especiais */}
      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#8a9bb0]">
          Destaques e Ofertas
        </label>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#52657c]">
            <input
              type="checkbox"
              checked={onlyFeatured}
              onChange={(e) => {
                setOnlyFeatured(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-blue"
            />
            <span>Produtos em Destaque</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#52657c]">
            <input
              type="checkbox"
              checked={onlyDestaque}
              onChange={(e) => {
                setOnlyDestaque(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-blue"
            />
            <span>Ofertas em Destaque</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#52657c]">
            <input
              type="checkbox"
              checked={onlyBestSeller}
              onChange={(e) => {
                setOnlyBestSeller(e.target.checked);
                setCurrentPage(1);
              }}
              className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-blue"
            />
            <span>Mais Vendidos</span>
          </label>
        </div>
      </div>

      {/* Botão Limpar Filtros */}
      {activeFiltersCount > 0 && (
        <button
          type="button"
          onClick={handleResetFilters}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
        >
          <FiRotateCcw />
          Limpar Filtros ({activeFiltersCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6">
      {/* Breadcrumbs / NAVEGAÇÃO */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-[#8a9bb0]">
        <Link to="/" className="hover:text-navy">
          Início
        </Link>
        <FiChevronRight />
        <span className="font-semibold text-navy">Catálogo de Produtos</span>
      </nav>

      {/* TÍTULO DA PÁGINA */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold text-navy md:text-4xl">
            Todos os Produtos
          </h1>
          <p className="mt-1 text-sm text-[#52657c]">
            Compare e encontre as melhores ofertas curadas de nossos parceiros.
          </p>
        </div>

        {/* CONTROLES TOP BAR (Mobile trigger + Ordenação + View mode) */}
        <div className="flex flex-wrap items-center justify-between gap-3 md:justify-end">
          {/* Botão para abrir modal de filtros no Mobile */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#e7edf5] bg-white px-4 py-2.5 text-sm font-semibold text-navy shadow-sm transition lg:hidden"
          >
            <FiFilter />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-xs text-white">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Ordenação */}
          <div className="flex items-center gap-2">
            <span className="hidden text-xs font-bold uppercase tracking-wider text-[#8a9bb0] sm:inline">
              Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-xl border border-[#e7edf5] bg-white px-3 py-2 text-sm font-medium text-[#071a2f] shadow-sm outline-none transition focus:border-blue"
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating-desc">Melhores Avaliações</option>
              <option value="newest">Mais Recentes</option>
            </select>
          </div>

          {/* Alternador de Modo de Exibição */}
          <div className="flex items-center rounded-xl border border-[#e7edf5] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`rounded-lg p-2 transition ${
                viewMode === "grid"
                  ? "bg-blue text-white"
                  : "text-gray-400 hover:text-navy"
              }`}
              title="Exibição em Grade"
            >
              <FiGrid />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-lg p-2 transition ${
                viewMode === "list"
                  ? "bg-blue text-white"
                  : "text-gray-400 hover:text-navy"
              }`}
              title="Exibição em Lista"
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* ÁREA PRINCIPAL DA LISTAGEM (SIDEBAR + CONTEÚDO) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden rounded-2xl border border-[#e7edf5] bg-white p-6 shadow-sm lg:block lg:self-start">
          <div className="mb-5 flex items-center justify-between border-b border-[#e7edf5] pb-4">
            <h2 className="flex items-center gap-2 font-bold text-navy">
              <FiFilter /> Filtros
            </h2>
            {activeFiltersCount > 0 && (
              <span className="rounded-full bg-blue/10 px-2 py-0.5 text-xs font-semibold text-blue">
                {activeFiltersCount} ativo(s)
              </span>
            )}
          </div>
          <FilterControls />
        </aside>

        {/* DRAWER / MODAL DE FILTROS PARA MOBILE */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex bg-black/60 lg:hidden">
            <div className="ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="flex items-center gap-2 font-bold text-navy">
                  <FiFilter /> Filtros
                </h2>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-gray-500 hover:bg-gray-100"
                >
                  <FiX size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1">
                <FilterControls />
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full rounded-xl bg-blue py-3 font-semibold text-white transition hover:bg-navy"
                >
                  Ver Resultados ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LISTA DE PRODUTOS */}
        <main>
          {loadingProducts ? (
            /* SKELETON / LOADING */
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
                  : "space-y-4"
              }
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse rounded-2xl border border-[#e7edf5] bg-white p-4 shadow-sm"
                >
                  <div className="h-48 w-full rounded-xl bg-gray-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
                  <div className="mt-4 h-8 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            /* SEM RESULTADOS */
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#e7edf5] bg-white p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue/10 text-blue">
                <FiSearch size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy">
                Nenhum produto encontrado
              </h3>
              <p className="mt-2 max-w-md text-sm text-[#52657c]">
                Não encontramos produtos que correspondam aos filtros
                selecionados. Tente ajustar suas escolhas ou limpar os filtros.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 rounded-xl bg-blue px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            /* CARDS DE PRODUTOS */
            <>
              <div className="mb-4 flex items-center justify-between text-xs text-[#8a9bb0]">
                <span>
                  Exibindo{" "}
                  <strong className="text-navy">
                    {paginatedProducts.length}
                  </strong>{" "}
                  de{" "}
                  <strong className="text-navy">
                    {filteredProducts.length}
                  </strong>{" "}
                  produtos
                </span>
              </div>

              {viewMode === "grid" ? (
                /* MODO GRADE (GRID) */
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {paginatedProducts.map((product) => {
                    const price = Number(product.price) || 0;
                    const origPrice = Number(product.originalPrice) || 0;
                    const hasDiscount = origPrice > price;

                    return (
                      <div
                        key={product.id}
                        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e7edf5] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                      >
                        {/* Imagem + Badges */}
                        <div>
                          <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                            />
                            {hasDiscount && (
                              <span className="absolute left-2 top-2 rounded-lg bg-green px-2 py-1 text-xs font-bold text-white shadow">
                                Oferta
                              </span>
                            )}
                            {product.featured && (
                              <span className="absolute right-2 top-2 rounded-lg bg-blue px-2 py-1 text-xs font-bold text-white shadow">
                                Destaque
                              </span>
                            )}
                          </div>

                          {/* Título & Detalhes */}
                          <h3 className="line-clamp-2 text-sm font-bold text-navy group-hover:text-blue">
                            {product.title}
                          </h3>

                          {product.shortDescription && (
                            <p className="mt-1 line-clamp-2 text-xs text-[#52657c]">
                              {product.shortDescription}
                            </p>
                          )}
                        </div>

                        {/* Avaliação + Preço + Ação */}
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          {/* Rating */}
                          <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                            <FiStar className="fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-navy">
                              {product.rating ?? "4.5"}
                            </span>
                            <span>({product.reviewsCount ?? 0})</span>
                          </div>

                          {/* Preços */}
                          <div className="mb-3">
                            {hasDiscount && (
                              <p className="text-xs text-gray-400 line-through">
                                {formatPrice(origPrice)}
                              </p>
                            )}
                            <p className="text-lg font-bold text-navy">
                              {formatPrice(price)}
                            </p>
                          </div>

                          {/* CTA / Botão de Compra */}
                          <a
                            href={product.affiliateUrl || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-green py-2.5 text-xs font-bold text-white transition hover:bg-green-dark"
                          >
                            <FiTag />
                            <span>Ver Oferta</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* MODO LISTA (LIST) */
                <div className="space-y-4">
                  {paginatedProducts.map((product) => {
                    const price = Number(product.price) || 0;
                    const origPrice = Number(product.originalPrice) || 0;
                    const hasDiscount = origPrice > price;

                    return (
                      <div
                        key={product.id}
                        className="group flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#e7edf5] bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                      >
                        <div className="flex h-36 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:w-36">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                          />
                        </div>

                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              {product.featured && (
                                <span className="rounded bg-blue/10 px-2 py-0.5 text-[10px] font-bold text-blue uppercase">
                                  Destaque
                                </span>
                              )}
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiStar className="fill-yellow-400 text-yellow-400" />
                                <span className="font-semibold text-navy">
                                  {product.rating ?? "4.5"}
                                </span>
                              </div>
                            </div>

                            <h3 className="mt-1 text-base font-bold text-navy group-hover:text-blue">
                              {product.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs text-[#52657c]">
                              {product.shortDescription || product.description}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-4">
                            <div>
                              {hasDiscount && (
                                <p className="text-xs text-gray-400 line-through">
                                  {formatPrice(origPrice)}
                                </p>
                              )}
                              <p className="text-xl font-bold text-navy">
                                {formatPrice(price)}
                              </p>
                            </div>

                            <a
                              href={product.affiliateUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 rounded-xl bg-green px-5 py-2.5 text-xs font-bold text-white transition hover:bg-green-dark"
                            >
                              <FiTag />
                              <span>Ver Oferta</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* PAGINAÇÃO */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="rounded-xl border border-[#e7edf5] bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:bg-gray-50 disabled:opacity-40"
                  >
                    Anterior
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          type="button"
                          onClick={() => setCurrentPage(pageNum)}
                          className={`h-9 w-9 rounded-xl text-xs font-bold transition ${
                            currentPage === pageNum
                              ? "bg-blue text-white"
                              : "border border-[#e7edf5] bg-white text-navy hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    className="rounded-xl border border-[#e7edf5] bg-white px-4 py-2 text-sm font-semibold text-navy shadow-sm transition hover:bg-gray-50 disabled:opacity-40"
                  >
                    Próxima
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
