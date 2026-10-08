import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import type { Product, ProductStatusData } from "../../../contexts/ProductsContext";
import { formatCurrencyBRL } from "../../../utils/formatCurrency";

type AdminProductTableProps = {
  products: Product[];
  updatingId: string | null;
  deletingId: string | null;
  onStatusChange: (id: string, status: ProductStatusData) => void;
  onDelete: (id: string, title: string) => void;
};

export function AdminProductTable({
  products,
  updatingId,
  deletingId,
  onStatusChange,
  onDelete,
}: AdminProductTableProps) {
  return (
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
            <th className="border-b px-3 py-2 text-center">Mais vendidos</th>
            <th className="border-b px-3 py-2 text-center">Ações</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const isUpdating = updatingId === product.id;

            return (
              <tr
                key={product.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                <td className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-12 w-12 rounded-lg border object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-500">
                        Sem imagem
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">{product.title}</p>
                      <p className="text-xs text-gray-500">/{product.slug}</p>
                    </div>
                  </div>
                </td>

                <td className="px-3 py-3">
                  {formatCurrencyBRL(product.price)}
                </td>

                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={product.available}
                    disabled={isUpdating}
                    onChange={(event) =>
                      onStatusChange(product.id, {
                        available: event.target.checked,
                      })
                    }
                    className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Alterar disponibilidade de ${product.title}`}
                  />
                </td>

                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={product.active}
                    disabled={isUpdating}
                    onChange={(event) =>
                      onStatusChange(product.id, {
                        active: event.target.checked,
                      })
                    }
                    className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Alterar status ativo de ${product.title}`}
                  />
                </td>

                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={product.destaque}
                    disabled={isUpdating}
                    onChange={(event) =>
                      onStatusChange(product.id, {
                        destaque: event.target.checked,
                      })
                    }
                    className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Alterar exibição em ofertas em destaque de ${product.title}`}
                  />
                </td>

                <td className="px-3 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={product.bestSeller}
                    disabled={isUpdating}
                    onChange={(event) =>
                      onStatusChange(product.id, {
                        bestSeller: event.target.checked,
                      })
                    }
                    className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label={`Alterar exibição em produtos mais vendidos de ${product.title}`}
                  />
                </td>

                <td className="px-3 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/produto/${product.slug}`}
                      aria-label={`Visualizar ${product.title}`}
                      title="Visualizar produto"
                      className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-200 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                    >
                      <FiEye aria-hidden="true" size={18} />
                    </Link>

                    <Link
                      to={`/admin/products/${product.id}/edit`}
                      aria-label={`Editar ${product.title}`}
                      title="Editar produto"
                      className="rounded-lg p-2 text-blue transition hover:bg-blue/20 hover:text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                    >
                      <FiEdit2 aria-hidden="true" size={18} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDelete(product.id, product.title)}
                      disabled={deletingId === product.id}
                      aria-label={`${deletingId === product.id ? "Excluindo" : "Excluir"} ${product.title}`}
                      title={
                        deletingId === product.id
                          ? "Excluindo produto..."
                          : "Excluir produto"
                      }
                      className="rounded-lg p-2 text-danger transition hover:bg-danger/20 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FiTrash2 aria-hidden="true" size={18} color="#dc2626" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
