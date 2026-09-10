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
