import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  BlogBasicInfo,
  BlogFormActions,
  BlogPublication,
  BlogRelatedProducts,
  BlogSeoFields,
} from "../../components/admin/blog/BlogFormSections";
import { FormErrorMessage } from "../../components/FormControls";
import { BLOG_STATUS_OPTIONS } from "../../components/admin/blog/blogFormOptions";
import { useAuth } from "../../contexts/useAuth";
import { useBlog } from "../../contexts/useBlog";
import { useBlogCategories } from "../../contexts/useBlogCategories";
import { useProducts } from "../../contexts/useProducts";
import type {
  BlogPostFormData,
  BlogPostProductFormData,
  BlogPostStatus,
} from "../../types/Blog";

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
        <FormErrorMessage
          message={error}
          className="mb-6 border border-red-200 p-4"
        />
      )}

      {isLoading && isEditMode && loadingPost ? (
        <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
          Carregando artigo...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <BlogBasicInfo
            title={title}
            excerpt={excerpt}
            content={content}
            coverImage={coverImage}
            saving={saving}
            loadingPost={loadingPost}
            onTitleChange={setTitle}
            onExcerptChange={setExcerpt}
            onContentChange={setContent}
            onCoverImageChange={setCoverImage}
          />

          <BlogPublication
            categories={categories}
            categoryId={categoryId}
            status={status}
            publishedAt={publishedAt}
            scheduledAt={scheduledAt}
            statusOptions={BLOG_STATUS_OPTIONS}
            onCategoryChange={setCategoryId}
            onStatusChange={handleStatusChange}
            onPublishedAtChange={setPublishedAt}
            onScheduledAtChange={setScheduledAt}
          />

          <BlogRelatedProducts
            products={products}
            selectedProductIds={selectedProductIds}
            onProductToggle={handleProductToggle}
          />

          <BlogSeoFields
            seoTitle={seoTitle}
            seoDescription={seoDescription}
            onSeoTitleChange={setSeoTitle}
            onSeoDescriptionChange={setSeoDescription}
          />

          <BlogFormActions isEditing={isEditMode} saving={saving} />
        </form>
      )}
    </section>
  );
}
