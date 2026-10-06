// src/pages/admin/AdminProductsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useProducts } from "../../contexts/useProducts";
import { formatCurrencyBRL } from "../../utils/formatCurrency";

const productSortOptions = [
  "newest",
  "oldest",
  "title-asc",
  "title-desc",
  "price-asc",
  "price-desc",
] as const;

type ProductSortOption = (typeof productSortOptions)[number];

function isProductSortOption(value: string): value is ProductSortOption {
  return productSortOptions.some((option) => option === value);
}

const productStatusOptions = [
  "all",
  "active",
  "inactive",
  "available",
  "unavailable",
  "destaque",
  "not-destaque",
  "best-seller",
  "not-best-seller",
] as const;

type ProductStatusOption = (typeof productStatusOptions)[number];

type MercadoLivreSyncResponse = {
  message?: string;
  summary?: {
    total: number;
    updated: number;
    unavailable: number;
    failed: number;
  };
  products?: Array<{
    productTitle: string;
    status: "SUCCESS" | "UNAVAILABLE" | "ERROR";
    error?: string;
  }>;
};

function isProductStatusOption(value: string): value is ProductStatusOption {
  return productStatusOptions.some((option) => option === value);
}

export function AdminProductsPage() {
  const {
    products,
    fetchAdminProducts,
    updateProductStatus,
    deleteProduct,
    loading,
    error,
  } = useProducts();

  const { token } = useAuth();

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [syncingMercadoLivre, setSyncingMercadoLivre] = useState(false);
  const [sortOption, setSortOption] = useState<ProductSortOption>("newest");
  const [statusFilter, setStatusFilter] = useState<ProductStatusOption>("all");
  const [marketplaceFilter, setMarketplaceFilter] = useState("all");

  const marketplaces = useMemo(() => {
    const marketplaceMap = new Map<string, string>();

    for (const product of products) {
      if (product.marketplace) {
        marketplaceMap.set(product.marketplace.id, product.marketplace.name);
      }
    }

    return [...marketplaceMap].sort((first, second) =>
      first[1].localeCompare(second[1], "pt-BR", { sensitivity: "base" }),
    );
  }, [products]);

  const sortedProducts = useMemo(() => {
    const filteredProducts = products.filter((product) => {
      const matchesStatus = (() => {
        switch (statusFilter) {
          case "active":
            return product.active;
          case "inactive":
            return !product.active;
          case "available":
            return product.available;
          case "unavailable":
            return !product.available;
          case "destaque":
            return product.destaque;
          case "not-destaque":
            return !product.destaque;
          case "best-seller":
            return product.bestSeller;
          case "not-best-seller":
            return !product.bestSeller;
          case "all":
          default:
            return true;
        }
      })();

      const productMarketplaceId =
        product.marketplace?.id ?? product.marketplaceId;

      return (
        matchesStatus &&
        (marketplaceFilter === "all" ||
          productMarketplaceId === marketplaceFilter)
      );
    });

    return filteredProducts.sort((first, second) => {
      switch (sortOption) {
        case "oldest":
          return (
            new Date(first.createdAt).getTime() -
            new Date(second.createdAt).getTime()
          );
        case "title-asc":
          return first.title.localeCompare(second.title, "pt-BR", {
            sensitivity: "base",
          });
        case "title-desc":
          return second.title.localeCompare(first.title, "pt-BR", {
            sensitivity: "base",
          });
        case "price-asc":
          return first.price - second.price;
        case "price-desc":
          return second.price - first.price;
        case "newest":
        default:
          return (
            new Date(second.createdAt).getTime() -
            new Date(first.createdAt).getTime()
          );
      }
    });
  }, [products, sortOption, statusFilter, marketplaceFilter]);

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchAdminProducts(token);
  }, [token, fetchAdminProducts]);

  async function handleStatusChange(
    id: string,
    status: {
      active?: boolean;
      available?: boolean;
      destaque?: boolean;
      bestSeller?: boolean;
    },
  ) {
    if (!token) {
      return;
    }

    try {
      setUpdatingId(id);

      await updateProductStatus(id, status, token);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o status do produto.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDeleteProduct(id: string, title: string) {
    if (!token) {
      alert("Sua sessão não está autenticada.");
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir o produto "${title}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteProduct(id, token);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o produto.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function handleMercadoLivreSync() {
    if (!token || syncingMercadoLivre) {
      return;
    }

    try {
      setSyncingMercadoLivre(true);

      const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

      const response = await fetch(`${apiUrl}/mercado-livre/sync`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = (await response.json().catch(() => null)) as
        | MercadoLivreSyncResponse
        | null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Não foi possível sincronizar os produtos do Mercado Livre.",
        );
      }

      if (!data?.summary || !Array.isArray(data.products)) {
        throw new Error(
          "A API retornou uma resposta inválida para a sincronização do Mercado Livre.",
        );
      }

      await fetchAdminProducts(token);

      const failedProducts = data.products.filter(
        (product) => product.status === "ERROR",
      );
      const errorDetails = failedProducts
        .slice(0, 5)
        .map(
          (product) =>
            `• ${product.productTitle}: ${product.error || "Erro não informado"}`,
        );
      const omittedErrors =
        failedProducts.length > errorDetails.length
          ? `\n... e mais ${failedProducts.length - errorDetails.length} falha(s).`
          : "";

      alert(
        [
          data.message || "Sincronização do Mercado Livre concluída.",
          `Resultado: ${data.summary.updated} atualizado(s), ${data.summary.unavailable} indisponível(is), ${data.summary.failed} com falha.`,
          ...errorDetails,
          ...(omittedErrors ? [omittedErrors] : []),
        ].join("\n"),
      );
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Não foi possível sincronizar os produtos do Mercado Livre.",
      );
    } finally {
      setSyncingMercadoLivre(false);
    }
  }

  if (loading) {
    return <p className="p-6">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="p-6">Erro: {error}</p>;
  }

  return (
    <section className="p-6">
      <header className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Painel Administrativo - Produtos</h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void handleMercadoLivreSync()}
            disabled={!token || syncingMercadoLivre}
            className="bg-green/80 text-white px-4 py-2 rounded-lg hover:bg-green transition whitespace-nowrap disabled:cursor-not-allowed disabled:opacity-60"
          >
            {syncingMercadoLivre
              ? "Sincronizando..."
              : "🔄 Sincronizar Mercado Livre"}
          </button>

          <Link
            to="/admin/products/new"
            className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-navy transition whitespace-nowrap"
          >
            + Cadastrar Produto
          </Link>
        </div>
      </header>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">
          {sortedProducts.length}{" "}
          {sortedProducts.length === 1 ? "produto" : "produtos"}
          {(statusFilter !== "all" || marketplaceFilter !== "all") &&
            ` de ${products.length}`}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <label
              htmlFor="product-status-filter"
              className="whitespace-nowrap text-sm font-medium text-gray-700"
            >
              Status:
            </label>
            <select
              id="product-status-filter"
              value={statusFilter}
              onChange={(event) => {
                if (isProductStatusOption(event.target.value)) {
                  setStatusFilter(event.target.value);
                }
              }}
              className="min-w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20"
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
              <option value="available">Disponíveis</option>
              <option value="unavailable">Indisponíveis</option>
              <option value="destaque">Em ofertas em destaque</option>
              <option value="not-destaque">Fora das ofertas em destaque</option>
              <option value="best-seller">Em produtos mais vendidos</option>
              <option value="not-best-seller">
                Fora dos produtos mais vendidos
              </option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="product-marketplace-filter"
              className="whitespace-nowrap text-sm font-medium text-gray-700"
            >
              Marketplace:
            </label>
            <select
              id="product-marketplace-filter"
              value={marketplaceFilter}
              onChange={(event) => setMarketplaceFilter(event.target.value)}
              className="min-w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20"
            >
              <option value="all">Todos os marketplaces</option>
              {marketplaces.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="product-sort"
              className="whitespace-nowrap text-sm font-medium text-gray-700"
            >
              Ordenar por:
            </label>
            <select
              id="product-sort"
              value={sortOption}
              onChange={(event) => {
                if (isProductSortOption(event.target.value)) {
                  setSortOption(event.target.value);
                }
              }}
              className="min-w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/20"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="title-asc">Nome: A a Z</option>
              <option value="title-desc">Nome: Z a A</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-3 py-2 text-left">Produto</th>

              <th className="border-b px-3 py-2 text-left">Preço</th>

              <th className="border-b px-3 py-2 text-center">Disponível</th>

              <th className="border-b px-3 py-2 text-center">Ativo</th>

              <th className="border-b px-3 py-2 text-center">
                Ofertas em destaque
              </th>

              <th className="border-b px-3 py-2 text-center">
                Mais vendidos
              </th>

              <th className="border-b px-3 py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {sortedProducts.map((p) => {
              const isUpdating = updatingId === p.id;

              return (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          Sem imagem
                        </div>
                      )}

                      <div>
                        <p className="font-semibold">{p.title}</p>

                        <p className="text-xs text-gray-500">/{p.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    {formatCurrencyBRL(p.price)}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.available}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          available: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar disponibilidade de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.active}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          active: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar status ativo de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.destaque}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          destaque: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar exibição em ofertas em destaque de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.bestSeller}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          bestSeller: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar exibição em produtos mais vendidos de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        to={`/produto/${p.slug}`}
                        aria-label={`Visualizar ${p.title}`}
                        title="Visualizar produto"
                        className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                      >
                        <FiEye aria-hidden="true" size={18} />
                      </Link>

                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        aria-label={`Editar ${p.title}`}
                        title="Editar produto"
                        className="rounded-lg p-2 text-blue transition hover:bg-blue/20 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                      >
                        <FiEdit2 aria-hidden="true" size={18} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => void handleDeleteProduct(p.id, p.title)}
                        disabled={deletingId === p.id}
                        aria-label={`${deletingId === p.id ? "Excluindo" : "Excluir"} ${p.title}`}
                        title={
                          deletingId === p.id
                            ? "Excluindo produto..."
                            : "Excluir produto"
                        }
                        className="rounded-lg p-2 text-danger transition hover:bg-danger/20 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <FiTrash2
                          aria-hidden="true"
                          size={18}
                          color="#dc2626"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {sortedProducts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          {products.length === 0
            ? "Nenhum produto encontrado."
            : "Nenhum produto corresponde a esse status."}
        </div>
      )}
    </section>
  );
}
