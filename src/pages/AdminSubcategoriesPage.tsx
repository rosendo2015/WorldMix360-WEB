import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useSubcategories } from "../contexts/useSubcategories";

export function AdminSubcategoriesPage() {
  const { token } = useAuth();

  const {
    subcategories,
    loading,
    error,
    fetchSubcategories,
    deleteSubcategory,
  } = useSubcategories();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchSubcategories();
  }, [fetchSubcategories]);

  async function handleDelete(id: string, name: string) {
    if (!token) {
      alert("Sua sessão não está autenticada.");
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir a subcategoria "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteSubcategory(id, token);
    } catch (requestError) {
      alert(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível excluir a subcategoria.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl">
      {/* Cabeçalho */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subcategorias</h1>

          <p className="mt-1 text-sm text-gray-500">
            Gerencie as subcategorias do WorldMix360.
          </p>
        </div>

        <Link
          to="/admin/subcategories/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy"
        >
          + Nova subcategoria
        </Link>
      </div>

      {/* Erro */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando subcategorias...</p>
        </div>
      ) : subcategories.length === 0 ? (
        /* Estado vazio */
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Nenhuma subcategoria encontrada
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Comece cadastrando a primeira subcategoria.
          </p>

          <Link to="/admin/subcategories/new" className="bg-navy">
            Cadastrar subcategoria
          </Link>
        </div>
      ) : (
        <>
          {/* ========================= */}
          {/* DESKTOP */}
          {/* ========================= */}

          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                    <th className="px-5 py-4 font-semibold">Subcategoria</th>

                    <th className="px-5 py-4 font-semibold">Categoria</th>

                    <th className="px-5 py-4 font-semibold">Slug</th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Produtos
                    </th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Status
                    </th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Ordem
                    </th>

                    <th className="px-5 py-4 text-right font-semibold">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {subcategories.map((subcategory) => (
                    <tr
                      key={subcategory.id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Subcategoria */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {subcategory.image ? (
                            <img
                              src={subcategory.image}
                              alt={subcategory.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-400">
                              WM
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {subcategory.name}
                            </p>

                            {subcategory.description && (
                              <p className="max-w-xs truncate text-xs text-gray-500">
                                {subcategory.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Categoria */}
                      <td className="px-5 py-4">
                        {subcategory.category ? (
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {subcategory.category.name}
                            </p>

                            <p className="text-xs text-gray-500">
                              /{subcategory.category.slug}
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {subcategory.slug}
                      </td>

                      {/* Produtos */}
                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {subcategory.products?.length ?? 0}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            subcategory.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {subcategory.active ? "Ativa" : "Inativa"}
                        </span>
                      </td>

                      {/* Ordem */}
                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {subcategory.sortOrder ?? 0}
                      </td>

                      {/* Ações */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/admin/subcategories/${subcategory.id}/edit`}
                            className="text-sm font-semibold text-blue hover:underline"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            disabled={deletingId === subcategory.id}
                            onClick={() =>
                              void handleDelete(
                                subcategory.id,
                                subcategory.name,
                              )
                            }
                            className="text-sm font-semibold text-danger hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === subcategory.id
                              ? "Excluindo..."
                              : "Excluir"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================= */}
          {/* MOBILE */}
          {/* ========================= */}

          <div className="space-y-4 md:hidden">
            {subcategories.map((subcategory) => (
              <article
                key={subcategory.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                {/* Cabeçalho do card */}
                <div className="flex items-start gap-3">
                  {subcategory.image ? (
                    <img
                      src={subcategory.image}
                      alt={subcategory.name}
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-400">
                      WM
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-gray-900">
                        {subcategory.name}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
                          subcategory.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {subcategory.active ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      /{subcategory.slug}
                    </p>
                  </div>
                </div>

                {/* Categoria */}
                <div className="mt-4 rounded-lg bg-blue-50 p-3">
                  <p className="text-xs text-blue-600">Categoria</p>

                  <p className="mt-1 font-semibold text-blue-800">
                    {subcategory.category?.name ?? "Sem categoria"}
                  </p>
                </div>

                {/* Descrição */}
                {subcategory.description && (
                  <p className="mt-3 text-sm text-gray-600">
                    {subcategory.description}
                  </p>
                )}

                {/* Informações */}
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Produtos</p>

                    <p className="font-semibold text-gray-800">
                      {subcategory.products?.length ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Ordem</p>

                    <p className="font-semibold text-gray-800">
                      {subcategory.sortOrder ?? 0}
                    </p>
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-4 flex gap-3 border-t pt-4">
                  <Link
                    to={`/admin/subcategories/${subcategory.id}/edit`}
                    className="flex-1 rounded-lg bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    disabled={deletingId === subcategory.id}
                    onClick={() =>
                      void handleDelete(subcategory.id, subcategory.name)
                    }
                    className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === subcategory.id ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
