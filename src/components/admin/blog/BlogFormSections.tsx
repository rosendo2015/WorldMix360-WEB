import type { ChangeEvent } from "react";

import type { Product } from "../../../contexts/ProductsContext";
import type { BlogCategory, BlogPostStatus } from "../../../types/Blog";
import {
  FormInput,
  FormActions,
  FormSection,
  FormSelect,
  FormTextarea,
} from "../../FormControls";
import { RichTextEditor } from "../products/RichTextEditor";

type BlogBasicInfoProps = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  saving: boolean;
  loadingPost: boolean;
  onTitleChange: (value: string) => void;
  onExcerptChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCoverImageChange: (value: string) => void;
};

export function BlogBasicInfo({
  title,
  excerpt,
  content,
  coverImage,
  saving,
  loadingPost,
  onTitleChange,
  onExcerptChange,
  onContentChange,
  onCoverImageChange,
}: BlogBasicInfoProps) {
  return (
    <FormSection
      title="Informações do artigo"
      className="border border-gray-100"
    >
      <div className="space-y-5">
        <FormInput
          id="title"
          label="Título *"
          labelClassName="font-medium"
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Digite o título do artigo"
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
          required
        />

        <FormTextarea
          id="excerpt"
          label="Resumo"
          labelClassName="font-medium"
          value={excerpt}
          onChange={(event) => onExcerptChange(event.target.value)}
          placeholder="Breve resumo do artigo"
          rows={3}
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
        />

        <div>
          <label
            htmlFor="content"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Conteúdo *
          </label>

          <RichTextEditor
            value={content}
            onChange={onContentChange}
            disabled={saving || loadingPost}
            enableImages
            placeholder="Escreva o conteúdo completo do artigo..."
          />

          <p className="mt-2 text-xs text-gray-500">
            Use a barra de ferramentas para inserir imagens no meio do texto,
            adicionar links e formatar o artigo.
          </p>
        </div>

        <FormInput
          id="coverImage"
          label="Imagem de capa"
          labelClassName="font-medium"
          type="url"
          value={coverImage}
          onChange={(event) => onCoverImageChange(event.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
        />
      </div>
    </FormSection>
  );
}

type BlogPublicationProps = {
  categories: BlogCategory[];
  categoryId: string;
  status: BlogPostStatus;
  publishedAt: string;
  scheduledAt: string;
  statusOptions: Array<{ value: BlogPostStatus; label: string }>;
  onCategoryChange: (value: string) => void;
  onStatusChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onPublishedAtChange: (value: string) => void;
  onScheduledAtChange: (value: string) => void;
};

export function BlogPublication({
  categories,
  categoryId,
  status,
  publishedAt,
  scheduledAt,
  statusOptions,
  onCategoryChange,
  onStatusChange,
  onPublishedAtChange,
  onScheduledAtChange,
}: BlogPublicationProps) {
  return (
    <FormSection
      title="Publicação"
      className="border border-gray-100"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormSelect
          id="categoryId"
          label="Categoria"
          labelClassName="font-medium"
          value={categoryId}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
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
        </FormSelect>

        <FormSelect
          id="status"
          label="Status *"
          labelClassName="font-medium"
          value={status}
          onChange={onStatusChange}
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
        >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </FormSelect>

        {status === "PUBLISHED" && (
          <FormInput
            id="publishedAt"
            label="Data de publicação *"
            labelClassName="font-medium"
            type="datetime-local"
            value={publishedAt}
            onChange={(event) => onPublishedAtChange(event.target.value)}
            className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
          />
        )}

        {status === "SCHEDULED" && (
          <FormInput
            id="scheduledAt"
            label="Data de agendamento *"
            labelClassName="font-medium"
            type="datetime-local"
            value={scheduledAt}
            onChange={(event) => onScheduledAtChange(event.target.value)}
            className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
          />
        )}
      </div>
    </FormSection>
  );
}

type BlogRelatedProductsProps = {
  products: Product[];
  selectedProductIds: string[];
  onProductToggle: (productId: string) => void;
};

export function BlogRelatedProducts({
  products,
  selectedProductIds,
  onProductToggle,
}: BlogRelatedProductsProps) {
  return (
    <FormSection
      title="Produtos relacionados"
      description="Selecione os produtos que deseja apresentar relacionados ao artigo."
      className="border border-gray-100"
      headingClassName="mb-2"
    >
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
                  onChange={() => onProductToggle(product.id)}
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
    </FormSection>
  );
}

type BlogSeoFieldsProps = {
  seoTitle: string;
  seoDescription: string;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
};

export function BlogSeoFields({
  seoTitle,
  seoDescription,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: BlogSeoFieldsProps) {
  return (
    <FormSection title="SEO" className="border border-gray-100">
      <div className="space-y-5">
        <FormInput
          id="seoTitle"
          label="Título SEO"
          labelClassName="font-medium"
          type="text"
          value={seoTitle}
          onChange={(event) => onSeoTitleChange(event.target.value)}
          placeholder="Título otimizado para mecanismos de busca"
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
        />

        <FormTextarea
          id="seoDescription"
          label="Descrição SEO"
          labelClassName="font-medium"
          value={seoDescription}
          onChange={(event) => onSeoDescriptionChange(event.target.value)}
          placeholder="Descrição otimizada para mecanismos de busca"
          rows={4}
          className="border-gray-500 py-2.5 focus:border-blue focus:ring-blue"
        />
      </div>
    </FormSection>
  );
}

type BlogFormActionsProps = {
  isEditing: boolean;
  saving: boolean;
};

export function BlogFormActions({ isEditing, saving }: BlogFormActionsProps) {
  return (
    <FormActions
      cancelTo="/admin/blog"
      isSubmitting={saving}
      submitLabel={isEditing ? "Salvar alterações" : "Criar artigo"}
      submittingLabel="Salvando..."
      cancelClassName="border-gray-500 py-2.5 text-center text-sm font-medium"
      submitClassName="bg-navy py-2.5 text-sm font-medium hover:bg-blue"
    />
  );
}
