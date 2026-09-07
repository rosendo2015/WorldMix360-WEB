import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";

export function AdminCategoriesPage() {
  const { token } = useAuth();

  const { categories, loading, error, fetchCategories, deleteCategory } =
    useCategories();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  async function handleDelete(id: string, name: string) {
    if (!token) {
      alert("Sua sessão não está autenticada.");
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir a categoria "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteCategory(id, token);
    } catch (requestError) {
      alert(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível excluir a categoria.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>

          <p className="mt-1 text-sm text-gray-500">
            Gerencie as categorias do WorldMix360.
          </p>
        </div>

        <Link
          to="/admin/categories/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy"
        >
          + Nova categoria
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-danger-light px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando categorias...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Nenhuma categoria encontrada
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Comece cadastrando a primeira categoria.
          </p>

          <Link
            to="/admin/categories/new"
            className="mt-5 inline-flex rounded-lg bg-blue/40 px-5 py-3 text-sm font-semibold text-white hover:bg-navy"
          >
            Cadastrar categoria
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                    <th className="px-5 py-4 font-semibold">Categoria</th>

                    <th className="px-5 py-4 font-semibold">Slug</th>

                    <th className="px-5 py-4 text-center font-semibold">
                      Subcategorias
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
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt={category.name}
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-400">
                              WM
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {category.name}
                            </p>

                            {category.description && (
                              <p className="max-w-xs truncate text-xs text-gray-500">
                                {category.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {category.slug}
                      </td>

                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {category.subcategories?.length ?? 0}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            category.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {category.active ? "Ativa" : "Inativa"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {category.sortOrder ?? 0}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/admin/categories/${category.id}/edit`}
                            className="text-sm font-semibold text-blue hover:underline"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            disabled={deletingId === category.id}
                            onClick={() =>
                              void handleDelete(category.id, category.name)
                            }
                            className="text-sm font-semibold text-danger hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === category.id
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

          {/* Mobile */}
          <div className="space-y-4 md:hidden">
            {categories.map((category) => (
              <article
                key={category.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
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
                        {category.name}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
                          category.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.active ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      /{category.slug}
                    </p>
                  </div>
                </div>

                {category.description && (
                  <p className="mt-3 text-sm text-gray-600">
                    {category.description}
                  </p>
                )}

                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Subcategorias</p>
                    <p className="font-semibold text-gray-800">
                      {category.subcategories?.length ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Ordem</p>
                    <p className="font-semibold text-gray-800">
                      {category.sortOrder ?? 0}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 border-t pt-4">
                  <Link
                    to={`/admin/categories/${category.id}/edit`}
                    className="flex-1 rounded-lg bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    disabled={deletingId === category.id}
                    onClick={() =>
                      void handleDelete(category.id, category.name)
                    }
                    className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === category.id ? "Excluindo..." : "Excluir"}
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
