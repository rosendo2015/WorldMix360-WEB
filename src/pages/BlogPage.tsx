import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useBlog } from "../contexts/useBlog";

export function BlogPage() {
  const { posts, loading, error, fetchPosts } = useBlog();

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-gray-600">Carregando artigos...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
            <h1 className="mb-2 text-xl font-semibold text-red-700">
              Não foi possível carregar o Blog
            </h1>

            <p className="text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={() => void fetchPosts()}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <header className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
            WorldMix360
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Dicas, informações e conteúdos para ajudar você a encontrar produtos
            úteis para o seu dia a dia.
          </p>
        </header>

        {/* Nenhum artigo */}
        {posts.length === 0 ? (
          <section className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Nenhum artigo publicado
            </h2>

            <p className="mt-2 text-gray-600">
              Em breve teremos novos conteúdos no WorldMix360.
            </p>
          </section>
        ) : (
          <section>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Imagem */}
                  {post.coverImage ? (
                    <Link
                      to={`/blog/${encodeURIComponent(post.slug)}`}
                      className="block overflow-hidden"
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-52 w-full object-cover transition duration-300 hover:scale-105"
                      />
                    </Link>
                  ) : (
                    <Link
                      to={`/blog/${encodeURIComponent(post.slug)}`}
                      className="flex h-52 items-center justify-center bg-gray-100"
                    >
                      <span className="text-sm text-gray-400">WorldMix360</span>
                    </Link>
                  )}

                  {/* Conteúdo */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Categoria */}
                    {post.category && (
                      <span className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {post.category.name}
                      </span>
                    )}

                    <h2 className="text-xl font-bold leading-tight text-gray-900">
                      <Link
                        to={`/blog/${encodeURIComponent(post.slug)}`}
                        className="transition hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Rodapé do card */}
                    <div className="mt-auto pt-5">
                      <Link
                        to={`/blog/${encodeURIComponent(post.slug)}`}
                        className="inline-flex items-center text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        Ler artigo
                        <span className="ml-1" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
