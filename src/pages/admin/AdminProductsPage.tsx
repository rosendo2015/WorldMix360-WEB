// src/pages/admin/AdminProductsPage.tsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AdminProductListControls } from "../../components/admin/products/AdminProductListControls";
import { AdminProductTable } from "../../components/admin/products/AdminProductTable";
import type {
  ProductSortOption,
  ProductStatusOption,
} from "../../components/admin/products/productListOptions";
import { useAuth } from "../../contexts/useAuth";
import { useProducts } from "../../contexts/useProducts";

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

      const data = (await response
        .json()
        .catch(() => null)) as MercadoLivreSyncResponse | null;

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

      <AdminProductListControls
        visibleProductCount={sortedProducts.length}
        totalProductCount={products.length}
        statusFilter={statusFilter}
        marketplaceFilter={marketplaceFilter}
        sortOption={sortOption}
        marketplaces={marketplaces}
        onStatusFilterChange={setStatusFilter}
        onMarketplaceFilterChange={setMarketplaceFilter}
        onSortOptionChange={setSortOption}
      />

      <AdminProductTable
        products={sortedProducts}
        updatingId={updatingId}
        deletingId={deletingId}
        onStatusChange={(productId, status) =>
          void handleStatusChange(productId, status)
        }
        onDelete={(productId, productTitle) =>
          void handleDeleteProduct(productId, productTitle)
        }
      />

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
