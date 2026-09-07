// src/pages/admin/AdminProductsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useProducts } from "../contexts/useProducts";

export function AdminProductsPage() {
  const { products, fetchAdminProducts, updateProductStatus, loading, error } =
    useProducts();

  const { token } = useAuth();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
      featured?: boolean;
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

        <Link
          to="/admin/products/new"
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-navy transition whitespace-nowrap"
        >
          + Cadastrar Produto
        </Link>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-3 py-2 text-left">Produto</th>

              <th className="border-b px-3 py-2 text-left">Preço</th>

              <th className="border-b px-3 py-2 text-center">Disponível</th>

              <th className="border-b px-3 py-2 text-center">Ativo</th>

              <th className="border-b px-3 py-2 text-center">Destaque</th>

              <th className="border-b px-3 py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
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
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: p.currency,
                    })}
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
                      checked={p.featured}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          featured: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar destaque de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="text-sm font-semibold text-blue hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Nenhum produto encontrado.
        </div>
      )}
    </section>
  );
}
