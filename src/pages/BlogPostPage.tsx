import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { BlogPost } from "../contexts/BlogContext";
import { useBlog } from "../contexts/useBlog";

function decodeHtmlEntities(value: string) {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = value;

  return textarea.value;
}

function normalizeContent(value: string) {
  if (!value) {
    return "";
  }

  return decodeHtmlEntities(value)
    .replaceAll("<p></p>", "")
    .replaceAll("<div></div>", "")
    .trim();
}
function renderContentHtml(value: string) {
  const normalizedContent = normalizeContent(value);

  if (!normalizedContent) {
    return "";
  }

  return DOMPurify.sanitize(normalizedContent, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "h2",
      "h3",
      "h4",
      "ul",
      "ol",
      "li",
      "blockquote",
      "hr",
      "a",
    ],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}

function formatPrice(price: number | string, currency?: string | null) {
  const numericPrice = typeof price === "number" ? price : Number(price);

  if (!Number.isFinite(numericPrice)) {
    return "Preço indisponível";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency || "BRL",
  }).format(numericPrice);
}

function formatDate(date?: string | null) {
  if (!date) {
    return "";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getPostBySlug } = useBlog();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPost() {
      if (!slug) {
        setError("Artigo não encontrado.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await getPostBySlug(slug);

        if (cancelled) {
          return;
        }

        if (!result) {
          setPost(null);
          setError("Artigo não encontrado.");
          return;
        }

        setPost(result);
      } catch (err) {
        if (cancelled) {
          return;
        }

        setPost(null);

        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o artigo.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [slug, getPostBySlug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {" "}
        <div className="animate-pulse">
          {" "}
          <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
          <div className="mb-3 h-10 w-3/4 rounded bg-gray-200" />
          <div className="mb-8 h-5 w-1/2 rounded bg-gray-200" />
          <div className="mb-10 h-72 rounded-xl bg-gray-200" />
          <div className="space-y-4">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="h-4 w-4/6 rounded bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        {" "}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          {" "}
          <h1 className="text-2xl font-bold text-gray-900">
            Artigo não encontrado{" "}
          </h1>
          <p className="mt-3 text-gray-600">
            {error ?? "O artigo que você procura não existe."}
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Voltar para o Blog
          </Link>
        </div>
      </main>
    );
  }

  const contentHtml = renderContentHtml(post.content);

  return (
    <main className="bg-gray-50">
      {" "}
      <article className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {" "}
        <div className="mb-6">
          {" "}
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-medium text-blue-600 transition hover:text-blue-800"
          >
            ← Voltar para o Blog{" "}
          </Link>{" "}
        </div>
        {post.category && (
          <div className="mb-4">
            <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {post.category.name}
            </span>
          </div>
        )}
        <header>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl">
              {post.excerpt}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {post.author && (
              <span>
                Por{" "}
                <strong className="font-semibold text-gray-700">
                  {post.author.name}
                </strong>
              </span>
            )}

            {post.publishedAt && (
              <>
                <span className="hidden sm:inline">•</span>

                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </>
            )}
          </div>
        </header>
        {post.coverImage && (
          <div className="mt-8 overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-auto max-h-[520px] w-full object-cover"
            />
          </div>
        )}
        <div className="mt-10 rounded-2xl bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          {contentHtml ? (
            <div
              className="
            text-base
            leading-8
            text-gray-700
            sm:text-lg
            [&_a]:font-medium
            [&_a]:text-blue-600
            [&_a]:underline
            [&_a]:underline-offset-2
            [&_a:hover]:text-blue-800
            [&_blockquote]:my-6
            [&_blockquote]:border-l-4
            [&_blockquote]:border-blue-500
            [&_blockquote]:bg-blue-50
            [&_blockquote]:px-5
            [&_blockquote]:py-4
            [&_blockquote]:italic
            [&_blockquote]:text-gray-700
            [&_b]:font-bold
            [&_b]:text-gray-900
            [&_em]:italic
            [&_h2]:mb-4
            [&_h2]:mt-10
            [&_h2]:text-2xl
            [&_h2]:font-bold
            [&_h2]:leading-tight
            [&_h2]:text-gray-900
            [&_h3]:mb-3
            [&_h3]:mt-8
            [&_h3]:text-xl
            [&_h3]:font-bold
            [&_h3]:leading-tight
            [&_h3]:text-gray-900
            [&_h4]:mb-2
            [&_h4]:mt-6
            [&_h4]:text-lg
            [&_h4]:font-bold
            [&_h4]:text-gray-900
            [&_hr]:my-8
            [&_hr]:border-gray-200
            [&_i]:italic
            [&_i]:text-gray-700
            [&_li]:my-1
            [&_ol]:my-5
            [&_ol]:list-decimal
            [&_ol]:space-y-1
            [&_ol]:pl-6
            [&_p]:my-4
            [&_strong]:font-bold
            [&_strong]:text-gray-900
            [&_u]:underline
            [&_ul]:my-5
            [&_ul]:list-disc
            [&_ul]:space-y-1
            [&_ul]:pl-6            
          "
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          ) : (
            <p className="text-gray-500">
              Este artigo ainda não possui conteúdo.
            </p>
          )}
        </div>
        {post.products && post.products.length > 0 && (
          <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-gray-900">
                Produtos relacionados
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Confira alguns produtos relacionados a este artigo.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {post.products.map((item) => {
                const product = item.product;

                return (
                  <article
                    key={item.id}
                    className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="h-32 overflow-hidden bg-gray-100">
                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          Sem imagem
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-3">
                      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                        {product.title}
                      </h3>

                      {product.shortDescription && (
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">
                          {product.shortDescription}
                        </p>
                      )}

                      <div className="mt-auto pt-3">
                        <p className="text-base font-bold text-gray-900">
                          {formatPrice(product.price, product.currency)}
                        </p>

                        {product.originalPrice &&
                          Number(product.originalPrice) >
                            Number(product.price) && (
                            <p className="text-xs text-gray-400 line-through">
                              {formatPrice(
                                product.originalPrice,
                                product.currency,
                              )}
                            </p>
                          )}

                        {product.affiliateUrl && (
                          <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                          >
                            Ver produto
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
