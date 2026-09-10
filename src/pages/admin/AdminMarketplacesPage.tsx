import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";

export function AdminMarketplacesPage() {
  const { token } = useAuth();

  const { marketplaces, loading, error, fetchMarketplaces, deleteMarketplace } =
    useMarketplaces();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void fetchMarketplaces();
  }, [fetchMarketplaces]);

  async function handleDelete(id: string, name: string) {
    if (!token) {
      alert("Sua sessão não está autenticada.");
      return;
    }

    const confirmed = window.confirm(
      `Deseja realmente excluir o marketplace "${name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteMarketplace(id, token);
    } catch (requestError) {
      alert(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível excluir o marketplace.",
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
          <h1 className="text-2xl font-bold text-gray-900">Marketplaces</h1>

          <p className="mt-1 text-sm text-gray-500">
            Gerencie os marketplaces utilizados pelo WorldMix360.
          </p>
        </div>

        <Link
          to="/admin/marketplaces/new"
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-navy transition"
        >
          + Novo marketplace
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
          <p className="text-gray-500">Carregando marketplaces...</p>
        </div>
      ) : marketplaces.length === 0 ? (
        /* Estado vazio */
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            Nenhum marketplace encontrado
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Comece cadastrando o primeiro marketplace.
          </p>

          <Link
            to="/admin/marketplaces/new"
            className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Cadastrar marketplace
          </Link>
        </div>
      ) : (
        <>
          {/* ========================= */}
          {/* DESKTOP */}
          {/* ========================= */}

          <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50 text-left text-sm text-gray-600">
                    <th className="px-5 py-4 font-semibold">Marketplace</th>

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
                  {marketplaces.map((marketplace) => (
                    <tr
                      key={marketplace.id}
                      className="border-b last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Marketplace */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {marketplace.logoUrl ? (
                            <img
                              src={marketplace.logoUrl}
                              alt={marketplace.name}
                              className="h-10 w-10 rounded-lg object-contain"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-400">
                              WM
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {marketplace.name}
                            </p>

                            {marketplace.description && (
                              <p className="max-w-xs truncate text-xs text-gray-500">
                                {marketplace.description}
                              </p>
                            )}

                            {marketplace.websiteUrl && (
                              <a
                                href={marketplace.websiteUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-1 inline-block text-xs font-medium text-blue-600 hover:underline"
                              >
                                Visitar site
                              </a>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {marketplace.slug}
                      </td>

                      {/* Produtos */}
                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {marketplace.products?.length ?? 0}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            marketplace.active
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {marketplace.active ? "Ativo" : "Inativo"}
                        </span>
                      </td>

                      {/* Ordem */}
                      <td className="px-5 py-4 text-center text-sm text-gray-700">
                        {marketplace.sortOrder ?? 0}
                      </td>

                      {/* Ações */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/admin/marketplaces/${marketplace.id}/edit`}
                            className="text-sm font-semibold text-blue hover:underline"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            disabled={deletingId === marketplace.id}
                            onClick={() =>
                              void handleDelete(
                                marketplace.id,
                                marketplace.name,
                              )
                            }
                            className="text-sm font-semibold text-danger hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === marketplace.id
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
            {marketplaces.map((marketplace) => (
              <article
                key={marketplace.id}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                {/* Cabeçalho */}
                <div className="flex items-start gap-3">
                  {marketplace.logoUrl ? (
                    <img
                      src={marketplace.logoUrl}
                      alt={marketplace.name}
                      className="h-14 w-14 shrink-0 rounded-lg object-contain"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-bold text-gray-400">
                      WM
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-semibold text-gray-900">
                        {marketplace.name}
                      </h2>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[11px] font-semibold ${
                          marketplace.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {marketplace.active ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      /{marketplace.slug}
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                {marketplace.description && (
                  <p className="mt-4 text-sm text-gray-600">
                    {marketplace.description}
                  </p>
                )}

                {/* Site */}
                {marketplace.websiteUrl && (
                  <a
                    href={marketplace.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:underline"
                  >
                    Visitar site →
                  </a>
                )}

                {/* Informações */}
                <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50 p-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500">Produtos</p>

                    <p className="font-semibold text-gray-800">
                      {marketplace.products?.length ?? 0}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Ordem</p>

                    <p className="font-semibold text-gray-800">
                      {marketplace.sortOrder ?? 0}
                    </p>
                  </div>
                </div>

                {/* Ações */}
                <div className="mt-4 flex gap-3 border-t pt-4">
                  <Link
                    to={`/admin/marketplaces/${marketplace.id}/edit`}
                    className="flex-1 rounded-lg bg-blue-50 px-4 py-2.5 text-center text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    Editar
                  </Link>

                  <button
                    type="button"
                    disabled={deletingId === marketplace.id}
                    onClick={() =>
                      void handleDelete(marketplace.id, marketplace.name)
                    }
                    className="flex-1 rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-50"
                  >
                    {deletingId === marketplace.id ? "Excluindo..." : "Excluir"}
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
