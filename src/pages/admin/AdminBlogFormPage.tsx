import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { RichTextEditor } from "../../components/admin/products/RichTextEditor";
import { useAuth } from "../../contexts/useAuth";
import { useBlog } from "../../contexts/useBlog";
import { useBlogCategories } from "../../contexts/useBlogCategories";
import { useProducts } from "../../contexts/useProducts";
import type {
  BlogPostFormData,
  BlogPostProductFormData,
  BlogPostStatus,
} from "../../types/Blog";

const STATUS_OPTIONS: Array<{
  value: BlogPostStatus;
  label: string;
}> = [
  { value: "DRAFT", label: "Rascunho" },
  { value: "PUBLISHED", label: "Publicado" },
  { value: "SCHEDULED", label: "Agendado" },
  { value: "ARCHIVED", label: "Arquivado" },
];

function formatDateTimeLocal(value?: string | null) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
}

function toISOStringOrUndefined(value: string) {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function isRichTextEmpty(value: string) {
  const normalized = value
    .replace(/<p>\s*<\/p>/gi, "")
    .replace(/<br\s*\/?>/gi, "")
    .replace(/&nbsp;/gi, "")
    .replace(/<[^>]*>/g, "")
    .trim();

  return normalized.length === 0;
}

export function AdminBlogFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useAuth();

  const {
    getPostById,
    createPost,
    updatePost,
    loading: blogLoading,
  } = useBlog();

  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
  } = useBlogCategories();

  const {
    products,
    fetchAdminProducts,
    loading: productsLoading,
  } = useProducts();

  const isEditMode = Boolean(id);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState<BlogPostStatus>("DRAFT");
  const [publishedAt, setPublishedAt] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchCategories();
    void fetchAdminProducts(token);
  }, [token, fetchCategories, fetchAdminProducts]);

  useEffect(() => {
    if (!id || !token) {
      return;
    }

    const postId = id;
    const authToken = token;

    let cancelled = false;

    async function loadPost() {
      setLoadingPost(true);
      setError(null);

      try {
        const post = await getPostById(postId, authToken);

        if (cancelled) {
          return;
        }

        if (!post) {
          setError("Artigo não encontrado.");
          return;
        }

        setTitle(post.title);
        setExcerpt(post.excerpt ?? "");
        setContent(post.content);
        setCoverImage(post.coverImage ?? "");
        setCategoryId(post.categoryId ?? "");
        setStatus(post.status);
        setPublishedAt(formatDateTimeLocal(post.publishedAt));
        setScheduledAt(formatDateTimeLocal(post.scheduledAt));
        setSeoTitle(post.seoTitle ?? "");
        setSeoDescription(post.seoDescription ?? "");

        setSelectedProductIds(
          (post.products ?? [])
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((item) => item.product.id),
        );
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar o artigo.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingPost(false);
        }
      }
    }

    void loadPost();

    return () => {
      cancelled = true;
    };
  }, [id, token, getPostById]);

  function handleProductToggle(productId: string) {
    setSelectedProductIds((currentIds) => {
      if (currentIds.includes(productId)) {
        return currentIds.filter((currentId) => currentId !== productId);
      }

      return [...currentIds, productId];
    });
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    setStatus(event.target.value as BlogPostStatus);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sessão expirada. Faça login novamente.");
      return;
    }

    if (!title.trim()) {
      setError("Informe o título do artigo.");
      return;
    }

    if (isRichTextEmpty(content)) {
      setError("Informe o conteúdo do artigo.");
      return;
    }

    if (status === "PUBLISHED" && !publishedAt) {
      setError("Informe a data de publicação para um artigo publicado.");
      return;
    }

    if (status === "SCHEDULED" && !scheduledAt) {
      setError("Informe a data de agendamento para um artigo agendado.");
      return;
    }

    const productsData: BlogPostProductFormData[] = selectedProductIds.map(
      (productId, index) => ({
        productId,
        sortOrder: index,
      }),
    );

    const cleanContent = content === "<p></p>" ? undefined : content.trim();

    const postData: BlogPostFormData = {
      title: title.trim(),
      excerpt: excerpt.trim() || undefined,
      content: cleanContent ?? "",
      coverImage: coverImage.trim() || undefined,
      categoryId: categoryId || undefined,
      status,
      publishedAt:
        status === "PUBLISHED"
          ? toISOStringOrUndefined(publishedAt)
          : undefined,
      scheduledAt:
        status === "SCHEDULED"
          ? toISOStringOrUndefined(scheduledAt)
          : undefined,
      seoTitle: seoTitle.trim() || undefined,
      seoDescription: seoDescription.trim() || undefined,
      products: productsData,
    };

    setSaving(true);

    try {
      if (isEditMode && id) {
        await updatePost(id, postData, token);
      } else {
        await createPost(postData, token);
      }

      navigate("/admin/blog");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível salvar o artigo.",
      );
    } finally {
      setSaving(false);
    }
  }

  const isLoading =
    loadingPost || blogLoading || categoriesLoading || productsLoading;

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <Link
          to="/admin/blog"
          className="text-sm font-medium text-navy transition hover:text-blue"
        >
          ← Voltar para o Blog
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          {isEditMode ? "Editar artigo" : "Novo artigo"}
        </h1>

        <p className="mt-1 text-sm text-gray-700">
          {isEditMode
            ? "Atualize as informações do artigo do Blog."
            : "Cadastre um novo artigo para o Blog do WorldMix360."}
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      {isLoading && isEditMode && loadingPost ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
          Carregando artigo...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Informações do artigo
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Título *
                </label>

                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Digite o título do artigo"
                  className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Resumo
                </label>

                <textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Breve resumo do artigo"
                  rows={3}
                  className="w-full resize-y rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Conteúdo *
                </label>

                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  disabled={saving || loadingPost}
                  placeholder="Escreva o conteúdo completo do artigo..."
                />

                <p className="mt-2 text-xs text-gray-500">
                  Use títulos, negrito, listas, links e outros recursos para
                  deixar o artigo mais organizado e agradável para o leitor.
                </p>
              </div>

              <div>
                <label
                  htmlFor="coverImage"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Imagem de capa
                </label>

                <input
                  id="coverImage"
                  type="url"
                  value={coverImage}
                  onChange={(event) => setCoverImage(event.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                />
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Publicação
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label
                  htmlFor="categoryId"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Categoria
                </label>

                <select
                  id="categoryId"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                >
                  <option value="">Sem categoria</option>

                  {categories
                    .filter((category) => category.active)
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Status *
                </label>

                <select
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {status === "PUBLISHED" && (
                <div>
                  <label
                    htmlFor="publishedAt"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Data de publicação *
                  </label>

                  <input
                    id="publishedAt"
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(event) => setPublishedAt(event.target.value)}
                    className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                  />
                </div>
              )}

              {status === "SCHEDULED" && (
                <div>
                  <label
                    htmlFor="scheduledAt"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Data de agendamento *
                  </label>

                  <input
                    id="scheduledAt"
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(event) => setScheduledAt(event.target.value)}
                    className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                  />
                </div>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Produtos relacionados
            </h2>

            <p className="mb-5 text-sm text-gray-600">
              Selecione os produtos que deseja apresentar relacionados ao
              artigo.
            </p>

            {products.length === 0 ? (
              <p className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
                Nenhum produto disponível para seleção.
              </p>
            ) : (
              <div className="max-h-96 space-y-2 overflow-y-auto rounded-lg border border-gray-200 p-3">
                {products.map((product) => {
                  const selected = selectedProductIds.includes(product.id);

                  return (
                    <label
                      key={product.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-transparent p-3 transition hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => handleProductToggle(product.id)}
                        className="h-4 w-4 rounded border-gray-500 text-blue-600 focus:ring-blue-500"
                      />

                      {product.imageUrl ? (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-12 w-12 rounded-md object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 text-xs text-gray-500">
                          Sem imagem
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {product.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {product.currency}{" "}
                          {Number(product.price).toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            )}

            <p className="mt-3 text-xs text-gray-500">
              {selectedProductIds.length} produto(s) selecionado(s).
            </p>
          </section>

          <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">SEO</h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="seoTitle"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Título SEO
                </label>

                <input
                  id="seoTitle"
                  type="text"
                  value={seoTitle}
                  onChange={(event) => setSeoTitle(event.target.value)}
                  placeholder="Título otimizado para mecanismos de busca"
                  className="w-full rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                />
              </div>

              <div>
                <label
                  htmlFor="seoDescription"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Descrição SEO
                </label>

                <textarea
                  id="seoDescription"
                  value={seoDescription}
                  onChange={(event) => setSeoDescription(event.target.value)}
                  placeholder="Descrição otimizada para mecanismos de busca"
                  rows={4}
                  className="w-full resize-y rounded-lg border border-gray-500 px-4 py-2.5 text-sm outline-none transition focus:border-blue focus:ring-2 focus:ring-blue"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/admin/blog"
              className="rounded-lg border border-gray-500 px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-navy px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Salvando..."
                : isEditMode
                  ? "Salvar alterações"
                  : "Criar artigo"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
