
## eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

```

## package.json

```json
{
  "name": "worldmix360",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "generate-md": "tsx tools/generate-md.ts",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@tiptap/extension-link": "^3.31.3",
    "@tiptap/extension-underline": "^3.31.3",
    "@tiptap/react": "^3.31.3",
    "@tiptap/starter-kit": "^3.31.3",
    "class-variance-authority": "^0.7.1",
    "crypto": "^1.0.1",
    "dompurify": "^3.4.15",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-icons": "^5.7.0",
    "react-router-dom": "^7.18.3",
    "swiper": "^14.2.0",
    "tailwind-variants": "^3.3.1",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.23.13",
    "uuid": "^14.0.2",
    "vite-plugin-svgr": "^5.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/dompurify": "^3.0.5",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "eslint": "^10.9.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.4",
    "globals": "^17.11.0",
    "ts-node": "^10.9.2",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.67.0",
    "vite": "^8.2.2"
  }
}

```

## README.md

<img src="./.github/WorldMix360-desktop.png" classname="w-full"/>
<img src="./.github/WorldMix360-mobile.png" classname="w-full"/>


## src\App.tsx

```tsx
import { AuthProvider } from "./contexts/AuthProvider";
import { CategoriesProvider } from "./contexts/CategoriesProvider";
import { MarketplacesProvider } from "./contexts/MarketplacesProvider";
import { MercadoLivreProvider } from "./contexts/MercadoLivreProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { SubcategoriesProvider } from "./contexts/SubcategoriesProvider";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <MercadoLivreProvider>
        <CategoriesProvider>
          <SubcategoriesProvider>
            <MarketplacesProvider>
              <ProductsProvider>
                <AppRoutes />
              </ProductsProvider>
            </MarketplacesProvider>
          </SubcategoriesProvider>
        </CategoriesProvider>
      </MercadoLivreProvider>
    </AuthProvider>
  );
}

```

## src\components\admin\products\ProductBasicInfo.tsx

```tsx
import { RichTextEditor } from "../RichTextEditor";

type ProductBasicInfoProps = {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onShortDescriptionChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
};

export function ProductBasicInfo({
  title,
  description,
  shortDescription,
  imageUrl,
  loading,
  onTitleChange,
  onDescriptionChange,
  onShortDescriptionChange,
  onImageUrlChange,
}: ProductBasicInfoProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Informações do produto
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Título *
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Ex.: Smartphone Samsung Galaxy"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            O slug será gerado automaticamente pela API.
          </p>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição curta
          </label>

          <input
            id="shortDescription"
            type="text"
            value={shortDescription}
            onChange={(event) => onShortDescriptionChange(event.target.value)}
            placeholder="Resumo rápido do produto"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição
          </label>

          <RichTextEditor
            value={description}
            onChange={onDescriptionChange}
            disabled={loading}
            placeholder="Escreva uma descrição completa e detalhada do produto..."
          />

          <p className="mt-2 text-xs text-gray-500">
            Use títulos, negrito, listas, links e outros recursos para deixar a
            descrição mais organizada e agradável para o cliente.
          </p>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            URL da imagem principal *
          </label>

          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => onImageUrlChange(event.target.value)}
            placeholder="https://exemplo.com/produto.jpg"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          {imageUrl.trim() && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Pré-visualização da imagem principal
              </p>

              <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <img
                  src={imageUrl}
                  alt="Pré-visualização do produto"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductFormActions.tsx

```tsx
import { Link } from "react-router-dom";

type ProductFormActionsProps = {
  loading: boolean;
  isEditing: boolean;
};

export function ProductFormActions({
  loading,
  isEditing,
}: ProductFormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Link
        to="/admin/products"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        Cancelar
      </Link>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue px-4 py-2 text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? isEditing
            ? "Salvando..."
            : "Cadastrando..."
          : isEditing
            ? "Salvar alterações"
            : "Cadastrar produto"}
      </button>
    </div>
  );
}

```

## src\components\admin\products\ProductGallery.tsx

```tsx
import type { ProductImageForm } from "./types";

type ProductGalleryProps = {
  galleryImages: ProductImageForm[];
  loading: boolean;
  onAdd: () => void;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
};

export function ProductGallery({
  galleryImages,
  loading,
  onAdd,
  onChange,
  onRemove,
}: ProductGalleryProps) {
  return (
    <div className="border-t border-gray-100 pt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Galeria de imagens
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Adicione imagens adicionais para exibir na página do produto.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          + Adicionar imagem
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
          <p className="text-sm text-gray-500">
            Nenhuma imagem adicional adicionada.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            A imagem principal continuará sendo utilizada normalmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Imagem {image.sortOrder + 1}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Ordem: {image.sortOrder + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(image.id)}
                  disabled={loading}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Remover
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                <div>
                  <label
                    htmlFor={`gallery-image-${image.id}`}
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    URL da imagem
                  </label>

                  <input
                    id={`gallery-image-${image.id}`}
                    type="url"
                    value={image.imageUrl}
                    onChange={(event) => onChange(image.id, event.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />
                </div>

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                  {image.imageUrl.trim() ? (
                    <img
                      src={image.imageUrl}
                      alt={`Pré-visualização da imagem ${image.sortOrder + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs text-gray-400">
                      Sem imagem
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

## src\components\admin\products\ProductPricing.tsx

```tsx
import { formatCurrencyInput } from "../../../utils/formatCurrency";

type ProductPricingProps = {
  price: string;
  originalPrice: string;
  currency: string;
  rating: string;
  reviewsCount: string;
  loading: boolean;
  onPriceChange: (value: string) => void;
  onOriginalPriceChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onReviewsCountChange: (value: string) => void;
};

export function ProductPricing({
  price,
  originalPrice,
  currency,
  rating,
  reviewsCount,
  loading,
  onPriceChange,
  onOriginalPriceChange,
  onCurrencyChange,
  onRatingChange,
  onReviewsCountChange,
}: ProductPricingProps) {
  function handlePriceChange(value: string) {
    onPriceChange(formatCurrencyInput(value));
  }

  function handleOriginalPriceChange(value: string) {
    onOriginalPriceChange(formatCurrencyInput(value));
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Preço e avaliações
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Preço *
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(event) => handlePriceChange(event.target.value)}
              placeholder="0,00"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Digite o valor no formato brasileiro. Ex.: 38,99
          </p>
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Preço original
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="originalPrice"
              type="text"
              inputMode="decimal"
              value={originalPrice}
              onChange={(event) =>
                handleOriginalPriceChange(event.target.value)
              }
              placeholder="0,00"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">Opcional. Ex.: 49,90</p>
        </div>

        <div>
          <label
            htmlFor="currency"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Moeda
          </label>

          <input
            id="currency"
            type="text"
            value={currency}
            onChange={(event) =>
              onCurrencyChange(event.target.value.toUpperCase())
            }
            maxLength={3}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Avaliação
          </label>

          <input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(event) => onRatingChange(event.target.value)}
            placeholder="Ex.: 4.8"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="reviewsCount"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Quantidade de avaliações
          </label>

          <input
            id="reviewsCount"
            type="number"
            min="0"
            step="1"
            value={reviewsCount}
            onChange={(event) => onReviewsCountChange(event.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductRelationships.tsx

```tsx
type Subcategory = {
  id: string;
  name: string;
  category?: {
    name: string;
  } | null;
};

type Marketplace = {
  id: string;
  name: string;
};

type ProductRelationshipsProps = {
  subcategories: Subcategory[];
  marketplaces: Marketplace[];
  subcategoryId: string;
  marketplaceId: string;
  affiliateUrl: string;
  loading: boolean;
  onSubcategoryChange: (value: string) => void;
  onMarketplaceChange: (value: string) => void;
  onAffiliateUrlChange: (value: string) => void;
};

export function ProductRelationships({
  subcategories,
  marketplaces,
  subcategoryId,
  marketplaceId,
  affiliateUrl,
  loading,
  onSubcategoryChange,
  onMarketplaceChange,
  onAffiliateUrlChange,
}: ProductRelationshipsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Classificação e marketplace
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="subcategoryId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Subcategoria *
          </label>

          <select
            id="subcategoryId"
            value={subcategoryId}
            onChange={(event) => onSubcategoryChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione uma subcategoria</option>

            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.category?.name
                  ? `${subcategory.category.name} → ${subcategory.name}`
                  : subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="marketplaceId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Marketplace *
          </label>

          <select
            id="marketplaceId"
            value={marketplaceId}
            onChange={(event) => onMarketplaceChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione um marketplace</option>

            {marketplaces.map((marketplace) => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="affiliateUrl"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Link de afiliado *
          </label>

          <input
            id="affiliateUrl"
            type="url"
            value={affiliateUrl}
            onChange={(event) => onAffiliateUrlChange(event.target.value)}
            placeholder="https://..."
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            Este será o link utilizado pelo botão de compra/afiliado.
          </p>
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductSeo.tsx

```tsx
type ProductSeoProps = {
  seoTitle: string;
  seoDescription: string;
  loading: boolean;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
};

export function ProductSeo({
  seoTitle,
  seoDescription,
  loading,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: ProductSeoProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">SEO</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="seoTitle"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Title
          </label>

          <input
            id="seoTitle"
            type="text"
            value={seoTitle}
            onChange={(event) => onSeoTitleChange(event.target.value)}
            placeholder="Título otimizado para buscadores"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="seoDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Description
          </label>

          <textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(event) => onSeoDescriptionChange(event.target.value)}
            rows={4}
            placeholder="Descrição otimizada para mecanismos de busca"
            disabled={loading}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductStatus.tsx

```tsx
type ProductStatusProps = {
  featured: boolean;
  available: boolean;
  active: boolean;
  loading: boolean;
  onFeaturedChange: (value: boolean) => void;
  onAvailableChange: (value: boolean) => void;
  onActiveChange: (value: boolean) => void;
};

export function ProductStatus({
  featured,
  available,
  active,
  loading,
  onFeaturedChange,
  onAvailableChange,
  onActiveChange,
}: ProductStatusProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Status do produto
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => onFeaturedChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Destaque
            </span>

            <span className="block text-xs text-gray-500">
              Exibir como produto destacado.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => onAvailableChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Disponível
            </span>

            <span className="block text-xs text-gray-500">
              Produto disponível no catálogo.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => onActiveChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Ativo
            </span>

            <span className="block text-xs text-gray-500">
              Produto ativo no sistema.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}

```

## src\components\admin\products\types.ts

```ts
export type ProductImageForm = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

```

## src\components\admin\RichTextEditor.tsx

```tsx
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  disabled = false,
  placeholder = "Escreva a descrição completa do produto...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value,

    editable: !disabled,

    editorProps: {
      attributes: {
        class:
          "min-h-[260px] w-full px-4 py-4 text-sm leading-7 text-gray-700 outline-none",
        "data-placeholder": placeholder,
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();

    if (value !== currentHtml && value !== "") {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }

    if (value === "" && !editor.isEmpty) {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
        Carregando editor...
      </div>
    );
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Informe a URL do link:",
      previousUrl || "https://",
    );

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
        target: "_blank",
      })
      .run();
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-300 bg-white ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {/* Parágrafo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("paragraph")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Parágrafo"
        >
          P
        </button>

        {/* Título 2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 2"
        >
          H2
        </button>

        {/* Título 3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 3"
        >
          H3
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Negrito */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm font-bold transition ${
            editor.isActive("bold")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Negrito"
        >
          B
        </button>

        {/* Itálico */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm italic transition ${
            editor.isActive("italic")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Itálico"
        >
          I
        </button>

        {/* Sublinhado */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm underline transition ${
            editor.isActive("underline")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Sublinhado"
        >
          U
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Lista */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("bulletList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista com marcadores"
        >
          • Lista
        </button>

        {/* Lista numerada */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("orderedList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>

        {/* Citação */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("blockquote")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Citação"
        >
          “ Citação
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("link")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Adicionar link"
        >
          Link
        </button>

        {/* Remover link */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={disabled || !editor.isActive("link")}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Remover link"
        >
          Remover link
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Separador */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
          title="Separador"
        >
          ―
        </button>

        {/* Desfazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Desfazer"
        >
          ↶
        </button>

        {/* Refazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Refazer"
        >
          ↷
        </button>
      </div>

      {/* Área de edição */}
      <EditorContent editor={editor} />
    </div>
  );
}

```

## src\components\AdminLayout\index.tsx

```tsx
import { NavLink, Outlet } from "react-router-dom";

import { HeaderAdmin } from "../HeaderAdmin";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Produtos",
    href: "/admin/products",
  },
  {
    label: "Categorias",
    href: "/admin/categories",
  },
  {
    label: "Subcategorias",
    href: "/admin/subcategories",
  },
  {
    label: "Marketplaces",
    href: "/admin/marketplaces",
  },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      <HeaderAdmin />

      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#e7edf5] bg-white lg:block">
          <div className="sticky top-0 p-4">
            <div className="mb-5 px-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a9bb0]">
                Administração
              </p>

              <p className="mt-1 text-sm text-[#52657c]">Gerencie o catálogo</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-[#edf5ff] text-[#1769e0]"
                        : "text-[#52657c] hover:bg-[#f5f8fc] hover:text-[#071a2f]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

```

## src\components\AppLayout\index.tsx

```tsx
import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { Header } from "../Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      <Header />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

```

## src\components\Banner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import ProdutosBunner from "../../assets/images/banner1.png";
import { Icon } from "../Icon";

const banners = [
  {
    eyebrow: "Escolhas que fazem sentido",
    title: "Um mundo de",
    highlight: " escolhas.",
    description:
      "As melhores recomendações dos principais marketplaces em um só lugar para você.",
    image: ProdutosBunner,
    imageAlt: "Seleção de produtos recomendados pela WorldMix360",
    href: "/ofertas",
    cta: "Ver ofertas",
    imageClassName:
      "-bottom-4 right-0 max-w-[500px] opacity-80 md:max-w-[800px] lg:max-w-[900px]",
  },
  {
    eyebrow: "Compra mais inteligente",
    title: "Descubra produtos",
    highlight: " para sua rotina.",
    description:
      "Compare ideias, encontre novidades e escolha com mais confiança em cada categoria.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa escolhendo produtos em uma experiência de compra",
    href: "/tecnologia",
    cta: "Explorar categorias",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
  {
    eyebrow: "Curadoria de parceiros",
    title: "Encontre sua próxima",
    highlight: " boa escolha.",
    description:
      "Confira produtos de marketplaces parceiros e acesse as ofertas diretamente no site do anunciante.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoas felizes fazendo compras online em um notebook",
    href: "/ofertas",
    cta: "Ver produtos",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function Banner() {
  return (
    <section
      aria-label="Destaques WorldMix360"
      className="w-full overflow-hidden bg-navy"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="home-banner h-[500px] md:h-[600px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative h-full overflow-hidden bg-gradient-to-br from-navy via-[#0b3d66] to-blue">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#9ad7ff]">
                    {banner.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h1>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-xl">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\BlogBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const blogBanners = [
  {
    eyebrow: "No nosso blog",
    title: "Dicas práticas sobre",
    highlight: " tecnologia",
    description:
      "Descubra como escolher gadgets e apps que realmente facilitam sua rotina.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa usando notebook e smartphone",
    href: "/blog/tecnologia",
    cta: "Ler matéria",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-blue", // usa azul da paleta
  },
  {
    eyebrow: "Conteúdo exclusivo",
    title: "Tendências em",
    highlight: " consumo consciente",
    description:
      "Saiba como fazer escolhas mais sustentáveis e inteligentes no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Sacolas ecológicas e produtos sustentáveis",
    href: "/blog/sustentabilidade",
    cta: "Explorar artigo",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-green", // verde da paleta
  },
  {
    eyebrow: "Insights do mercado",
    title: "O futuro das",
    highlight: " compras online",
    description:
      "Entenda como marketplaces estão mudando a forma de consumir e vender.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Carrinho de compras digital",
    href: "/blog/ecommerce",
    cta: "Ver análise",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-yellow", // amarelo da paleta
  },
];

export function BlogBanner() {
  return (
    <section
      aria-label="Matérias do Blog WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="blog-banner h-[400px] md:h-[500px]"
      >
        {blogBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.bgColor}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-yellow">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\Footer\index.tsx

```tsx
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";
import { Menu } from "../Menu";

export function Footer() {
  return (
    <footer className="text-white w-full bg-navy p-6">
      <div className="md:max-w-[1200px] mx-auto px-6">
        {/* Grid responsiva */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Logo */}
          <div className="flex max-w-[290px] flex-col gap-2">
            <Link to="/" className="inline-block w-fit">
              <Logo location="footer" />
            </Link>
            {/* Redes sociais */}
            <p className="text-gray-100 font-semibold md:text-xl my-2">
              Um mundo de escolhas, Descubra, Compare e Escolha melhor.
            </p>
            <div className="flex items-center mt-3 justify-between max-w-[220px]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-white hover:text-yellow text-4xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-white hover:text-gray-500 text-4xl" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Institucional</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/sobre" className="transition hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  to="/como-funciona"
                  className="transition hover:text-white"
                >
                  Como funciona
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="transition hover:text-white"
                >
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/termos-de-uso"
                  className="transition hover:text-white"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link to="/contato" className="transition hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Categorias</h3>
            <Menu variant="footer" />
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Newsletter</h3>
            <p className="text-sm mb-2">
              Receba dicas e ofertas exclusivas no seu e-mail
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-2 rounded-md text-navy bg-white"
              />
              <button
                type="submit"
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm text-gray-300">
        © 2026 WorldMix360 – Todos os direitos reservados.
      </div>
    </footer>
  );
}

```

## src\components\Header\index.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../../assets/Icons/menuIcon.svg?react";
import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { useAuth } from "../../contexts/useAuth";

import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { Menu } from "../Menu";
import { SearchBar } from "../SearchBar";

export function Header() {
  const { user, signOut } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * ============================================================
   * FECHAR PESQUISA AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isSearchOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  /*
   * ============================================================
   * FECHAR MENU MOBILE AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full border-b-2 border-blue/20">
      <header className="relative mx-auto w-full px-6 py-10 md:max-w-[1200px] md:py-5">
        {/* ======================================================
            HEADER PRINCIPAL
        ====================================================== */}

        <div className="flex items-center justify-between md:min-h-[60px] md:gap-6">
          {/* ====================================================
              BOTÃO MENU MOBILE
          ==================================================== */}

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsSearchOpen(false);
            }}
            className="block md:hidden"
          >
            <Icon svg={MenuIcon} size="md" />
          </button>

          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:items-center"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Voltar para a página inicial"
          >
            <Logo />
          </Link>

          {/* ====================================================
              BOTÃO PESQUISA MOBILE
          ==================================================== */}

          {!isSearchOpen && (
            <button
              type="button"
              aria-label="Pesquisar"
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
              className="ml-auto block md:hidden"
            >
              <Icon svg={SearchIcon} size="md" />
            </button>
          )}

          {/* ====================================================
              ÁREA DESKTOP
          ==================================================== */}

          <div className="hidden w-full max-w-[58%] items-center justify-end gap-4 md:flex">
            {/* Pesquisa */}

            <SearchBar className="w-full" />

            {/* ==================================================
                AUTENTICAÇÃO
            ================================================== */}

            {user ? (
              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Olá,</p>

                  <p className="max-w-[120px] truncate text-sm font-semibold text-navy">
                    {user.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-navy transition hover:bg-gray-50"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex shrink-0 items-center rounded-lg bg-[#1769e0] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f56bd]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* ======================================================
            MENU DESKTOP
        ====================================================== */}

        <div className="mt-3 hidden md:block">
          <Menu variant="header" />
        </div>

        {/* ======================================================
            PESQUISA MOBILE
        ====================================================== */}

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="mt-10 flex items-center gap-2 md:hidden"
          >
            <SearchBar className="flex-1" />

            <button
              type="button"
              aria-label="Fechar pesquisa"
              onClick={() => setIsSearchOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-lg text-gray-700"
            >
              ×
            </button>
          </div>
        )}

        {/* ======================================================
            MENU MOBILE
        ====================================================== */}

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#071a2f]/60 md:hidden">
            <div
              ref={menuRef}
              className="h-full w-[85%] max-w-[360px] overflow-y-auto bg-[#071a2f] px-5 py-6 text-white"
            >
              {/* ==================================================
                  CABEÇALHO DO MENU MOBILE
              ================================================== */}

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold">
                    W
                  </div>

                  <div>
                    <p className="text-xl font-bold leading-none">WORLD</p>

                    <p className="text-lg font-bold leading-none">MIX 360</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light text-white"
                >
                  ×
                </button>
              </div>

              {/* ==================================================
                  PESQUISA MOBILE DO MENU
              ================================================== */}

              <div className="mb-5">
                <SearchBar
                  className="[&_input]:border-white/10 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-white/60"
                  onSearch={() => setIsMenuOpen(false)}
                />
              </div>

              {/* ==================================================
                  AUTENTICAÇÃO MOBILE
              ================================================== */}

              <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
                {user ? (
                  <div>
                    <p className="text-xs text-white/60">Olá,</p>

                    <p className="mt-1 truncate text-base font-bold text-white">
                      {user.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="mt-3 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg bg-[#1769e0] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Entrar
                  </Link>
                )}
              </div>

              {/* ==================================================
                  MENU DINÂMICO

                  Agora categorias e subcategorias vêm da API.
              ================================================== */}

              <Menu variant="mobile" onNavigate={() => setIsMenuOpen(false)} />

              {/* ==================================================
                  LINKS INSTITUCIONAIS
              ================================================== */}

              <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70">
                <Link
                  to="/sobre"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Sobre nós
                </Link>

                <Link
                  to="/contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Contato
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Política de Privacidade
                </button>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

```

## src\components\HeaderAdmin\index.tsx

```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export function HeaderAdmin() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    closeMenu();
    signOut();
  };

  return (
    <>
      <header className="w-full bg-gray-900 text-white px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo / título */}
        <Link
          to="/admin/dashboard"
          className="text-lg font-bold hover:text-blue-300 transition-colors"
          onClick={closeMenu}
        >
          Painel Administrativo
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/admin/dashboard"
            className={`transition-colors ${
              isActive("/admin/dashboard")
                ? "text-blue-300"
                : "hover:text-blue-300"
            }  md:hidden`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`transition-colors ${
              isActive("/admin/products")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Produtos
          </Link>

          <Link
            to="/admin/categories"
            className={`transition-colors ${
              isActive("/admin/categories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Categorias
          </Link>

          <Link
            to="/admin/subcategories"
            className={`transition-colors ${
              isActive("/admin/subcategories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Subcategorias
          </Link>

          <Link
            to="/admin/marketplaces"
            className={`transition-colors ${
              isActive("/admin/marketplaces")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Marketplaces
          </Link>

          <span className="text-sm text-gray-300">Olá, {user?.name}</span>

          <button
            type="button"
            onClick={handleSignOut}
            className="bg-danger px-3 py-1.5 rounded text-sm hover:bg-red-500 transition-colors"
          >
            Sair
          </button>
        </nav>

        {/* Área mobile */}
        <div className="flex md:hidden items-center gap-3">
          <span className="text-sm text-gray-300 max-w-24 truncate">
            {user?.name}
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Menu lateral mobile */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
          <div>
            <p className="font-bold">WorldMix360</p>
            <p className="text-sm text-gray-400">Painel Administrativo</p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="text-gray-300 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="text-sm text-gray-400 mb-4">Olá, {user?.name}</p>

          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/products")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Produtos
            </Link>

            <Link
              to="/admin/categories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/categories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Categorias
            </Link>

            <Link
              to="/admin/subcategories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/subcategories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Subcategorias
            </Link>

            <Link
              to="/admin/marketplaces"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/marketplaces")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Marketplaces
            </Link>
          </nav>

          <div className="border-t border-gray-700 mt-6 pt-6">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full bg-red-600 px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

```

## src\components\Icon\iconVariants.ts

```ts
import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block", {
  variants: {
    animate: {
      false: "",
      true: "animate-spin",
    },
    color: {
      gray: "text-gray-400",
      blue: "text-blue-500",
      red: "text-red-500",
    },
    size: {
      md: "w-7 h-7",
      lg: "w-9 h-9",
    },
  },
  defaultVariants: {
    animate: false,
    color: "gray",
    size: "md",
  },
});

```

## src\components\Icon\index.tsx

```tsx
import type { VariantProps } from "class-variance-authority";
import { cn } from "tailwind-variants";
import { iconVariants } from "./iconVariants";

interface IconProps
  extends
    Omit<React.ComponentProps<"svg">, "color">,
    VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<"svg">>;
}

export function Icon({
  svg: SvgComponent,
  animate,
  color,
  size,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={cn(iconVariants({ animate, color, size }), className)}
      {...props}
    />
  );
}

```

## src\components\InputText\index.tsx

```tsx
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "tailwind-variants";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function InputText({
  icon,
  iconPosition = "left",
  className,
  ...props
}: InputTextProps) {
  const hasIcon = Boolean(icon);

  return (
    <div className="relative w-full">
      {hasIcon && iconPosition === "left" && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={cn(
          "w-full rounded-lg border-gray-100 border-2 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-colors duration-200",
          "focus:border-blue focus:ring-2 focus:ring-blue/10",
          hasIcon && iconPosition === "left" && "pl-10",
          hasIcon && iconPosition === "right" && "pr-10",
          className,
        )}
      />

      {hasIcon && iconPosition === "right" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          {icon}
        </div>
      )}
    </div>
  );
}

```

## src\components\Logo\index.tsx

```tsx
import LogoIcon from "../../assets/images/WorldMix360-logo.png";

interface LogoProps {
  location?: "header" | "footer";
}

export function Logo({ location = "header" }: LogoProps) {
  const worldColor = location === "footer" ? "text-white" : "text-navy";
  const mix360 = location === "footer" ? "md:flex-wrap" : "md:flex-row";

  return (
    <div className="flex items-center gap-2 md:min-h-[60px]">
      <img
        src={LogoIcon}
        alt="Logo WorldMix360"
        className="h-14 w-14 md:h-16 md:w-16"
      />
      <div className="flex flex-col justify-center">
        <div className={`flex flex-col ${mix360}`} translate="no">
          <span className={`${worldColor} text-2xl font-bold md:text-3xl `}>
            WORLD
          </span>
          <div className="flex gap-1">
            <span className="text-blue text-2xl font-bold md:text-3xl">
              MIX
            </span>
            <span className="text-green text-2xl font-bold md:text-3xl">
              360
            </span>
          </div>
        </div>

        <p className="text-green-dark text-xs leading-4 md:text-sm md:leading-5">
          Um mundo de escolhas.
        </p>
      </div>
    </div>
  );
}

```

## src\components\Menu\index.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useCategories } from "../../contexts/useCategories";
import { useSubcategories } from "../../contexts/useSubcategories";
import { getCategoryIcon } from "./items";

type MenuVariant = "header" | "footer" | "mobile";

interface MenuProps {
  variant?: MenuVariant;
  className?: string;
  onNavigate?: () => void;
}

export function Menu({
  variant = "header",
  className = "",
  onNavigate,
}: MenuProps) {
  const isHeader = variant === "header";
  const isMobile = variant === "mobile";

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    fetchSubcategories,
  } = useSubcategories();

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  /*
   * ============================================================
   * CARREGAMENTO DAS CATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  /*
   * ============================================================
   * CARREGAMENTO DAS SUBCATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  /*
   * ============================================================
   * ESTRUTURA DINÂMICA DO MENU
   * ============================================================
   *
   * Categoria
   *   ├── Subcategoria
   *   ├── Subcategoria
   *   └── Subcategoria
   *
   * Somente categorias e subcategorias ativas são exibidas.
   */

  const menuCategories = useMemo(() => {
    return categories
      .filter((category) => category.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        id: category.id,
        label: category.name,
        slug: category.slug,
        icon: getCategoryIcon(category.slug),
        href: `/categoria/${category.slug}`,

        subcategories: subcategories
          .filter(
            (subcategory) =>
              subcategory.categoryId === category.id && subcategory.active,
          )
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((subcategory) => ({
            id: subcategory.id,
            label: subcategory.name,
            href: `/categoria/${category.slug}/${subcategory.slug}`,
          })),
      }));
  }, [categories, subcategories]);

  /*
   * ============================================================
   * FOOTER
   * ============================================================
   */

  if (variant === "footer") {
    return (
      <nav
        className={["mt-0 flex flex-col gap-1 text-sm text-white/80", className]
          .filter(Boolean)
          .join(" ")}
      >
        {menuCategories.map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className="block text-left text-sm transition hover:text-white"
          >
            {category.label}
          </Link>
        ))}
      </nav>
    );
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (categoriesLoading || subcategoriesLoading) {
    /*
     * Loading mobile
     */

    if (isMobile) {
      return (
        <nav
          className={["flex flex-col gap-2", className]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
        </nav>
      );
    }

    /*
     * Loading desktop
     */

    return (
      <nav
        className={[
          "hidden md:flex md:items-center md:justify-start md:gap-2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-32 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU MOBILE
   * ============================================================
   */

  if (isMobile) {
    return (
      <nav
        className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
      >
        {menuCategories.map((category) => {
          const Icon = category.icon;

          const isOpen = openCategory === category.id;

          const hasSubcategories = category.subcategories.length > 0;

          return (
            <div key={category.id}>
              {/* Categoria principal */}

              <div className="flex items-center rounded-lg transition hover:bg-white/5">
                <Link
                  to={category.href}
                  onClick={onNavigate}
                  className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left text-base font-medium text-white/90"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <Icon className="text-base" />
                  </span>

                  <span className="truncate">{category.label}</span>
                </Link>

                {/* Botão das subcategorias */}

                {hasSubcategories && (
                  <button
                    type="button"
                    aria-label={
                      isOpen
                        ? `Recolher ${category.label}`
                        : `Expandir ${category.label}`
                    }
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenCategory((current) =>
                        current === category.id ? null : category.id,
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
                  >
                    {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                )}
              </div>

              {/* Subcategorias */}

              {isOpen && hasSubcategories && (
                <div className="ml-8 border-l border-white/10 pl-3">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      {subcategory.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU DESKTOP
   * ============================================================
   *
   * O submenu usa Tailwind group-hover.
   *
   * Isso evita onMouseEnter/onMouseLeave em elementos
   * estáticos e elimina o aviso do Biome:
   *
   * a11y/noStaticElementInteractions
   */

  return (
    <nav
      className={[
        isHeader
          ? "hidden md:flex md:items-center md:justify-start md:gap-2 md:px-0 md:py-0 md:bg-transparent"
          : "flex flex-col gap-1 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {menuCategories.map((category) => {
        const Icon = category.icon;

        const hasSubcategories = category.subcategories.length > 0;

        return (
          <div key={category.id} className="group relative">
            {/* Categoria principal */}

            <Link
              to={category.href}
              className={[
                isHeader
                  ? "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#071a2f] transition hover:bg-slate-50 hover:text-[#0b3d66]"
                  : "block text-left text-sm transition hover:text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {variant !== "header" && <Icon className="mr-2 inline-block" />}

              <span>{category.label}</span>

              {hasSubcategories && isHeader && (
                <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* ==================================================
                SUBMENU DESKTOP
            ================================================== */}

            {isHeader && hasSubcategories && (
              <div className="absolute left-1/2 top-full z-50 hidden min-w-[250px] -translate-x-1/2 pt-3 group-hover:block">
                <div className="overflow-hidden rounded-2xl border border-[#e7edf5] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {/* Link para a categoria */}

                  <Link
                    to={category.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Ver {category.label}
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Subcategorias */}

                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <span>{subcategory.label}</span>

                      <FiChevronRight className="text-xs text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

```

## src\components\Menu\items.ts

```ts
import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiMonitor,
  FiShoppingBag,
  FiTag,
  FiTool,
} from "react-icons/fi";

export type MenuCategory = {
  label: string;
  icon: IconType;
  href: string;
  slug: string;
};

export type MenuItem = MenuCategory & {
  subcategories: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

/**
 * Ícone padrão para categorias.
 *
 * O slug é usado para manter os ícones atuais
 * mesmo com as categorias vindo da API.
 */
export function getCategoryIcon(slug: string): IconType {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug.includes("tecnologia")) {
    return FiMonitor;
  }

  if (normalizedSlug.includes("casa") || normalizedSlug.includes("utilidade")) {
    return FiTool;
  }

  if (normalizedSlug.includes("moda")) {
    return FiShoppingBag;
  }

  if (normalizedSlug.includes("pet")) {
    return FiHeart;
  }

  if (
    normalizedSlug.includes("digital") ||
    normalizedSlug.includes("produto-digital")
  ) {
    return FiGrid;
  }

  if (normalizedSlug.includes("oferta")) {
    return FiTag;
  }

  if (normalizedSlug.includes("blog")) {
    return FiBookOpen;
  }

  return FiGrid;
}

```

## src\components\OffersBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const offersBanners = [
  {
    eyebrow: "Ofertas imperdíveis",
    title: "Descontos de até",
    highlight: " 50%",
    description:
      "Aproveite promoções exclusivas em tecnologia, moda e muito mais.",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155223f9c8?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Produtos em promoção com grandes descontos",
    href: "/ofertas",
    cta: "Aproveitar agora",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function OffersBanner() {
  return (
    <section
      aria-label="Ofertas especiais"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="offers-banner h-[400px] md:h-[500px]"
      >
        {offersBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative h-full overflow-hidden bg-gradient-to-br from-navy via-[#0b3d66] to-blue">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#9ad7ff]">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\product\ProductBreadcrumb.tsx

```tsx
import { Link } from "react-router-dom";

export function ProductBreadcrumb() {
  return (
    <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
      <Link to="/" className="transition hover:text-[#1769e0]">
        Início
      </Link>

      <span className="px-2">/</span>

      <span>Detalhes do produto</span>
    </nav>
  );
}

```

## src\components\product\ProductDescription.tsx

```tsx
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

import type { Product } from "../../contexts/ProductsContext";

type ProductDescriptionProps = {
  product: Product;
};

function decodeHtmlEntities(value: string): string {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = value;

  return textarea.value;
}

function normalizeDescription(value: string): string {
  if (!value.trim()) {
    return "";
  }

  let normalized = value.trim();

  if (
    normalized.includes("&lt;") ||
    normalized.includes("&gt;") ||
    normalized.includes("&amp;lt;") ||
    normalized.includes("&amp;gt;")
  ) {
    normalized = decodeHtmlEntities(normalized);

    if (normalized.includes("&lt;") || normalized.includes("&gt;")) {
      normalized = decodeHtmlEntities(normalized);
    }
  }

  return normalized;
}

function renderDescriptionHtml(html: string): ReactNode {
  if (!html.trim()) {
    return null;
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");

  function renderNode(node: ChildNode, key: string): ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as HTMLElement;

    const children = Array.from(element.childNodes).map((child, index) =>
      renderNode(child, `${key}-${index}`),
    );

    switch (element.tagName.toLowerCase()) {
      case "p":
        return <p key={key}>{children}</p>;

      case "br":
        return <br key={key} />;

      case "strong":
        return <strong key={key}>{children}</strong>;

      case "b":
        return <b key={key}>{children}</b>;

      case "em":
        return <em key={key}>{children}</em>;

      case "i":
        return <i key={key}>{children}</i>;

      case "u":
        return <u key={key}>{children}</u>;

      case "h2":
        return <h2 key={key}>{children}</h2>;

      case "h3":
        return <h3 key={key}>{children}</h3>;

      case "h4":
        return <h4 key={key}>{children}</h4>;

      case "ul":
        return <ul key={key}>{children}</ul>;

      case "ol":
        return <ol key={key}>{children}</ol>;

      case "li":
        return <li key={key}>{children}</li>;

      case "blockquote":
        return <blockquote key={key}>{children}</blockquote>;

      case "hr":
        return <hr key={key} />;

      case "a": {
        const href = element.getAttribute("href");

        if (!href) {
          return <span key={key}>{children}</span>;
        }

        return (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      default:
        return <span key={key}>{children}</span>;
    }
  }

  return Array.from(parsedDocument.body.childNodes).map((node, index) =>
    renderNode(node, `description-${index}`),
  );
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const normalizedDescription = normalizeDescription(product.description || "");

  const safeDescription = DOMPurify.sanitize(normalizedDescription, {
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

  if (!safeDescription) {
    return null;
  }

  const renderedDescription = renderDescriptionHtml(safeDescription);

  return (
    <section
      className="mt-10 rounded-[28px] border border-[#e7edf5] bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)] md:p-10"
      aria-labelledby="product-description-title"
    >
      <h2
        id="product-description-title"
        className="mb-6 text-2xl font-black text-[#071a2f]"
      >
        Descrição do produto
      </h2>

      <div
        className="
          product-description
          text-[15px]
          leading-7
          text-[#52657c]

          [&_h2]:mb-4
          [&_h2]:mt-8
          [&_h2]:text-2xl
          [&_h2]:font-black
          [&_h2]:leading-tight
          [&_h2]:text-[#071a2f]

          [&_h3]:mb-3
          [&_h3]:mt-7
          [&_h3]:text-xl
          [&_h3]:font-bold
          [&_h3]:text-[#071a2f]

          [&_h4]:mb-2
          [&_h4]:mt-6
          [&_h4]:text-lg
          [&_h4]:font-bold
          [&_h4]:text-[#071a2f]

          [&_p]:mb-4

          [&_ul]:mb-5
          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:mb-5
          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_li]:mb-2

          [&_strong]:font-bold
          [&_strong]:text-[#071a2f]

          [&_b]:font-bold
          [&_b]:text-[#071a2f]

          [&_em]:italic

          [&_u]:underline
          [&_u]:underline-offset-2

          [&_a]:font-semibold
          [&_a]:text-[#1769e0]
          [&_a]:underline
          [&_a]:underline-offset-2

          [&_blockquote]:my-5
          [&_blockquote]:border-l-4
          [&_blockquote]:border-[#1769e0]
          [&_blockquote]:bg-[#f7f9fc]
          [&_blockquote]:px-5
          [&_blockquote]:py-4
          [&_blockquote]:italic
          [&_blockquote]:text-[#52657c]

          [&_hr]:my-7
          [&_hr]:border-[#e7edf5]
        "
      >
        {renderedDescription}
      </div>
    </section>
  );
}

```

## src\components\product\ProductGallery.tsx

```tsx
import { useState } from "react";

import type { Product } from "../../contexts/ProductsContext";

type ProductGalleryProps = {
  product: Product;
};

type GalleryImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages: GalleryImage[] = [
    {
      id: "primary",
      imageUrl: product.imageUrl,
      sortOrder: -1,
    },
    ...(Array.isArray(product.images)
      ? product.images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          sortOrder: image.sortOrder,
        }))
      : []),
  ]
    .filter((image) => image.imageUrl.trim())
    .filter(
      (image, index, array) =>
        array.findIndex(
          (item) => item.imageUrl.trim() === image.imageUrl.trim(),
        ) === index,
    )
    .sort((a, b) => {
      if (a.id === "primary") {
        return -1;
      }

      if (b.id === "primary") {
        return 1;
      }

      return a.sortOrder - b.sortOrder;
    });

  const safeSelectedImageIndex =
    selectedImageIndex >= productImages.length ? 0 : selectedImageIndex;

  const selectedImage =
    productImages[safeSelectedImageIndex]?.imageUrl || product.imageUrl;

  return (
    <div className="bg-[#f7f9fc] p-6 md:p-8">
      <div className="flex min-h-[340px] items-center justify-center md:min-h-[470px]">
        <img
          src={selectedImage}
          alt={product.title}
          className="max-h-[420px] w-full object-contain"
        />
      </div>

      {productImages.length > 1 && (
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
            {productImages.map((image, index) => {
              const isSelected = index === safeSelectedImageIndex;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Exibir imagem ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 bg-white p-2 transition ${
                    isSelected
                      ? "border-[#1769e0] shadow-[0_0_0_2px_rgba(23,105,224,0.12)]"
                      : "border-transparent hover:border-[#b9c9dc]"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`${product.title} - imagem ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

```

## src\components\product\ProductInfo.tsx

```tsx
import type { Product } from "../../contexts/ProductsContext";
import { formatCurrencyBRL } from "../../utils/formatCurrency";
import { ProductRating } from "./ProductRating";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const price = formatCurrencyBRL(product.price);
  const originalPrice = product.originalPrice
    ? formatCurrencyBRL(product.originalPrice)
    : null;

  return (
    <div className="flex flex-col justify-center p-8 md:p-12">
      {product.category && (
        <span className="mb-5 w-fit rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#0b3d66]">
          {product.category}
        </span>
      )}

      <h1 className="text-3xl font-black leading-tight text-[#071a2f] md:text-4xl">
        {product.title}
      </h1>

      <ProductRating
        rating={product.rating}
        reviewsCount={product.reviewsCount}
      />

      {product.shortDescription && (
        <p className="mt-5 text-sm leading-6 text-[#52657c]">
          {product.shortDescription}
        </p>
      )}

      <div className="mt-8 border-y border-[#edf2f7] py-6">
        <p className="text-sm text-[#667085]">
          Preço apresentado no momento da consulta
        </p>

        {originalPrice && (
          <p className="mt-2 text-sm text-gray-500 line-through">
            {originalPrice}
          </p>
        )}

        <p className="mt-1 text-3xl font-black text-[#071a2f]">{price}</p>
      </div>

      <p className="mt-6 text-sm leading-6 text-[#52657c]">
        Você será direcionado ao site do parceiro para conferir disponibilidade,
        frete, avaliações e finalizar a compra.
      </p>

      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#20b35b] px-6 font-bold text-white transition hover:bg-[#159447]"
      >
        Ver oferta
      </a>

      <p className="mt-4 text-xs text-[#667085]">
        Este é um link de afiliado. A compra é realizada diretamente no site do
        parceiro.
      </p>
    </div>
  );
}

```

## src\components\product\ProductRating.tsx

```tsx
type ProductRatingProps = {
  rating?: number | null;
  reviewsCount: number;
};

export function ProductRating({ rating, reviewsCount }: ProductRatingProps) {
  if (rating === null || rating === undefined || reviewsCount <= 0) {
    return null;
  }

  const normalizedRating = Number(rating);
  const roundedRating = Math.round(normalizedRating);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`star-${star}`}
            className={star <= roundedRating ? "text-yellow" : "text-gray-500"}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>

      <span className="text-sm font-bold text-[#071a2f]">
        {normalizedRating.toFixed(1)}
      </span>

      <span className="text-sm text-[#667085]">
        ({reviewsCount.toLocaleString("pt-BR")} avaliações)
      </span>
    </div>
  );
}

```

## src\components\ProductCard\index.tsx

```tsx
import { Link } from "react-router-dom";

import type { Product } from "../../contexts/ProductsContext";
import { formatCurrencyBRL } from "../../utils/formatCurrency";
import { ProductRating } from "../product/ProductRating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  console.log("PRODUTO DO CARD:", product);
  const formattedPrice = formatCurrencyBRL(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? formatCurrencyBRL(product.originalPrice)
    : null;

  return (
    <div
      className={`
    flex h-[420px] w-full flex-col 
    items-center rounded-2xl border border-[#e7edf5] bg-white p-4 text-center shadow-md transition-shadow hover:bg-gray-50 hover:shadow-lg`}
    >
      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mb-3 flex h-40 w-full shrink-0 items-center justify-center rounded-xl bg-[#f8fafc] p-2"
        aria-label={`Ver detalhes de ${product.title}`}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </Link>

      {product.category && (
        <p className="mb-2 flex h-6 shrink-0 items-center self-start rounded-full bg-[#edf5ff] px-2.5 py-1 text-[11px] font-semibold text-[#0b3d66]">
          {product.category}
        </p>
      )}

      <ProductRating
        rating={product.rating}
        reviewsCount={product.reviewsCount}
      />

      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mb-1 line-clamp-2 min-h-10 w-full text-left text-sm font-semibold text-gray-800 hover:text-[#1769e0]"
      >
        {product.title}
      </Link>

      <div className="mb-3 flex min-h-12 flex-col justify-end self-start text-left">
        {formattedOriginalPrice && (
          <p className="text-xs text-gray-500 line-through">
            {formattedOriginalPrice}
          </p>
        )}

        <p className="font-bold text-gray-900">{formattedPrice}</p>
      </div>

      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mt-auto flex h-10 w-full items-center justify-center rounded-lg bg-green px-4 py-2 text-sm font-medium text-white hover:bg-green-dark"
      >
        VER DETALHES
      </Link>
    </div>
  );
}

```

## src\components\SearchBar\index.tsx

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { Icon } from "../Icon";
import { InputText } from "../InputText";

interface SearchBarProps {
  className?: string;
  onSearch?: () => void;
}

export function SearchBar({ className = "", onSearch }: SearchBarProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function handleSearch() {
    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(`/produtos?search=${encodeURIComponent(value)}`);

    setSearch("");

    onSearch?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className={className}>
      <InputText
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        className="h-12 w-full min-w-0"
        iconPosition="right"
        placeholder="Buscar produtos, categorias ou artigos"
        icon={
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Pesquisar"
            className="flex items-center justify-center"
          >
            <Icon svg={SearchIcon} />
          </button>
        }
      />
    </div>
  );
}

```

## src\components\Session\index.tsx

```tsx
import React from "react";
import { FiBox } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";

interface SessionProps {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export function Session({ title, children }: SessionProps) {
  return (
    <section className="mx-auto w-full md:max-w-[1200px] bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-md">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBox className="text-white text-xl" />
          <h2 className="text-blue text-lg font-bold">{title}</h2>
        </div>
        <a href="##" className="text-sm font-medium text-navy hover:underline">
          Ver todos
        </a>
      </header>

      {/* Carrossel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <SwiperSlide
              key={uuidv4()}
              id={uuidv4()}
              className="!flex !h-auto !items-stretch"
            >
              {child}
            </SwiperSlide>
          ) : (
            child
          ),
        )}
      </Swiper>
    </section>
  );
}

```

## src\components\SocialBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const socialBanners = [
  {
    eyebrow: "Conecte-se conosco",
    title: "Siga no",
    highlight: " Instagram",
    description:
      "Acompanhe novidades, bastidores e dicas exclusivas diretamente no nosso perfil.",
    image:
      "https://images.unsplash.com/photo-1702390734475-d81dd8ae8fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Feed do Instagram com posts inspiradores",
    href: "https://instagram.com/seuperfil",
    cta: "Visitar Instagram",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-purple-900 via-pink-700 to-red-500",
  },
  {
    eyebrow: "Conteúdo em vídeo",
    title: "Assista no",
    highlight: " YouTube",
    description:
      "Tutoriais, reviews e muito mais para você aprender e se inspirar.",
    image:
      "https://images.unsplash.com/photo-1615883962708-708904fe162e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHx5b3V0dWJlfGVufDB8fDB8fHww",
    imageAlt: "Tela de vídeos no YouTube",
    href: "https://youtube.com/seucanal",
    cta: "Ir para YouTube",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-red-800 via-red-600 to-orange-500",
  },
  {
    eyebrow: "Novidades rápidas",
    title: "Acompanhe no",
    highlight: " Twitter",
    description:
      "Fique por dentro das últimas atualizações e interaja em tempo real.",
    image:
      "https://images.unsplash.com/photo-1631856955350-77f4023dff2b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Timeline do Twitter com posts recentes",
    href: "https://twitter.com/seuperfil",
    cta: "Seguir no Twitter",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-sky-900 via-blue-700 to-cyan-500",
  },
];

export function SocialBanner() {
  return (
    <section
      aria-label="Redes sociais WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="social-banner h-[400px] md:h-[500px]"
      >
        {socialBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.gradient}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              {/* Overlay mais escuro para contraste */}
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 font-bold text-white transition hover:bg-navy"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\contexts\AuthContext.ts

```ts
import { createContext } from "react";
import type { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

```

## src\contexts\AuthProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const USER_STORAGE_KEY = "@worldmix360:user";
const TOKEN_STORAGE_KEY = "@worldmix360:token";

type LoginResponse = {
  token: string;
  user: User;
};

/**
 * Recupera o usuário salvo no navegador.
 */
function getStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

/**
 * Recupera o token salvo no navegador.
 */
function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  /**
   * O estado inicial já é carregado do localStorage.
   *
   * Dessa forma não precisamos de um useEffect para executar
   * setUser() e setToken() depois da montagem do componente.
   */
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Realiza o login.
   */
  const signIn = useCallback(
    async (email: string, password: string): Promise<User> => {
      setIsLoading(true);

      try {
        const response = await fetch(`${apiUrl}/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        let data: Partial<LoginResponse> & {
          message?: string;
          error?: string;
        };

        try {
          data = await response.json();
        } catch {
          throw new Error("Resposta inválida do servidor.");
        }

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Email ou senha inválidos.",
          );
        }

        if (!data.token || !data.user) {
          throw new Error("Resposta de autenticação inválida.");
        }

        /**
         * Persiste a sessão.
         */
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

        /**
         * Atualiza o estado da aplicação.
         */
        setToken(data.token);
        setUser(data.user);

        return data.user;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * Encerra a sessão.
   */
  const signOut = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signOut,
    }),
    [user, token, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

```

## src\contexts\CategoriesContext.ts

```ts
import { createContext } from "react";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  subcategories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type CategoryFormData = {
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type CategoriesContextValue = {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<Category | null>;

  createCategory: (data: CategoryFormData, token: string) => Promise<Category>;

  updateCategory: (
    id: string,
    data: Partial<CategoryFormData>,
    token: string,
  ) => Promise<Category>;

  deleteCategory: (id: string, token: string) => Promise<void>;
};

export const CategoriesContext = createContext<
  CategoriesContextValue | undefined
>(undefined);

```

## src\contexts\CategoriesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { Category, CategoryFormData } from "./CategoriesContext";

import { CategoriesContext } from "./CategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/categories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as categorias.",
        );
      }

      setCategories(Array.isArray(data) ? data : (data.categories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar categorias.",
      );

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback(
    async (id: string): Promise<Category | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/categories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a categoria.",
          );
        }

        return data.category ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createCategory = useCallback(
    async (
      categoryData: CategoryFormData,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) => [...previous, category]);

      return category;
    },
    [],
  );

  const updateCategory = useCallback(
    async (
      id: string,
      categoryData: Partial<CategoryFormData>,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) =>
        previous.map((item) => (item.id === id ? category : item)),
      );

      return category;
    },
    [],
  );

  const deleteCategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir categoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setCategories((previous) =>
        previous.filter((category) => category.id !== id),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

```

## src\contexts\MarketplacesContext.tsx

```tsx
import { createContext } from "react";
export type Marketplace = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  active: boolean;
  sortOrder: number;
  products?: Array<{ id: string; name: string; slug: string }>;
};
export type MarketplaceFormData = {
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplaceUpdateData = {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplacesContextValue = {
  marketplaces: Marketplace[];
  loading: boolean;
  error: string | null;
  fetchMarketplaces: () => Promise<void>;
  getMarketplaceById: (id: string) => Promise<Marketplace | null>;
  createMarketplace: (
    data: MarketplaceFormData,
    token: string,
  ) => Promise<Marketplace>;
  updateMarketplace: (
    id: string,
    data: MarketplaceUpdateData,
    token: string,
  ) => Promise<Marketplace>;
  deleteMarketplace: (id: string, token: string) => Promise<void>;
};
export const MarketplacesContext = createContext<
  MarketplacesContextValue | undefined
>(undefined);

```

## src\contexts\MarketplacesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Marketplace,
  type MarketplaceFormData,
  MarketplacesContext,
  type MarketplaceUpdateData,
} from "./MarketplacesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function MarketplacesProvider({ children }: { children: ReactNode }) {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchMarketplaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/marketplaces`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar os marketplaces.",
        );
      }

      setMarketplaces(Array.isArray(data) ? data : (data.marketplaces ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar marketplaces.",
      );

      setMarketplaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMarketplaceById = useCallback(
    async (id: string): Promise<Marketplace | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/marketplaces/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o marketplace.",
          );
        }

        return data.marketplace ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createMarketplace = useCallback(
    async (
      marketplaceData: MarketplaceFormData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) => [...previous, marketplace]);

      return marketplace;
    },
    [],
  );

  const updateMarketplace = useCallback(
    async (
      id: string,
      marketplaceData: MarketplaceUpdateData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) =>
        previous.map((item) => (item.id === id ? marketplace : item)),
      );

      return marketplace;
    },
    [],
  );

  const deleteMarketplace = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir marketplace.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setMarketplaces((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    }),
    [
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    ],
  );

  return (
    <MarketplacesContext.Provider value={value}>
      {children}
    </MarketplacesContext.Provider>
  );
}

```

## src\contexts\MercadoLivreContext.ts

```ts
import { createContext } from "react";

import type { AffiliateProduct } from "../types/AffiliateProduct";

export type MercadoLivreProduct = AffiliateProduct;

export type MercadoLivreContextValue = {
  products: MercadoLivreProduct[];
  loading: boolean;
  error: string | null;
  search: (term: string) => Promise<void>;
};

export const MercadoLivreContext = createContext<
  MercadoLivreContextValue | undefined
>(undefined);

```

## src\contexts\MercadoLivreProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  MercadoLivreContext,
  type MercadoLivreProduct,
} from "./MercadoLivreContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type ApiProduct = {
  id: string;
  title: string;
  price?: number | string;
  imageUrl?: string | null;
  thumbnail?: string | null;
  pictures?: Array<{
    url: string;
  }>;
  affiliateUrl?: string | null;
  permalink?: string | null;
};

function normalizeProduct(item: ApiProduct): MercadoLivreProduct {
  return {
    id: item.id,
    title: item.title,
    price: Number(item.price ?? 0),
    image:
      item.imageUrl ??
      item.thumbnail ??
      item.pictures?.[0]?.url ??
      "https://http2.mlstatic.com/storage/developers-site-cms-admin/CDN/MLB-592089271-mlb-banner.jpg",
    rating: 4.5,
    marketplace: "mercado-livre",
    affiliateUrl: item.affiliateUrl ?? item.permalink ?? "#",
  };
}

export function MercadoLivreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<MercadoLivreProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/products?search=${encodeURIComponent(term)}`,
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar produtos no Mercado Livre");
      }

      const data = await response.json();

      const mappedProducts = (data.products ?? [])
        .slice(0, 8)
        .map(normalizeProduct);

      setProducts(mappedProducts);
    } catch (requestError) {
      console.error(requestError);
      setError("Não foi possível carregar os produtos no momento.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      search,
    }),
    [products, loading, error, search],
  );

  return (
    <MercadoLivreContext.Provider value={value}>
      {children}
    </MercadoLivreContext.Provider>
  );
}

```

## src\contexts\ProductsContext.ts

```ts
import { createContext } from "react";

export type ProductImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export type ProductImageFormData = {
  imageUrl: string;
  sortOrder?: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;

  description?: string | null;
  shortDescription?: string | null;

  imageUrl: string;

  images?: ProductImage[];

  price: number;
  originalPrice?: number | null;

  currency: string;

  rating?: number | null;
  reviewsCount: number;

  affiliateUrl: string;

  subcategoryId?: string;
  marketplaceId?: string;

  category?: string | null;

  available: boolean;
  featured: boolean;
  active: boolean;

  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type ProductFormData = {
  title: string;
  description?: string;
  shortDescription?: string;

  imageUrl: string;

  images?: ProductImageFormData[];

  price: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl: string;

  subcategoryId: string;
  marketplaceId: string;

  featured?: boolean;
  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductUpdateData = {
  title?: string;
  description?: string;
  shortDescription?: string;

  imageUrl?: string;

  images?: ProductImageFormData[];

  price?: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl?: string;

  subcategoryId?: string;
  marketplaceId?: string;

  featured?: boolean;
  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductStatusData = {
  active?: boolean;
  available?: boolean;
  featured?: boolean;
};

export type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (category?: string, search?: string) => Promise<void>;

  fetchAdminProducts: (
    token: string,
    filters?: {
      search?: string;
      subcategoryId?: string;
      marketplaceId?: string;
      featured?: boolean;
      active?: boolean;
      available?: boolean;
    },
  ) => Promise<void>;

  getProductBySlug: (slug: string) => Promise<Product | null>;

  getProductById: (id: string, token: string) => Promise<Product | null>;

  createProduct: (data: ProductFormData, token: string) => Promise<Product>;

  updateProduct: (
    id: string,
    data: ProductUpdateData,
    token: string,
  ) => Promise<Product>;

  updateProductStatus: (
    id: string,
    data: ProductStatusData,
    token: string,
  ) => Promise<Product>;
};

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

```

## src\contexts\ProductsProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Product,
  type ProductFormData,
  type ProductStatusData,
  ProductsContext,
  type ProductUpdateData,
} from "./ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listagem pública
  const fetchProducts = useCallback(
    async (category?: string, search?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (category) {
          params.set("category", category);
        }

        if (search) {
          params.set("search", search);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products${queryString ? `?${queryString}` : ""}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar produtos.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Listagem administrativa
  const fetchAdminProducts = useCallback(
    async (
      token: string,
      filters?: {
        search?: string;
        subcategoryId?: string;
        marketplaceId?: string;
        featured?: boolean;
        active?: boolean;
        available?: boolean;
      },
    ) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (filters?.search) {
          params.set("search", filters.search);
        }

        if (filters?.subcategoryId) {
          params.set("subcategoryId", filters.subcategoryId);
        }

        if (filters?.marketplaceId) {
          params.set("marketplaceId", filters.marketplaceId);
        }

        if (filters?.featured !== undefined) {
          params.set("featured", String(filters.featured));
        }

        if (filters?.active !== undefined) {
          params.set("active", String(filters.active));
        }

        if (filters?.available !== undefined) {
          params.set("available", String(filters.available));
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products/admin${queryString ? `?${queryString}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os produtos.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Detalhe por slug
  const getProductBySlug = useCallback(
    async (slug: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Não foi possível carregar o produto.");
        }

        return data.product;
      } catch {
        return null;
      }
    },
    [],
  );

  // Detalhe por ID
  const getProductById = useCallback(
    async (id: string, token: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/id/${encodeURIComponent(id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o produto.",
          );
        }

        return data.product ?? null;
      } catch {
        return null;
      }
    },
    [],
  );

  // Criar
  const createProduct = useCallback(
    async (productData: ProductFormData, token: string): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar produto");
      }

      setProducts((prev) => [...prev, data.product]);

      return data.product;
    },
    [],
  );

  // Atualizar
  const updateProduct = useCallback(
    async (
      id: string,
      productData: ProductUpdateData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar produto");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  // Atualizar status
  const updateProductStatus = useCallback(
    async (
      id: string,
      statusData: ProductStatusData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar status");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    }),
    [
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

```

## src\contexts\SubcategoriesContext.tsx

```tsx
import { createContext } from "react";

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;

  category?: {
    id: string;
    name: string;
    slug: string;
  };

  products?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type SubcategoryFormData = {
  categoryId: string;
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoryUpdateData = {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoriesContextValue = {
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;

  fetchSubcategories: () => Promise<void>;
  getSubcategoryById: (id: string) => Promise<Subcategory | null>;

  createSubcategory: (
    data: SubcategoryFormData,
    token: string,
  ) => Promise<Subcategory>;

  updateSubcategory: (
    id: string,
    data: SubcategoryUpdateData,
    token: string,
  ) => Promise<Subcategory>;

  deleteSubcategory: (id: string, token: string) => Promise<void>;
};

export const SubcategoriesContext = createContext<
  SubcategoriesContextValue | undefined
>(undefined);

```

## src\contexts\SubcategoriesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type {
  Subcategory,
  SubcategoryFormData,
  SubcategoryUpdateData,
} from "./SubcategoriesContext";

import { SubcategoriesContext } from "./SubcategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function SubcategoriesProvider({ children }: { children: ReactNode }) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/subcategories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as subcategorias.",
        );
      }

      setSubcategories(Array.isArray(data) ? data : (data.subcategories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar subcategorias.",
      );

      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubcategoryById = useCallback(
    async (id: string): Promise<Subcategory | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/subcategories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a subcategoria.",
          );
        }

        return data.subcategory ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createSubcategory = useCallback(
    async (
      subcategoryData: SubcategoryFormData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) => [...previous, subcategory]);

      return subcategory;
    },
    [],
  );

  const updateSubcategory = useCallback(
    async (
      id: string,
      subcategoryData: SubcategoryUpdateData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) =>
        previous.map((item) => (item.id === id ? subcategory : item)),
      );

      return subcategory;
    },
    [],
  );

  const deleteSubcategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir subcategoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setSubcategories((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    }),
    [
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    ],
  );

  return (
    <SubcategoriesContext.Provider value={value}>
      {children}
    </SubcategoriesContext.Provider>
  );
}

```

## src\contexts\useAuth.ts

```ts
import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}

```

## src\contexts\useCategories.ts

```ts
import { useContext } from "react";

import { CategoriesContext } from "./CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories deve ser utilizado dentro de CategoriesProvider.",
    );
  }

  return context;
}

```

## src\contexts\useMarketplaces.ts

```ts
import { useContext } from "react";
import { MarketplacesContext } from "./MarketplacesContext";
export function useMarketplaces() {
  const context = useContext(MarketplacesContext);
  if (!context) {
    throw new Error(
      "useMarketplaces deve ser utilizado dentro de MarketplacesProvider.",
    );
  }
  return context;
}

```

## src\contexts\useMercadoLivre.ts

```ts
import { useContext } from "react";

import { MercadoLivreContext } from "./MercadoLivreContext";

export function useMercadoLivre() {
  const context = useContext(MercadoLivreContext);

  if (!context) {
    throw new Error(
      "useMercadoLivre deve ser usado dentro de MercadoLivreProvider",
    );
  }

  return context;
}

```

## src\contexts\useProducts.ts

```ts
import { useContext } from "react";

import { ProductsContext } from "./ProductsContext";

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }

  return context;
}

```

## src\contexts\useSubcategories.ts

```ts
import { useContext } from "react";

import { SubcategoriesContext } from "./SubcategoriesContext";

export function useSubcategories() {
  const context = useContext(SubcategoriesContext);

  if (!context) {
    throw new Error(
      "useSubcategories deve ser utilizado dentro de SubcategoriesProvider.",
    );
  }

  return context;
}

```

## src\custon.d.ts

```ts
declare module "*.svg?react" {
  import type * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

```

## src\index.css

@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-navy: #071a2f;
  --color-blue: #1769e0;
  --color-blue-light: #eaf3ff;
  --color-green: #20b35b;
  --color-green-dark: #159447;
  --color-white: #ffffff;
  --color-gray-50: #f7f9fc;
  --color-gray-100: #eef2f6;
  --color-gray-500: #667085;
  --color-gray-700: #344054;
  --color-gray-900: #101828;
  --color-yellow: #f5b700;

  --color-danger: #d92d20;
  --color-danger-light: #d8756d;
}

.home-banner .swiper-button-prev,
.home-banner .swiper-button-next {
  color: #1769e0;
  width: 2.75rem;
  height: 2.75rem;
  filter: drop-shadow(0 0 5px rgb(255 255 255 / 90%))
    drop-shadow(0 0 10px rgb(23 105 224 / 80%));
  transition:
    filter 180ms ease,
    transform 180ms ease;
}

.home-banner .swiper-button-prev:hover,
.home-banner .swiper-button-next:hover {
  filter: drop-shadow(0 0 7px rgb(255 255 255 / 100%))
    drop-shadow(0 0 14px rgb(23 105 224 / 100%));
  transform: scale(1.08);
}

.home-banner .swiper-button-prev::after,
.home-banner .swiper-button-next::after {
  font-size: 1rem;
  font-weight: 700;
}

.home-banner .swiper-pagination-bullet {
  background: #ffffff;
  opacity: 0.55;
}

.home-banner .swiper-pagination-bullet-active {
  background: #20b35b;
  opacity: 1;
}


## src\main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

```

## src\pages\AboutPage.tsx

```tsx
const stats = [
  { value: "12k+", label: "produtos em catálogo" },
  { value: "98%", label: "satisfação de clientes" },
  { value: "24h", label: "tempo médio de resposta" },
  { value: "+200", label: "marcas parceiras" },
];

const values = [
  {
    title: "Confiança",
    description:
      "Priorizamos transparência, qualidade e suporte para que cada compra seja segura e bem informada.",
  },
  {
    title: "Curadoria",
    description:
      "Selecionamos produtos que agregam valor real à rotina das pessoas, com foco em praticidade e desempenho.",
  },
  {
    title: "Inovação",
    description:
      "Usamos tecnologia para simplificar a experiência de compra, compare e escolha de forma inteligente.",
  },
];

export function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-12 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Sobre nós
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            Conectando pessoas com melhores escolhas.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            A WorldMix360 nasceu para tornar as compras mais simples, informadas
            e confiáveis. Acreditamos que a tecnologia pode transformar a
            experiência de compra em algo mais humanizado, inteligente e útil
            para a vida real.
          </p>
        </div>
        <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Grupo de pessoas colaborando em um ambiente de trabalho"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="grid gap-8 rounded-[32px] border border-[#e7edf5] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-2 md:p-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossa história
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Mais do que uma loja: um ecossistema de descoberta.
          </h2>
        </div>

        <div className="space-y-4 text-base leading-7 text-[#52657c]">
          <p>
            Começamos com a ideia de reunir produtos relevantes, marcas
            confiáveis e experiências de compra mais agradáveis em uma só
            plataforma.
          </p>
          <p>
            Hoje, ajudamos milhares de pessoas a encontrar soluções práticas em
            tecnologia, casa, moda, pets, ofertas e produtos digitais, sempre
            com atenção ao valor, qualidade e clareza.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-black text-[#071a2f]">{stat.value}</p>
            <p className="mt-2 text-sm text-[#52657c]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossos valores
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            O que nos move todos os dias
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[26px] border border-[#e7edf5] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ff] text-lg font-bold text-[#0b3d66]">
                {value.title.charAt(0)}
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#071a2f]">
                {value.title}
              </h3>
              <p className="text-sm leading-6 text-[#52657c]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nosso jeito de trabalhar
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Valores presentes em cada escolha
          </h2>
        </div>
        <div className="space-y-5">
          {[
            [
              "Confiança",
              "Transparência em primeiro lugar",
              "Prioridade central",
            ],
            ["Curadoria", "Relevância para a vida real", "Foco constante"],
            ["Inovação", "Tecnologia com propósito", "Evolução contínua"],
          ].map(([label, description, level]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">{label}</span>
                <span className="text-[#52657c]">{description}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: level }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## src\pages\admin\AdminCategoriesFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { CategoryFormData } from "../../contexts/CategoriesContext";
import { useAuth } from "../../contexts/useAuth";
import { useCategories } from "../../contexts/useCategories";

export function AdminCategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getCategoryById, createCategory, updateCategory } = useCategories();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const categoryId = id;

    async function loadCategory() {
      setLoading(true);
      setError(null);

      const category = await getCategoryById(categoryId);

      if (!category) {
        setError("Categoria não encontrada.");
        setLoading(false);
        return;
      }

      setName(category.name);
      setDescription(category.description ?? "");
      setImage(category.image ?? "");
      setActive(category.active);
      setSortOrder(String(category.sortOrder ?? 0));

      setLoading(false);
    }

    void loadCategory();
  }, [id, getCategoryById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome da categoria deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    const data: CategoryFormData = {
      name: name.trim(),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      active,
      sortOrder: parsedSortOrder,
    };

    setSaving(true);

    try {
      if (isEditing && id) {
        await updateCategory(id, data, token);
      } else {
        await createCategory(data, token);
      }

      navigate("/admin/categories", {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível salvar a categoria.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <Link
          to="/admin/categories"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Voltar para categorias
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar categoria" : "Nova categoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize as informações da categoria."
            : "Cadastre uma nova categoria no WorldMix360."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-5 shadow-sm md:p-8"
      >
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Nome
            </label>

            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Tecnologia"
              required
              minLength={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Descrição
            </label>

            <textarea
              id="category-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva brevemente esta categoria."
              rows={4}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              URL da imagem
            </label>

            <input
              id="category-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="Pré-visualização da categoria"
                  className="h-32 w-32 rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category-sort-order"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem de exibição
              </label>

              <input
                id="category-sort-order"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span>
                  <span className="block text-sm font-semibold text-gray-700">
                    Categoria ativa
                  </span>

                  <span className="block text-xs text-gray-500">
                    Permitir que a categoria seja exibida.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/admin/categories"
            className="rounded-lg border border-gray-500 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar categoria"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\admin\AdminProductsFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ProductBasicInfo } from "../../components/admin/products/ProductBasicInfo";
import { ProductFormActions } from "../../components/admin/products/ProductFormActions";
import { ProductGallery } from "../../components/admin/products/ProductGallery";
import { ProductPricing } from "../../components/admin/products/ProductPricing";
import { ProductRelationships } from "../../components/admin/products/ProductRelationships";
import { ProductSeo } from "../../components/admin/products/ProductSeo";
import { ProductStatus } from "../../components/admin/products/ProductStatus";
import type { ProductImageForm } from "../../components/admin/products/types";
import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";
import { useProducts } from "../../contexts/useProducts";
import { useSubcategories } from "../../contexts/useSubcategories";
import { parseCurrencyBRL } from "../../utils/formatCurrency";

export function AdminProductsFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getProductById, createProduct, updateProduct } = useProducts();

  const { subcategories, fetchSubcategories } = useSubcategories();

  const { marketplaces, fetchMarketplaces } = useMarketplaces();

  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [galleryImages, setGalleryImages] = useState<ProductImageForm[]>([]);

  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");

  const [currency, setCurrency] = useState("BRL");

  const [rating, setRating] = useState("");
  const [reviewsCount, setReviewsCount] = useState("0");

  const [affiliateUrl, setAffiliateUrl] = useState("");

  const [subcategoryId, setSubcategoryId] = useState("");
  const [marketplaceId, setMarketplaceId] = useState("");

  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(true);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchSubcategories();
    void fetchMarketplaces();
  }, [fetchSubcategories, fetchMarketplaces]);

  useEffect(() => {
    if (!id || !token) {
      return;
    }

    const productId = id;
    const authToken = token;

    let isMounted = true;

    async function loadProduct() {
      try {
        const product = await getProductById(productId, authToken);

        if (!isMounted) {
          return;
        }

        if (!product) {
          setError("Produto não encontrado.");
          setLoadingData(false);
          return;
        }

        setTitle(product.title ?? "");
        setDescription(product.description ?? "");
        setShortDescription(product.shortDescription ?? "");
        setImageUrl(product.imageUrl ?? "");

        setGalleryImages(
          Array.isArray(product.images)
            ? product.images
                .map((image, index) => ({
                  id: image.id ?? crypto.randomUUID(),
                  imageUrl: image.imageUrl ?? "",
                  sortOrder:
                    typeof image.sortOrder === "number"
                      ? image.sortOrder
                      : index,
                }))
                .sort((a, b) => a.sortOrder - b.sortOrder)
            : [],
        );

        setPrice(
          product.price !== null && product.price !== undefined
            ? Number(product.price).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "",
        );

        setOriginalPrice(
          product.originalPrice !== null && product.originalPrice !== undefined
            ? Number(product.originalPrice).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "",
        );

        setCurrency(product.currency ?? "BRL");

        setRating(
          product.rating !== null && product.rating !== undefined
            ? String(product.rating)
            : "",
        );

        setReviewsCount(String(product.reviewsCount ?? 0));

        setAffiliateUrl(product.affiliateUrl ?? "");

        setSubcategoryId(product.subcategoryId ?? "");
        setMarketplaceId(product.marketplaceId ?? "");

        setFeatured(Boolean(product.featured));
        setAvailable(Boolean(product.available));
        setActive(Boolean(product.active));

        setSeoTitle(product.seoTitle ?? "");
        setSeoDescription(product.seoDescription ?? "");
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar o produto.");
        }
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, token, getProductById]);

  function handleAddGalleryImage() {
    setGalleryImages((currentImages) => [
      ...currentImages,
      {
        id: crypto.randomUUID(),
        imageUrl: "",
        sortOrder: currentImages.length,
      },
    ]);
  }

  function handleGalleryImageChange(id: string, value: string) {
    setGalleryImages((currentImages) =>
      currentImages.map((image) =>
        image.id === id
          ? {
              ...image,
              imageUrl: value,
            }
          : image,
      ),
    );
  }

  function handleRemoveGalleryImage(id: string) {
    setGalleryImages((currentImages) =>
      currentImages
        .filter((image) => image.id !== id)
        .map((image, index) => ({
          ...image,
          sortOrder: index,
        })),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!title.trim()) {
      setError("Informe o título do produto.");
      return;
    }

    if (!imageUrl.trim()) {
      setError("Informe a URL da imagem.");
      return;
    }

    if (!affiliateUrl.trim()) {
      setError("Informe o link de afiliado.");
      return;
    }

    if (!subcategoryId) {
      setError("Selecione uma subcategoria.");
      return;
    }

    if (!marketplaceId) {
      setError("Selecione um marketplace.");
      return;
    }

    const parsedPrice = parseCurrencyBRL(price);

    if (!price.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Informe um preço válido.");
      return;
    }

    let parsedOriginalPrice: number | undefined;

    if (originalPrice.trim()) {
      parsedOriginalPrice = parseCurrencyBRL(originalPrice);

      if (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0) {
        setError("Informe um preço original válido.");
        return;
      }
    }

    let parsedRating: number | undefined;

    if (rating.trim()) {
      parsedRating = Number(rating);

      if (
        !Number.isFinite(parsedRating) ||
        parsedRating < 0 ||
        parsedRating > 5
      ) {
        setError("A avaliação deve estar entre 0 e 5.");
        return;
      }
    }

    const parsedReviewsCount = Number(reviewsCount);

    if (!Number.isInteger(parsedReviewsCount) || parsedReviewsCount < 0) {
      setError("A quantidade de avaliações deve ser um número inteiro.");
      return;
    }

    try {
      new URL(imageUrl.trim());
    } catch {
      setError("Informe uma URL válida para a imagem.");
      return;
    }

    try {
      new URL(affiliateUrl.trim());
    } catch {
      setError("Informe uma URL válida para o link de afiliado.");
      return;
    }

    const cleanGalleryImages = galleryImages
      .map((image) => ({
        imageUrl: image.imageUrl.trim(),
        sortOrder: image.sortOrder,
      }))
      .filter((image) => image.imageUrl);

    for (const image of cleanGalleryImages) {
      try {
        new URL(image.imageUrl);
      } catch {
        setError(
          `Informe uma URL válida para a imagem da galeria na posição ${
            image.sortOrder + 1
          }.`,
        );
        return;
      }
    }

    setLoading(true);

    try {
      const cleanDescription =
        description === "<p></p>" ? undefined : description.trim();

      const productData = {
        title: title.trim(),
        description: cleanDescription,
        shortDescription: shortDescription.trim() || undefined,

        imageUrl: imageUrl.trim(),

        images: cleanGalleryImages,

        price: parsedPrice,
        originalPrice: parsedOriginalPrice,

        currency: currency.trim().toUpperCase() || "BRL",

        rating: parsedRating,
        reviewsCount: parsedReviewsCount,

        affiliateUrl: affiliateUrl.trim(),

        subcategoryId,
        marketplaceId,

        featured,
        available,
        active,

        seoTitle: seoTitle.trim() || undefined,
        seoDescription: seoDescription.trim() || undefined,
      };

      if (isEditing && id) {
        await updateProduct(id, productData, token);
      } else {
        await createProduct(productData, token);
      }

      navigate("/admin/products");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar o produto."
            : "Não foi possível criar o produto.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando produto...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para produtos
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar produto" : "Novo produto"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados do produto."
            : "Cadastre um novo produto no catálogo do WorldMix360."}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <ProductBasicInfo
          title={title}
          description={description}
          shortDescription={shortDescription}
          imageUrl={imageUrl}
          loading={loading}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onShortDescriptionChange={setShortDescription}
          onImageUrlChange={setImageUrl}
        />

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <ProductGallery
            galleryImages={galleryImages}
            loading={loading}
            onAdd={handleAddGalleryImage}
            onChange={handleGalleryImageChange}
            onRemove={handleRemoveGalleryImage}
          />
        </div>

        <ProductPricing
          price={price}
          originalPrice={originalPrice}
          currency={currency}
          rating={rating}
          reviewsCount={reviewsCount}
          loading={loading}
          onPriceChange={setPrice}
          onOriginalPriceChange={setOriginalPrice}
          onCurrencyChange={setCurrency}
          onRatingChange={setRating}
          onReviewsCountChange={setReviewsCount}
        />

        <ProductRelationships
          subcategories={subcategories}
          marketplaces={marketplaces}
          subcategoryId={subcategoryId}
          marketplaceId={marketplaceId}
          affiliateUrl={affiliateUrl}
          loading={loading}
          onSubcategoryChange={setSubcategoryId}
          onMarketplaceChange={setMarketplaceId}
          onAffiliateUrlChange={setAffiliateUrl}
        />

        <ProductStatus
          featured={featured}
          available={available}
          active={active}
          loading={loading}
          onFeaturedChange={setFeatured}
          onAvailableChange={setAvailable}
          onActiveChange={setActive}
        />

        <ProductSeo
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          loading={loading}
          onSeoTitleChange={setSeoTitle}
          onSeoDescriptionChange={setSeoDescription}
        />

        <ProductFormActions loading={loading} isEditing={isEditing} />
      </form>
    </section>
  );
}

```

## src\pages\AdminCategoriesPage.tsx

```tsx
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
                              WM360
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

```

## src\pages\AdminDashboarPage.tsx

```tsx
// src/pages/admin/AdminDashboardPage.tsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";
import { useMarketplaces } from "../contexts/useMarketplaces";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export default function AdminDashboardPage() {
  const { token } = useAuth();

  const {
    products,
    fetchAdminProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    subcategories,
    fetchSubcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useSubcategories();

  const {
    marketplaces,
    fetchMarketplaces,
    loading: marketplacesLoading,
    error: marketplacesError,
  } = useMarketplaces();

  /**
   * Carrega os dados necessários para o Dashboard.
   *
   * Produtos administrativos precisam do token.
   * Categorias, subcategorias e marketplaces possuem
   * endpoints públicos de leitura.
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    void Promise.all([
      fetchAdminProducts(token),
      fetchCategories(),
      fetchSubcategories(),
      fetchMarketplaces(),
    ]);
  }, [
    token,
    fetchAdminProducts,
    fetchCategories,
    fetchSubcategories,
    fetchMarketplaces,
  ]);

  // ================================
  // Estatísticas de produtos
  // ================================

  const totalProducts = products.length;

  const activeProducts = products.filter((product) => product.active).length;

  const availableProducts = products.filter(
    (product) => product.available,
  ).length;

  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  // ================================
  // Estatísticas de categorias
  // ================================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.active,
  ).length;

  // ================================
  // Estatísticas de subcategorias
  // ================================

  const totalSubcategories = subcategories.length;

  const activeSubcategories = subcategories.filter(
    (subcategory) => subcategory.active,
  ).length;

  // ================================
  // Estatísticas de marketplaces
  // ================================

  const totalMarketplaces = marketplaces.length;

  const activeMarketplaces = marketplaces.filter(
    (marketplace) => marketplace.active,
  ).length;

  const isLoading =
    productsLoading ||
    categoriesLoading ||
    subcategoriesLoading ||
    marketplacesLoading;

  const errors = [
    productsError,
    categoriesError,
    subcategoriesError,
    marketplacesError,
  ].filter(Boolean);

  return (
    <section className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* ========================================
          CABEÇALHO
      ======================================== */}

      <header className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue">WorldMix360</p>

            <h1 className="text-2xl font-bold text-navy sm:text-3xl">
              Dashboard Administrativo
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Visão geral do catálogo e das principais áreas do sistema.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue/90"
            >
              + Novo produto
            </Link>

            <Link
              to="/admin/categories/new"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              + Nova categoria
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================
          CARREGAMENTO
      ======================================== */}

      {isLoading && (
        <div className="mb-6 rounded-xl border border-blue-light bg-blue-light px-5 py-4">
          <p className="text-sm font-medium text-blue">
            Atualizando informações do painel...
          </p>
        </div>
      )}

      {/* ========================================
          ERROS
      ======================================== */}

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="font-semibold text-red-700">
            Algumas informações não puderam ser carregadas.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Verifique a conexão com a API e tente novamente.
          </p>
        </div>
      )}

      {/* ========================================
          CARDS PRINCIPAIS
      ======================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Produtos */}

        <Link
          to="/admin/products"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Produtos</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📦
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeProducts} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Categorias */}

        <Link
          to="/admin/categories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Categorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalCategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🗂️
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeCategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Subcategorias */}

        <Link
          to="/admin/subcategories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Subcategorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalSubcategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📁
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeSubcategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Marketplaces */}

        <Link
          to="/admin/marketplaces"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Marketplaces</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalMarketplaces}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🛒
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeMarketplaces} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>
      </div>

      {/* ========================================
          RESUMO DO CATÁLOGO
      ======================================== */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Resumo dos produtos */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy">
                Resumo dos produtos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Situação atual do catálogo de produtos.
              </p>
            </div>

            <Link
              to="/admin/products"
              className="text-sm font-semibold text-blue hover:underline"
            >
              Ver produtos
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Total</p>

              <p className="mt-1 text-2xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Ativos</p>

              <p className="mt-1 text-2xl font-bold text-green">
                {activeProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Disponíveis</p>

              <p className="mt-1 text-2xl font-bold text-blue">
                {availableProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Destaques</p>

              <p className="mt-1 text-2xl font-bold text-yellow">
                {featuredProducts}
              </p>
            </div>
          </div>
        </section>

        {/* Resumo do catálogo */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-navy">
              Estrutura do catálogo
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Organização atual das categorias e canais de venda.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/admin/categories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🗂️
                </span>

                <div>
                  <p className="font-semibold text-navy">Categorias</p>

                  <p className="text-xs text-gray-500">
                    {activeCategories} ativas de {totalCategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/subcategories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  📁
                </span>

                <div>
                  <p className="font-semibold text-navy">Subcategorias</p>

                  <p className="text-xs text-gray-500">
                    {activeSubcategories} ativas de {totalSubcategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/marketplaces"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🛒
                </span>

                <div>
                  <p className="font-semibold text-navy">Marketplaces</p>

                  <p className="text-xs text-gray-500">
                    {activeMarketplaces} ativos de {totalMarketplaces}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ========================================
          AÇÕES RÁPIDAS
      ======================================== */}

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-navy">Ações rápidas</h2>

          <p className="mt-1 text-sm text-gray-500">
            Acesse rapidamente as principais áreas de gerenciamento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/products/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📦</span>

            <p className="mt-2 font-semibold text-navy">Cadastrar produto</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um novo produto ao catálogo.
            </p>
          </Link>

          <Link
            to="/admin/categories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🗂️</span>

            <p className="mt-2 font-semibold text-navy">Nova categoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Criar uma nova categoria.
            </p>
          </Link>

          <Link
            to="/admin/subcategories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📁</span>

            <p className="mt-2 font-semibold text-navy">Nova subcategoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Organizar melhor o catálogo.
            </p>
          </Link>

          <Link
            to="/admin/marketplaces/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🛒</span>

            <p className="mt-2 font-semibold text-navy">Novo marketplace</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um canal de venda.
            </p>
          </Link>
        </div>
      </section>
    </section>
  );
}

```

## src\pages\AdminMarketplaceFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useMarketplaces } from "../contexts/useMarketplaces";

export function AdminMarketplaceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getMarketplaceById, createMarketplace, updateMarketplace } =
    useMarketplaces();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const marketplaceId = id;
    let isMounted = true;

    async function loadMarketplace() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }

      try {
        const marketplace = await getMarketplaceById(marketplaceId);

        if (!isMounted) {
          return;
        }

        if (!marketplace) {
          setError("Marketplace não encontrado.");
          return;
        }

        setName(marketplace.name);
        setDescription(marketplace.description ?? "");
        setWebsiteUrl(marketplace.websiteUrl ?? "");
        setLogoUrl(marketplace.logoUrl ?? "");
        setSortOrder(String(marketplace.sortOrder ?? 0));
        setActive(marketplace.active);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Não foi possível carregar o marketplace.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    void loadMarketplace();

    return () => {
      isMounted = false;
    };
  }, [id, getMarketplaceById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome do marketplace.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome do marketplace deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    if (websiteUrl.trim()) {
      try {
        new URL(websiteUrl.trim());
      } catch {
        setError("Informe uma URL válida para o website.");
        return;
      }
    }

    if (logoUrl.trim()) {
      try {
        new URL(logoUrl.trim());
      } catch {
        setError("Informe uma URL válida para o logo.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateMarketplace(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createMarketplace(
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/marketplaces");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar o marketplace."
            : "Não foi possível criar o marketplace.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando marketplace...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/marketplaces"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para marketplaces
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar marketplace" : "Novo marketplace"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados do marketplace."
            : "Cadastre um novo marketplace para o WorldMix360."}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Mercado Livre"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                O slug será gerado automaticamente pela API.
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente o marketplace..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="websiteUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Website
              </label>

              <input
                id="websiteUrl"
                type="url"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                placeholder="https://www.exemplo.com.br"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe a URL oficial do marketplace.
              </p>
            </div>

            {/* Logo */}
            <div>
              <label
                htmlFor="logoUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Logo
              </label>

              <input
                id="logoUrl"
                type="url"
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                placeholder="https://exemplo.com/logo.png"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para o logo.
              </p>

              {logoUrl.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <img
                      src={logoUrl}
                      alt="Pré-visualização do logo"
                      className="max-h-full max-w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ordem */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem
              </label>

              <input
                id="sortOrder"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use números menores para exibir primeiro.
              </p>
            </div>

            {/* Ativo */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Marketplace ativo
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Marketplaces inativos não devem aparecer em áreas públicas do
                  catálogo.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={loading}
                onClick={() => setActive((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  active ? "bg-blue-600" : "bg-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/marketplaces"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar marketplace"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\AdminMarketplacesPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useMarketplaces } from "../contexts/useMarketplaces";

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

```

## src\pages\AdminProductsPage.tsx

```tsx
// src/pages/admin/AdminProductsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useProducts } from "../contexts/useProducts";

export function AdminProductsPage() {
  const { products, fetchAdminProducts, updateProductStatus, loading, error } =
    useProducts();

  const { token } = useAuth();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchAdminProducts(token);
  }, [token, fetchAdminProducts]);

  async function handleStatusChange(
    id: string,
    status: {
      active?: boolean;
      available?: boolean;
      featured?: boolean;
    },
  ) {
    if (!token) {
      return;
    }

    try {
      setUpdatingId(id);

      await updateProductStatus(id, status, token);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o status do produto.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p className="p-6">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="p-6">Erro: {error}</p>;
  }

  return (
    <section className="p-6">
      <header className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Painel Administrativo - Produtos</h1>

        <Link
          to="/admin/products/new"
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-navy transition whitespace-nowrap"
        >
          + Cadastrar Produto
        </Link>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-3 py-2 text-left">Produto</th>

              <th className="border-b px-3 py-2 text-left">Preço</th>

              <th className="border-b px-3 py-2 text-center">Disponível</th>

              <th className="border-b px-3 py-2 text-center">Ativo</th>

              <th className="border-b px-3 py-2 text-center">Destaque</th>

              <th className="border-b px-3 py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const isUpdating = updatingId === p.id;

              return (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          Sem imagem
                        </div>
                      )}

                      <div>
                        <p className="font-semibold">{p.title}</p>

                        <p className="text-xs text-gray-500">/{p.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: p.currency,
                    })}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.available}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          available: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar disponibilidade de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.active}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          active: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar status ativo de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.featured}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          featured: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar destaque de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="text-sm font-semibold text-blue hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Nenhum produto encontrado.
        </div>
      )}
    </section>
  );
}

```

## src\pages\AdminSubcategoriesPage.tsx

```tsx
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

```

## src\pages\AdminSubcategoryFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";
import { useSubcategories } from "../contexts/useSubcategories";

export function AdminSubcategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { categories, fetchCategories } = useCategories();

  const { getSubcategoryById, createSubcategory, updateSubcategory } =
    useSubcategories();

  const isEditing = Boolean(id);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const subcategoryId = id;
    let isMounted = true;
    async function loadSubcategory() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }
      try {
        const subcategory = await getSubcategoryById(subcategoryId);
        if (!isMounted) {
          return;
        }
        if (!subcategory) {
          setError("Subcategoria não encontrada.");
          return;
        }
        setCategoryId(subcategory.categoryId);
        setName(subcategory.name);
        setDescription(subcategory.description ?? "");
        setImage(subcategory.image ?? "");
        setSortOrder(String(subcategory.sortOrder ?? 0));
        setActive(subcategory.active);
      } catch {
        if (!isMounted) {
          return;
        }
        setError("Não foi possível carregar a subcategoria.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }
    void loadSubcategory();
    return () => {
      isMounted = false;
    };
  }, [id, getSubcategoryById]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!isEditing && !categoryId) {
      setError("Selecione uma categoria.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome da subcategoria.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateSubcategory(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createSubcategory(
          {
            categoryId,
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/subcategories");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar a subcategoria."
            : "Não foi possível criar a subcategoria.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando subcategoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/subcategories"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para subcategorias
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar subcategoria" : "Nova subcategoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados da subcategoria."
            : "Cadastre uma nova subcategoria para o WorldMix360."}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            {/* Categoria */}
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Categoria *
              </label>

              <select
                id="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                disabled={isEditing || loading}
                required={!isEditing}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">Selecione uma categoria</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {isEditing && (
                <p className="mt-2 text-xs text-gray-500">
                  A categoria não pode ser alterada durante a edição.
                </p>
              )}
            </div>

            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Smartphones"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                O slug será gerado automaticamente pela API.
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente esta subcategoria..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Imagem */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Imagem
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para a imagem.
              </p>

              {image.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <img
                    src={image}
                    alt="Pré-visualização"
                    className="h-24 w-24 rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Ordem */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem
              </label>

              <input
                id="sortOrder"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use números menores para exibir primeiro.
              </p>
            </div>

            {/* Ativa */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Subcategoria ativa
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Subcategorias inativas não devem aparecer no catálogo público.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={loading}
                onClick={() => setActive((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  active ? "bg-blue-600" : "bg-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/subcategories"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar subcategoria"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\BlogPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function BlogPage() {
  return (
    <CategoryPage
      title="Blog"
      summary="Conteúdos úteis para ajudar você a comprar melhor e descobrir novas tendências."
      image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Caderno, café e notebook em uma mesa de trabalho"
      highlights={[
        {
          title: "Dicas de consumo",
          description: "Informação para comprar com mais consciência.",
          image:
            "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Caderno com anotações e caneta",
        },
        {
          title: "Guias de compras",
          description: "Critérios práticos para encontrar o produto certo.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa pesquisando em um notebook",
        },
        {
          title: "Tendências e novidades",
          description: "O que está mudando no mundo dos produtos e serviços.",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook em uma mesa de trabalho",
        },
        {
          title: "Conteúdo confiável",
          description: "Leituras úteis, diretas e feitas para ajudar você.",
          image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa lendo notícias em um jornal",
        },
      ]}
    />
  );
}

```

## src\pages\CategoriesPage.tsx

```tsx
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function CategoryPage() {
  const { slug } = useParams();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
    fetchSubcategories,
  } = useSubcategories();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    void fetchCategories();
    void fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  const category = useMemo(() => {
    if (!slug) return null;

    return (
      categories.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase(),
      ) ?? null
    );
  }, [categories, slug]);

  useEffect(() => {
    if (!category) return;

    void fetchProducts(category.slug);
  }, [category, fetchProducts]);

  const categorySubcategories = useMemo(() => {
    if (!category) return [];

    return subcategories
      .filter(
        (subcategory) =>
          subcategory.categoryId === category.id && subcategory.active,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [category, subcategories]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    return products.filter((product) => product.active && product.available);
  }, [category, products]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError ?? subcategoriesError ?? productsError ?? null;

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#52657c]">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Não foi possível carregar a categoria
          </h1>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#071a2f]">
            Categoria não encontrada
          </h1>

          <p className="mt-2 text-sm text-[#52657c]">
            A categoria que você está procurando não existe ou não está
            disponível.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      {/* Hero da categoria */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-[#e7edf5] bg-white shadow-sm">
        <div className="grid min-h-[260px] md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1769e0]">
              Categoria
            </p>

            <h1 className="text-3xl font-bold text-[#071a2f] md:text-4xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657c]">
                {category.description}
              </p>
            )}
          </div>

          {category.image && (
            <div className="min-h-[220px] bg-[#f8fafc]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Subcategorias */}
      {categorySubcategories.length > 0 && (
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#071a2f]">Subcategorias</h2>

            <p className="mt-1 text-sm text-[#52657c]">
              Explore os produtos por subcategoria.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorySubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/categoria/${encodeURIComponent(
                  category.slug,
                )}/${encodeURIComponent(subcategory.slug)}`}
                className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                  {subcategory.name}
                </h3>

                {subcategory.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52657c]">
                    {subcategory.description}
                  </p>
                )}

                <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                  Ver subcategoria →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produtos da categoria */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Produtos de {category.name}
          </h2>

          <p className="mt-1 text-sm text-[#52657c]">
            {categoryProducts.length > 0
              ? `${categoryProducts.length} ${
                  categoryProducts.length === 1
                    ? "produto encontrado"
                    : "produtos encontrados"
                }`
              : "Nenhum produto disponível nesta categoria no momento."}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-[#071a2f]">
              Nenhum produto disponível
            </h3>

            <p className="mt-2 text-sm text-[#52657c]">
              Ainda não existem produtos ativos e disponíveis nesta categoria.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

```

## src\pages\ContactPage.tsx

```tsx
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
          Fale com a WorldMix360
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#52657c]">
          Estamos prontos para ajudar com dúvidas, suporte, parceiros e
          oportunidades de negócio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:items-start">
        <aside className="rounded-[28px] bg-[#071a2f] p-8 text-white shadow-[0_24px_60px_rgba(7,26,47,0.16)]">
          <div className="mb-6 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="Equipe reunida para atender e conversar com clientes"
              className="h-44 w-full object-cover"
            />
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">
              Atendimento
            </p>
            <h2 className="mt-2 text-2xl font-bold">Fale conosco</h2>
          </div>

          <div className="space-y-5 text-sm text-white/80">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaPhoneAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>(11) 4002-8922</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <MdEmail className="mt-1 text-base text-[#7dd3fc]" />
              <span>contato@worldmix360.com.br</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaMapMarkerAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>Av. Paulista, 1500 - Bela Vista, São Paulo - SP</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaInstagram className="mt-1 text-base text-[#7dd3fc]" />
              <span>@worldmix360</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1e3553] bg-[#0d1f37] p-4">
            <p className="text-sm font-medium text-[#dfe9f6]">
              Tempo médio de resposta
            </p>
            <p className="mt-1 text-2xl font-bold text-white">24 horas</p>
          </div>
        </aside>

        <form className="rounded-[28px] border border-[#dfe7f3] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Envie uma mensagem
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#071a2f]">
              Solicite atendimento
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              Nome
              <input
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              E-mail
              <input
                type="email"
                placeholder="seu@email.com"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Assunto
            <input
              type="text"
              placeholder="Qual o motivo do contato?"
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Mensagem
            <textarea
              rows={6}
              placeholder="Escreva sua mensagem..."
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#edf2f7] pt-5 md:flex-row md:items-center">
            <p className="text-xs text-[#52657c]">
              Respeitamos sua privacidade e respondemos em até 24 horas.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#0b3d66] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#072b49]"
            >
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Atendimento em etapas
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Do primeiro contato à solução
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Você envia",
              "Conte o que precisa de forma rápida e objetiva.",
            ],
            [
              "02",
              "Nós analisamos",
              "Entendemos sua solicitação e buscamos o melhor caminho.",
            ],
            ["03", "Você recebe", "Respondemos com clareza e próximos passos."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="relative rounded-2xl border border-[#dfe7f3] bg-white p-5"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dfeeff] text-xs font-bold text-[#0b3d66]">
                {number}
              </span>
              <h3 className="mb-2 font-bold text-[#071a2f]">{title}</h3>
              <p className="text-sm leading-6 text-[#52657c]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## src\pages\ContentPages.tsx

```tsx
import { Link } from "react-router-dom";

type Section = {
  title: string;
  content: string;
};

type CategoryPageProps = {
  title: string;
  summary: string;
  highlights: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  image: string;
  imageAlt: string;
};

export function CategoryPage({
  title,
  summary,
  highlights,
  image,
  imageAlt,
}: CategoryPageProps) {
  const categorySlug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Categoria
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {summary}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/10 to-transparent" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[24px] border border-[#e7edf5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
          >
            <Link
              to={`/${categorySlug}/${item.title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/&/g, "e")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="block h-full"
            >
              <div className="h-40 overflow-hidden bg-[#edf5ff]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="mb-2 text-lg font-semibold text-[#071a2f]">
                  {item.title}
                </p>
                <p className="text-sm leading-6 text-[#52657c]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#0b3d66]">
                  Explorar seleção →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

type InfoPageProps = {
  title: string;
  intro: string;
  sections: Section[];
  image: string;
  imageAlt: string;
  visualTitle: string;
  visualItems: {
    label: string;
    value: string;
    level: number;
  }[];
};

export function InfoPage({
  title,
  intro,
  sections,
  image,
  imageAlt,
  visualTitle,
  visualItems,
}: InfoPageProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Institucional
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {intro}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="mb-10 grid gap-6 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Visão geral
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">{visualTitle}</h2>
        </div>
        <div className="space-y-5">
          {visualItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">
                  {item.label}
                </span>
                <span className="text-[#52657c]">{item.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-sm"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#071a2f]">
              {section.title}
            </h2>
            <p className="text-base leading-7 text-[#52657c]">
              {section.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

```

## src\pages\DigitalProductsPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function DigitalProductsPage() {
  return (
    <CategoryPage
      title="Produtos Digitais"
      summary="Ferramentas digitais para produtividade, entretenimento e inovação."
      image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Estação de trabalho com computador e ferramentas digitais"
      highlights={[
        {
          title: "Cursos e conteúdos",
          description: "Aprenda no seu ritmo e amplie suas possibilidades.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa estudando em um notebook",
        },
        {
          title: "Software e utilitários",
          description:
            "Ferramentas digitais para resolver mais com menos esforço.",
          image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Código em uma tela de computador",
        },
        {
          title: "Produtividade",
          description: "Organize ideias, projetos e tarefas em um só lugar.",
          image:
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Mesa de trabalho organizada",
        },
        {
          title: "Entretenimento digital",
          description: "Novas experiências para relaxar e se divertir.",
          image:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Controle de videogame e televisão",
        },
      ]}
    />
  );
}

```

## src\pages\FashionPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function FashionPage() {
  return (
    <CategoryPage
      title="Moda"
      summary="Estilo, conforto e tendências em escolhas práticas para todas as ocasiões."
      image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Araras com roupas em uma loja de moda"
      highlights={[
        {
          title: "Roupas e calçados",
          description: "Peças para expressar seu estilo com conforto.",
          image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Roupas organizadas em uma arara",
        },
        {
          title: "Acessórios",
          description: "Os detalhes que dão personalidade a cada produção.",
          image:
            "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Acessórios de moda",
        },
        {
          title: "Casual e elegante",
          description: "Combinações versáteis para todos os seus planos.",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa escolhendo roupas em uma loja",
        },
        {
          title: "Estilo diário",
          description: "Inspirações práticas para vestir sua melhor versão.",
          image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Look casual de moda",
        },
      ]}
    />
  );
}

```

## src\pages\HomePage.tsx

```tsx
import { useEffect } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
  FiHeart,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTool,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { Banner } from "../components/Banner";
import { BlogBanner } from "../components/BlogBanner";

import { ProductCard } from "../components/ProductCard";
import { Session } from "../components/Session";
import { SocialBanner } from "../components/SocialBanner";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";

export function HomePage() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const activeCategories = categories
    .filter((category) => category.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categoryIcons = {
    tecnologia: FiGrid,
    "casa-utilidades": FiTool,
    moda: FiShoppingBag,
    pets: FiHeart,
    "produtos-digitais": FiGrid,
  };

  return (
    <>
      <Banner />

      {(error || categoriesError) && (
        <div className="mx-auto max-w-[1200px] px-6 pb-2 pt-4 text-sm text-red-600">
          {error ?? categoriesError}
        </div>
      )}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Explore por interesse
            </p>

            <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
              Encontre o que combina com você
            </h2>
          </div>

          <Link
            to="/ofertas"
            className="hidden items-center gap-1 text-sm font-semibold text-[#0b3d66] transition hover:text-[#1769e0] sm:flex"
          >
            Ver ofertas <FiArrowUpRight />
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              "category-skeleton-1",
              "category-skeleton-2",
              "category-skeleton-3",
              "category-skeleton-4",
              "category-skeleton-5",
              "category-skeleton-6",
              "category-skeleton-7",
            ].map((skeletonKey) => (
              <div
                key={skeletonKey}
                className="aspect-square animate-pulse rounded-2xl border border-[#e7edf5] bg-[#f7f9fc]"
              />
            ))}
          </div>
        ) : activeCategories.length === 0 ? (
          <div className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center text-sm text-[#52657c]">
            Nenhuma categoria disponível no momento.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {activeCategories.map((category) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons] ??
                FiGrid;

              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="group flex aspect-square flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#e7edf5] bg-white text-center shadow-sm transition hover:-translate-y-1 hover:border-[#b9d6f4] hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                >
                  <span className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#edf5ff] text-[#1769e0] transition group-hover:scale-110 group-hover:bg-[#1769e0] group-hover:text-white md:h-30 md:w-full">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="text-3xl md:text-4xl" />
                    )}
                  </span>

                  <span className="text-sm font-semibold leading-5 text-[#071a2f] my-5">
                    {category.name}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/blog"
              className="group flex aspect-square flex-col items-center justify-between rounded-2xl border border-[#1769e0] bg-gradient-to-br from-[#071a2f] to-[#1769e0] p-4 text-center text-white shadow-[0_14px_30px_rgba(23,105,224,0.25)] transition hover:-translate-y-1"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl text-[#9ad7ff] transition group-hover:scale-110 md:h-20 md:w-20 md:text-4xl">
                <FiBookOpen />
              </span>

              <span className="text-sm font-semibold leading-5 text-white">
                Blog
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ad7ff]">
                Conteúdos
              </span>
            </Link>
          </div>
        )}
      </section>

      <Session title="Ofertas em destaque">
        {loading ? (
          <p className="px-6 text-sm text-[#52657c]">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="px-6 text-sm text-[#52657c]">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Session>

      <BlogBanner />

      <Session title="Produtos mais vendidos">
        {products.map((product) => (
          <ProductCard key={`${product.id}-secondary`} product={product} />
        ))}
      </Session>

      <SocialBanner />

      <section className="mx-auto grid max-w-[1200px] gap-4 px-6 py-10 md:grid-cols-4 md:py-14">
        {[
          [
            FiSearch,
            "Pesquisa fácil",
            "Encontre ideias em diferentes categorias.",
          ],
          [
            FiShield,
            "Escolhas claras",
            "Veja informações antes de acessar a oferta.",
          ],
          [
            FiStar,
            "Curadoria",
            "Descubra produtos selecionados para sua rotina.",
          ],
          [
            FiCheckCircle,
            "Parceiros confiáveis",
            "A compra acontece diretamente no marketplace.",
          ],
        ].map(([Icon, title, description]) => (
          <div
            key={title as string}
            className="flex gap-3 rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-[#159447]">
              <Icon />
            </span>

            <div>
              <h3 className="font-semibold text-[#071a2f]">
                {title as string}
              </h3>

              <p className="mt-1 text-sm leading-5 text-[#52657c]">
                {description as string}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

```

## src\pages\HomeUtilitiesPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function HomeUtilitiesPage() {
  return (
    <CategoryPage
      title="Casa & Utilidades"
      summary="Itens para organização, conforto e praticidade em todos os momentos da sua rotina."
      image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cozinha organizada e iluminada"
      highlights={[
        {
          title: "Organização doméstica",
          description: "Soluções para aproveitar cada espaço com leveza.",
          image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Ambiente doméstico organizado",
        },
        {
          title: "Decoração",
          description: "Detalhes que deixam a casa mais bonita e acolhedora.",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sala com decoração contemporânea",
        },
        {
          title: "Utilidades essenciais",
          description:
            "Itens práticos para resolver o dia a dia com facilidade.",
          image:
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Utensílios em uma cozinha",
        },
        {
          title: "Conforto para a rotina",
          description:
            "Escolhas simples para tornar seus momentos mais agradáveis.",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Quarto confortável e iluminado",
        },
      ]}
    />
  );
}

```

## src\pages\HowItWorksPage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function HowItWorksPage() {
  return (
    <InfoPage
      title="Como funciona"
      intro="A WorldMix360 ajuda você a escolher com mais segurança, rapidez e clareza."
      image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Equipe analisando informações em uma reunião"
      visualTitle="Uma jornada simples para decidir melhor"
      visualItems={[
        { label: "Descoberta", value: "Encontre", level: 35 },
        { label: "Comparação", value: "Avalie", level: 68 },
        { label: "Escolha", value: "Decida", level: 100 },
      ]}
      sections={[
        {
          title: "Pesquisa inteligente",
          content:
            "A plataforma reúne produtos e comparações para facilitar sua decisão.",
        },
        {
          title: "Curadoria humana",
          content:
            "Selecionamos marcas e itens com foco em qualidade, utilidade e valor.",
        },
        {
          title: "Atendimento confiável",
          content:
            "Nossa equipe responde com clareza e oferece suporte em cada etapa.",
        },
      ]}
    />
  );
}

```

## src\pages\LoginPage.tsx

```tsx
// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth(); // agora pegamos também o user

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const loggedUser = await signIn(email, password);

      if (loggedUser?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível realizar o login.",
      );
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Entrar</h1>
          <p className="mt-2 text-sm text-gray-500">
            Acesse sua conta WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#1769e0] px-5 py-3 font-bold text-white transition hover:bg-[#0f56bd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </section>
  );
}

```

## src\pages\OffersPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function OffersPage() {
  return (
    <CategoryPage
      title="Ofertas"
      summary="Confira oportunidades selecionadas com bom custo-benefício e qualidade em destaque."
      image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Sacolas de compras representando uma experiência de varejo"
      highlights={[
        {
          title: "Promoções selecionadas",
          description: "Oportunidades que merecem entrar no seu radar.",
          image:
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sacolas de compras em uma loja",
        },
        {
          title: "Economia inteligente",
          description: "Compare antes de comprar e faça escolhas melhores.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa fazendo uma compra online",
        },
        {
          title: "Produtos em alta",
          description: "Descubra o que está chamando a atenção agora.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa segurando uma sacola de compras",
        },
        {
          title: "Valores competitivos",
          description: "Boas oportunidades para aproveitar com confiança.",
          image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Interior de uma loja com produtos",
        },
      ]}
    />
  );
}

```

## src\pages\PetsPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function PetsPage() {
  return (
    <CategoryPage
      title="Pets"
      summary="Produtos pensados para o bem-estar, a saúde e a diversão dos seus animais."
      image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cachorro e gato juntos em um ambiente doméstico"
      highlights={[
        {
          title: "Cuidados e higiene",
          description: "Bem-estar e carinho em todos os detalhes.",
          image:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro recebendo cuidados",
        },
        {
          title: "Brinquedos e diversão",
          description: "Mais estímulo, alegria e momentos juntos.",
          image:
            "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro brincando ao ar livre",
        },
        {
          title: "Acessórios para pets",
          description: "Conforto e praticidade para cada passeio.",
          image:
            "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro usando acessório",
        },
        {
          title: "Rotina pet",
          description: "Tudo para deixar o dia do seu companheiro melhor.",
          image:
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorros juntos em um parque",
        },
      ]}
    />
  );
}

```

## src\pages\PrivacyPolicyPage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Política de privacidade"
      intro="Seus dados são tratados com responsabilidade, transparência e segurança."
      image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa usando um notebook para acessar uma conta protegida"
      visualTitle="Como cuidamos das suas informações"
      visualItems={[
        { label: "Transparência", value: "Clareza", level: 100 },
        { label: "Necessidade", value: "Minimização", level: 72 },
        { label: "Proteção", value: "Boas práticas", level: 88 },
      ]}
      sections={[
        {
          title: "Coleta de dados",
          content:
            "Coletamos apenas informações necessárias para atender sua navegação, comunicação e pedidos.",
        },
        {
          title: "Uso dos dados",
          content:
            "Usamos dados para melhorar sua experiência, oferecer suporte e enviar comunicações relevantes.",
        },
        {
          title: "Segurança e seus direitos",
          content:
            "Aplicamos boas práticas para proteger informações sensíveis e respeitamos seus direitos previstos na legislação aplicável.",
        },
      ]}
    />
  );
}

```

## src\pages\ProductPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductBreadcrumb } from "../components/product/ProductBreadcrumb";
import { ProductDescription } from "../components/product/ProductDescription";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import type { Product } from "../contexts/ProductsContext";
import { useProducts } from "../contexts/useProducts";

export function ProductPage() {
  const { slug } = useParams();

  const { getProductBySlug } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!slug) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await getProductBySlug(slug);

        if (!cancelled) {
          setProduct(data);
        }
      } catch {
        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug, getProductBySlug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-sm text-[#52657c]">Carregando produto...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          Produto não encontrado
        </h1>

        <p className="mt-3 text-[#52657c]">
          Esse produto pode ter sido atualizado ou removido do catálogo.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white transition hover:bg-[#0f58c7]"
        >
          Voltar para a página inicial
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <ProductBreadcrumb />

      <div className="grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:grid-cols-[0.9fr_1.1fr]">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>

      <ProductDescription product={product} />
    </section>
  );
}

```

## src\pages\ProductsPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type SearchCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
};

type SearchSubcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
};

type SearchResponse = {
  query: string;
  products: Product[];
  categories: SearchCategory[];
  subcategories: SearchSubcategory[];
};

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [subcategories, setSubcategories] = useState<SearchSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSearchResults() {
      setLoading(true);
      setError(null);

      try {
        if (!search) {
          const response = await fetch(`${apiUrl}/products`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ?? "Não foi possível carregar os produtos.",
            );
          }

          if (!cancelled) {
            setProducts(data.products ?? []);
            setCategories([]);
            setSubcategories([]);
          }

          return;
        }

        const response = await fetch(
          `${apiUrl}/search?q=${encodeURIComponent(search)}`,
        );

        const data: SearchResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            (data as { message?: string }).message ??
              "Não foi possível realizar a pesquisa.",
          );
        }

        if (!cancelled) {
          setProducts(data.products ?? []);
          setCategories(data.categories ?? []);
          setSubcategories(data.subcategories ?? []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Erro ao realizar a pesquisa.",
          );

          setProducts([]);
          setCategories([]);
          setSubcategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSearchResults();

    return () => {
      cancelled = true;
    };
  }, [search]);

  const hasResults =
    products.length > 0 || categories.length > 0 || subcategories.length > 0;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          {search ? `Resultados para "${search}"` : "Produtos"}
        </h1>

        {search && !loading && !error && (
          <p className="mt-2 text-sm text-[#52657c]">
            {[
              categories.length > 0 &&
                `${categories.length} ${
                  categories.length === 1 ? "categoria" : "categorias"
                }`,
              subcategories.length > 0 &&
                `${subcategories.length} ${
                  subcategories.length === 1 ? "subcategoria" : "subcategorias"
                }`,
              products.length > 0 &&
                `${products.length} ${
                  products.length === 1 ? "produto" : "produtos"
                }`,
            ]
              .filter(Boolean)
              .join(" • ")}
          </p>
        )}
      </div>

      {loading && (
        <div className="py-16 text-center">
          <p className="text-sm text-[#52657c]">
            {search ? "Pesquisando..." : "Carregando produtos..."}
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Não foi possível carregar os resultados.
          </p>

          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && !hasResults && (
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#071a2f]">
            Nenhum resultado encontrado
          </h2>

          <p className="mt-2 text-sm text-[#52657c]">
            {search
              ? `Não encontramos categorias, subcategorias ou produtos para "${search}".`
              : "Ainda não existem produtos disponíveis no catálogo."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {!loading && !error && hasResults && (
        <div className="space-y-12">
          {categories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Categorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${encodeURIComponent(category.slug)}`}
                    className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                        {category.description}
                      </p>
                    )}

                    <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                      Ver categoria →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {subcategories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Subcategorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {subcategories.map((subcategory) => {
                  const categorySlug = subcategory.category?.slug;

                  if (!categorySlug) {
                    return (
                      <div
                        key={subcategory.id}
                        className="rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-[#071a2f]">
                          {subcategory.name}
                        </h3>

                        {subcategory.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={subcategory.id}
                      to={`/categoria/${encodeURIComponent(
                        categorySlug,
                      )}/${encodeURIComponent(subcategory.slug)}`}
                      className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                        {subcategory.name}
                      </h3>

                      {subcategory.category && (
                        <p className="mt-1 text-xs font-medium text-[#1769e0]">
                          {subcategory.category.name}
                        </p>
                      )}

                      {subcategory.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                          {subcategory.description}
                        </p>
                      )}

                      <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                        Ver subcategoria →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">Produtos</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

```

## src\pages\RegisterPage.tsx

```tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível criar sua conta.");
      }

      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível criar sua conta.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Criar conta</h1>
          <p className="mt-2 text-sm text-gray-500">
            Faça seu cadastro no WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Nome
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              E-mail
            </label>

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Crie uma senha"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#1769e0] px-5 py-3 font-bold text-white transition hover:bg-[#0f56bd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}

```

## src\pages\SubcategoryPage.tsx

```tsx
import { useEffect, useMemo } from "react";
import { FiArrowLeft, FiArrowRight, FiGrid, FiHome } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
    fetchSubcategories,
  } = useSubcategories();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  const category = useMemo(() => {
    if (!categorySlug) {
      return undefined;
    }

    return categories.find(
      (item) =>
        item.slug.toLowerCase() === categorySlug.toLowerCase() && item.active,
    );
  }, [categories, categorySlug]);

  const subcategory = useMemo(() => {
    if (!subcategorySlug || !category) {
      return undefined;
    }

    return subcategories.find(
      (item) =>
        item.slug.toLowerCase() === subcategorySlug.toLowerCase() &&
        item.categoryId === category.id &&
        item.active,
    );
  }, [subcategories, subcategorySlug, category]);

  useEffect(() => {
    if (category) {
      void fetchProducts(category.name);
    }
  }, [category, fetchProducts]);

  const visibleProducts = useMemo(() => {
    if (!subcategory) {
      return [];
    }

    return products
      .filter(
        (product) =>
          product.subcategoryId === subcategory.id &&
          product.active &&
          product.available,
      )
      .slice(0, 4);
  }, [products, subcategory]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError || subcategoriesError || productsError;

  /*
   * Estado de carregamento
   */
  if (loading && !category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="animate-pulse">
          <div className="mb-6 h-5 w-40 rounded bg-slate-200" />

          <div className="grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 p-8 md:p-12">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-12 w-3/4 rounded bg-slate-200" />
              <div className="h-20 w-full rounded bg-slate-200" />
            </div>

            <div className="min-h-[260px] bg-slate-200" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["one", "two", "three", "four"].map((item) => (
              <div
                key={`subcategory-product-skeleton-${item}`}
                className="h-[360px] rounded-[24px] bg-slate-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
   * Categoria não encontrada
   */
  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Categoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A categoria que você está procurando não existe ou não está
            disponível no momento.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiHome />
            Voltar para o início
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Subcategoria não encontrada
   */
  if (!subcategory) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-slate-900">
            Início
          </Link>

          <span>/</span>

          <Link
            to={`/categoria/${category.slug}`}
            className="transition hover:text-slate-900"
          >
            {category.name}
          </Link>
        </div>

        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Subcategoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A subcategoria que você está procurando não existe ou não está
            disponível nesta categoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiArrowLeft />
            Voltar para {category.name}
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Erro
   */
  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="rounded-[32px] border border-red-100 bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FiGrid className="text-2xl text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Não foi possível carregar esta seleção
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Ocorreu um problema ao carregar os produtos. Tente novamente em
            alguns instantes.
          </p>

          <button
            type="button"
            onClick={() => {
              void fetchProducts(category.name);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link to="/" className="transition hover:text-slate-900">
          Início
        </Link>

        <span>/</span>

        <Link
          to={`/categoria/${category.slug}`}
          className="transition hover:text-slate-900"
        >
          {category.name}
        </Link>

        <span>/</span>

        <span className="font-medium text-slate-900">{subcategory.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12 grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
        {/* Conteúdo */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Subcategoria
          </span>

          <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {subcategory.name}
          </h1>

          {subcategory.description && (
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {subcategory.description}
            </p>
          )}

          <div className="mt-7">
            <Link
              to={`/categoria/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              <FiArrowLeft />
              Voltar para {category.name}
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative min-h-[280px] overflow-hidden bg-slate-100 md:min-h-full">
          {subcategory.image ? (
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center">
              <FiGrid className="text-7xl text-slate-300" />
            </div>
          )}
        </div>
      </div>

      {/* Cabeçalho dos produtos */}
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Ofertas encontradas
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Escolha o que combina com você
          </h2>
        </div>

        <span className="text-sm text-slate-400">
          Links patrocinados identificados
        </span>
      </div>

      {/* Produtos */}
      {productsLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["one", "two", "three", "four"].map((item) => (
            <div
              key={`product-skeleton-${item}`}
              className="h-[360px] animate-pulse rounded-[24px] bg-slate-100"
            />
          ))}
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-[24px] border border-[#e7edf5] bg-white px-6 py-12 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-xl text-slate-500" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Nenhum produto disponível
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Ainda não encontramos produtos ativos e disponíveis nesta
            subcategoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Ver outras subcategorias
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleProducts.length === 4 && (
            <div className="mt-8 flex justify-center">
              <Link
                to={`/categoria/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Voltar para a categoria
                <FiArrowRight />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

```

## src\pages\TechnologyPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function TechnologyPage() {
  return (
    <CategoryPage
      title="Tecnologia"
      summary="Encontre eletrônicos seguros, com a melhor relação entre qualidade, desempenho e inovação."
      image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Notebook aberto sobre uma mesa de trabalho"
      highlights={[
        {
          title: "Smartphones e acessórios",
          description: "Conectividade e praticidade para acompanhar seu ritmo.",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Smartphone sobre uma mesa",
        },
        {
          title: "Áudio e imagem",
          description: "Som envolvente e telas para transformar seus momentos.",
          image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Fones de ouvido modernos",
        },
        {
          title: "Casa inteligente",
          description:
            "Tecnologia que deixa a rotina mais simples e conectada.",
          image:
            "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Dispositivo inteligente em uma casa",
        },
        {
          title: "Trabalho e lazer",
          description:
            "Equipamentos para produzir, estudar e aproveitar melhor.",
          image:
            "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook e acessórios em uma mesa",
        },
      ]}
    />
  );
}

```

## src\pages\TermsOfUsePage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function TermsOfUsePage() {
  return (
    <InfoPage
      title="Termos de uso"
      intro="Ao utilizar a WorldMix360, você concorda com nossas regras de navegação e uso da plataforma."
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa revisando um documento com caneta e notebook"
      visualTitle="Princípios para uma boa experiência"
      visualItems={[
        { label: "Uso responsável", value: "Respeito", level: 100 },
        { label: "Conteúdo", value: "Integridade", level: 82 },
        { label: "Relação", value: "Transparência", level: 94 },
      ]}
      sections={[
        {
          title: "Uso da plataforma",
          content:
            "Você deve utilizar a plataforma de forma responsável e conforme a legislação vigente.",
        },
        {
          title: "Conteúdo e propriedade intelectual",
          content:
            "Todo o conteúdo e os materiais da marca são protegidos e devem ser respeitados.",
        },
        {
          title: "Responsabilidade",
          content:
            "A WorldMix360 atua como canal de informação e comercialização, sem substituir a análise individual do consumidor.",
        },
      ]}
    />
  );
}

```

## src\routes\adminRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "../components/AdminLayout";
import { AdminCategoriesPage } from "../pages/AdminCategoriesPage";
import AdminDashboardPage from "../pages/AdminDashboarPage";
import { AdminMarketplaceFormPage } from "../pages/AdminMarketplaceFormPage";
import { AdminMarketplacesPage } from "../pages/AdminMarketplacesPage";
import { AdminProductsPage } from "../pages/AdminProductsPage";
import { AdminSubcategoriesPage } from "../pages/AdminSubcategoriesPage";
import { AdminSubcategoryFormPage } from "../pages/AdminSubcategoryFormPage";
import { AdminCategoryFormPage } from "../pages/admin/AdminCategoriesFormPage";
import { AdminProductsFormPage } from "../pages/admin/AdminProductsFormPage";
import PrivateRoute from "./PrivateRoute";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/new",
        element: <AdminProductsFormPage />,
      },
      {
        path: "products/:id/edit",
        element: <AdminProductsFormPage />,
      },

      {
        path: "categories",
        element: <AdminCategoriesPage />,
      },

      {
        path: "categories/new",
        element: <AdminCategoryFormPage />,
      },

      {
        path: "categories/:id/edit",
        element: <AdminCategoryFormPage />,
      },
      {
        path: "subcategories",
        element: <AdminSubcategoriesPage />,
      },

      {
        path: "subcategories/new",
        element: <AdminSubcategoryFormPage />,
      },

      {
        path: "subcategories/:id/edit",
        element: <AdminSubcategoryFormPage />,
      },
      {
        path: "marketplaces",
        element: <AdminMarketplacesPage />,
      },
      {
        path: "marketplaces/new",
        element: <AdminMarketplaceFormPage />,
      },
      {
        path: "marketplaces/:id/edit",
        element: <AdminMarketplaceFormPage />,
      },
    ],
  },
];

```

## src\routes\authRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

```

## src\routes\homeRoutes.tsx

```tsx
/** src/routes/homeRoutes.tsx */
import type { RouteObject } from "react-router-dom";

import { HomePage } from "../pages/HomePage";

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

```

## src\routes\index.tsx

```tsx
/* src/routes/index.tsx */
import { Navigate, type RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { institutionalRoutes } from "./institutionalRoutes";
import { productRoutes } from "./productRoutes";

const routes: RouteObject[] = [
  // Rotas públicas
  {
    element: <AppLayout />,
    children: [
      ...homeRoutes,
      ...institutionalRoutes,
      ...productRoutes,
      ...authRoutes,
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  // Rotas administrativas (layout separado)
  ...adminRoutes,
];

export function AppRoutes() {
  return useRoutes(routes);
}

```

## src\routes\institutionalRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HowItWorksPage } from "../pages/HowItWorksPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "../pages/TermsOfUsePage";

export const institutionalRoutes: RouteObject[] = [
  { path: "sobre", element: <AboutPage /> },
  { path: "contato", element: <ContactPage /> },
  { path: "como-funciona", element: <HowItWorksPage /> },
  {
    path: "politica-de-privacidade",
    element: <PrivacyPolicyPage />,
  },
  { path: "termos-de-uso", element: <TermsOfUsePage /> },
];

```

## src\routes\PrivateRoute.tsx

```tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  /**
   * Enquanto o AuthProvider verifica o localStorage,
   * não devemos redirecionar o usuário para o login.
   */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbe7f5] border-t-[#1769e0]" />

          <p className="mt-4 text-sm font-medium text-[#52657c]">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  /**
   * Usuário não autenticado.
   */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /**
   * Usuário autenticado, mas sem permissão de administrador.
   */
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

```

## src\routes\productRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { BlogPage } from "../pages/BlogPage";
import { CategoryPage } from "../pages/CategoriesPage";
import { DigitalProductsPage } from "../pages/DigitalProductsPage";
import { FashionPage } from "../pages/FashionPage";
import { HomeUtilitiesPage } from "../pages/HomeUtilitiesPage";
import { OffersPage } from "../pages/OffersPage";
import { PetsPage } from "../pages/PetsPage";
import { ProductPage } from "../pages/ProductPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SubcategoryPage } from "../pages/SubcategoryPage";
import { TechnologyPage } from "../pages/TechnologyPage";

export const productRoutes: RouteObject[] = [
  // Busca de produtos
  { path: "produtos", element: <ProductsPage /> },

  // Detalhes do produto
  { path: "produto/:slug", element: <ProductPage /> },

  // Categoria
  { path: "categoria/:slug", element: <CategoryPage /> },

  // Subcategoria - rota hierárquica
  {
    path: "categoria/:categorySlug/:subcategorySlug",
    element: <SubcategoryPage />,
  },

  // Rotas de categorias legadas
  { path: "tecnologia", element: <TechnologyPage /> },
  { path: "casa-utilidades", element: <HomeUtilitiesPage /> },
  { path: "moda", element: <FashionPage /> },
  { path: "pets", element: <PetsPage /> },
  { path: "produtos-digitais", element: <DigitalProductsPage /> },
  { path: "ofertas", element: <OffersPage /> },
  { path: "blog", element: <BlogPage /> },

  // Compatibilidade com URLs antigas
  {
    path: ":category/:subcategory",
    element: <SubcategoryPage />,
  },
];

```

## src\types\AffiliateProduct.ts

```ts
export type Marketplace = "mercado-livre" | "amazon" | "shopee" | "outro";

export type AffiliateProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  marketplace: Marketplace;
  affiliateUrl: string;
  category?: string;
};

```

## src\types\User.ts

```ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
};

```

## src\utils\formatCurrency.ts

```ts
export function formatCurrencyBRL(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === "") {
    return "R$ 0,00";
  }

  const numericValue =
    typeof value === "string"
      ? Number.parseFloat(value.replace(",", "."))
      : value;

  if (!Number.isFinite(numericValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}

export function parseCurrencyBRL(value: string): number {
  const normalizedValue = value
    .replace(/\s/g, "")
    .replace(/R\$/gi, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numericValue = Number.parseFloat(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const numericValue = Number(digits) / 100;

  return numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

```

## tools\generate-md.ts

```ts
import { readdirSync, statSync, readFileSync, appendFileSync, existsSync, unlinkSync } from "fs";
import { join, extname, dirname, resolve, relative, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// raiz do projeto (um nível acima de tools)
const projectPath = resolve(__dirname, "..");

// pega o nome da pasta raiz (nome do projeto)
const projectName = basename(projectPath);

// gera o arquivo dentro de tools com o nome do projeto
const outputFile = join(__dirname, `${projectName}.md`);

const extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".env", ".css"];
const specialFiles = [
  "Dockerfile",
  "Makefile",
  ".eslintrc",
  ".prettierrc",
  "vite.config.ts",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js"
];
const excludeDirs = ["node_modules", ".git", "dist", "build", "generated"];
const excludeFiles = ["package-lock.json"];

if (existsSync(outputFile)) unlinkSync(outputFile);

function formatHeader(fullPath: string): string {
  const rel = relative(projectPath, fullPath);
  return `## ${rel}`;
}

function wrapContent(ext: string, content: string): string {
  if ([".ts", ".tsx", ".js"].includes(ext)) return `\n\`\`\`${ext.replace(".", "")}\n${content}\n\`\`\`\n`;
  if (ext === ".json") return `\n\`\`\`json\n${content}\n\`\`\`\n`;
  if (ext === ".md") return `\n${content}\n`;
  if (ext === ".env") return `\n\`\`\`env\n${content}\n\`\`\`\n`;
  if (specialFiles.includes(ext)) return `\n\`\`\`\n${content}\n\`\`\`\n`;
  return `\n${content}\n`;
}

function walk(dir: string): void {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) walk(fullPath);
    } else {
      const ext = extname(file) || file;
      if ((extensions.includes(ext) || specialFiles.includes(file)) && !excludeFiles.includes(file)) {
        try {
          const content = readFileSync(fullPath, "utf8");
          appendFileSync(outputFile, `\n${formatHeader(fullPath)}\n`);
          appendFileSync(outputFile, wrapContent(ext, content));
        } catch (err) {
          console.error("⚠️ Erro ao ler arquivo:", fullPath, (err as Error).message);
        }
      }
    }
  }
}

console.log(`🔍 Gerando arquivo ${projectName}.md...`);
walk(projectPath);
console.log(`✅ Arquivo gerado com sucesso em ${outputFile}`);

```

## tools\instrucoes.md

📘 Guia de Uso — Script `generate-md.ts`

Este utilitário percorre todo o projeto (backend ou frontend) e gera um arquivo `.md` com o conteúdo dos arquivos, formatado em Markdown e destacado por tipo de código.

---

## 🛠️ Estrutura do Projeto

```
meu-projeto/
├─ backend/
│   ├─ src/
│   └─ tools/
│       └─ generate-md.ts
├─ frontend/
│   ├─ src/
│   └─ tools/
│       └─ generate-md.ts
├─ package.json
└─ tsconfig.json
---
```

## 📂 Script `generate-md.ts`

Coloque este arquivo dentro da pasta `tools` de cada parte (backend e frontend):

```ts
import {
  readdirSync,
  statSync,
  readFileSync,
  appendFileSync,
  existsSync,
  unlinkSync,
} from "fs";
import { join, extname, dirname, resolve, relative, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// raiz do projeto (um nível acima da pasta tools)
const projectPath = resolve(__dirname, "..");

// nome da pasta raiz (ex: backend ou frontend)
const projectName = basename(projectPath);

// arquivo de saída dentro da pasta tools
const outputFile = join(__dirname, `${projectName}.md`);

const extensions = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".env",
  ".css",
];
const specialFiles = [
  "Dockerfile",
  "Makefile",
  ".eslintrc",
  ".prettierrc",
  "vite.config.ts",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js",
];
const excludeDirs = ["node_modules", ".git", "dist", "build", "generated"];
const excludeFiles = ["package-lock.json"];

if (existsSync(outputFile)) unlinkSync(outputFile);

function formatHeader(fullPath: string): string {
  const rel = relative(projectPath, fullPath);
  return `## ${rel}`;
}

function wrapContent(ext: string, content: string): string {
  if ([".ts", ".tsx", ".js", ".jsx"].includes(ext))
    return `\n\`\`\`${ext.replace(".", "")}\n${content}\n\`\`\`\n`;
  if (ext === ".json") return `\n\`\`\`json\n${content}\n\`\`\`\n`;
  if (ext === ".md") return `\n${content}\n`;
  if (ext === ".env") return `\n\`\`\`env\n${content}\n\`\`\`\n`;
  if (ext === ".css") return `\n\`\`\`css\n${content}\n\`\`\`\n`;
  if (specialFiles.includes(ext)) return `\n\`\`\`\n${content}\n\`\`\`\n`;
  return `\n${content}\n`;
}

function walk(dir: string): void {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) walk(fullPath);
    } else {
      const ext = extname(file) || file;
      if (
        (extensions.includes(ext) || specialFiles.includes(file)) &&
        !excludeFiles.includes(file)
      ) {
        try {
          const content = readFileSync(fullPath, "utf8");
          appendFileSync(outputFile, `\n${formatHeader(fullPath)}\n`);
          appendFileSync(outputFile, wrapContent(ext, content));
        } catch (err) {
          console.error(
            "⚠️ Erro ao ler arquivo:",
            fullPath,
            (err as Error).message,
          );
        }
      }
    }
  }
}

console.log(`🔍 Gerando arquivo ${projectName}.md...`);
walk(projectPath);
console.log(`✅ Arquivo gerado com sucesso em ${outputFile}`);
```

⚙️ Configuração do TypeScript

- No tsconfig.json da raiz, adicione:

```
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2020",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"]
  },
  "include": ["src", "tools"]
}
```

📦 Dependências

- Instale:

```
"scripts": {
  "generate-md": "tsx tools/generate-md.ts"
}

```

🚀 Como Rodar

- No terminal, vá até a pasta desejada e rode:

```
npm run generate-md
```


## tools\WorldMix360-WEB.md


## eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])

```

## package.json

```json
{
  "name": "worldmix360",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "generate-md": "tsx tools/generate-md.ts",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@tiptap/extension-link": "^3.31.3",
    "@tiptap/extension-underline": "^3.31.3",
    "@tiptap/react": "^3.31.3",
    "@tiptap/starter-kit": "^3.31.3",
    "class-variance-authority": "^0.7.1",
    "crypto": "^1.0.1",
    "dompurify": "^3.4.15",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-icons": "^5.7.0",
    "react-router-dom": "^7.18.3",
    "swiper": "^14.2.0",
    "tailwind-variants": "^3.3.1",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.23.13",
    "uuid": "^14.0.2",
    "vite-plugin-svgr": "^5.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/dompurify": "^3.0.5",
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "eslint": "^10.9.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.4",
    "globals": "^17.11.0",
    "ts-node": "^10.9.2",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.67.0",
    "vite": "^8.2.2"
  }
}

```

## README.md

<img src="./.github/WorldMix360-desktop.png" classname="w-full"/>
<img src="./.github/WorldMix360-mobile.png" classname="w-full"/>


## src\App.tsx

```tsx
import { AuthProvider } from "./contexts/AuthProvider";
import { CategoriesProvider } from "./contexts/CategoriesProvider";
import { MarketplacesProvider } from "./contexts/MarketplacesProvider";
import { MercadoLivreProvider } from "./contexts/MercadoLivreProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { SubcategoriesProvider } from "./contexts/SubcategoriesProvider";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <MercadoLivreProvider>
        <CategoriesProvider>
          <SubcategoriesProvider>
            <MarketplacesProvider>
              <ProductsProvider>
                <AppRoutes />
              </ProductsProvider>
            </MarketplacesProvider>
          </SubcategoriesProvider>
        </CategoriesProvider>
      </MercadoLivreProvider>
    </AuthProvider>
  );
}

```

## src\components\admin\products\ProductBasicInfo.tsx

```tsx
import { RichTextEditor } from "../RichTextEditor";

type ProductBasicInfoProps = {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onShortDescriptionChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
};

export function ProductBasicInfo({
  title,
  description,
  shortDescription,
  imageUrl,
  loading,
  onTitleChange,
  onDescriptionChange,
  onShortDescriptionChange,
  onImageUrlChange,
}: ProductBasicInfoProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Informações do produto
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Título *
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Ex.: Smartphone Samsung Galaxy"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            O slug será gerado automaticamente pela API.
          </p>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição curta
          </label>

          <input
            id="shortDescription"
            type="text"
            value={shortDescription}
            onChange={(event) => onShortDescriptionChange(event.target.value)}
            placeholder="Resumo rápido do produto"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição
          </label>

          <RichTextEditor
            value={description}
            onChange={onDescriptionChange}
            disabled={loading}
            placeholder="Escreva uma descrição completa e detalhada do produto..."
          />

          <p className="mt-2 text-xs text-gray-500">
            Use títulos, negrito, listas, links e outros recursos para deixar a
            descrição mais organizada e agradável para o cliente.
          </p>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            URL da imagem principal *
          </label>

          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => onImageUrlChange(event.target.value)}
            placeholder="https://exemplo.com/produto.jpg"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          {imageUrl.trim() && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Pré-visualização da imagem principal
              </p>

              <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <img
                  src={imageUrl}
                  alt="Pré-visualização do produto"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductFormActions.tsx

```tsx
import { Link } from "react-router-dom";

type ProductFormActionsProps = {
  loading: boolean;
  isEditing: boolean;
};

export function ProductFormActions({
  loading,
  isEditing,
}: ProductFormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Link
        to="/admin/products"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        Cancelar
      </Link>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue px-4 py-2 text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? isEditing
            ? "Salvando..."
            : "Cadastrando..."
          : isEditing
            ? "Salvar alterações"
            : "Cadastrar produto"}
      </button>
    </div>
  );
}

```

## src\components\admin\products\ProductGallery.tsx

```tsx
import type { ProductImageForm } from "./types";

type ProductGalleryProps = {
  galleryImages: ProductImageForm[];
  loading: boolean;
  onAdd: () => void;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
};

export function ProductGallery({
  galleryImages,
  loading,
  onAdd,
  onChange,
  onRemove,
}: ProductGalleryProps) {
  return (
    <div className="border-t border-gray-100 pt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Galeria de imagens
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Adicione imagens adicionais para exibir na página do produto.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          + Adicionar imagem
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
          <p className="text-sm text-gray-500">
            Nenhuma imagem adicional adicionada.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            A imagem principal continuará sendo utilizada normalmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Imagem {image.sortOrder + 1}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Ordem: {image.sortOrder + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(image.id)}
                  disabled={loading}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Remover
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                <div>
                  <label
                    htmlFor={`gallery-image-${image.id}`}
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    URL da imagem
                  </label>

                  <input
                    id={`gallery-image-${image.id}`}
                    type="url"
                    value={image.imageUrl}
                    onChange={(event) => onChange(image.id, event.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />
                </div>

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                  {image.imageUrl.trim() ? (
                    <img
                      src={image.imageUrl}
                      alt={`Pré-visualização da imagem ${image.sortOrder + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs text-gray-400">
                      Sem imagem
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

```

## src\components\admin\products\ProductPricing.tsx

```tsx
import { formatCurrencyInput } from "../../../utils/formatCurrency";

type ProductPricingProps = {
  price: string;
  originalPrice: string;
  currency: string;
  rating: string;
  reviewsCount: string;
  loading: boolean;
  onPriceChange: (value: string) => void;
  onOriginalPriceChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onReviewsCountChange: (value: string) => void;
};

export function ProductPricing({
  price,
  originalPrice,
  currency,
  rating,
  reviewsCount,
  loading,
  onPriceChange,
  onOriginalPriceChange,
  onCurrencyChange,
  onRatingChange,
  onReviewsCountChange,
}: ProductPricingProps) {
  function handlePriceChange(value: string) {
    onPriceChange(formatCurrencyInput(value));
  }

  function handleOriginalPriceChange(value: string) {
    onOriginalPriceChange(formatCurrencyInput(value));
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Preço e avaliações
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Preço *
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(event) => handlePriceChange(event.target.value)}
              placeholder="0,00"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Digite o valor no formato brasileiro. Ex.: 38,99
          </p>
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Preço original
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="originalPrice"
              type="text"
              inputMode="decimal"
              value={originalPrice}
              onChange={(event) =>
                handleOriginalPriceChange(event.target.value)
              }
              placeholder="0,00"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">Opcional. Ex.: 49,90</p>
        </div>

        <div>
          <label
            htmlFor="currency"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Moeda
          </label>

          <input
            id="currency"
            type="text"
            value={currency}
            onChange={(event) =>
              onCurrencyChange(event.target.value.toUpperCase())
            }
            maxLength={3}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm uppercase outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="rating"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Avaliação
          </label>

          <input
            id="rating"
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(event) => onRatingChange(event.target.value)}
            placeholder="Ex.: 4.8"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="reviewsCount"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Quantidade de avaliações
          </label>

          <input
            id="reviewsCount"
            type="number"
            min="0"
            step="1"
            value={reviewsCount}
            onChange={(event) => onReviewsCountChange(event.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductRelationships.tsx

```tsx
type Subcategory = {
  id: string;
  name: string;
  category?: {
    name: string;
  } | null;
};

type Marketplace = {
  id: string;
  name: string;
};

type ProductRelationshipsProps = {
  subcategories: Subcategory[];
  marketplaces: Marketplace[];
  subcategoryId: string;
  marketplaceId: string;
  affiliateUrl: string;
  loading: boolean;
  onSubcategoryChange: (value: string) => void;
  onMarketplaceChange: (value: string) => void;
  onAffiliateUrlChange: (value: string) => void;
};

export function ProductRelationships({
  subcategories,
  marketplaces,
  subcategoryId,
  marketplaceId,
  affiliateUrl,
  loading,
  onSubcategoryChange,
  onMarketplaceChange,
  onAffiliateUrlChange,
}: ProductRelationshipsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Classificação e marketplace
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="subcategoryId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Subcategoria *
          </label>

          <select
            id="subcategoryId"
            value={subcategoryId}
            onChange={(event) => onSubcategoryChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione uma subcategoria</option>

            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.category?.name
                  ? `${subcategory.category.name} → ${subcategory.name}`
                  : subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="marketplaceId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Marketplace *
          </label>

          <select
            id="marketplaceId"
            value={marketplaceId}
            onChange={(event) => onMarketplaceChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione um marketplace</option>

            {marketplaces.map((marketplace) => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="affiliateUrl"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Link de afiliado *
          </label>

          <input
            id="affiliateUrl"
            type="url"
            value={affiliateUrl}
            onChange={(event) => onAffiliateUrlChange(event.target.value)}
            placeholder="https://..."
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            Este será o link utilizado pelo botão de compra/afiliado.
          </p>
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductSeo.tsx

```tsx
type ProductSeoProps = {
  seoTitle: string;
  seoDescription: string;
  loading: boolean;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
};

export function ProductSeo({
  seoTitle,
  seoDescription,
  loading,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: ProductSeoProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">SEO</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="seoTitle"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Title
          </label>

          <input
            id="seoTitle"
            type="text"
            value={seoTitle}
            onChange={(event) => onSeoTitleChange(event.target.value)}
            placeholder="Título otimizado para buscadores"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="seoDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Description
          </label>

          <textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(event) => onSeoDescriptionChange(event.target.value)}
            rows={4}
            placeholder="Descrição otimizada para mecanismos de busca"
            disabled={loading}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}

```

## src\components\admin\products\ProductStatus.tsx

```tsx
type ProductStatusProps = {
  featured: boolean;
  available: boolean;
  active: boolean;
  loading: boolean;
  onFeaturedChange: (value: boolean) => void;
  onAvailableChange: (value: boolean) => void;
  onActiveChange: (value: boolean) => void;
};

export function ProductStatus({
  featured,
  available,
  active,
  loading,
  onFeaturedChange,
  onAvailableChange,
  onActiveChange,
}: ProductStatusProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Status do produto
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => onFeaturedChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Destaque
            </span>

            <span className="block text-xs text-gray-500">
              Exibir como produto destacado.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => onAvailableChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Disponível
            </span>

            <span className="block text-xs text-gray-500">
              Produto disponível no catálogo.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={active}
            onChange={(event) => onActiveChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Ativo
            </span>

            <span className="block text-xs text-gray-500">
              Produto ativo no sistema.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}

```

## src\components\admin\products\types.ts

```ts
export type ProductImageForm = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

```

## src\components\admin\RichTextEditor.tsx

```tsx
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function RichTextEditor({
  value,
  onChange,
  disabled = false,
  placeholder = "Escreva a descrição completa do produto...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value,

    editable: !disabled,

    editorProps: {
      attributes: {
        class:
          "min-h-[260px] w-full px-4 py-4 text-sm leading-7 text-gray-700 outline-none",
        "data-placeholder": placeholder,
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentHtml = editor.getHTML();

    if (value !== currentHtml && value !== "") {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }

    if (value === "" && !editor.isEmpty) {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-lg border border-gray-300 bg-gray-50 p-4 text-sm text-gray-500">
        Carregando editor...
      </div>
    );
  }

  function setLink() {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Informe a URL do link:",
      previousUrl || "https://",
    );

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url.trim(),
        target: "_blank",
      })
      .run();
  }

  return (
    <div
      className={`overflow-hidden rounded-lg border border-gray-300 bg-white ${
        disabled ? "opacity-60" : ""
      }`}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
        {/* Parágrafo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("paragraph")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Parágrafo"
        >
          P
        </button>

        {/* Título 2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 2"
        >
          H2
        </button>

        {/* Título 3 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-bold transition ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Título 3"
        >
          H3
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Negrito */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm font-bold transition ${
            editor.isActive("bold")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Negrito"
        >
          B
        </button>

        {/* Itálico */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm italic transition ${
            editor.isActive("italic")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Itálico"
        >
          I
        </button>

        {/* Sublinhado */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-sm underline transition ${
            editor.isActive("underline")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Sublinhado"
        >
          U
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Lista */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("bulletList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista com marcadores"
        >
          • Lista
        </button>

        {/* Lista numerada */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("orderedList")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Lista numerada"
        >
          1. Lista
        </button>

        {/* Citação */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("blockquote")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Citação"
        >
          “ Citação
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Link */}
        <button
          type="button"
          onClick={setLink}
          disabled={disabled}
          className={`rounded px-3 py-2 text-xs font-semibold transition ${
            editor.isActive("link")
              ? "bg-blue text-white"
              : "text-gray-700 hover:bg-gray-200"
          }`}
          title="Adicionar link"
        >
          Link
        </button>

        {/* Remover link */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={disabled || !editor.isActive("link")}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Remover link"
        >
          Remover link
        </button>

        <span className="mx-1 h-6 w-px bg-gray-300" />

        {/* Separador */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          disabled={disabled}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
          title="Separador"
        >
          ―
        </button>

        {/* Desfazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().undo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Desfazer"
        >
          ↶
        </button>

        {/* Refazer */}
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().redo()}
          className="rounded px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
          title="Refazer"
        >
          ↷
        </button>
      </div>

      {/* Área de edição */}
      <EditorContent editor={editor} />
    </div>
  );
}

```

## src\components\AdminLayout\index.tsx

```tsx
import { NavLink, Outlet } from "react-router-dom";

import { HeaderAdmin } from "../HeaderAdmin";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Produtos",
    href: "/admin/products",
  },
  {
    label: "Categorias",
    href: "/admin/categories",
  },
  {
    label: "Subcategorias",
    href: "/admin/subcategories",
  },
  {
    label: "Marketplaces",
    href: "/admin/marketplaces",
  },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      <HeaderAdmin />

      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#e7edf5] bg-white lg:block">
          <div className="sticky top-0 p-4">
            <div className="mb-5 px-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a9bb0]">
                Administração
              </p>

              <p className="mt-1 text-sm text-[#52657c]">Gerencie o catálogo</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-[#edf5ff] text-[#1769e0]"
                        : "text-[#52657c] hover:bg-[#f5f8fc] hover:text-[#071a2f]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

```

## src\components\AppLayout\index.tsx

```tsx
import { Outlet } from "react-router-dom";

import { Footer } from "../Footer";
import { Header } from "../Header";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      <Header />
      <main className="min-h-[60vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

```

## src\components\Banner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import ProdutosBunner from "../../assets/images/banner1.png";
import { Icon } from "../Icon";

const banners = [
  {
    eyebrow: "Escolhas que fazem sentido",
    title: "Um mundo de",
    highlight: " escolhas.",
    description:
      "As melhores recomendações dos principais marketplaces em um só lugar para você.",
    image: ProdutosBunner,
    imageAlt: "Seleção de produtos recomendados pela WorldMix360",
    href: "/ofertas",
    cta: "Ver ofertas",
    imageClassName:
      "-bottom-4 right-0 max-w-[500px] opacity-80 md:max-w-[800px] lg:max-w-[900px]",
  },
  {
    eyebrow: "Compra mais inteligente",
    title: "Descubra produtos",
    highlight: " para sua rotina.",
    description:
      "Compare ideias, encontre novidades e escolha com mais confiança em cada categoria.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa escolhendo produtos em uma experiência de compra",
    href: "/tecnologia",
    cta: "Explorar categorias",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
  {
    eyebrow: "Curadoria de parceiros",
    title: "Encontre sua próxima",
    highlight: " boa escolha.",
    description:
      "Confira produtos de marketplaces parceiros e acesse as ofertas diretamente no site do anunciante.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoas felizes fazendo compras online em um notebook",
    href: "/ofertas",
    cta: "Ver produtos",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function Banner() {
  return (
    <section
      aria-label="Destaques WorldMix360"
      className="w-full overflow-hidden bg-navy"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="home-banner h-[500px] md:h-[600px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative h-full overflow-hidden bg-gradient-to-br from-navy via-[#0b3d66] to-blue">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#9ad7ff]">
                    {banner.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h1>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-xl">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\BlogBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const blogBanners = [
  {
    eyebrow: "No nosso blog",
    title: "Dicas práticas sobre",
    highlight: " tecnologia",
    description:
      "Descubra como escolher gadgets e apps que realmente facilitam sua rotina.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa usando notebook e smartphone",
    href: "/blog/tecnologia",
    cta: "Ler matéria",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-blue", // usa azul da paleta
  },
  {
    eyebrow: "Conteúdo exclusivo",
    title: "Tendências em",
    highlight: " consumo consciente",
    description:
      "Saiba como fazer escolhas mais sustentáveis e inteligentes no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Sacolas ecológicas e produtos sustentáveis",
    href: "/blog/sustentabilidade",
    cta: "Explorar artigo",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-green", // verde da paleta
  },
  {
    eyebrow: "Insights do mercado",
    title: "O futuro das",
    highlight: " compras online",
    description:
      "Entenda como marketplaces estão mudando a forma de consumir e vender.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Carrinho de compras digital",
    href: "/blog/ecommerce",
    cta: "Ver análise",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-yellow", // amarelo da paleta
  },
];

export function BlogBanner() {
  return (
    <section
      aria-label="Matérias do Blog WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="blog-banner h-[400px] md:h-[500px]"
      >
        {blogBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.bgColor}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-yellow">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\Footer\index.tsx

```tsx
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import { Logo } from "../Logo";
import { Menu } from "../Menu";

export function Footer() {
  return (
    <footer className="text-white w-full bg-navy p-6">
      <div className="md:max-w-[1200px] mx-auto px-6">
        {/* Grid responsiva */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Logo */}
          <div className="flex max-w-[290px] flex-col gap-2">
            <Link to="/" className="inline-block w-fit">
              <Logo location="footer" />
            </Link>
            {/* Redes sociais */}
            <p className="text-gray-100 font-semibold md:text-xl my-2">
              Um mundo de escolhas, Descubra, Compare e Escolha melhor.
            </p>
            <div className="flex items-center mt-3 justify-between max-w-[220px]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-white hover:text-yellow text-4xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-white hover:text-gray-500 text-4xl" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Institucional</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link to="/sobre" className="transition hover:text-white">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  to="/como-funciona"
                  className="transition hover:text-white"
                >
                  Como funciona
                </Link>
              </li>
              <li>
                <Link
                  to="/politica-de-privacidade"
                  className="transition hover:text-white"
                >
                  Política de privacidade
                </Link>
              </li>
              <li>
                <Link
                  to="/termos-de-uso"
                  className="transition hover:text-white"
                >
                  Termos de uso
                </Link>
              </li>
              <li>
                <Link to="/contato" className="transition hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Categorias</h3>
            <Menu variant="footer" />
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Newsletter</h3>
            <p className="text-sm mb-2">
              Receba dicas e ofertas exclusivas no seu e-mail
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-2 rounded-md text-navy bg-white"
              />
              <button
                type="submit"
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm text-gray-300">
        © 2026 WorldMix360 – Todos os direitos reservados.
      </div>
    </footer>
  );
}

```

## src\components\Header\index.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../../assets/Icons/menuIcon.svg?react";
import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { useAuth } from "../../contexts/useAuth";

import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { Menu } from "../Menu";
import { SearchBar } from "../SearchBar";

export function Header() {
  const { user, signOut } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * ============================================================
   * FECHAR PESQUISA AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isSearchOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  /*
   * ============================================================
   * FECHAR MENU MOBILE AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full border-b-2 border-blue/20">
      <header className="relative mx-auto w-full px-6 py-10 md:max-w-[1200px] md:py-5">
        {/* ======================================================
            HEADER PRINCIPAL
        ====================================================== */}

        <div className="flex items-center justify-between md:min-h-[60px] md:gap-6">
          {/* ====================================================
              BOTÃO MENU MOBILE
          ==================================================== */}

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsSearchOpen(false);
            }}
            className="block md:hidden"
          >
            <Icon svg={MenuIcon} size="md" />
          </button>

          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:items-center"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Voltar para a página inicial"
          >
            <Logo />
          </Link>

          {/* ====================================================
              BOTÃO PESQUISA MOBILE
          ==================================================== */}

          {!isSearchOpen && (
            <button
              type="button"
              aria-label="Pesquisar"
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
              className="ml-auto block md:hidden"
            >
              <Icon svg={SearchIcon} size="md" />
            </button>
          )}

          {/* ====================================================
              ÁREA DESKTOP
          ==================================================== */}

          <div className="hidden w-full max-w-[58%] items-center justify-end gap-4 md:flex">
            {/* Pesquisa */}

            <SearchBar className="w-full" />

            {/* ==================================================
                AUTENTICAÇÃO
            ================================================== */}

            {user ? (
              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Olá,</p>

                  <p className="max-w-[120px] truncate text-sm font-semibold text-navy">
                    {user.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-navy transition hover:bg-gray-50"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex shrink-0 items-center rounded-lg bg-[#1769e0] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f56bd]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* ======================================================
            MENU DESKTOP
        ====================================================== */}

        <div className="mt-3 hidden md:block">
          <Menu variant="header" />
        </div>

        {/* ======================================================
            PESQUISA MOBILE
        ====================================================== */}

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="mt-10 flex items-center gap-2 md:hidden"
          >
            <SearchBar className="flex-1" />

            <button
              type="button"
              aria-label="Fechar pesquisa"
              onClick={() => setIsSearchOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-lg text-gray-700"
            >
              ×
            </button>
          </div>
        )}

        {/* ======================================================
            MENU MOBILE
        ====================================================== */}

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#071a2f]/60 md:hidden">
            <div
              ref={menuRef}
              className="h-full w-[85%] max-w-[360px] overflow-y-auto bg-[#071a2f] px-5 py-6 text-white"
            >
              {/* ==================================================
                  CABEÇALHO DO MENU MOBILE
              ================================================== */}

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold">
                    W
                  </div>

                  <div>
                    <p className="text-xl font-bold leading-none">WORLD</p>

                    <p className="text-lg font-bold leading-none">MIX 360</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light text-white"
                >
                  ×
                </button>
              </div>

              {/* ==================================================
                  PESQUISA MOBILE DO MENU
              ================================================== */}

              <div className="mb-5">
                <SearchBar
                  className="[&_input]:border-white/10 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-white/60"
                  onSearch={() => setIsMenuOpen(false)}
                />
              </div>

              {/* ==================================================
                  AUTENTICAÇÃO MOBILE
              ================================================== */}

              <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
                {user ? (
                  <div>
                    <p className="text-xs text-white/60">Olá,</p>

                    <p className="mt-1 truncate text-base font-bold text-white">
                      {user.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="mt-3 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg bg-[#1769e0] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Entrar
                  </Link>
                )}
              </div>

              {/* ==================================================
                  MENU DINÂMICO

                  Agora categorias e subcategorias vêm da API.
              ================================================== */}

              <Menu variant="mobile" onNavigate={() => setIsMenuOpen(false)} />

              {/* ==================================================
                  LINKS INSTITUCIONAIS
              ================================================== */}

              <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70">
                <Link
                  to="/sobre"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Sobre nós
                </Link>

                <Link
                  to="/contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Contato
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Política de Privacidade
                </button>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

```

## src\components\HeaderAdmin\index.tsx

```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export function HeaderAdmin() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    closeMenu();
    signOut();
  };

  return (
    <>
      <header className="w-full bg-gray-900 text-white px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo / título */}
        <Link
          to="/admin/dashboard"
          className="text-lg font-bold hover:text-blue-300 transition-colors"
          onClick={closeMenu}
        >
          Painel Administrativo
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/admin/dashboard"
            className={`transition-colors ${
              isActive("/admin/dashboard")
                ? "text-blue-300"
                : "hover:text-blue-300"
            }  md:hidden`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`transition-colors ${
              isActive("/admin/products")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Produtos
          </Link>

          <Link
            to="/admin/categories"
            className={`transition-colors ${
              isActive("/admin/categories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Categorias
          </Link>

          <Link
            to="/admin/subcategories"
            className={`transition-colors ${
              isActive("/admin/subcategories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Subcategorias
          </Link>

          <Link
            to="/admin/marketplaces"
            className={`transition-colors ${
              isActive("/admin/marketplaces")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Marketplaces
          </Link>

          <span className="text-sm text-gray-300">Olá, {user?.name}</span>

          <button
            type="button"
            onClick={handleSignOut}
            className="bg-danger px-3 py-1.5 rounded text-sm hover:bg-red-500 transition-colors"
          >
            Sair
          </button>
        </nav>

        {/* Área mobile */}
        <div className="flex md:hidden items-center gap-3">
          <span className="text-sm text-gray-300 max-w-24 truncate">
            {user?.name}
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Menu lateral mobile */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
          <div>
            <p className="font-bold">WorldMix360</p>
            <p className="text-sm text-gray-400">Painel Administrativo</p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="text-gray-300 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="text-sm text-gray-400 mb-4">Olá, {user?.name}</p>

          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/products")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Produtos
            </Link>

            <Link
              to="/admin/categories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/categories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Categorias
            </Link>

            <Link
              to="/admin/subcategories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/subcategories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Subcategorias
            </Link>

            <Link
              to="/admin/marketplaces"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/marketplaces")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Marketplaces
            </Link>
          </nav>

          <div className="border-t border-gray-700 mt-6 pt-6">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full bg-red-600 px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

```

## src\components\Icon\iconVariants.ts

```ts
import { cva } from "class-variance-authority";

export const iconVariants = cva("inline-block", {
  variants: {
    animate: {
      false: "",
      true: "animate-spin",
    },
    color: {
      gray: "text-gray-400",
      blue: "text-blue-500",
      red: "text-red-500",
    },
    size: {
      md: "w-7 h-7",
      lg: "w-9 h-9",
    },
  },
  defaultVariants: {
    animate: false,
    color: "gray",
    size: "md",
  },
});

```

## src\components\Icon\index.tsx

```tsx
import type { VariantProps } from "class-variance-authority";
import { cn } from "tailwind-variants";
import { iconVariants } from "./iconVariants";

interface IconProps
  extends
    Omit<React.ComponentProps<"svg">, "color">,
    VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<"svg">>;
}

export function Icon({
  svg: SvgComponent,
  animate,
  color,
  size,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={cn(iconVariants({ animate, color, size }), className)}
      {...props}
    />
  );
}

```

## src\components\InputText\index.tsx

```tsx
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "tailwind-variants";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export function InputText({
  icon,
  iconPosition = "left",
  className,
  ...props
}: InputTextProps) {
  const hasIcon = Boolean(icon);

  return (
    <div className="relative w-full">
      {hasIcon && iconPosition === "left" && (
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
          {icon}
        </div>
      )}

      <input
        {...props}
        className={cn(
          "w-full rounded-lg border-gray-100 border-2 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 outline-none transition-colors duration-200",
          "focus:border-blue focus:ring-2 focus:ring-blue/10",
          hasIcon && iconPosition === "left" && "pl-10",
          hasIcon && iconPosition === "right" && "pr-10",
          className,
        )}
      />

      {hasIcon && iconPosition === "right" && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
          {icon}
        </div>
      )}
    </div>
  );
}

```

## src\components\Logo\index.tsx

```tsx
import LogoIcon from "../../assets/images/WorldMix360-logo.png";

interface LogoProps {
  location?: "header" | "footer";
}

export function Logo({ location = "header" }: LogoProps) {
  const worldColor = location === "footer" ? "text-white" : "text-navy";
  const mix360 = location === "footer" ? "md:flex-wrap" : "md:flex-row";

  return (
    <div className="flex items-center gap-2 md:min-h-[60px]">
      <img
        src={LogoIcon}
        alt="Logo WorldMix360"
        className="h-14 w-14 md:h-16 md:w-16"
      />
      <div className="flex flex-col justify-center">
        <div className={`flex flex-col ${mix360}`} translate="no">
          <span className={`${worldColor} text-2xl font-bold md:text-3xl `}>
            WORLD
          </span>
          <div className="flex gap-1">
            <span className="text-blue text-2xl font-bold md:text-3xl">
              MIX
            </span>
            <span className="text-green text-2xl font-bold md:text-3xl">
              360
            </span>
          </div>
        </div>

        <p className="text-green-dark text-xs leading-4 md:text-sm md:leading-5">
          Um mundo de escolhas.
        </p>
      </div>
    </div>
  );
}

```

## src\components\Menu\index.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useCategories } from "../../contexts/useCategories";
import { useSubcategories } from "../../contexts/useSubcategories";
import { getCategoryIcon } from "./items";

type MenuVariant = "header" | "footer" | "mobile";

interface MenuProps {
  variant?: MenuVariant;
  className?: string;
  onNavigate?: () => void;
}

export function Menu({
  variant = "header",
  className = "",
  onNavigate,
}: MenuProps) {
  const isHeader = variant === "header";
  const isMobile = variant === "mobile";

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    fetchSubcategories,
  } = useSubcategories();

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  /*
   * ============================================================
   * CARREGAMENTO DAS CATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  /*
   * ============================================================
   * CARREGAMENTO DAS SUBCATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  /*
   * ============================================================
   * ESTRUTURA DINÂMICA DO MENU
   * ============================================================
   *
   * Categoria
   *   ├── Subcategoria
   *   ├── Subcategoria
   *   └── Subcategoria
   *
   * Somente categorias e subcategorias ativas são exibidas.
   */

  const menuCategories = useMemo(() => {
    return categories
      .filter((category) => category.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        id: category.id,
        label: category.name,
        slug: category.slug,
        icon: getCategoryIcon(category.slug),
        href: `/categoria/${category.slug}`,

        subcategories: subcategories
          .filter(
            (subcategory) =>
              subcategory.categoryId === category.id && subcategory.active,
          )
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((subcategory) => ({
            id: subcategory.id,
            label: subcategory.name,
            href: `/categoria/${category.slug}/${subcategory.slug}`,
          })),
      }));
  }, [categories, subcategories]);

  /*
   * ============================================================
   * FOOTER
   * ============================================================
   */

  if (variant === "footer") {
    return (
      <nav
        className={["mt-0 flex flex-col gap-1 text-sm text-white/80", className]
          .filter(Boolean)
          .join(" ")}
      >
        {menuCategories.map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className="block text-left text-sm transition hover:text-white"
          >
            {category.label}
          </Link>
        ))}
      </nav>
    );
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (categoriesLoading || subcategoriesLoading) {
    /*
     * Loading mobile
     */

    if (isMobile) {
      return (
        <nav
          className={["flex flex-col gap-2", className]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
        </nav>
      );
    }

    /*
     * Loading desktop
     */

    return (
      <nav
        className={[
          "hidden md:flex md:items-center md:justify-start md:gap-2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-32 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU MOBILE
   * ============================================================
   */

  if (isMobile) {
    return (
      <nav
        className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
      >
        {menuCategories.map((category) => {
          const Icon = category.icon;

          const isOpen = openCategory === category.id;

          const hasSubcategories = category.subcategories.length > 0;

          return (
            <div key={category.id}>
              {/* Categoria principal */}

              <div className="flex items-center rounded-lg transition hover:bg-white/5">
                <Link
                  to={category.href}
                  onClick={onNavigate}
                  className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left text-base font-medium text-white/90"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <Icon className="text-base" />
                  </span>

                  <span className="truncate">{category.label}</span>
                </Link>

                {/* Botão das subcategorias */}

                {hasSubcategories && (
                  <button
                    type="button"
                    aria-label={
                      isOpen
                        ? `Recolher ${category.label}`
                        : `Expandir ${category.label}`
                    }
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenCategory((current) =>
                        current === category.id ? null : category.id,
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
                  >
                    {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                )}
              </div>

              {/* Subcategorias */}

              {isOpen && hasSubcategories && (
                <div className="ml-8 border-l border-white/10 pl-3">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      {subcategory.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU DESKTOP
   * ============================================================
   *
   * O submenu usa Tailwind group-hover.
   *
   * Isso evita onMouseEnter/onMouseLeave em elementos
   * estáticos e elimina o aviso do Biome:
   *
   * a11y/noStaticElementInteractions
   */

  return (
    <nav
      className={[
        isHeader
          ? "hidden md:flex md:items-center md:justify-start md:gap-2 md:px-0 md:py-0 md:bg-transparent"
          : "flex flex-col gap-1 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {menuCategories.map((category) => {
        const Icon = category.icon;

        const hasSubcategories = category.subcategories.length > 0;

        return (
          <div key={category.id} className="group relative">
            {/* Categoria principal */}

            <Link
              to={category.href}
              className={[
                isHeader
                  ? "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#071a2f] transition hover:bg-slate-50 hover:text-[#0b3d66]"
                  : "block text-left text-sm transition hover:text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {variant !== "header" && <Icon className="mr-2 inline-block" />}

              <span>{category.label}</span>

              {hasSubcategories && isHeader && (
                <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* ==================================================
                SUBMENU DESKTOP
            ================================================== */}

            {isHeader && hasSubcategories && (
              <div className="absolute left-1/2 top-full z-50 hidden min-w-[250px] -translate-x-1/2 pt-3 group-hover:block">
                <div className="overflow-hidden rounded-2xl border border-[#e7edf5] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {/* Link para a categoria */}

                  <Link
                    to={category.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Ver {category.label}
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Subcategorias */}

                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <span>{subcategory.label}</span>

                      <FiChevronRight className="text-xs text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

```

## src\components\Menu\items.ts

```ts
import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiMonitor,
  FiShoppingBag,
  FiTag,
  FiTool,
} from "react-icons/fi";

export type MenuCategory = {
  label: string;
  icon: IconType;
  href: string;
  slug: string;
};

export type MenuItem = MenuCategory & {
  subcategories: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

/**
 * Ícone padrão para categorias.
 *
 * O slug é usado para manter os ícones atuais
 * mesmo com as categorias vindo da API.
 */
export function getCategoryIcon(slug: string): IconType {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug.includes("tecnologia")) {
    return FiMonitor;
  }

  if (normalizedSlug.includes("casa") || normalizedSlug.includes("utilidade")) {
    return FiTool;
  }

  if (normalizedSlug.includes("moda")) {
    return FiShoppingBag;
  }

  if (normalizedSlug.includes("pet")) {
    return FiHeart;
  }

  if (
    normalizedSlug.includes("digital") ||
    normalizedSlug.includes("produto-digital")
  ) {
    return FiGrid;
  }

  if (normalizedSlug.includes("oferta")) {
    return FiTag;
  }

  if (normalizedSlug.includes("blog")) {
    return FiBookOpen;
  }

  return FiGrid;
}

```

## src\components\OffersBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const offersBanners = [
  {
    eyebrow: "Ofertas imperdíveis",
    title: "Descontos de até",
    highlight: " 50%",
    description:
      "Aproveite promoções exclusivas em tecnologia, moda e muito mais.",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155223f9c8?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Produtos em promoção com grandes descontos",
    href: "/ofertas",
    cta: "Aproveitar agora",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function OffersBanner() {
  return (
    <section
      aria-label="Ofertas especiais"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="offers-banner h-[400px] md:h-[500px]"
      >
        {offersBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative h-full overflow-hidden bg-gradient-to-br from-navy via-[#0b3d66] to-blue">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#9ad7ff]">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\components\product\ProductBreadcrumb.tsx

```tsx
import { Link } from "react-router-dom";

export function ProductBreadcrumb() {
  return (
    <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
      <Link to="/" className="transition hover:text-[#1769e0]">
        Início
      </Link>

      <span className="px-2">/</span>

      <span>Detalhes do produto</span>
    </nav>
  );
}

```

## src\components\product\ProductDescription.tsx

```tsx
import DOMPurify from "dompurify";
import type { ReactNode } from "react";

import type { Product } from "../../contexts/ProductsContext";

type ProductDescriptionProps = {
  product: Product;
};

function decodeHtmlEntities(value: string): string {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = value;

  return textarea.value;
}

function normalizeDescription(value: string): string {
  if (!value.trim()) {
    return "";
  }

  let normalized = value.trim();

  if (
    normalized.includes("&lt;") ||
    normalized.includes("&gt;") ||
    normalized.includes("&amp;lt;") ||
    normalized.includes("&amp;gt;")
  ) {
    normalized = decodeHtmlEntities(normalized);

    if (normalized.includes("&lt;") || normalized.includes("&gt;")) {
      normalized = decodeHtmlEntities(normalized);
    }
  }

  return normalized;
}

function renderDescriptionHtml(html: string): ReactNode {
  if (!html.trim()) {
    return null;
  }

  const parser = new DOMParser();
  const parsedDocument = parser.parseFromString(html, "text/html");

  function renderNode(node: ChildNode, key: string): ReactNode {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return null;
    }

    const element = node as HTMLElement;

    const children = Array.from(element.childNodes).map((child, index) =>
      renderNode(child, `${key}-${index}`),
    );

    switch (element.tagName.toLowerCase()) {
      case "p":
        return <p key={key}>{children}</p>;

      case "br":
        return <br key={key} />;

      case "strong":
        return <strong key={key}>{children}</strong>;

      case "b":
        return <b key={key}>{children}</b>;

      case "em":
        return <em key={key}>{children}</em>;

      case "i":
        return <i key={key}>{children}</i>;

      case "u":
        return <u key={key}>{children}</u>;

      case "h2":
        return <h2 key={key}>{children}</h2>;

      case "h3":
        return <h3 key={key}>{children}</h3>;

      case "h4":
        return <h4 key={key}>{children}</h4>;

      case "ul":
        return <ul key={key}>{children}</ul>;

      case "ol":
        return <ol key={key}>{children}</ol>;

      case "li":
        return <li key={key}>{children}</li>;

      case "blockquote":
        return <blockquote key={key}>{children}</blockquote>;

      case "hr":
        return <hr key={key} />;

      case "a": {
        const href = element.getAttribute("href");

        if (!href) {
          return <span key={key}>{children}</span>;
        }

        return (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }

      default:
        return <span key={key}>{children}</span>;
    }
  }

  return Array.from(parsedDocument.body.childNodes).map((node, index) =>
    renderNode(node, `description-${index}`),
  );
}

export function ProductDescription({ product }: ProductDescriptionProps) {
  const normalizedDescription = normalizeDescription(product.description || "");

  const safeDescription = DOMPurify.sanitize(normalizedDescription, {
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

  if (!safeDescription) {
    return null;
  }

  const renderedDescription = renderDescriptionHtml(safeDescription);

  return (
    <section
      className="mt-10 rounded-[28px] border border-[#e7edf5] bg-white p-8 shadow-[0_12px_35px_rgba(15,23,42,0.05)] md:p-10"
      aria-labelledby="product-description-title"
    >
      <h2
        id="product-description-title"
        className="mb-6 text-2xl font-black text-[#071a2f]"
      >
        Descrição do produto
      </h2>

      <div
        className="
          product-description
          text-[15px]
          leading-7
          text-[#52657c]

          [&_h2]:mb-4
          [&_h2]:mt-8
          [&_h2]:text-2xl
          [&_h2]:font-black
          [&_h2]:leading-tight
          [&_h2]:text-[#071a2f]

          [&_h3]:mb-3
          [&_h3]:mt-7
          [&_h3]:text-xl
          [&_h3]:font-bold
          [&_h3]:text-[#071a2f]

          [&_h4]:mb-2
          [&_h4]:mt-6
          [&_h4]:text-lg
          [&_h4]:font-bold
          [&_h4]:text-[#071a2f]

          [&_p]:mb-4

          [&_ul]:mb-5
          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:mb-5
          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_li]:mb-2

          [&_strong]:font-bold
          [&_strong]:text-[#071a2f]

          [&_b]:font-bold
          [&_b]:text-[#071a2f]

          [&_em]:italic

          [&_u]:underline
          [&_u]:underline-offset-2

          [&_a]:font-semibold
          [&_a]:text-[#1769e0]
          [&_a]:underline
          [&_a]:underline-offset-2

          [&_blockquote]:my-5
          [&_blockquote]:border-l-4
          [&_blockquote]:border-[#1769e0]
          [&_blockquote]:bg-[#f7f9fc]
          [&_blockquote]:px-5
          [&_blockquote]:py-4
          [&_blockquote]:italic
          [&_blockquote]:text-[#52657c]

          [&_hr]:my-7
          [&_hr]:border-[#e7edf5]
        "
      >
        {renderedDescription}
      </div>
    </section>
  );
}

```

## src\components\product\ProductGallery.tsx

```tsx
import { useState } from "react";

import type { Product } from "../../contexts/ProductsContext";

type ProductGalleryProps = {
  product: Product;
};

type GalleryImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productImages: GalleryImage[] = [
    {
      id: "primary",
      imageUrl: product.imageUrl,
      sortOrder: -1,
    },
    ...(Array.isArray(product.images)
      ? product.images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
          sortOrder: image.sortOrder,
        }))
      : []),
  ]
    .filter((image) => image.imageUrl.trim())
    .filter(
      (image, index, array) =>
        array.findIndex(
          (item) => item.imageUrl.trim() === image.imageUrl.trim(),
        ) === index,
    )
    .sort((a, b) => {
      if (a.id === "primary") {
        return -1;
      }

      if (b.id === "primary") {
        return 1;
      }

      return a.sortOrder - b.sortOrder;
    });

  const safeSelectedImageIndex =
    selectedImageIndex >= productImages.length ? 0 : selectedImageIndex;

  const selectedImage =
    productImages[safeSelectedImageIndex]?.imageUrl || product.imageUrl;

  return (
    <div className="bg-[#f7f9fc] p-6 md:p-8">
      <div className="flex min-h-[340px] items-center justify-center md:min-h-[470px]">
        <img
          src={selectedImage}
          alt={product.title}
          className="max-h-[420px] w-full object-contain"
        />
      </div>

      {productImages.length > 1 && (
        <div className="mt-6">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
            {productImages.map((image, index) => {
              const isSelected = index === safeSelectedImageIndex;

              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Exibir imagem ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`flex aspect-square items-center justify-center overflow-hidden rounded-xl border-2 bg-white p-2 transition ${
                    isSelected
                      ? "border-[#1769e0] shadow-[0_0_0_2px_rgba(23,105,224,0.12)]"
                      : "border-transparent hover:border-[#b9c9dc]"
                  }`}
                >
                  <img
                    src={image.imageUrl}
                    alt={`${product.title} - imagem ${index + 1}`}
                    className="h-full w-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

```

## src\components\product\ProductInfo.tsx

```tsx
import type { Product } from "../../contexts/ProductsContext";
import { formatCurrencyBRL } from "../../utils/formatCurrency";
import { ProductRating } from "./ProductRating";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const price = formatCurrencyBRL(product.price);
  const originalPrice = product.originalPrice
    ? formatCurrencyBRL(product.originalPrice)
    : null;

  return (
    <div className="flex flex-col justify-center p-8 md:p-12">
      {product.category && (
        <span className="mb-5 w-fit rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#0b3d66]">
          {product.category}
        </span>
      )}

      <h1 className="text-3xl font-black leading-tight text-[#071a2f] md:text-4xl">
        {product.title}
      </h1>

      <ProductRating
        rating={product.rating}
        reviewsCount={product.reviewsCount}
      />

      {product.shortDescription && (
        <p className="mt-5 text-sm leading-6 text-[#52657c]">
          {product.shortDescription}
        </p>
      )}

      <div className="mt-8 border-y border-[#edf2f7] py-6">
        <p className="text-sm text-[#667085]">
          Preço apresentado no momento da consulta
        </p>

        {originalPrice && (
          <p className="mt-2 text-sm text-gray-500 line-through">
            {originalPrice}
          </p>
        )}

        <p className="mt-1 text-3xl font-black text-[#071a2f]">{price}</p>
      </div>

      <p className="mt-6 text-sm leading-6 text-[#52657c]">
        Você será direcionado ao site do parceiro para conferir disponibilidade,
        frete, avaliações e finalizar a compra.
      </p>

      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#20b35b] px-6 font-bold text-white transition hover:bg-[#159447]"
      >
        Ver oferta
      </a>

      <p className="mt-4 text-xs text-[#667085]">
        Este é um link de afiliado. A compra é realizada diretamente no site do
        parceiro.
      </p>
    </div>
  );
}

```

## src\components\product\ProductRating.tsx

```tsx
type ProductRatingProps = {
  rating?: number | null;
  reviewsCount: number;
};

export function ProductRating({ rating, reviewsCount }: ProductRatingProps) {
  if (rating === null || rating === undefined || reviewsCount <= 0) {
    return null;
  }

  const normalizedRating = Number(rating);
  const roundedRating = Math.round(normalizedRating);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={`star-${star}`}
            className={star <= roundedRating ? "text-yellow" : "text-gray-500"}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>

      <span className="text-sm font-bold text-[#071a2f]">
        {normalizedRating.toFixed(1)}
      </span>

      <span className="text-sm text-[#667085]">
        ({reviewsCount.toLocaleString("pt-BR")} avaliações)
      </span>
    </div>
  );
}

```

## src\components\ProductCard\index.tsx

```tsx
import { Link } from "react-router-dom";

import type { Product } from "../../contexts/ProductsContext";
import { formatCurrencyBRL } from "../../utils/formatCurrency";
import { ProductRating } from "../product/ProductRating";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  console.log("PRODUTO DO CARD:", product);
  const formattedPrice = formatCurrencyBRL(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? formatCurrencyBRL(product.originalPrice)
    : null;

  return (
    <div
      className={`
    flex h-[420px] w-full flex-col 
    items-center rounded-2xl border border-[#e7edf5] bg-white p-4 text-center shadow-md transition-shadow hover:bg-gray-50 hover:shadow-lg`}
    >
      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mb-3 flex h-40 w-full shrink-0 items-center justify-center rounded-xl bg-[#f8fafc] p-2"
        aria-label={`Ver detalhes de ${product.title}`}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </Link>

      {product.category && (
        <p className="mb-2 flex h-6 shrink-0 items-center self-start rounded-full bg-[#edf5ff] px-2.5 py-1 text-[11px] font-semibold text-[#0b3d66]">
          {product.category}
        </p>
      )}

      <ProductRating
        rating={product.rating}
        reviewsCount={product.reviewsCount}
      />

      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mb-1 line-clamp-2 min-h-10 w-full text-left text-sm font-semibold text-gray-800 hover:text-[#1769e0]"
      >
        {product.title}
      </Link>

      <div className="mb-3 flex min-h-12 flex-col justify-end self-start text-left">
        {formattedOriginalPrice && (
          <p className="text-xs text-gray-500 line-through">
            {formattedOriginalPrice}
          </p>
        )}

        <p className="font-bold text-gray-900">{formattedPrice}</p>
      </div>

      <Link
        to={`/produto/${encodeURIComponent(product.slug)}`}
        className="mt-auto flex h-10 w-full items-center justify-center rounded-lg bg-green px-4 py-2 text-sm font-medium text-white hover:bg-green-dark"
      >
        VER DETALHES
      </Link>
    </div>
  );
}

```

## src\components\SearchBar\index.tsx

```tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { Icon } from "../Icon";
import { InputText } from "../InputText";

interface SearchBarProps {
  className?: string;
  onSearch?: () => void;
}

export function SearchBar({ className = "", onSearch }: SearchBarProps) {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  function handleSearch() {
    const value = search.trim();

    if (!value) {
      return;
    }

    navigate(`/produtos?search=${encodeURIComponent(value)}`);

    setSearch("");

    onSearch?.();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  }

  return (
    <div className={className}>
      <InputText
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        className="h-12 w-full min-w-0"
        iconPosition="right"
        placeholder="Buscar produtos, categorias ou artigos"
        icon={
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Pesquisar"
            className="flex items-center justify-center"
          >
            <Icon svg={SearchIcon} />
          </button>
        }
      />
    </div>
  );
}

```

## src\components\Session\index.tsx

```tsx
import React from "react";
import { FiBox } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { v4 as uuidv4 } from "uuid";

interface SessionProps {
  title?: string;
  children: React.ReactNode | React.ReactNode[];
}

export function Session({ title, children }: SessionProps) {
  return (
    <section className="mx-auto w-full md:max-w-[1200px] bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-md">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBox className="text-white text-xl" />
          <h2 className="text-blue text-lg font-bold">{title}</h2>
        </div>
        <a href="##" className="text-sm font-medium text-navy hover:underline">
          Ver todos
        </a>
      </header>

      {/* Carrossel */}
      <Swiper
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <SwiperSlide
              key={uuidv4()}
              id={uuidv4()}
              className="!flex !h-auto !items-stretch"
            >
              {child}
            </SwiperSlide>
          ) : (
            child
          ),
        )}
      </Swiper>
    </section>
  );
}

```

## src\components\SocialBanner\index.tsx

```tsx
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const socialBanners = [
  {
    eyebrow: "Conecte-se conosco",
    title: "Siga no",
    highlight: " Instagram",
    description:
      "Acompanhe novidades, bastidores e dicas exclusivas diretamente no nosso perfil.",
    image:
      "https://images.unsplash.com/photo-1702390734475-d81dd8ae8fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Feed do Instagram com posts inspiradores",
    href: "https://instagram.com/seuperfil",
    cta: "Visitar Instagram",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-purple-900 via-pink-700 to-red-500",
  },
  {
    eyebrow: "Conteúdo em vídeo",
    title: "Assista no",
    highlight: " YouTube",
    description:
      "Tutoriais, reviews e muito mais para você aprender e se inspirar.",
    image:
      "https://images.unsplash.com/photo-1615883962708-708904fe162e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHx5b3V0dWJlfGVufDB8fDB8fHww",
    imageAlt: "Tela de vídeos no YouTube",
    href: "https://youtube.com/seucanal",
    cta: "Ir para YouTube",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-red-800 via-red-600 to-orange-500",
  },
  {
    eyebrow: "Novidades rápidas",
    title: "Acompanhe no",
    highlight: " Twitter",
    description:
      "Fique por dentro das últimas atualizações e interaja em tempo real.",
    image:
      "https://images.unsplash.com/photo-1631856955350-77f4023dff2b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Timeline do Twitter com posts recentes",
    href: "https://twitter.com/seuperfil",
    cta: "Seguir no Twitter",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-sky-900 via-blue-700 to-cyan-500",
  },
];

export function SocialBanner() {
  return (
    <section
      aria-label="Redes sociais WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="social-banner h-[400px] md:h-[500px]"
      >
        {socialBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.gradient}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              {/* Overlay mais escuro para contraste */}
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 font-bold text-white transition hover:bg-navy"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

```

## src\contexts\AuthContext.ts

```ts
import { createContext } from "react";
import type { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

```

## src\contexts\AuthProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const USER_STORAGE_KEY = "@worldmix360:user";
const TOKEN_STORAGE_KEY = "@worldmix360:token";

type LoginResponse = {
  token: string;
  user: User;
};

/**
 * Recupera o usuário salvo no navegador.
 */
function getStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

/**
 * Recupera o token salvo no navegador.
 */
function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  /**
   * O estado inicial já é carregado do localStorage.
   *
   * Dessa forma não precisamos de um useEffect para executar
   * setUser() e setToken() depois da montagem do componente.
   */
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Realiza o login.
   */
  const signIn = useCallback(
    async (email: string, password: string): Promise<User> => {
      setIsLoading(true);

      try {
        const response = await fetch(`${apiUrl}/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        let data: Partial<LoginResponse> & {
          message?: string;
          error?: string;
        };

        try {
          data = await response.json();
        } catch {
          throw new Error("Resposta inválida do servidor.");
        }

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Email ou senha inválidos.",
          );
        }

        if (!data.token || !data.user) {
          throw new Error("Resposta de autenticação inválida.");
        }

        /**
         * Persiste a sessão.
         */
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

        /**
         * Atualiza o estado da aplicação.
         */
        setToken(data.token);
        setUser(data.user);

        return data.user;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * Encerra a sessão.
   */
  const signOut = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signOut,
    }),
    [user, token, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

```

## src\contexts\CategoriesContext.ts

```ts
import { createContext } from "react";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  subcategories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type CategoryFormData = {
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type CategoriesContextValue = {
  categories: Category[];
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  getCategoryById: (id: string) => Promise<Category | null>;

  createCategory: (data: CategoryFormData, token: string) => Promise<Category>;

  updateCategory: (
    id: string,
    data: Partial<CategoryFormData>,
    token: string,
  ) => Promise<Category>;

  deleteCategory: (id: string, token: string) => Promise<void>;
};

export const CategoriesContext = createContext<
  CategoriesContextValue | undefined
>(undefined);

```

## src\contexts\CategoriesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { Category, CategoryFormData } from "./CategoriesContext";

import { CategoriesContext } from "./CategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/categories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as categorias.",
        );
      }

      setCategories(Array.isArray(data) ? data : (data.categories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar categorias.",
      );

      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getCategoryById = useCallback(
    async (id: string): Promise<Category | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/categories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a categoria.",
          );
        }

        return data.category ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createCategory = useCallback(
    async (
      categoryData: CategoryFormData,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) => [...previous, category]);

      return category;
    },
    [],
  );

  const updateCategory = useCallback(
    async (
      id: string,
      categoryData: Partial<CategoryFormData>,
      token: string,
    ): Promise<Category> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar categoria.");
      }

      const category = data.category ?? data;

      setCategories((previous) =>
        previous.map((item) => (item.id === id ? category : item)),
      );

      return category;
    },
    [],
  );

  const deleteCategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir categoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setCategories((previous) =>
        previous.filter((category) => category.id !== id),
      );
    },
    [],
  );

  const value = useMemo(
    () => ({
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [
      categories,
      loading,
      error,
      fetchCategories,
      getCategoryById,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

```

## src\contexts\MarketplacesContext.tsx

```tsx
import { createContext } from "react";
export type Marketplace = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  active: boolean;
  sortOrder: number;
  products?: Array<{ id: string; name: string; slug: string }>;
};
export type MarketplaceFormData = {
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplaceUpdateData = {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplacesContextValue = {
  marketplaces: Marketplace[];
  loading: boolean;
  error: string | null;
  fetchMarketplaces: () => Promise<void>;
  getMarketplaceById: (id: string) => Promise<Marketplace | null>;
  createMarketplace: (
    data: MarketplaceFormData,
    token: string,
  ) => Promise<Marketplace>;
  updateMarketplace: (
    id: string,
    data: MarketplaceUpdateData,
    token: string,
  ) => Promise<Marketplace>;
  deleteMarketplace: (id: string, token: string) => Promise<void>;
};
export const MarketplacesContext = createContext<
  MarketplacesContextValue | undefined
>(undefined);

```

## src\contexts\MarketplacesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Marketplace,
  type MarketplaceFormData,
  MarketplacesContext,
  type MarketplaceUpdateData,
} from "./MarketplacesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function MarketplacesProvider({ children }: { children: ReactNode }) {
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const fetchMarketplaces = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/marketplaces`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar os marketplaces.",
        );
      }

      setMarketplaces(Array.isArray(data) ? data : (data.marketplaces ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar marketplaces.",
      );

      setMarketplaces([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getMarketplaceById = useCallback(
    async (id: string): Promise<Marketplace | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/marketplaces/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o marketplace.",
          );
        }

        return data.marketplace ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createMarketplace = useCallback(
    async (
      marketplaceData: MarketplaceFormData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) => [...previous, marketplace]);

      return marketplace;
    },
    [],
  );

  const updateMarketplace = useCallback(
    async (
      id: string,
      marketplaceData: MarketplaceUpdateData,
      token: string,
    ): Promise<Marketplace> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(marketplaceData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar marketplace.");
      }

      const marketplace = data.marketplace ?? data;

      setMarketplaces((previous) =>
        previous.map((item) => (item.id === id ? marketplace : item)),
      );

      return marketplace;
    },
    [],
  );

  const deleteMarketplace = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/marketplaces/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir marketplace.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setMarketplaces((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    }),
    [
      marketplaces,
      loading,
      error,
      fetchMarketplaces,
      getMarketplaceById,
      createMarketplace,
      updateMarketplace,
      deleteMarketplace,
    ],
  );

  return (
    <MarketplacesContext.Provider value={value}>
      {children}
    </MarketplacesContext.Provider>
  );
}

```

## src\contexts\MercadoLivreContext.ts

```ts
import { createContext } from "react";

import type { AffiliateProduct } from "../types/AffiliateProduct";

export type MercadoLivreProduct = AffiliateProduct;

export type MercadoLivreContextValue = {
  products: MercadoLivreProduct[];
  loading: boolean;
  error: string | null;
  search: (term: string) => Promise<void>;
};

export const MercadoLivreContext = createContext<
  MercadoLivreContextValue | undefined
>(undefined);

```

## src\contexts\MercadoLivreProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  MercadoLivreContext,
  type MercadoLivreProduct,
} from "./MercadoLivreContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type ApiProduct = {
  id: string;
  title: string;
  price?: number | string;
  imageUrl?: string | null;
  thumbnail?: string | null;
  pictures?: Array<{
    url: string;
  }>;
  affiliateUrl?: string | null;
  permalink?: string | null;
};

function normalizeProduct(item: ApiProduct): MercadoLivreProduct {
  return {
    id: item.id,
    title: item.title,
    price: Number(item.price ?? 0),
    image:
      item.imageUrl ??
      item.thumbnail ??
      item.pictures?.[0]?.url ??
      "https://http2.mlstatic.com/storage/developers-site-cms-admin/CDN/MLB-592089271-mlb-banner.jpg",
    rating: 4.5,
    marketplace: "mercado-livre",
    affiliateUrl: item.affiliateUrl ?? item.permalink ?? "#",
  };
}

export function MercadoLivreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<MercadoLivreProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/products?search=${encodeURIComponent(term)}`,
      );

      if (!response.ok) {
        throw new Error("Falha ao buscar produtos no Mercado Livre");
      }

      const data = await response.json();

      const mappedProducts = (data.products ?? [])
        .slice(0, 8)
        .map(normalizeProduct);

      setProducts(mappedProducts);
    } catch (requestError) {
      console.error(requestError);
      setError("Não foi possível carregar os produtos no momento.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      search,
    }),
    [products, loading, error, search],
  );

  return (
    <MercadoLivreContext.Provider value={value}>
      {children}
    </MercadoLivreContext.Provider>
  );
}

```

## src\contexts\ProductsContext.ts

```ts
import { createContext } from "react";

export type ProductImage = {
  id: string;
  imageUrl: string;
  sortOrder: number;
};

export type ProductImageFormData = {
  imageUrl: string;
  sortOrder?: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;

  description?: string | null;
  shortDescription?: string | null;

  imageUrl: string;

  images?: ProductImage[];

  price: number;
  originalPrice?: number | null;

  currency: string;

  rating?: number | null;
  reviewsCount: number;

  affiliateUrl: string;

  subcategoryId?: string;
  marketplaceId?: string;

  category?: string | null;

  available: boolean;
  featured: boolean;
  active: boolean;

  seoTitle?: string | null;
  seoDescription?: string | null;
};

export type ProductFormData = {
  title: string;
  description?: string;
  shortDescription?: string;

  imageUrl: string;

  images?: ProductImageFormData[];

  price: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl: string;

  subcategoryId: string;
  marketplaceId: string;

  featured?: boolean;
  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductUpdateData = {
  title?: string;
  description?: string;
  shortDescription?: string;

  imageUrl?: string;

  images?: ProductImageFormData[];

  price?: number;
  originalPrice?: number;

  currency?: string;

  rating?: number;
  reviewsCount?: number;

  affiliateUrl?: string;

  subcategoryId?: string;
  marketplaceId?: string;

  featured?: boolean;
  available?: boolean;
  active?: boolean;

  seoTitle?: string;
  seoDescription?: string;
};

export type ProductStatusData = {
  active?: boolean;
  available?: boolean;
  featured?: boolean;
};

export type ProductsContextValue = {
  products: Product[];
  loading: boolean;
  error: string | null;

  fetchProducts: (category?: string, search?: string) => Promise<void>;

  fetchAdminProducts: (
    token: string,
    filters?: {
      search?: string;
      subcategoryId?: string;
      marketplaceId?: string;
      featured?: boolean;
      active?: boolean;
      available?: boolean;
    },
  ) => Promise<void>;

  getProductBySlug: (slug: string) => Promise<Product | null>;

  getProductById: (id: string, token: string) => Promise<Product | null>;

  createProduct: (data: ProductFormData, token: string) => Promise<Product>;

  updateProduct: (
    id: string,
    data: ProductUpdateData,
    token: string,
  ) => Promise<Product>;

  updateProductStatus: (
    id: string,
    data: ProductStatusData,
    token: string,
  ) => Promise<Product>;
};

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

```

## src\contexts\ProductsProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import {
  type Product,
  type ProductFormData,
  type ProductStatusData,
  ProductsContext,
  type ProductUpdateData,
} from "./ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Listagem pública
  const fetchProducts = useCallback(
    async (category?: string, search?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (category) {
          params.set("category", category);
        }

        if (search) {
          params.set("search", search);
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products${queryString ? `?${queryString}` : ""}`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erro ao carregar produtos.",
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Listagem administrativa
  const fetchAdminProducts = useCallback(
    async (
      token: string,
      filters?: {
        search?: string;
        subcategoryId?: string;
        marketplaceId?: string;
        featured?: boolean;
        active?: boolean;
        available?: boolean;
      },
    ) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();

        if (filters?.search) {
          params.set("search", filters.search);
        }

        if (filters?.subcategoryId) {
          params.set("subcategoryId", filters.subcategoryId);
        }

        if (filters?.marketplaceId) {
          params.set("marketplaceId", filters.marketplaceId);
        }

        if (filters?.featured !== undefined) {
          params.set("featured", String(filters.featured));
        }

        if (filters?.active !== undefined) {
          params.set("active", String(filters.active));
        }

        if (filters?.available !== undefined) {
          params.set("available", String(filters.available));
        }

        const queryString = params.toString();

        const response = await fetch(
          `${apiUrl}/products/admin${queryString ? `?${queryString}` : ""}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar os produtos.",
          );
        }

        setProducts(data.products ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar os produtos.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Detalhe por slug
  const getProductBySlug = useCallback(
    async (slug: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/${encodeURIComponent(slug)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Não foi possível carregar o produto.");
        }

        return data.product;
      } catch {
        return null;
      }
    },
    [],
  );

  // Detalhe por ID
  const getProductById = useCallback(
    async (id: string, token: string): Promise<Product | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/products/id/${encodeURIComponent(id)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar o produto.",
          );
        }

        return data.product ?? null;
      } catch {
        return null;
      }
    },
    [],
  );

  // Criar
  const createProduct = useCallback(
    async (productData: ProductFormData, token: string): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar produto");
      }

      setProducts((prev) => [...prev, data.product]);

      return data.product;
    },
    [],
  );

  // Atualizar
  const updateProduct = useCallback(
    async (
      id: string,
      productData: ProductUpdateData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar produto");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  // Atualizar status
  const updateProductStatus = useCallback(
    async (
      id: string,
      statusData: ProductStatusData,
      token: string,
    ): Promise<Product> => {
      const response = await fetch(`${apiUrl}/products/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao atualizar status");
      }

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? data.product : product)),
      );

      return data.product;
    },
    [],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    }),
    [
      products,
      loading,
      error,
      fetchProducts,
      fetchAdminProducts,
      getProductBySlug,
      getProductById,
      createProduct,
      updateProduct,
      updateProductStatus,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

```

## src\contexts\SubcategoriesContext.tsx

```tsx
import { createContext } from "react";

export type Subcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;

  category?: {
    id: string;
    name: string;
    slug: string;
  };

  products?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type SubcategoryFormData = {
  categoryId: string;
  name: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoryUpdateData = {
  name?: string;
  description?: string;
  image?: string;
  active?: boolean;
  sortOrder?: number;
};

export type SubcategoriesContextValue = {
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;

  fetchSubcategories: () => Promise<void>;
  getSubcategoryById: (id: string) => Promise<Subcategory | null>;

  createSubcategory: (
    data: SubcategoryFormData,
    token: string,
  ) => Promise<Subcategory>;

  updateSubcategory: (
    id: string,
    data: SubcategoryUpdateData,
    token: string,
  ) => Promise<Subcategory>;

  deleteSubcategory: (id: string, token: string) => Promise<void>;
};

export const SubcategoriesContext = createContext<
  SubcategoriesContextValue | undefined
>(undefined);

```

## src\contexts\SubcategoriesProvider.tsx

```tsx
import { type ReactNode, useCallback, useMemo, useState } from "react";

import type {
  Subcategory,
  SubcategoryFormData,
  SubcategoryUpdateData,
} from "./SubcategoriesContext";

import { SubcategoriesContext } from "./SubcategoriesContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function SubcategoriesProvider({ children }: { children: ReactNode }) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcategories = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/subcategories`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ?? "Não foi possível carregar as subcategorias.",
        );
      }

      setSubcategories(Array.isArray(data) ? data : (data.subcategories ?? []));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Erro ao carregar subcategorias.",
      );

      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSubcategoryById = useCallback(
    async (id: string): Promise<Subcategory | null> => {
      try {
        const response = await fetch(
          `${apiUrl}/subcategories/${encodeURIComponent(id)}`,
        );

        if (response.status === 404) {
          return null;
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ?? "Não foi possível carregar a subcategoria.",
          );
        }

        return data.subcategory ?? data;
      } catch {
        return null;
      }
    },
    [],
  );

  const createSubcategory = useCallback(
    async (
      subcategoryData: SubcategoryFormData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao criar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) => [...previous, subcategory]);

      return subcategory;
    },
    [],
  );

  const updateSubcategory = useCallback(
    async (
      id: string,
      subcategoryData: SubcategoryUpdateData,
      token: string,
    ): Promise<Subcategory> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(subcategoryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Erro ao atualizar subcategoria.");
      }

      const subcategory = data.subcategory ?? data;

      setSubcategories((previous) =>
        previous.map((item) => (item.id === id ? subcategory : item)),
      );

      return subcategory;
    },
    [],
  );

  const deleteSubcategory = useCallback(
    async (id: string, token: string): Promise<void> => {
      const response = await fetch(`${apiUrl}/subcategories/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        let message = "Erro ao excluir subcategoria.";

        try {
          const data = await response.json();
          message = data.message ?? message;
        } catch {
          // Resposta 204 não possui corpo.
        }

        throw new Error(message);
      }

      setSubcategories((previous) => previous.filter((item) => item.id !== id));
    },
    [],
  );

  const value = useMemo(
    () => ({
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    }),
    [
      subcategories,
      loading,
      error,
      fetchSubcategories,
      getSubcategoryById,
      createSubcategory,
      updateSubcategory,
      deleteSubcategory,
    ],
  );

  return (
    <SubcategoriesContext.Provider value={value}>
      {children}
    </SubcategoriesContext.Provider>
  );
}

```

## src\contexts\useAuth.ts

```ts
import { useContext } from "react";

import { AuthContext } from "./AuthContext";

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}

```

## src\contexts\useCategories.ts

```ts
import { useContext } from "react";

import { CategoriesContext } from "./CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (!context) {
    throw new Error(
      "useCategories deve ser utilizado dentro de CategoriesProvider.",
    );
  }

  return context;
}

```

## src\contexts\useMarketplaces.ts

```ts
import { useContext } from "react";
import { MarketplacesContext } from "./MarketplacesContext";
export function useMarketplaces() {
  const context = useContext(MarketplacesContext);
  if (!context) {
    throw new Error(
      "useMarketplaces deve ser utilizado dentro de MarketplacesProvider.",
    );
  }
  return context;
}

```

## src\contexts\useMercadoLivre.ts

```ts
import { useContext } from "react";

import { MercadoLivreContext } from "./MercadoLivreContext";

export function useMercadoLivre() {
  const context = useContext(MercadoLivreContext);

  if (!context) {
    throw new Error(
      "useMercadoLivre deve ser usado dentro de MercadoLivreProvider",
    );
  }

  return context;
}

```

## src\contexts\useProducts.ts

```ts
import { useContext } from "react";

import { ProductsContext } from "./ProductsContext";

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }

  return context;
}

```

## src\contexts\useSubcategories.ts

```ts
import { useContext } from "react";

import { SubcategoriesContext } from "./SubcategoriesContext";

export function useSubcategories() {
  const context = useContext(SubcategoriesContext);

  if (!context) {
    throw new Error(
      "useSubcategories deve ser utilizado dentro de SubcategoriesProvider.",
    );
  }

  return context;
}

```

## src\custon.d.ts

```ts
declare module "*.svg?react" {
  import type * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

```

## src\index.css

@import "tailwindcss";

@theme {
  --color-*: initial;
  --color-navy: #071a2f;
  --color-blue: #1769e0;
  --color-blue-light: #eaf3ff;
  --color-green: #20b35b;
  --color-green-dark: #159447;
  --color-white: #ffffff;
  --color-gray-50: #f7f9fc;
  --color-gray-100: #eef2f6;
  --color-gray-500: #667085;
  --color-gray-700: #344054;
  --color-gray-900: #101828;
  --color-yellow: #f5b700;

  --color-danger: #d92d20;
  --color-danger-light: #d8756d;
}

.home-banner .swiper-button-prev,
.home-banner .swiper-button-next {
  color: #1769e0;
  width: 2.75rem;
  height: 2.75rem;
  filter: drop-shadow(0 0 5px rgb(255 255 255 / 90%))
    drop-shadow(0 0 10px rgb(23 105 224 / 80%));
  transition:
    filter 180ms ease,
    transform 180ms ease;
}

.home-banner .swiper-button-prev:hover,
.home-banner .swiper-button-next:hover {
  filter: drop-shadow(0 0 7px rgb(255 255 255 / 100%))
    drop-shadow(0 0 14px rgb(23 105 224 / 100%));
  transform: scale(1.08);
}

.home-banner .swiper-button-prev::after,
.home-banner .swiper-button-next::after {
  font-size: 1rem;
  font-weight: 700;
}

.home-banner .swiper-pagination-bullet {
  background: #ffffff;
  opacity: 0.55;
}

.home-banner .swiper-pagination-bullet-active {
  background: #20b35b;
  opacity: 1;
}


## src\main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

```

## src\pages\AboutPage.tsx

```tsx
const stats = [
  { value: "12k+", label: "produtos em catálogo" },
  { value: "98%", label: "satisfação de clientes" },
  { value: "24h", label: "tempo médio de resposta" },
  { value: "+200", label: "marcas parceiras" },
];

const values = [
  {
    title: "Confiança",
    description:
      "Priorizamos transparência, qualidade e suporte para que cada compra seja segura e bem informada.",
  },
  {
    title: "Curadoria",
    description:
      "Selecionamos produtos que agregam valor real à rotina das pessoas, com foco em praticidade e desempenho.",
  },
  {
    title: "Inovação",
    description:
      "Usamos tecnologia para simplificar a experiência de compra, compare e escolha de forma inteligente.",
  },
];

export function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-12 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Sobre nós
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            Conectando pessoas com melhores escolhas.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            A WorldMix360 nasceu para tornar as compras mais simples, informadas
            e confiáveis. Acreditamos que a tecnologia pode transformar a
            experiência de compra em algo mais humanizado, inteligente e útil
            para a vida real.
          </p>
        </div>
        <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Grupo de pessoas colaborando em um ambiente de trabalho"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="grid gap-8 rounded-[32px] border border-[#e7edf5] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-2 md:p-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossa história
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Mais do que uma loja: um ecossistema de descoberta.
          </h2>
        </div>

        <div className="space-y-4 text-base leading-7 text-[#52657c]">
          <p>
            Começamos com a ideia de reunir produtos relevantes, marcas
            confiáveis e experiências de compra mais agradáveis em uma só
            plataforma.
          </p>
          <p>
            Hoje, ajudamos milhares de pessoas a encontrar soluções práticas em
            tecnologia, casa, moda, pets, ofertas e produtos digitais, sempre
            com atenção ao valor, qualidade e clareza.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-black text-[#071a2f]">{stat.value}</p>
            <p className="mt-2 text-sm text-[#52657c]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossos valores
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            O que nos move todos os dias
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[26px] border border-[#e7edf5] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ff] text-lg font-bold text-[#0b3d66]">
                {value.title.charAt(0)}
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#071a2f]">
                {value.title}
              </h3>
              <p className="text-sm leading-6 text-[#52657c]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nosso jeito de trabalhar
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Valores presentes em cada escolha
          </h2>
        </div>
        <div className="space-y-5">
          {[
            [
              "Confiança",
              "Transparência em primeiro lugar",
              "Prioridade central",
            ],
            ["Curadoria", "Relevância para a vida real", "Foco constante"],
            ["Inovação", "Tecnologia com propósito", "Evolução contínua"],
          ].map(([label, description, level]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">{label}</span>
                <span className="text-[#52657c]">{description}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: level }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## src\pages\admin\AdminCategoriesFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { CategoryFormData } from "../../contexts/CategoriesContext";
import { useAuth } from "../../contexts/useAuth";
import { useCategories } from "../../contexts/useCategories";

export function AdminCategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getCategoryById, createCategory, updateCategory } = useCategories();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const categoryId = id;

    async function loadCategory() {
      setLoading(true);
      setError(null);

      const category = await getCategoryById(categoryId);

      if (!category) {
        setError("Categoria não encontrada.");
        setLoading(false);
        return;
      }

      setName(category.name);
      setDescription(category.description ?? "");
      setImage(category.image ?? "");
      setActive(category.active);
      setSortOrder(String(category.sortOrder ?? 0));

      setLoading(false);
    }

    void loadCategory();
  }, [id, getCategoryById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome da categoria deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    const data: CategoryFormData = {
      name: name.trim(),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      active,
      sortOrder: parsedSortOrder,
    };

    setSaving(true);

    try {
      if (isEditing && id) {
        await updateCategory(id, data, token);
      } else {
        await createCategory(data, token);
      }

      navigate("/admin/categories", {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível salvar a categoria.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <Link
          to="/admin/categories"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Voltar para categorias
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar categoria" : "Nova categoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize as informações da categoria."
            : "Cadastre uma nova categoria no WorldMix360."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-5 shadow-sm md:p-8"
      >
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Nome
            </label>

            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Tecnologia"
              required
              minLength={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Descrição
            </label>

            <textarea
              id="category-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva brevemente esta categoria."
              rows={4}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              URL da imagem
            </label>

            <input
              id="category-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="Pré-visualização da categoria"
                  className="h-32 w-32 rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category-sort-order"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem de exibição
              </label>

              <input
                id="category-sort-order"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span>
                  <span className="block text-sm font-semibold text-gray-700">
                    Categoria ativa
                  </span>

                  <span className="block text-xs text-gray-500">
                    Permitir que a categoria seja exibida.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/admin/categories"
            className="rounded-lg border border-gray-500 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar categoria"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\admin\AdminProductsFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ProductBasicInfo } from "../../components/admin/products/ProductBasicInfo";
import { ProductFormActions } from "../../components/admin/products/ProductFormActions";
import { ProductGallery } from "../../components/admin/products/ProductGallery";
import { ProductPricing } from "../../components/admin/products/ProductPricing";
import { ProductRelationships } from "../../components/admin/products/ProductRelationships";
import { ProductSeo } from "../../components/admin/products/ProductSeo";
import { ProductStatus } from "../../components/admin/products/ProductStatus";
import type { ProductImageForm } from "../../components/admin/products/types";
import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";
import { useProducts } from "../../contexts/useProducts";
import { useSubcategories } from "../../contexts/useSubcategories";
import { parseCurrencyBRL } from "../../utils/formatCurrency";

export function AdminProductsFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getProductById, createProduct, updateProduct } = useProducts();

  const { subcategories, fetchSubcategories } = useSubcategories();

  const { marketplaces, fetchMarketplaces } = useMarketplaces();

  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [galleryImages, setGalleryImages] = useState<ProductImageForm[]>([]);

  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");

  const [currency, setCurrency] = useState("BRL");

  const [rating, setRating] = useState("");
  const [reviewsCount, setReviewsCount] = useState("0");

  const [affiliateUrl, setAffiliateUrl] = useState("");

  const [subcategoryId, setSubcategoryId] = useState("");
  const [marketplaceId, setMarketplaceId] = useState("");

  const [featured, setFeatured] = useState(false);
  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(true);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchSubcategories();
    void fetchMarketplaces();
  }, [fetchSubcategories, fetchMarketplaces]);

  useEffect(() => {
    if (!id || !token) {
      return;
    }

    const productId = id;
    const authToken = token;

    let isMounted = true;

    async function loadProduct() {
      try {
        const product = await getProductById(productId, authToken);

        if (!isMounted) {
          return;
        }

        if (!product) {
          setError("Produto não encontrado.");
          setLoadingData(false);
          return;
        }

        setTitle(product.title ?? "");
        setDescription(product.description ?? "");
        setShortDescription(product.shortDescription ?? "");
        setImageUrl(product.imageUrl ?? "");

        setGalleryImages(
          Array.isArray(product.images)
            ? product.images
                .map((image, index) => ({
                  id: image.id ?? crypto.randomUUID(),
                  imageUrl: image.imageUrl ?? "",
                  sortOrder:
                    typeof image.sortOrder === "number"
                      ? image.sortOrder
                      : index,
                }))
                .sort((a, b) => a.sortOrder - b.sortOrder)
            : [],
        );

        setPrice(
          product.price !== null && product.price !== undefined
            ? Number(product.price).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "",
        );

        setOriginalPrice(
          product.originalPrice !== null && product.originalPrice !== undefined
            ? Number(product.originalPrice).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            : "",
        );

        setCurrency(product.currency ?? "BRL");

        setRating(
          product.rating !== null && product.rating !== undefined
            ? String(product.rating)
            : "",
        );

        setReviewsCount(String(product.reviewsCount ?? 0));

        setAffiliateUrl(product.affiliateUrl ?? "");

        setSubcategoryId(product.subcategoryId ?? "");
        setMarketplaceId(product.marketplaceId ?? "");

        setFeatured(Boolean(product.featured));
        setAvailable(Boolean(product.available));
        setActive(Boolean(product.active));

        setSeoTitle(product.seoTitle ?? "");
        setSeoDescription(product.seoDescription ?? "");
      } catch {
        if (isMounted) {
          setError("Não foi possível carregar o produto.");
        }
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    void loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id, token, getProductById]);

  function handleAddGalleryImage() {
    setGalleryImages((currentImages) => [
      ...currentImages,
      {
        id: crypto.randomUUID(),
        imageUrl: "",
        sortOrder: currentImages.length,
      },
    ]);
  }

  function handleGalleryImageChange(id: string, value: string) {
    setGalleryImages((currentImages) =>
      currentImages.map((image) =>
        image.id === id
          ? {
              ...image,
              imageUrl: value,
            }
          : image,
      ),
    );
  }

  function handleRemoveGalleryImage(id: string) {
    setGalleryImages((currentImages) =>
      currentImages
        .filter((image) => image.id !== id)
        .map((image, index) => ({
          ...image,
          sortOrder: index,
        })),
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!title.trim()) {
      setError("Informe o título do produto.");
      return;
    }

    if (!imageUrl.trim()) {
      setError("Informe a URL da imagem.");
      return;
    }

    if (!affiliateUrl.trim()) {
      setError("Informe o link de afiliado.");
      return;
    }

    if (!subcategoryId) {
      setError("Selecione uma subcategoria.");
      return;
    }

    if (!marketplaceId) {
      setError("Selecione um marketplace.");
      return;
    }

    const parsedPrice = parseCurrencyBRL(price);

    if (!price.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Informe um preço válido.");
      return;
    }

    let parsedOriginalPrice: number | undefined;

    if (originalPrice.trim()) {
      parsedOriginalPrice = parseCurrencyBRL(originalPrice);

      if (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0) {
        setError("Informe um preço original válido.");
        return;
      }
    }

    let parsedRating: number | undefined;

    if (rating.trim()) {
      parsedRating = Number(rating);

      if (
        !Number.isFinite(parsedRating) ||
        parsedRating < 0 ||
        parsedRating > 5
      ) {
        setError("A avaliação deve estar entre 0 e 5.");
        return;
      }
    }

    const parsedReviewsCount = Number(reviewsCount);

    if (!Number.isInteger(parsedReviewsCount) || parsedReviewsCount < 0) {
      setError("A quantidade de avaliações deve ser um número inteiro.");
      return;
    }

    try {
      new URL(imageUrl.trim());
    } catch {
      setError("Informe uma URL válida para a imagem.");
      return;
    }

    try {
      new URL(affiliateUrl.trim());
    } catch {
      setError("Informe uma URL válida para o link de afiliado.");
      return;
    }

    const cleanGalleryImages = galleryImages
      .map((image) => ({
        imageUrl: image.imageUrl.trim(),
        sortOrder: image.sortOrder,
      }))
      .filter((image) => image.imageUrl);

    for (const image of cleanGalleryImages) {
      try {
        new URL(image.imageUrl);
      } catch {
        setError(
          `Informe uma URL válida para a imagem da galeria na posição ${
            image.sortOrder + 1
          }.`,
        );
        return;
      }
    }

    setLoading(true);

    try {
      const cleanDescription =
        description === "<p></p>" ? undefined : description.trim();

      const productData = {
        title: title.trim(),
        description: cleanDescription,
        shortDescription: shortDescription.trim() || undefined,

        imageUrl: imageUrl.trim(),

        images: cleanGalleryImages,

        price: parsedPrice,
        originalPrice: parsedOriginalPrice,

        currency: currency.trim().toUpperCase() || "BRL",

        rating: parsedRating,
        reviewsCount: parsedReviewsCount,

        affiliateUrl: affiliateUrl.trim(),

        subcategoryId,
        marketplaceId,

        featured,
        available,
        active,

        seoTitle: seoTitle.trim() || undefined,
        seoDescription: seoDescription.trim() || undefined,
      };

      if (isEditing && id) {
        await updateProduct(id, productData, token);
      } else {
        await createProduct(productData, token);
      }

      navigate("/admin/products");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar o produto."
            : "Não foi possível criar o produto.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando produto...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-5xl">
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para produtos
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar produto" : "Novo produto"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados do produto."
            : "Cadastre um novo produto no catálogo do WorldMix360."}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <ProductBasicInfo
          title={title}
          description={description}
          shortDescription={shortDescription}
          imageUrl={imageUrl}
          loading={loading}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onShortDescriptionChange={setShortDescription}
          onImageUrlChange={setImageUrl}
        />

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <ProductGallery
            galleryImages={galleryImages}
            loading={loading}
            onAdd={handleAddGalleryImage}
            onChange={handleGalleryImageChange}
            onRemove={handleRemoveGalleryImage}
          />
        </div>

        <ProductPricing
          price={price}
          originalPrice={originalPrice}
          currency={currency}
          rating={rating}
          reviewsCount={reviewsCount}
          loading={loading}
          onPriceChange={setPrice}
          onOriginalPriceChange={setOriginalPrice}
          onCurrencyChange={setCurrency}
          onRatingChange={setRating}
          onReviewsCountChange={setReviewsCount}
        />

        <ProductRelationships
          subcategories={subcategories}
          marketplaces={marketplaces}
          subcategoryId={subcategoryId}
          marketplaceId={marketplaceId}
          affiliateUrl={affiliateUrl}
          loading={loading}
          onSubcategoryChange={setSubcategoryId}
          onMarketplaceChange={setMarketplaceId}
          onAffiliateUrlChange={setAffiliateUrl}
        />

        <ProductStatus
          featured={featured}
          available={available}
          active={active}
          loading={loading}
          onFeaturedChange={setFeatured}
          onAvailableChange={setAvailable}
          onActiveChange={setActive}
        />

        <ProductSeo
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          loading={loading}
          onSeoTitleChange={setSeoTitle}
          onSeoDescriptionChange={setSeoDescription}
        />

        <ProductFormActions loading={loading} isEditing={isEditing} />
      </form>
    </section>
  );
}

```

## src\pages\AdminCategoriesPage.tsx

```tsx
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
                              WM360
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

```

## src\pages\AdminDashboarPage.tsx

```tsx
// src/pages/admin/AdminDashboardPage.tsx

import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";
import { useMarketplaces } from "../contexts/useMarketplaces";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export default function AdminDashboardPage() {
  const { token } = useAuth();

  const {
    products,
    fetchAdminProducts,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const {
    categories,
    fetchCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    subcategories,
    fetchSubcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useSubcategories();

  const {
    marketplaces,
    fetchMarketplaces,
    loading: marketplacesLoading,
    error: marketplacesError,
  } = useMarketplaces();

  /**
   * Carrega os dados necessários para o Dashboard.
   *
   * Produtos administrativos precisam do token.
   * Categorias, subcategorias e marketplaces possuem
   * endpoints públicos de leitura.
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    void Promise.all([
      fetchAdminProducts(token),
      fetchCategories(),
      fetchSubcategories(),
      fetchMarketplaces(),
    ]);
  }, [
    token,
    fetchAdminProducts,
    fetchCategories,
    fetchSubcategories,
    fetchMarketplaces,
  ]);

  // ================================
  // Estatísticas de produtos
  // ================================

  const totalProducts = products.length;

  const activeProducts = products.filter((product) => product.active).length;

  const availableProducts = products.filter(
    (product) => product.available,
  ).length;

  const featuredProducts = products.filter(
    (product) => product.featured,
  ).length;

  // ================================
  // Estatísticas de categorias
  // ================================

  const totalCategories = categories.length;

  const activeCategories = categories.filter(
    (category) => category.active,
  ).length;

  // ================================
  // Estatísticas de subcategorias
  // ================================

  const totalSubcategories = subcategories.length;

  const activeSubcategories = subcategories.filter(
    (subcategory) => subcategory.active,
  ).length;

  // ================================
  // Estatísticas de marketplaces
  // ================================

  const totalMarketplaces = marketplaces.length;

  const activeMarketplaces = marketplaces.filter(
    (marketplace) => marketplace.active,
  ).length;

  const isLoading =
    productsLoading ||
    categoriesLoading ||
    subcategoriesLoading ||
    marketplacesLoading;

  const errors = [
    productsError,
    categoriesError,
    subcategoriesError,
    marketplacesError,
  ].filter(Boolean);

  return (
    <section className="min-h-full bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* ========================================
          CABEÇALHO
      ======================================== */}

      <header className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue">WorldMix360</p>

            <h1 className="text-2xl font-bold text-navy sm:text-3xl">
              Dashboard Administrativo
            </h1>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Visão geral do catálogo e das principais áreas do sistema.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue/90"
            >
              + Novo produto
            </Link>

            <Link
              to="/admin/categories/new"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              + Nova categoria
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================
          CARREGAMENTO
      ======================================== */}

      {isLoading && (
        <div className="mb-6 rounded-xl border border-blue-light bg-blue-light px-5 py-4">
          <p className="text-sm font-medium text-blue">
            Atualizando informações do painel...
          </p>
        </div>
      )}

      {/* ========================================
          ERROS
      ======================================== */}

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
          <p className="font-semibold text-red-700">
            Algumas informações não puderam ser carregadas.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Verifique a conexão com a API e tente novamente.
          </p>
        </div>
      )}

      {/* ========================================
          CARDS PRINCIPAIS
      ======================================== */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Produtos */}

        <Link
          to="/admin/products"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Produtos</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📦
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeProducts} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Categorias */}

        <Link
          to="/admin/categories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Categorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalCategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🗂️
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeCategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Subcategorias */}

        <Link
          to="/admin/subcategories"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Subcategorias</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalSubcategories}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              📁
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeSubcategories} ativas</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>

        {/* Marketplaces */}

        <Link
          to="/admin/marketplaces"
          className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Marketplaces</p>

              <p className="mt-2 text-3xl font-bold text-navy">
                {totalMarketplaces}
              </p>
            </div>

            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-light text-xl">
              🛒
            </span>
          </div>

          <div className="mt-5 flex items-center justify-between text-xs">
            <span className="text-gray-500">{activeMarketplaces} ativos</span>

            <span className="font-semibold text-blue group-hover:underline">
              Gerenciar →
            </span>
          </div>
        </Link>
      </div>

      {/* ========================================
          RESUMO DO CATÁLOGO
      ======================================== */}

      <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Resumo dos produtos */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-navy">
                Resumo dos produtos
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Situação atual do catálogo de produtos.
              </p>
            </div>

            <Link
              to="/admin/products"
              className="text-sm font-semibold text-blue hover:underline"
            >
              Ver produtos
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Total</p>

              <p className="mt-1 text-2xl font-bold text-navy">
                {totalProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Ativos</p>

              <p className="mt-1 text-2xl font-bold text-green">
                {activeProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Disponíveis</p>

              <p className="mt-1 text-2xl font-bold text-blue">
                {availableProducts}
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">Destaques</p>

              <p className="mt-1 text-2xl font-bold text-yellow">
                {featuredProducts}
              </p>
            </div>
          </div>
        </section>

        {/* Resumo do catálogo */}

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-navy">
              Estrutura do catálogo
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Organização atual das categorias e canais de venda.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/admin/categories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🗂️
                </span>

                <div>
                  <p className="font-semibold text-navy">Categorias</p>

                  <p className="text-xs text-gray-500">
                    {activeCategories} ativas de {totalCategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/subcategories"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  📁
                </span>

                <div>
                  <p className="font-semibold text-navy">Subcategorias</p>

                  <p className="text-xs text-gray-500">
                    {activeSubcategories} ativas de {totalSubcategories}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>

            <Link
              to="/admin/marketplaces"
              className="flex items-center justify-between rounded-xl border border-gray-100 p-4 transition hover:border-blue-light hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-light">
                  🛒
                </span>

                <div>
                  <p className="font-semibold text-navy">Marketplaces</p>

                  <p className="text-xs text-gray-500">
                    {activeMarketplaces} ativos de {totalMarketplaces}
                  </p>
                </div>
              </div>

              <span className="text-blue">→</span>
            </Link>
          </div>
        </section>
      </div>

      {/* ========================================
          AÇÕES RÁPIDAS
      ======================================== */}

      <section className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-navy">Ações rápidas</h2>

          <p className="mt-1 text-sm text-gray-500">
            Acesse rapidamente as principais áreas de gerenciamento.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/products/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📦</span>

            <p className="mt-2 font-semibold text-navy">Cadastrar produto</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um novo produto ao catálogo.
            </p>
          </Link>

          <Link
            to="/admin/categories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🗂️</span>

            <p className="mt-2 font-semibold text-navy">Nova categoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Criar uma nova categoria.
            </p>
          </Link>

          <Link
            to="/admin/subcategories/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">📁</span>

            <p className="mt-2 font-semibold text-navy">Nova subcategoria</p>

            <p className="mt-1 text-xs text-gray-500">
              Organizar melhor o catálogo.
            </p>
          </Link>

          <Link
            to="/admin/marketplaces/new"
            className="rounded-xl border border-gray-200 p-4 transition hover:border-blue hover:bg-blue-light"
          >
            <span className="text-xl">🛒</span>

            <p className="mt-2 font-semibold text-navy">Novo marketplace</p>

            <p className="mt-1 text-xs text-gray-500">
              Adicionar um canal de venda.
            </p>
          </Link>
        </div>
      </section>
    </section>
  );
}

```

## src\pages\AdminMarketplaceFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useMarketplaces } from "../contexts/useMarketplaces";

export function AdminMarketplaceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getMarketplaceById, createMarketplace, updateMarketplace } =
    useMarketplaces();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const marketplaceId = id;
    let isMounted = true;

    async function loadMarketplace() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }

      try {
        const marketplace = await getMarketplaceById(marketplaceId);

        if (!isMounted) {
          return;
        }

        if (!marketplace) {
          setError("Marketplace não encontrado.");
          return;
        }

        setName(marketplace.name);
        setDescription(marketplace.description ?? "");
        setWebsiteUrl(marketplace.websiteUrl ?? "");
        setLogoUrl(marketplace.logoUrl ?? "");
        setSortOrder(String(marketplace.sortOrder ?? 0));
        setActive(marketplace.active);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Não foi possível carregar o marketplace.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    void loadMarketplace();

    return () => {
      isMounted = false;
    };
  }, [id, getMarketplaceById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome do marketplace.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome do marketplace deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    if (websiteUrl.trim()) {
      try {
        new URL(websiteUrl.trim());
      } catch {
        setError("Informe uma URL válida para o website.");
        return;
      }
    }

    if (logoUrl.trim()) {
      try {
        new URL(logoUrl.trim());
      } catch {
        setError("Informe uma URL válida para o logo.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateMarketplace(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createMarketplace(
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/marketplaces");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar o marketplace."
            : "Não foi possível criar o marketplace.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando marketplace...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/marketplaces"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para marketplaces
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar marketplace" : "Novo marketplace"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados do marketplace."
            : "Cadastre um novo marketplace para o WorldMix360."}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Mercado Livre"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                O slug será gerado automaticamente pela API.
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente o marketplace..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="websiteUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Website
              </label>

              <input
                id="websiteUrl"
                type="url"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                placeholder="https://www.exemplo.com.br"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe a URL oficial do marketplace.
              </p>
            </div>

            {/* Logo */}
            <div>
              <label
                htmlFor="logoUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Logo
              </label>

              <input
                id="logoUrl"
                type="url"
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                placeholder="https://exemplo.com/logo.png"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para o logo.
              </p>

              {logoUrl.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <img
                      src={logoUrl}
                      alt="Pré-visualização do logo"
                      className="max-h-full max-w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Ordem */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem
              </label>

              <input
                id="sortOrder"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use números menores para exibir primeiro.
              </p>
            </div>

            {/* Ativo */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Marketplace ativo
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Marketplaces inativos não devem aparecer em áreas públicas do
                  catálogo.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={loading}
                onClick={() => setActive((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  active ? "bg-blue-600" : "bg-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/marketplaces"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar marketplace"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\AdminMarketplacesPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useMarketplaces } from "../contexts/useMarketplaces";

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

```

## src\pages\AdminProductsPage.tsx

```tsx
// src/pages/admin/AdminProductsPage.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { useProducts } from "../contexts/useProducts";

export function AdminProductsPage() {
  const { products, fetchAdminProducts, updateProductStatus, loading, error } =
    useProducts();

  const { token } = useAuth();

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchAdminProducts(token);
  }, [token, fetchAdminProducts]);

  async function handleStatusChange(
    id: string,
    status: {
      active?: boolean;
      available?: boolean;
      featured?: boolean;
    },
  ) {
    if (!token) {
      return;
    }

    try {
      setUpdatingId(id);

      await updateProductStatus(id, status, token);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Não foi possível atualizar o status do produto.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return <p className="p-6">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="p-6">Erro: {error}</p>;
  }

  return (
    <section className="p-6">
      <header className="flex justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Painel Administrativo - Produtos</h1>

        <Link
          to="/admin/products/new"
          className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-navy transition whitespace-nowrap"
        >
          + Cadastrar Produto
        </Link>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b px-3 py-2 text-left">Produto</th>

              <th className="border-b px-3 py-2 text-left">Preço</th>

              <th className="border-b px-3 py-2 text-center">Disponível</th>

              <th className="border-b px-3 py-2 text-center">Ativo</th>

              <th className="border-b px-3 py-2 text-center">Destaque</th>

              <th className="border-b px-3 py-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => {
              const isUpdating = updatingId === p.id;

              return (
                <tr
                  key={p.id}
                  className="border-b last:border-b-0 hover:bg-gray-50"
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      {p.imageUrl ? (
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-12 h-12 object-cover rounded-lg border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                          Sem imagem
                        </div>
                      )}

                      <div>
                        <p className="font-semibold">{p.title}</p>

                        <p className="text-xs text-gray-500">/{p.slug}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    {p.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: p.currency,
                    })}
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.available}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          available: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar disponibilidade de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.active}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          active: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar status ativo de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={p.featured}
                      disabled={isUpdating}
                      onChange={(event) =>
                        void handleStatusChange(p.id, {
                          featured: event.target.checked,
                        })
                      }
                      className="h-5 w-5 cursor-pointer accent-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Alterar destaque de ${p.title}`}
                    />
                  </td>

                  <td className="px-3 py-3 text-center">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="text-sm font-semibold text-blue hover:underline"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {products.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Nenhum produto encontrado.
        </div>
      )}
    </section>
  );
}

```

## src\pages\AdminSubcategoriesPage.tsx

```tsx
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

```

## src\pages\AdminSubcategoryFormPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";
import { useCategories } from "../contexts/useCategories";
import { useSubcategories } from "../contexts/useSubcategories";

export function AdminSubcategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { categories, fetchCategories } = useCategories();

  const { getSubcategoryById, createSubcategory, updateSubcategory } =
    useSubcategories();

  const isEditing = Boolean(id);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const subcategoryId = id;
    let isMounted = true;
    async function loadSubcategory() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }
      try {
        const subcategory = await getSubcategoryById(subcategoryId);
        if (!isMounted) {
          return;
        }
        if (!subcategory) {
          setError("Subcategoria não encontrada.");
          return;
        }
        setCategoryId(subcategory.categoryId);
        setName(subcategory.name);
        setDescription(subcategory.description ?? "");
        setImage(subcategory.image ?? "");
        setSortOrder(String(subcategory.sortOrder ?? 0));
        setActive(subcategory.active);
      } catch {
        if (!isMounted) {
          return;
        }
        setError("Não foi possível carregar a subcategoria.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }
    void loadSubcategory();
    return () => {
      isMounted = false;
    };
  }, [id, getSubcategoryById]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!isEditing && !categoryId) {
      setError("Selecione uma categoria.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome da subcategoria.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateSubcategory(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createSubcategory(
          {
            categoryId,
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/subcategories");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar a subcategoria."
            : "Não foi possível criar a subcategoria.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando subcategoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/subcategories"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para subcategorias
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar subcategoria" : "Nova subcategoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados da subcategoria."
            : "Cadastre uma nova subcategoria para o WorldMix360."}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            {/* Categoria */}
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Categoria *
              </label>

              <select
                id="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                disabled={isEditing || loading}
                required={!isEditing}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">Selecione uma categoria</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {isEditing && (
                <p className="mt-2 text-xs text-gray-500">
                  A categoria não pode ser alterada durante a edição.
                </p>
              )}
            </div>

            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Smartphones"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                O slug será gerado automaticamente pela API.
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente esta subcategoria..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Imagem */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Imagem
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para a imagem.
              </p>

              {image.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <img
                    src={image}
                    alt="Pré-visualização"
                    className="h-24 w-24 rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Ordem */}
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem
              </label>

              <input
                id="sortOrder"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use números menores para exibir primeiro.
              </p>
            </div>

            {/* Ativa */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Subcategoria ativa
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Subcategorias inativas não devem aparecer no catálogo público.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={loading}
                onClick={() => setActive((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  active ? "bg-blue-600" : "bg-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/subcategories"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar subcategoria"}
          </button>
        </div>
      </form>
    </section>
  );
}

```

## src\pages\BlogPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function BlogPage() {
  return (
    <CategoryPage
      title="Blog"
      summary="Conteúdos úteis para ajudar você a comprar melhor e descobrir novas tendências."
      image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Caderno, café e notebook em uma mesa de trabalho"
      highlights={[
        {
          title: "Dicas de consumo",
          description: "Informação para comprar com mais consciência.",
          image:
            "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Caderno com anotações e caneta",
        },
        {
          title: "Guias de compras",
          description: "Critérios práticos para encontrar o produto certo.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa pesquisando em um notebook",
        },
        {
          title: "Tendências e novidades",
          description: "O que está mudando no mundo dos produtos e serviços.",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook em uma mesa de trabalho",
        },
        {
          title: "Conteúdo confiável",
          description: "Leituras úteis, diretas e feitas para ajudar você.",
          image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa lendo notícias em um jornal",
        },
      ]}
    />
  );
}

```

## src\pages\CategoriesPage.tsx

```tsx
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function CategoryPage() {
  const { slug } = useParams();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
    fetchSubcategories,
  } = useSubcategories();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    void fetchCategories();
    void fetchSubcategories();
  }, [fetchCategories, fetchSubcategories]);

  const category = useMemo(() => {
    if (!slug) return null;

    return (
      categories.find(
        (item) => item.slug.toLowerCase() === slug.toLowerCase(),
      ) ?? null
    );
  }, [categories, slug]);

  useEffect(() => {
    if (!category) return;

    void fetchProducts(category.slug);
  }, [category, fetchProducts]);

  const categorySubcategories = useMemo(() => {
    if (!category) return [];

    return subcategories
      .filter(
        (subcategory) =>
          subcategory.categoryId === category.id && subcategory.active,
      )
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }, [category, subcategories]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];

    return products.filter((product) => product.active && product.available);
  }, [category, products]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError ?? subcategoriesError ?? productsError ?? null;

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#52657c]">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Não foi possível carregar a categoria
          </h1>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#071a2f]">
            Categoria não encontrada
          </h1>

          <p className="mt-2 text-sm text-[#52657c]">
            A categoria que você está procurando não existe ou não está
            disponível.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      {/* Hero da categoria */}
      <div className="mb-10 overflow-hidden rounded-3xl border border-[#e7edf5] bg-white shadow-sm">
        <div className="grid min-h-[260px] md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1769e0]">
              Categoria
            </p>

            <h1 className="text-3xl font-bold text-[#071a2f] md:text-4xl">
              {category.name}
            </h1>

            {category.description && (
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#52657c]">
                {category.description}
              </p>
            )}
          </div>

          {category.image && (
            <div className="min-h-[220px] bg-[#f8fafc]">
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Subcategorias */}
      {categorySubcategories.length > 0 && (
        <section className="mb-12">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-[#071a2f]">Subcategorias</h2>

            <p className="mt-1 text-sm text-[#52657c]">
              Explore os produtos por subcategoria.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categorySubcategories.map((subcategory) => (
              <Link
                key={subcategory.id}
                to={`/categoria/${encodeURIComponent(
                  category.slug,
                )}/${encodeURIComponent(subcategory.slug)}`}
                className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                  {subcategory.name}
                </h3>

                {subcategory.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#52657c]">
                    {subcategory.description}
                  </p>
                )}

                <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                  Ver subcategoria →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Produtos da categoria */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Produtos de {category.name}
          </h2>

          <p className="mt-1 text-sm text-[#52657c]">
            {categoryProducts.length > 0
              ? `${categoryProducts.length} ${
                  categoryProducts.length === 1
                    ? "produto encontrado"
                    : "produtos encontrados"
                }`
              : "Nenhum produto disponível nesta categoria no momento."}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-[#071a2f]">
              Nenhum produto disponível
            </h3>

            <p className="mt-2 text-sm text-[#52657c]">
              Ainda não existem produtos ativos e disponíveis nesta categoria.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

```

## src\pages\ContactPage.tsx

```tsx
import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
          Fale com a WorldMix360
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#52657c]">
          Estamos prontos para ajudar com dúvidas, suporte, parceiros e
          oportunidades de negócio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:items-start">
        <aside className="rounded-[28px] bg-[#071a2f] p-8 text-white shadow-[0_24px_60px_rgba(7,26,47,0.16)]">
          <div className="mb-6 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="Equipe reunida para atender e conversar com clientes"
              className="h-44 w-full object-cover"
            />
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">
              Atendimento
            </p>
            <h2 className="mt-2 text-2xl font-bold">Fale conosco</h2>
          </div>

          <div className="space-y-5 text-sm text-white/80">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaPhoneAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>(11) 4002-8922</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <MdEmail className="mt-1 text-base text-[#7dd3fc]" />
              <span>contato@worldmix360.com.br</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaMapMarkerAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>Av. Paulista, 1500 - Bela Vista, São Paulo - SP</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaInstagram className="mt-1 text-base text-[#7dd3fc]" />
              <span>@worldmix360</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1e3553] bg-[#0d1f37] p-4">
            <p className="text-sm font-medium text-[#dfe9f6]">
              Tempo médio de resposta
            </p>
            <p className="mt-1 text-2xl font-bold text-white">24 horas</p>
          </div>
        </aside>

        <form className="rounded-[28px] border border-[#dfe7f3] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Envie uma mensagem
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#071a2f]">
              Solicite atendimento
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              Nome
              <input
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              E-mail
              <input
                type="email"
                placeholder="seu@email.com"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Assunto
            <input
              type="text"
              placeholder="Qual o motivo do contato?"
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Mensagem
            <textarea
              rows={6}
              placeholder="Escreva sua mensagem..."
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#edf2f7] pt-5 md:flex-row md:items-center">
            <p className="text-xs text-[#52657c]">
              Respeitamos sua privacidade e respondemos em até 24 horas.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#0b3d66] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#072b49]"
            >
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Atendimento em etapas
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Do primeiro contato à solução
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Você envia",
              "Conte o que precisa de forma rápida e objetiva.",
            ],
            [
              "02",
              "Nós analisamos",
              "Entendemos sua solicitação e buscamos o melhor caminho.",
            ],
            ["03", "Você recebe", "Respondemos com clareza e próximos passos."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="relative rounded-2xl border border-[#dfe7f3] bg-white p-5"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dfeeff] text-xs font-bold text-[#0b3d66]">
                {number}
              </span>
              <h3 className="mb-2 font-bold text-[#071a2f]">{title}</h3>
              <p className="text-sm leading-6 text-[#52657c]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

```

## src\pages\ContentPages.tsx

```tsx
import { Link } from "react-router-dom";

type Section = {
  title: string;
  content: string;
};

type CategoryPageProps = {
  title: string;
  summary: string;
  highlights: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  image: string;
  imageAlt: string;
};

export function CategoryPage({
  title,
  summary,
  highlights,
  image,
  imageAlt,
}: CategoryPageProps) {
  const categorySlug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Categoria
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {summary}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/10 to-transparent" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[24px] border border-[#e7edf5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
          >
            <Link
              to={`/${categorySlug}/${item.title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/&/g, "e")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="block h-full"
            >
              <div className="h-40 overflow-hidden bg-[#edf5ff]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="mb-2 text-lg font-semibold text-[#071a2f]">
                  {item.title}
                </p>
                <p className="text-sm leading-6 text-[#52657c]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#0b3d66]">
                  Explorar seleção →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

type InfoPageProps = {
  title: string;
  intro: string;
  sections: Section[];
  image: string;
  imageAlt: string;
  visualTitle: string;
  visualItems: {
    label: string;
    value: string;
    level: number;
  }[];
};

export function InfoPage({
  title,
  intro,
  sections,
  image,
  imageAlt,
  visualTitle,
  visualItems,
}: InfoPageProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Institucional
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {intro}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="mb-10 grid gap-6 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Visão geral
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">{visualTitle}</h2>
        </div>
        <div className="space-y-5">
          {visualItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">
                  {item.label}
                </span>
                <span className="text-[#52657c]">{item.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-sm"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#071a2f]">
              {section.title}
            </h2>
            <p className="text-base leading-7 text-[#52657c]">
              {section.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

```

## src\pages\DigitalProductsPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function DigitalProductsPage() {
  return (
    <CategoryPage
      title="Produtos Digitais"
      summary="Ferramentas digitais para produtividade, entretenimento e inovação."
      image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Estação de trabalho com computador e ferramentas digitais"
      highlights={[
        {
          title: "Cursos e conteúdos",
          description: "Aprenda no seu ritmo e amplie suas possibilidades.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa estudando em um notebook",
        },
        {
          title: "Software e utilitários",
          description:
            "Ferramentas digitais para resolver mais com menos esforço.",
          image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Código em uma tela de computador",
        },
        {
          title: "Produtividade",
          description: "Organize ideias, projetos e tarefas em um só lugar.",
          image:
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Mesa de trabalho organizada",
        },
        {
          title: "Entretenimento digital",
          description: "Novas experiências para relaxar e se divertir.",
          image:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Controle de videogame e televisão",
        },
      ]}
    />
  );
}

```

## src\pages\FashionPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function FashionPage() {
  return (
    <CategoryPage
      title="Moda"
      summary="Estilo, conforto e tendências em escolhas práticas para todas as ocasiões."
      image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Araras com roupas em uma loja de moda"
      highlights={[
        {
          title: "Roupas e calçados",
          description: "Peças para expressar seu estilo com conforto.",
          image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Roupas organizadas em uma arara",
        },
        {
          title: "Acessórios",
          description: "Os detalhes que dão personalidade a cada produção.",
          image:
            "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Acessórios de moda",
        },
        {
          title: "Casual e elegante",
          description: "Combinações versáteis para todos os seus planos.",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa escolhendo roupas em uma loja",
        },
        {
          title: "Estilo diário",
          description: "Inspirações práticas para vestir sua melhor versão.",
          image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Look casual de moda",
        },
      ]}
    />
  );
}

```

## src\pages\HomePage.tsx

```tsx
import { useEffect } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
  FiHeart,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTool,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { Banner } from "../components/Banner";
import { BlogBanner } from "../components/BlogBanner";

import { ProductCard } from "../components/ProductCard";
import { Session } from "../components/Session";
import { SocialBanner } from "../components/SocialBanner";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";

export function HomePage() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const activeCategories = categories
    .filter((category) => category.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categoryIcons = {
    tecnologia: FiGrid,
    "casa-utilidades": FiTool,
    moda: FiShoppingBag,
    pets: FiHeart,
    "produtos-digitais": FiGrid,
  };

  return (
    <>
      <Banner />

      {(error || categoriesError) && (
        <div className="mx-auto max-w-[1200px] px-6 pb-2 pt-4 text-sm text-red-600">
          {error ?? categoriesError}
        </div>
      )}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Explore por interesse
            </p>

            <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
              Encontre o que combina com você
            </h2>
          </div>

          <Link
            to="/ofertas"
            className="hidden items-center gap-1 text-sm font-semibold text-[#0b3d66] transition hover:text-[#1769e0] sm:flex"
          >
            Ver ofertas <FiArrowUpRight />
          </Link>
        </div>

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              "category-skeleton-1",
              "category-skeleton-2",
              "category-skeleton-3",
              "category-skeleton-4",
              "category-skeleton-5",
              "category-skeleton-6",
              "category-skeleton-7",
            ].map((skeletonKey) => (
              <div
                key={skeletonKey}
                className="aspect-square animate-pulse rounded-2xl border border-[#e7edf5] bg-[#f7f9fc]"
              />
            ))}
          </div>
        ) : activeCategories.length === 0 ? (
          <div className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center text-sm text-[#52657c]">
            Nenhuma categoria disponível no momento.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {activeCategories.map((category) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons] ??
                FiGrid;

              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="group flex aspect-square flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#e7edf5] bg-white text-center shadow-sm transition hover:-translate-y-1 hover:border-[#b9d6f4] hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                >
                  <span className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#edf5ff] text-[#1769e0] transition group-hover:scale-110 group-hover:bg-[#1769e0] group-hover:text-white md:h-30 md:w-full">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="text-3xl md:text-4xl" />
                    )}
                  </span>

                  <span className="text-sm font-semibold leading-5 text-[#071a2f] my-5">
                    {category.name}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/blog"
              className="group flex aspect-square flex-col items-center justify-between rounded-2xl border border-[#1769e0] bg-gradient-to-br from-[#071a2f] to-[#1769e0] p-4 text-center text-white shadow-[0_14px_30px_rgba(23,105,224,0.25)] transition hover:-translate-y-1"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl text-[#9ad7ff] transition group-hover:scale-110 md:h-20 md:w-20 md:text-4xl">
                <FiBookOpen />
              </span>

              <span className="text-sm font-semibold leading-5 text-white">
                Blog
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ad7ff]">
                Conteúdos
              </span>
            </Link>
          </div>
        )}
      </section>

      <Session title="Ofertas em destaque">
        {loading ? (
          <p className="px-6 text-sm text-[#52657c]">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="px-6 text-sm text-[#52657c]">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Session>

      <BlogBanner />

      <Session title="Produtos mais vendidos">
        {products.map((product) => (
          <ProductCard key={`${product.id}-secondary`} product={product} />
        ))}
      </Session>

      <SocialBanner />

      <section className="mx-auto grid max-w-[1200px] gap-4 px-6 py-10 md:grid-cols-4 md:py-14">
        {[
          [
            FiSearch,
            "Pesquisa fácil",
            "Encontre ideias em diferentes categorias.",
          ],
          [
            FiShield,
            "Escolhas claras",
            "Veja informações antes de acessar a oferta.",
          ],
          [
            FiStar,
            "Curadoria",
            "Descubra produtos selecionados para sua rotina.",
          ],
          [
            FiCheckCircle,
            "Parceiros confiáveis",
            "A compra acontece diretamente no marketplace.",
          ],
        ].map(([Icon, title, description]) => (
          <div
            key={title as string}
            className="flex gap-3 rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-[#159447]">
              <Icon />
            </span>

            <div>
              <h3 className="font-semibold text-[#071a2f]">
                {title as string}
              </h3>

              <p className="mt-1 text-sm leading-5 text-[#52657c]">
                {description as string}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

```

## src\pages\HomeUtilitiesPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function HomeUtilitiesPage() {
  return (
    <CategoryPage
      title="Casa & Utilidades"
      summary="Itens para organização, conforto e praticidade em todos os momentos da sua rotina."
      image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cozinha organizada e iluminada"
      highlights={[
        {
          title: "Organização doméstica",
          description: "Soluções para aproveitar cada espaço com leveza.",
          image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Ambiente doméstico organizado",
        },
        {
          title: "Decoração",
          description: "Detalhes que deixam a casa mais bonita e acolhedora.",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sala com decoração contemporânea",
        },
        {
          title: "Utilidades essenciais",
          description:
            "Itens práticos para resolver o dia a dia com facilidade.",
          image:
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Utensílios em uma cozinha",
        },
        {
          title: "Conforto para a rotina",
          description:
            "Escolhas simples para tornar seus momentos mais agradáveis.",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Quarto confortável e iluminado",
        },
      ]}
    />
  );
}

```

## src\pages\HowItWorksPage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function HowItWorksPage() {
  return (
    <InfoPage
      title="Como funciona"
      intro="A WorldMix360 ajuda você a escolher com mais segurança, rapidez e clareza."
      image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Equipe analisando informações em uma reunião"
      visualTitle="Uma jornada simples para decidir melhor"
      visualItems={[
        { label: "Descoberta", value: "Encontre", level: 35 },
        { label: "Comparação", value: "Avalie", level: 68 },
        { label: "Escolha", value: "Decida", level: 100 },
      ]}
      sections={[
        {
          title: "Pesquisa inteligente",
          content:
            "A plataforma reúne produtos e comparações para facilitar sua decisão.",
        },
        {
          title: "Curadoria humana",
          content:
            "Selecionamos marcas e itens com foco em qualidade, utilidade e valor.",
        },
        {
          title: "Atendimento confiável",
          content:
            "Nossa equipe responde com clareza e oferece suporte em cada etapa.",
        },
      ]}
    />
  );
}

```

## src\pages\LoginPage.tsx

```tsx
// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth(); // agora pegamos também o user

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const loggedUser = await signIn(email, password);

      if (loggedUser?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível realizar o login.",
      );
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Entrar</h1>
          <p className="mt-2 text-sm text-gray-500">
            Acesse sua conta WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#1769e0] px-5 py-3 font-bold text-white transition hover:bg-[#0f56bd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </section>
  );
}

```

## src\pages\OffersPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function OffersPage() {
  return (
    <CategoryPage
      title="Ofertas"
      summary="Confira oportunidades selecionadas com bom custo-benefício e qualidade em destaque."
      image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Sacolas de compras representando uma experiência de varejo"
      highlights={[
        {
          title: "Promoções selecionadas",
          description: "Oportunidades que merecem entrar no seu radar.",
          image:
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sacolas de compras em uma loja",
        },
        {
          title: "Economia inteligente",
          description: "Compare antes de comprar e faça escolhas melhores.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa fazendo uma compra online",
        },
        {
          title: "Produtos em alta",
          description: "Descubra o que está chamando a atenção agora.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa segurando uma sacola de compras",
        },
        {
          title: "Valores competitivos",
          description: "Boas oportunidades para aproveitar com confiança.",
          image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Interior de uma loja com produtos",
        },
      ]}
    />
  );
}

```

## src\pages\PetsPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function PetsPage() {
  return (
    <CategoryPage
      title="Pets"
      summary="Produtos pensados para o bem-estar, a saúde e a diversão dos seus animais."
      image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cachorro e gato juntos em um ambiente doméstico"
      highlights={[
        {
          title: "Cuidados e higiene",
          description: "Bem-estar e carinho em todos os detalhes.",
          image:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro recebendo cuidados",
        },
        {
          title: "Brinquedos e diversão",
          description: "Mais estímulo, alegria e momentos juntos.",
          image:
            "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro brincando ao ar livre",
        },
        {
          title: "Acessórios para pets",
          description: "Conforto e praticidade para cada passeio.",
          image:
            "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro usando acessório",
        },
        {
          title: "Rotina pet",
          description: "Tudo para deixar o dia do seu companheiro melhor.",
          image:
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorros juntos em um parque",
        },
      ]}
    />
  );
}

```

## src\pages\PrivacyPolicyPage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Política de privacidade"
      intro="Seus dados são tratados com responsabilidade, transparência e segurança."
      image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa usando um notebook para acessar uma conta protegida"
      visualTitle="Como cuidamos das suas informações"
      visualItems={[
        { label: "Transparência", value: "Clareza", level: 100 },
        { label: "Necessidade", value: "Minimização", level: 72 },
        { label: "Proteção", value: "Boas práticas", level: 88 },
      ]}
      sections={[
        {
          title: "Coleta de dados",
          content:
            "Coletamos apenas informações necessárias para atender sua navegação, comunicação e pedidos.",
        },
        {
          title: "Uso dos dados",
          content:
            "Usamos dados para melhorar sua experiência, oferecer suporte e enviar comunicações relevantes.",
        },
        {
          title: "Segurança e seus direitos",
          content:
            "Aplicamos boas práticas para proteger informações sensíveis e respeitamos seus direitos previstos na legislação aplicável.",
        },
      ]}
    />
  );
}

```

## src\pages\ProductPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductBreadcrumb } from "../components/product/ProductBreadcrumb";
import { ProductDescription } from "../components/product/ProductDescription";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductInfo } from "../components/product/ProductInfo";
import type { Product } from "../contexts/ProductsContext";
import { useProducts } from "../contexts/useProducts";

export function ProductPage() {
  const { slug } = useParams();

  const { getProductBySlug } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!slug) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const data = await getProductBySlug(slug);

        if (!cancelled) {
          setProduct(data);
        }
      } catch {
        if (!cancelled) {
          setProduct(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug, getProductBySlug]);

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-sm text-[#52657c]">Carregando produto...</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          Produto não encontrado
        </h1>

        <p className="mt-3 text-[#52657c]">
          Esse produto pode ter sido atualizado ou removido do catálogo.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white transition hover:bg-[#0f58c7]"
        >
          Voltar para a página inicial
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <ProductBreadcrumb />

      <div className="grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:grid-cols-[0.9fr_1.1fr]">
        <ProductGallery product={product} />

        <ProductInfo product={product} />
      </div>

      <ProductDescription product={product} />
    </section>
  );
}

```

## src\pages\ProductsPage.tsx

```tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/ProductsContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type SearchCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
};

type SearchSubcategory = {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  active: boolean;
  sortOrder: number;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
};

type SearchResponse = {
  query: string;
  products: Product[];
  categories: SearchCategory[];
  subcategories: SearchSubcategory[];
};

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.trim() ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<SearchCategory[]>([]);
  const [subcategories, setSubcategories] = useState<SearchSubcategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadSearchResults() {
      setLoading(true);
      setError(null);

      try {
        if (!search) {
          const response = await fetch(`${apiUrl}/products`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message ?? "Não foi possível carregar os produtos.",
            );
          }

          if (!cancelled) {
            setProducts(data.products ?? []);
            setCategories([]);
            setSubcategories([]);
          }

          return;
        }

        const response = await fetch(
          `${apiUrl}/search?q=${encodeURIComponent(search)}`,
        );

        const data: SearchResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            (data as { message?: string }).message ??
              "Não foi possível realizar a pesquisa.",
          );
        }

        if (!cancelled) {
          setProducts(data.products ?? []);
          setCategories(data.categories ?? []);
          setSubcategories(data.subcategories ?? []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Erro ao realizar a pesquisa.",
          );

          setProducts([]);
          setCategories([]);
          setSubcategories([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadSearchResults();

    return () => {
      cancelled = true;
    };
  }, [search]);

  const hasResults =
    products.length > 0 || categories.length > 0 || subcategories.length > 0;

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          {search ? `Resultados para "${search}"` : "Produtos"}
        </h1>

        {search && !loading && !error && (
          <p className="mt-2 text-sm text-[#52657c]">
            {[
              categories.length > 0 &&
                `${categories.length} ${
                  categories.length === 1 ? "categoria" : "categorias"
                }`,
              subcategories.length > 0 &&
                `${subcategories.length} ${
                  subcategories.length === 1 ? "subcategoria" : "subcategorias"
                }`,
              products.length > 0 &&
                `${products.length} ${
                  products.length === 1 ? "produto" : "produtos"
                }`,
            ]
              .filter(Boolean)
              .join(" • ")}
          </p>
        )}
      </div>

      {loading && (
        <div className="py-16 text-center">
          <p className="text-sm text-[#52657c]">
            {search ? "Pesquisando..." : "Carregando produtos..."}
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-semibold text-red-700">
            Não foi possível carregar os resultados.
          </p>

          <p className="mt-2 text-sm text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && !hasResults && (
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#071a2f]">
            Nenhum resultado encontrado
          </h2>

          <p className="mt-2 text-sm text-[#52657c]">
            {search
              ? `Não encontramos categorias, subcategorias ou produtos para "${search}".`
              : "Ainda não existem produtos disponíveis no catálogo."}
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Voltar para a página inicial
          </Link>
        </div>
      )}

      {!loading && !error && hasResults && (
        <div className="space-y-12">
          {categories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Categorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/categoria/${encodeURIComponent(category.slug)}`}
                    className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                        {category.description}
                      </p>
                    )}

                    <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                      Ver categoria →
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {subcategories.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">
                  Subcategorias
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {subcategories.map((subcategory) => {
                  const categorySlug = subcategory.category?.slug;

                  if (!categorySlug) {
                    return (
                      <div
                        key={subcategory.id}
                        className="rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm"
                      >
                        <h3 className="text-lg font-semibold text-[#071a2f]">
                          {subcategory.name}
                        </h3>

                        {subcategory.description && (
                          <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                            {subcategory.description}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={subcategory.id}
                      to={`/categoria/${encodeURIComponent(
                        categorySlug,
                      )}/${encodeURIComponent(subcategory.slug)}`}
                      className="group rounded-2xl border border-[#e7edf5] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#1769e0] hover:shadow-md"
                    >
                      <h3 className="text-lg font-semibold text-[#071a2f] transition group-hover:text-[#1769e0]">
                        {subcategory.name}
                      </h3>

                      {subcategory.category && (
                        <p className="mt-1 text-xs font-medium text-[#1769e0]">
                          {subcategory.category.name}
                        </p>
                      )}

                      {subcategory.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-[#52657c]">
                          {subcategory.description}
                        </p>
                      )}

                      <span className="mt-4 inline-block text-sm font-semibold text-[#1769e0]">
                        Ver subcategoria →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section>
              <div className="mb-5">
                <h2 className="text-2xl font-bold text-[#071a2f]">Produtos</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </section>
  );
}

```

## src\pages\RegisterPage.tsx

```tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível criar sua conta.");
      }

      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível criar sua conta.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Criar conta</h1>
          <p className="mt-2 text-sm text-gray-500">
            Faça seu cadastro no WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Nome
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Seu nome"
              autoComplete="name"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              E-mail
            </label>

            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="register-password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Crie uma senha"
              autoComplete="new-password"
              required
              minLength={6}
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#1769e0] px-5 py-3 font-bold text-white transition hover:bg-[#0f56bd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}

```

## src\pages\SubcategoryPage.tsx

```tsx
import { useEffect, useMemo } from "react";
import { FiArrowLeft, FiArrowRight, FiGrid, FiHome } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";
import { useSubcategories } from "../contexts/useSubcategories";

export function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams<{
    categorySlug: string;
    subcategorySlug: string;
  }>();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    error: subcategoriesError,
    fetchSubcategories,
  } = useSubcategories();

  const {
    products,
    loading: productsLoading,
    error: productsError,
    fetchProducts,
  } = useProducts();

  useEffect(() => {
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  const category = useMemo(() => {
    if (!categorySlug) {
      return undefined;
    }

    return categories.find(
      (item) =>
        item.slug.toLowerCase() === categorySlug.toLowerCase() && item.active,
    );
  }, [categories, categorySlug]);

  const subcategory = useMemo(() => {
    if (!subcategorySlug || !category) {
      return undefined;
    }

    return subcategories.find(
      (item) =>
        item.slug.toLowerCase() === subcategorySlug.toLowerCase() &&
        item.categoryId === category.id &&
        item.active,
    );
  }, [subcategories, subcategorySlug, category]);

  useEffect(() => {
    if (category) {
      void fetchProducts(category.name);
    }
  }, [category, fetchProducts]);

  const visibleProducts = useMemo(() => {
    if (!subcategory) {
      return [];
    }

    return products
      .filter(
        (product) =>
          product.subcategoryId === subcategory.id &&
          product.active &&
          product.available,
      )
      .slice(0, 4);
  }, [products, subcategory]);

  const loading = categoriesLoading || subcategoriesLoading || productsLoading;

  const error = categoriesError || subcategoriesError || productsError;

  /*
   * Estado de carregamento
   */
  if (loading && !category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="animate-pulse">
          <div className="mb-6 h-5 w-40 rounded bg-slate-200" />

          <div className="grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
            <div className="space-y-5 p-8 md:p-12">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-12 w-3/4 rounded bg-slate-200" />
              <div className="h-20 w-full rounded bg-slate-200" />
            </div>

            <div className="min-h-[260px] bg-slate-200" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {["one", "two", "three", "four"].map((item) => (
              <div
                key={`subcategory-product-skeleton-${item}`}
                className="h-[360px] rounded-[24px] bg-slate-100"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /*
   * Categoria não encontrada
   */
  if (!category) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Categoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A categoria que você está procurando não existe ou não está
            disponível no momento.
          </p>

          <Link
            to="/"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiHome />
            Voltar para o início
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Subcategoria não encontrada
   */
  if (!subcategory) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link to="/" className="transition hover:text-slate-900">
            Início
          </Link>

          <span>/</span>

          <Link
            to={`/categoria/${category.slug}`}
            className="transition hover:text-slate-900"
          >
            {category.name}
          </Link>
        </div>

        <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[32px] border border-[#e7edf5] bg-white px-6 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-2xl text-slate-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Subcategoria não encontrada
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A subcategoria que você está procurando não existe ou não está
            disponível nesta categoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <FiArrowLeft />
            Voltar para {category.name}
          </Link>
        </div>
      </section>
    );
  }

  /*
   * Erro
   */
  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <div className="rounded-[32px] border border-red-100 bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <FiGrid className="text-2xl text-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Não foi possível carregar esta seleção
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
            Ocorreu um problema ao carregar os produtos. Tente novamente em
            alguns instantes.
          </p>

          <button
            type="button"
            onClick={() => {
              void fetchProducts(category.name);
            }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500"
      >
        <Link to="/" className="transition hover:text-slate-900">
          Início
        </Link>

        <span>/</span>

        <Link
          to={`/categoria/${category.slug}`}
          className="transition hover:text-slate-900"
        >
          {category.name}
        </Link>

        <span>/</span>

        <span className="font-medium text-slate-900">{subcategory.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12 grid min-h-[360px] overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.06)] md:grid-cols-[1fr_0.9fr]">
        {/* Conteúdo */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Subcategoria
          </span>

          <h1 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 md:text-5xl">
            {subcategory.name}
          </h1>

          {subcategory.description && (
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
              {subcategory.description}
            </p>
          )}

          <div className="mt-7">
            <Link
              to={`/categoria/${category.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
            >
              <FiArrowLeft />
              Voltar para {category.name}
            </Link>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative min-h-[280px] overflow-hidden bg-slate-100 md:min-h-full">
          {subcategory.image ? (
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-center justify-center">
              <FiGrid className="text-7xl text-slate-300" />
            </div>
          )}
        </div>
      </div>

      {/* Cabeçalho dos produtos */}
      <div className="mb-7 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Ofertas encontradas
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
            Escolha o que combina com você
          </h2>
        </div>

        <span className="text-sm text-slate-400">
          Links patrocinados identificados
        </span>
      </div>

      {/* Produtos */}
      {productsLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {["one", "two", "three", "four"].map((item) => (
            <div
              key={`product-skeleton-${item}`}
              className="h-[360px] animate-pulse rounded-[24px] bg-slate-100"
            />
          ))}
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-[24px] border border-[#e7edf5] bg-white px-6 py-12 text-center shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <FiGrid className="text-xl text-slate-500" />
          </div>

          <h3 className="text-xl font-bold text-slate-900">
            Nenhum produto disponível
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            Ainda não encontramos produtos ativos e disponíveis nesta
            subcategoria.
          </p>

          <Link
            to={`/categoria/${category.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
          >
            Ver outras subcategorias
            <FiArrowRight />
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleProducts.length === 4 && (
            <div className="mt-8 flex justify-center">
              <Link
                to={`/categoria/${category.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              >
                Voltar para a categoria
                <FiArrowRight />
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}

```

## src\pages\TechnologyPage.tsx

```tsx
import { CategoryPage } from "./ContentPages";

export function TechnologyPage() {
  return (
    <CategoryPage
      title="Tecnologia"
      summary="Encontre eletrônicos seguros, com a melhor relação entre qualidade, desempenho e inovação."
      image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Notebook aberto sobre uma mesa de trabalho"
      highlights={[
        {
          title: "Smartphones e acessórios",
          description: "Conectividade e praticidade para acompanhar seu ritmo.",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Smartphone sobre uma mesa",
        },
        {
          title: "Áudio e imagem",
          description: "Som envolvente e telas para transformar seus momentos.",
          image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Fones de ouvido modernos",
        },
        {
          title: "Casa inteligente",
          description:
            "Tecnologia que deixa a rotina mais simples e conectada.",
          image:
            "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Dispositivo inteligente em uma casa",
        },
        {
          title: "Trabalho e lazer",
          description:
            "Equipamentos para produzir, estudar e aproveitar melhor.",
          image:
            "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook e acessórios em uma mesa",
        },
      ]}
    />
  );
}

```

## src\pages\TermsOfUsePage.tsx

```tsx
import { InfoPage } from "./ContentPages";

export function TermsOfUsePage() {
  return (
    <InfoPage
      title="Termos de uso"
      intro="Ao utilizar a WorldMix360, você concorda com nossas regras de navegação e uso da plataforma."
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa revisando um documento com caneta e notebook"
      visualTitle="Princípios para uma boa experiência"
      visualItems={[
        { label: "Uso responsável", value: "Respeito", level: 100 },
        { label: "Conteúdo", value: "Integridade", level: 82 },
        { label: "Relação", value: "Transparência", level: 94 },
      ]}
      sections={[
        {
          title: "Uso da plataforma",
          content:
            "Você deve utilizar a plataforma de forma responsável e conforme a legislação vigente.",
        },
        {
          title: "Conteúdo e propriedade intelectual",
          content:
            "Todo o conteúdo e os materiais da marca são protegidos e devem ser respeitados.",
        },
        {
          title: "Responsabilidade",
          content:
            "A WorldMix360 atua como canal de informação e comercialização, sem substituir a análise individual do consumidor.",
        },
      ]}
    />
  );
}

```

## src\routes\adminRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "../components/AdminLayout";
import { AdminCategoriesPage } from "../pages/AdminCategoriesPage";
import AdminDashboardPage from "../pages/AdminDashboarPage";
import { AdminMarketplaceFormPage } from "../pages/AdminMarketplaceFormPage";
import { AdminMarketplacesPage } from "../pages/AdminMarketplacesPage";
import { AdminProductsPage } from "../pages/AdminProductsPage";
import { AdminSubcategoriesPage } from "../pages/AdminSubcategoriesPage";
import { AdminSubcategoryFormPage } from "../pages/AdminSubcategoryFormPage";
import { AdminCategoryFormPage } from "../pages/admin/AdminCategoriesFormPage";
import { AdminProductsFormPage } from "../pages/admin/AdminProductsFormPage";
import PrivateRoute from "./PrivateRoute";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/new",
        element: <AdminProductsFormPage />,
      },
      {
        path: "products/:id/edit",
        element: <AdminProductsFormPage />,
      },

      {
        path: "categories",
        element: <AdminCategoriesPage />,
      },

      {
        path: "categories/new",
        element: <AdminCategoryFormPage />,
      },

      {
        path: "categories/:id/edit",
        element: <AdminCategoryFormPage />,
      },
      {
        path: "subcategories",
        element: <AdminSubcategoriesPage />,
      },

      {
        path: "subcategories/new",
        element: <AdminSubcategoryFormPage />,
      },

      {
        path: "subcategories/:id/edit",
        element: <AdminSubcategoryFormPage />,
      },
      {
        path: "marketplaces",
        element: <AdminMarketplacesPage />,
      },
      {
        path: "marketplaces/new",
        element: <AdminMarketplaceFormPage />,
      },
      {
        path: "marketplaces/:id/edit",
        element: <AdminMarketplaceFormPage />,
      },
    ],
  },
];

```

## src\routes\authRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";

export const authRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
];

```

## src\routes\homeRoutes.tsx

```tsx
/** src/routes/homeRoutes.tsx */
import type { RouteObject } from "react-router-dom";

import { HomePage } from "../pages/HomePage";

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];

```

## src\routes\index.tsx

```tsx
/* src/routes/index.tsx */
import { Navigate, type RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { institutionalRoutes } from "./institutionalRoutes";
import { productRoutes } from "./productRoutes";

const routes: RouteObject[] = [
  // Rotas públicas
  {
    element: <AppLayout />,
    children: [
      ...homeRoutes,
      ...institutionalRoutes,
      ...productRoutes,
      ...authRoutes,
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  // Rotas administrativas (layout separado)
  ...adminRoutes,
];

export function AppRoutes() {
  return useRoutes(routes);
}

```

## src\routes\institutionalRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HowItWorksPage } from "../pages/HowItWorksPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "../pages/TermsOfUsePage";

export const institutionalRoutes: RouteObject[] = [
  { path: "sobre", element: <AboutPage /> },
  { path: "contato", element: <ContactPage /> },
  { path: "como-funciona", element: <HowItWorksPage /> },
  {
    path: "politica-de-privacidade",
    element: <PrivacyPolicyPage />,
  },
  { path: "termos-de-uso", element: <TermsOfUsePage /> },
];

```

## src\routes\PrivateRoute.tsx

```tsx
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  /**
   * Enquanto o AuthProvider verifica o localStorage,
   * não devemos redirecionar o usuário para o login.
   */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbe7f5] border-t-[#1769e0]" />

          <p className="mt-4 text-sm font-medium text-[#52657c]">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  /**
   * Usuário não autenticado.
   */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /**
   * Usuário autenticado, mas sem permissão de administrador.
   */
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

```

## src\routes\productRoutes.tsx

```tsx
import type { RouteObject } from "react-router-dom";

import { BlogPage } from "../pages/BlogPage";
import { CategoryPage } from "../pages/CategoriesPage";
import { DigitalProductsPage } from "../pages/DigitalProductsPage";
import { FashionPage } from "../pages/FashionPage";
import { HomeUtilitiesPage } from "../pages/HomeUtilitiesPage";
import { OffersPage } from "../pages/OffersPage";
import { PetsPage } from "../pages/PetsPage";
import { ProductPage } from "../pages/ProductPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SubcategoryPage } from "../pages/SubcategoryPage";
import { TechnologyPage } from "../pages/TechnologyPage";

export const productRoutes: RouteObject[] = [
  // Busca de produtos
  { path: "produtos", element: <ProductsPage /> },

  // Detalhes do produto
  { path: "produto/:slug", element: <ProductPage /> },

  // Categoria
  { path: "categoria/:slug", element: <CategoryPage /> },

  // Subcategoria - rota hierárquica
  {
    path: "categoria/:categorySlug/:subcategorySlug",
    element: <SubcategoryPage />,
  },

  // Rotas de categorias legadas
  { path: "tecnologia", element: <TechnologyPage /> },
  { path: "casa-utilidades", element: <HomeUtilitiesPage /> },
  { path: "moda", element: <FashionPage /> },
  { path: "pets", element: <PetsPage /> },
  { path: "produtos-digitais", element: <DigitalProductsPage /> },
  { path: "ofertas", element: <OffersPage /> },
  { path: "blog", element: <BlogPage /> },

  // Compatibilidade com URLs antigas
  {
    path: ":category/:subcategory",
    element: <SubcategoryPage />,
  },
];

```

## src\types\AffiliateProduct.ts

```ts
export type Marketplace = "mercado-livre" | "amazon" | "shopee" | "outro";

export type AffiliateProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  marketplace: Marketplace;
  affiliateUrl: string;
  category?: string;
};

```

## src\types\User.ts

```ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "customer";
};

```

## src\utils\formatCurrency.ts

```ts
export function formatCurrencyBRL(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === "") {
    return "R$ 0,00";
  }

  const numericValue =
    typeof value === "string"
      ? Number.parseFloat(value.replace(",", "."))
      : value;

  if (!Number.isFinite(numericValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}

export function parseCurrencyBRL(value: string): number {
  const normalizedValue = value
    .replace(/\s/g, "")
    .replace(/R\$/gi, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numericValue = Number.parseFloat(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const numericValue = Number(digits) / 100;

  return numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

```

## tools\generate-md.ts

```ts
import { readdirSync, statSync, readFileSync, appendFileSync, existsSync, unlinkSync } from "fs";
import { join, extname, dirname, resolve, relative, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// raiz do projeto (um nível acima de tools)
const projectPath = resolve(__dirname, "..");

// pega o nome da pasta raiz (nome do projeto)
const projectName = basename(projectPath);

// gera o arquivo dentro de tools com o nome do projeto
const outputFile = join(__dirname, `${projectName}.md`);

const extensions = [".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".env", ".css"];
const specialFiles = [
  "Dockerfile",
  "Makefile",
  ".eslintrc",
  ".prettierrc",
  "vite.config.ts",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js"
];
const excludeDirs = ["node_modules", ".git", "dist", "build", "generated"];
const excludeFiles = ["package-lock.json"];

if (existsSync(outputFile)) unlinkSync(outputFile);

function formatHeader(fullPath: string): string {
  const rel = relative(projectPath, fullPath);
  return `## ${rel}`;
}

function wrapContent(ext: string, content: string): string {
  if ([".ts", ".tsx", ".js"].includes(ext)) return `\n\`\`\`${ext.replace(".", "")}\n${content}\n\`\`\`\n`;
  if (ext === ".json") return `\n\`\`\`json\n${content}\n\`\`\`\n`;
  if (ext === ".md") return `\n${content}\n`;
  if (ext === ".env") return `\n\`\`\`env\n${content}\n\`\`\`\n`;
  if (specialFiles.includes(ext)) return `\n\`\`\`\n${content}\n\`\`\`\n`;
  return `\n${content}\n`;
}

function walk(dir: string): void {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) walk(fullPath);
    } else {
      const ext = extname(file) || file;
      if ((extensions.includes(ext) || specialFiles.includes(file)) && !excludeFiles.includes(file)) {
        try {
          const content = readFileSync(fullPath, "utf8");
          appendFileSync(outputFile, `\n${formatHeader(fullPath)}\n`);
          appendFileSync(outputFile, wrapContent(ext, content));
        } catch (err) {
          console.error("⚠️ Erro ao ler arquivo:", fullPath, (err as Error).message);
        }
      }
    }
  }
}

console.log(`🔍 Gerando arquivo ${projectName}.md...`);
walk(projectPath);
console.log(`✅ Arquivo gerado com sucesso em ${outputFile}`);

```

## tools\instrucoes.md

📘 Guia de Uso — Script `generate-md.ts`

Este utilitário percorre todo o projeto (backend ou frontend) e gera um arquivo `.md` com o conteúdo dos arquivos, formatado em Markdown e destacado por tipo de código.

---

## 🛠️ Estrutura do Projeto

```
meu-projeto/
├─ backend/
│   ├─ src/
│   └─ tools/
│       └─ generate-md.ts
├─ frontend/
│   ├─ src/
│   └─ tools/
│       └─ generate-md.ts
├─ package.json
└─ tsconfig.json
---
```

## 📂 Script `generate-md.ts`

Coloque este arquivo dentro da pasta `tools` de cada parte (backend e frontend):

```ts
import {
  readdirSync,
  statSync,
  readFileSync,
  appendFileSync,
  existsSync,
  unlinkSync,
} from "fs";
import { join, extname, dirname, resolve, relative, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// raiz do projeto (um nível acima da pasta tools)
const projectPath = resolve(__dirname, "..");

// nome da pasta raiz (ex: backend ou frontend)
const projectName = basename(projectPath);

// arquivo de saída dentro da pasta tools
const outputFile = join(__dirname, `${projectName}.md`);

const extensions = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".env",
  ".css",
];
const specialFiles = [
  "Dockerfile",
  "Makefile",
  ".eslintrc",
  ".prettierrc",
  "vite.config.ts",
  "vite.config.js",
  "tailwind.config.js",
  "postcss.config.js",
];
const excludeDirs = ["node_modules", ".git", "dist", "build", "generated"];
const excludeFiles = ["package-lock.json"];

if (existsSync(outputFile)) unlinkSync(outputFile);

function formatHeader(fullPath: string): string {
  const rel = relative(projectPath, fullPath);
  return `## ${rel}`;
}

function wrapContent(ext: string, content: string): string {
  if ([".ts", ".tsx", ".js", ".jsx"].includes(ext))
    return `\n\`\`\`${ext.replace(".", "")}\n${content}\n\`\`\`\n`;
  if (ext === ".json") return `\n\`\`\`json\n${content}\n\`\`\`\n`;
  if (ext === ".md") return `\n${content}\n`;
  if (ext === ".env") return `\n\`\`\`env\n${content}\n\`\`\`\n`;
  if (ext === ".css") return `\n\`\`\`css\n${content}\n\`\`\`\n`;
  if (specialFiles.includes(ext)) return `\n\`\`\`\n${content}\n\`\`\`\n`;
  return `\n${content}\n`;
}

function walk(dir: string): void {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) walk(fullPath);
    } else {
      const ext = extname(file) || file;
      if (
        (extensions.includes(ext) || specialFiles.includes(file)) &&
        !excludeFiles.includes(file)
      ) {
        try {
          const content = readFileSync(fullPath, "utf8");
          appendFileSync(outputFile, `\n${formatHeader(fullPath)}\n`);
          appendFileSync(outputFile, wrapContent(ext, content));
        } catch (err) {
          console.error(
            "⚠️ Erro ao ler arquivo:",
            fullPath,
            (err as Error).message,
          );
        }
      }
    }
  }
}

console.log(`🔍 Gerando arquivo ${projectName}.md...`);
walk(projectPath);
console.log(`✅ Arquivo gerado com sucesso em ${outputFile}`);
```

⚙️ Configuração do TypeScript

- No tsconfig.json da raiz, adicione:

```
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "ES2020",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"]
  },
  "include": ["src", "tools"]
}
```

📦 Dependências

- Instale:

```
"scripts": {
  "generate-md": "tsx tools/generate-md.ts"
}

```

🚀 Como Rodar

- No terminal, vá até a pasta desejada e rode:

```
npm run generate-md
```



## tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}

```

## tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

## tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}

```

## vite.config.ts

```ts
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [svgr(), tailwindcss(), react()],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },
  preview: {
    host: "localhost",
    port: 4173,
    strictPort: true,
  },
});

```
