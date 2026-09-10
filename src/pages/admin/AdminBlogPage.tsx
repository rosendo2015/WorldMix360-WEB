import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { useBlog } from "../../contexts/useBlog";

export function AdminBlogPage() {
  const { posts, loading, error, fetchAdminPosts, deletePost } = useBlog();

  const { user, token } = useAuth();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    if (!token) {
      return;
    }

    await fetchAdminPosts(token);
  }, [fetchAdminPosts, token]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  async function handleDelete(id: string, title: string) {
    if (!token) {
      setActionError("Sessão não encontrada.");
      return;
    }

    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o artigo "${title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setActionError(null);

      await deletePost(id, token);
    } catch (err) {
      console.error("Erro ao excluir artigo:", err);

      setActionError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o artigo.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case "PUBLISHED":
        return "Publicado";

      case "DRAFT":
        return "Rascunho";

      case "SCHEDULED":
        return "Agendado";

      case "ARCHIVED":
        return "Arquivado";

      default:
        return status;
    }
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-700";

      case "DRAFT":
        return "bg-yellow-100 text-yellow-700";

      case "SCHEDULED":
        return "bg-blue-100 text-blue-700";

      case "ARCHIVED":
        return "bg-gray-100 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function formatDate(date: string | null | undefined) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("pt-BR");
  }

  if (!user || !token) {
    return (
      <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border border-danger bg-danger-light p-6 text-center">
            <h1 className="text-xl font-semibold text-danger">
              Acesso não autorizado
            </h1>

            <p className="mt-2 text-sm text-red-600">
              Você precisa estar autenticado para acessar o gerenciamento do
              Blog.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Blog
            </h1>

            <p className="mt-1 text-sm text-gray-600">
              Gerencie os artigos publicados e os rascunhos do WorldMix360.
            </p>
          </div>

          <Link
            to="/admin/blog/novo"
            className="inline-flex items-center justify-center rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue"
          >
            + Novo artigo
          </Link>
        </div>

        {/* Erro de ação */}
        {actionError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {actionError}
          </div>
        )}

        {/* Erro da API */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => void loadPosts()}
              className="mt-3 rounded-lg bg-danger-light px-4 py-2 text-sm font-semibold text-danger transition hover:bg-danger hover:text-navy"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Carregamento */}
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <p className="text-gray-600">Carregando artigos...</p>
          </div>
        ) : posts.length === 0 ? (
          /* Nenhum post */
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800">
              Nenhum artigo encontrado
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              Comece criando o primeiro artigo do Blog.
            </p>

            <Link
              to="/admin/blog/novo"
              className="mt-5 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Criar primeiro artigo
            </Link>
          </div>
        ) : (
          /* Tabela */
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                      Artigo
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                      Categoria
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                      Autor
                    </th>

                    <th className="px-5 py-4 text-sm font-semibold text-gray-700">
                      Data
                    </th>

                    <th className="px-5 py-4 text-right text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                    >
                      {/* Artigo */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="h-14 w-20 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                              Sem imagem
                            </div>
                          )}

                          <div className="max-w-sm">
                            <p className="font-semibold text-gray-900">
                              {post.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-gray-500">
                              /blog/{post.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Categoria */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {post.category?.name ?? "Sem categoria"}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            post.status,
                          )}`}
                        >
                          {getStatusLabel(post.status)}
                        </span>
                      </td>

                      {/* Autor */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {post.author?.name ?? "-"}
                      </td>

                      {/* Data */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {formatDate(post.publishedAt ?? post.createdAt)}
                      </td>

                      {/* Ações */}
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blog/${encodeURIComponent(post.slug)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100"
                          >
                            Ver
                          </Link>

                          <Link
                            to={`/admin/blog/editar/${post.id}`}
                            className="rounded-lg bg-navy px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue"
                          >
                            Editar
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              void handleDelete(post.id, post.title)
                            }
                            disabled={deletingId === post.id}
                            className="rounded-lg bg-danger px-3 py-2 text-xs font-semibold text-white transition hover:bg-danger-light disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {deletingId === post.id
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

            {/* Rodapé */}
            <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
              <p className="text-sm text-gray-600">
                Total de artigos:{" "}
                <span className="font-semibold text-gray-900">
                  {posts.length}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
