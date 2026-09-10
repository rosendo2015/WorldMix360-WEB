import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useBlog } from "../contexts/useBlog";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { getPostBySlug } = useBlog();

  const [post, setPost] =
    useState<Awaited<ReturnType<typeof getPostBySlug>>>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        setError("Artigo não encontrado.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const decodedSlug = decodeURIComponent(slug);
        const result = await getPostBySlug(decodedSlug);

        if (!result) {
          setError("Artigo não encontrado.");
          return;
        }

        setPost(result);
      } catch (err) {
        console.error("Erro ao carregar artigo:", err);
        setError("Não foi possível carregar o artigo.");
      } finally {
        setLoading(false);
      }
    }

    void loadPost();
  }, [getPostBySlug, slug]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-gray-600">Carregando artigo...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-10 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Artigo não encontrado
            </h1>

            <p className="mt-3 text-gray-600">
              {error ?? "O artigo que você procura não existe."}
            </p>

            <Link
              to="/blog"
              className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Voltar para o Blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("pt-BR")
    : null;

  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        {/* Voltar */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800"
          >
            <span className="mr-1" aria-hidden="true">
              ←
            </span>
            Voltar para o Blog
          </Link>
        </div>

        {/* Categoria */}
        {post.category && (
          <div className="mb-3">
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              {post.category.name}
            </span>
          </div>
        )}

        {/* Título */}
        <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-5 text-lg leading-8 text-gray-600">{post.excerpt}</p>
        )}

        {/* Informações */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-b border-gray-200 pb-6 text-sm text-gray-500">
          {post.author && <span>Por {post.author.name}</span>}

          {publishedDate && <span>Publicado em {publishedDate}</span>}
        </div>

        {/* Imagem de capa */}
        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-xl">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto max-h-[500px] w-full object-cover"
            />
          </div>
        )}

        {/* Conteúdo */}
        <div className="mt-10">
          <div className="whitespace-pre-wrap text-base leading-8 text-gray-700 sm:text-lg">
            {post.content}
          </div>
        </div>

        {/* Produtos relacionados */}
        {post.products && post.products.length > 0 && (
          <section className="mt-12 border-t border-gray-200 pt-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Produtos relacionados
            </h2>

            <p className="mt-2 text-gray-600">
              Confira alguns produtos relacionados a este conteúdo.
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {post.products.map((item) => {
                const product = item.product;

                if (!product) {
                  return null;
                }

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="h-48 w-full object-cover"
                      />
                    )}

                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.title}
                      </h3>

                      {product.shortDescription && (
                        <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                          {product.shortDescription}
                        </p>
                      )}

                      <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="text-lg font-bold text-gray-900">
                          {Number(product.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: product.currency || "BRL",
                          })}
                        </span>

                        {product.affiliateUrl && (
                          <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                          >
                            Ver produto
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
