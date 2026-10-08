import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FormErrorMessage } from "../../components/FormControls";
import { MercadoLivreOfferModal } from "../../components/admin/products/MercadoLivreOfferModal";
import { ProductBasicInfo } from "../../components/admin/products/ProductBasicInfo";
import { ProductFormActions } from "../../components/admin/products/ProductFormActions";
import { ProductGallery } from "../../components/admin/products/ProductGallery";
import { ProductPricing } from "../../components/admin/products/ProductPricing";
import { ProductRelationships } from "../../components/admin/products/ProductRelationships";
import { ProductSeo } from "../../components/admin/products/ProductSeo";
import { ProductStatus } from "../../components/admin/products/ProductStatus";
import type { ProductImageForm } from "../../components/admin/products/types";
import {
  cleanDescription,
  cleanGalleryImages,
  formatPrice,
  parseOptionalPrice,
  parseOptionalRating,
  parsePrice,
  parseReviewsCount,
  validateGalleryImages,
  validateUrl,
  type ProductFormData,
  type ProductWithMarketplaceLinks,
} from "../../components/admin/products/productFormUtils";
import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";
import { useProducts } from "../../contexts/useProducts";
import { useSubcategories } from "../../contexts/useSubcategories";
import { parseCurrencyBRL } from "../../utils/formatCurrency";
import {
  analyzeMercadoLivreProduct,
  importMercadoLivreProduct,
  type MercadoLivreAnalyzeResult,
  type MercadoLivreOffer,
  updateMercadoLivreProductOffer,
} from "../../services/mercadoLivreService";

const MERCADO_LIVRE_MARKETPLACE_ID = "c255826b-2073-4c76-8966-b87f22403090";

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
  const [externalLink, setExternalLink] = useState("");

  const [subcategoryId, setSubcategoryId] = useState("");
  const [marketplaceId, setMarketplaceId] = useState("");

  const [destaque, setDestaque] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  const [available, setAvailable] = useState(true);
  const [active, setActive] = useState(true);

  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  const [mercadoLivreAnalysis, setMercadoLivreAnalysis] =
    useState<MercadoLivreAnalyzeResult | null>(null);

  const [mercadoLivreModalOpen, setMercadoLivreModalOpen] = useState(false);

  const [mercadoLivreImporting, setMercadoLivreImporting] = useState(false);

  const isMercadoLivre = marketplaceId === MERCADO_LIVRE_MARKETPLACE_ID;

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
            ? formatPrice(Number(product.price))
            : "",
        );

        setOriginalPrice(
          product.originalPrice !== null && product.originalPrice !== undefined
            ? formatPrice(Number(product.originalPrice))
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

        const productWithMarketplaceLinks = product as typeof product &
          ProductWithMarketplaceLinks;

        const marketplaceProducts =
          productWithMarketplaceLinks.marketplaceProducts;

        if (Array.isArray(marketplaceProducts)) {
          const mercadoLivreProduct = marketplaceProducts.find(
            (marketplaceProduct) =>
              marketplaceProduct.marketplaceId === MERCADO_LIVRE_MARKETPLACE_ID,
          );

          setExternalLink(mercadoLivreProduct?.externalLink ?? "");
        } else {
          setExternalLink("");
        }

        setDestaque(Boolean(product.destaque));
        setBestSeller(Boolean(product.bestSeller));
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

  function handleGalleryImageChange(imageId: string, value: string) {
    setGalleryImages((currentImages) =>
      currentImages.map((image) =>
        image.id === imageId
          ? {
              ...image,
              imageUrl: value,
            }
          : image,
      ),
    );
  }

  function handleRemoveGalleryImage(imageId: string) {
    setGalleryImages((currentImages) =>
      currentImages
        .filter((image) => image.id !== imageId)
        .map((image, index) => ({
          ...image,
          sortOrder: index,
        })),
    );
  }

  function buildProductData(options?: {
    price?: number;
    originalPrice?: number | null;
  }): ProductFormData {
    const parsedPrice =
      options?.price !== undefined
        ? options.price
        : parsePrice(price, "Informe um preço válido.");

    let parsedOriginalPrice: number | undefined;

    if (options?.originalPrice !== undefined) {
      if (
        options.originalPrice !== null &&
        Number.isFinite(options.originalPrice) &&
        options.originalPrice >= 0
      ) {
        parsedOriginalPrice = options.originalPrice;
      }
    } else {
      parsedOriginalPrice = parseOptionalPrice(
        originalPrice,
        "Informe um preço original válido.",
      );
    }

    const parsedRating = parseOptionalRating(rating);

    const parsedReviewsCount = parseReviewsCount(reviewsCount);

    const cleanImages = validateGalleryImages(galleryImages);

    return {
      title: title.trim(),
      description: cleanDescription(description),
      shortDescription: shortDescription.trim() || undefined,

      imageUrl: imageUrl.trim(),

      images: cleanImages,

      price: parsedPrice,

      originalPrice: parsedOriginalPrice,

      currency: currency.trim().toUpperCase() || "BRL",

      rating: parsedRating,
      reviewsCount: parsedReviewsCount,

      affiliateUrl: affiliateUrl.trim(),

      subcategoryId,
      marketplaceId,

      destaque,
      bestSeller,
      available,
      active,

      seoTitle: seoTitle.trim() || undefined,

      seoDescription: seoDescription.trim() || undefined,
    };
  }

  function validateCommonForm(): void {
    if (!affiliateUrl.trim()) {
      throw new Error("Informe o link de afiliado.");
    }

    if (!subcategoryId) {
      throw new Error("Selecione uma subcategoria.");
    }

    if (!marketplaceId) {
      throw new Error("Selecione um marketplace.");
    }
  }

  function validateNormalProductForm(): void {
    if (!title.trim()) {
      throw new Error("Informe o título do produto.");
    }

    if (!imageUrl.trim()) {
      throw new Error("Informe a URL da imagem.");
    }

    validateUrl(imageUrl, "Informe uma URL válida para a imagem.");

    validateUrl(
      affiliateUrl,
      "Informe uma URL válida para o link de afiliado.",
    );

    buildProductData();
  }

  async function handleMercadoLivreImport(
    selectedOffer: MercadoLivreOffer,
    analysis: MercadoLivreAnalyzeResult,
  ) {
    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!subcategoryId) {
      setError("Selecione uma subcategoria antes de importar o produto.");
      return;
    }

    if (!affiliateUrl.trim()) {
      setError("Informe o link de afiliado antes de importar o produto.");
      return;
    }

    if (!externalLink.trim()) {
      setError(
        "Informe o link de referência do Mercado Livre antes de importar.",
      );
      return;
    }

    setMercadoLivreImporting(true);
    setError(null);
    setLoading(true);

    try {
      const cleanImages = cleanGalleryImages(galleryImages);

      const parsedManualPrice = price.trim()
        ? parseCurrencyBRL(price)
        : undefined;

      const parsedManualOriginalPrice = originalPrice.trim()
        ? parseCurrencyBRL(originalPrice)
        : undefined;

      const parsedManualRating = rating.trim() ? Number(rating) : undefined;

      const parsedManualReviewsCount = Number(reviewsCount);

      const productData = {
        affiliateUrl: affiliateUrl.trim(),
        externalLink: externalLink.trim(),

        catalogProductId: analysis.catalogProductId,

        itemId: selectedOffer.itemId,
        sellerId: selectedOffer.sellerId,

        subcategoryId,

        title: title.trim() || undefined,

        description: cleanDescription(description),

        shortDescription: shortDescription.trim() || undefined,

        imageUrl: imageUrl.trim() || undefined,

        images: cleanImages.length > 0 ? cleanImages : undefined,

        price:
          parsedManualPrice !== undefined &&
          Number.isFinite(parsedManualPrice) &&
          parsedManualPrice >= 0
            ? parsedManualPrice
            : undefined,

        originalPrice:
          parsedManualOriginalPrice !== undefined &&
          Number.isFinite(parsedManualOriginalPrice) &&
          parsedManualOriginalPrice >= 0
            ? parsedManualOriginalPrice
            : undefined,

        currency: currency.trim().toUpperCase() || undefined,

        rating:
          parsedManualRating !== undefined &&
          Number.isFinite(parsedManualRating) &&
          parsedManualRating >= 0 &&
          parsedManualRating <= 5
            ? parsedManualRating
            : undefined,

        reviewsCount:
          Number.isInteger(parsedManualReviewsCount) &&
          parsedManualReviewsCount >= 0
            ? parsedManualReviewsCount
            : undefined,

        destaque,
        bestSeller,
        available,
        active,

        seoTitle: seoTitle.trim() || undefined,

        seoDescription: seoDescription.trim() || undefined,
      };

      await importMercadoLivreProduct(productData, token);

      setMercadoLivreModalOpen(false);
      setMercadoLivreAnalysis(null);

      navigate("/admin/products");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível importar o produto do Mercado Livre.",
      );
    } finally {
      setMercadoLivreImporting(false);
      setLoading(false);
    }
  }

  function handleMercadoLivreModalCancel() {
    if (mercadoLivreImporting) {
      return;
    }

    setMercadoLivreModalOpen(false);
    setMercadoLivreAnalysis(null);
    setLoading(false);
  }

  async function handleMercadoLivreModalConfirm(
    selectedOffer: MercadoLivreOffer | null,
  ) {
    if (!selectedOffer) {
      handleMercadoLivreModalCancel();
      return;
    }

    if (isEditing && id) {
      await saveEditedProductWithMercadoLivreOffer(
        selectedOffer,
        mercadoLivreAnalysis,
      );
      return;
    }

    if (!mercadoLivreAnalysis) {
      setError("A análise do Mercado Livre não está disponível.");
      return;
    }

    await handleMercadoLivreImport(selectedOffer, mercadoLivreAnalysis);
  }

  async function saveEditedProductWithMercadoLivreOffer(
    selectedOffer: MercadoLivreOffer,
    analysis: MercadoLivreAnalyzeResult | null,
  ) {
    if (!token || !id) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!analysis) {
      setError("A análise do Mercado Livre não está disponível.");
      return;
    }

    setMercadoLivreImporting(true);
    setLoading(true);
    setError(null);

    try {
      const selectedOfferPrice = Number(selectedOffer.price);

      if (!Number.isFinite(selectedOfferPrice) || selectedOfferPrice < 0) {
        throw new Error("O preço da oferta selecionada é inválido.");
      }

      const selectedOfferOriginalPrice =
        selectedOffer.originalPrice !== null &&
        selectedOffer.originalPrice !== undefined
          ? Number(selectedOffer.originalPrice)
          : null;

      if (
        selectedOfferOriginalPrice !== null &&
        (!Number.isFinite(selectedOfferOriginalPrice) ||
          selectedOfferOriginalPrice < 0)
      ) {
        throw new Error("O preço original da oferta selecionada é inválido.");
      }

      await updateMercadoLivreProductOffer(
        id,
        {
          externalLink: externalLink.trim(),
          catalogProductId: analysis.catalogProductId,
          itemId: selectedOffer.itemId,
          sellerId: selectedOffer.sellerId,
        },
        token,
      );

      await saveNormalProductUpdate(
        id,
        token,
        selectedOfferPrice,
        selectedOfferOriginalPrice,
      );

      setPrice(formatPrice(selectedOfferPrice));

      setOriginalPrice(
        selectedOfferOriginalPrice !== null
          ? formatPrice(selectedOfferOriginalPrice)
          : "",
      );

      setMercadoLivreModalOpen(false);
      setMercadoLivreAnalysis(null);

      navigate("/admin/products");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível atualizar a oferta do Mercado Livre.",
      );
    } finally {
      setMercadoLivreImporting(false);
      setLoading(false);
    }
  }

  async function saveNormalProductUpdate(
    productId: string,
    authToken: string,
    mercadoLivrePrice?: number,
    mercadoLivreOriginalPrice?: number | null,
  ) {
    const productData = buildProductData({
      price: mercadoLivrePrice,
      originalPrice: mercadoLivreOriginalPrice,
    });

    await updateProduct(productId, productData, authToken);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    try {
      validateCommonForm();
    } catch (validationError) {
      setError(
        validationError instanceof Error
          ? validationError.message
          : "Verifique os dados do formulário.",
      );
      return;
    }

    /*
     * ============================================================
     * MERCADO LIVRE
     * ============================================================
     *
     * Cadastro:
     *   -> analisa o link;
     *   -> 0 ofertas: não cadastra;
     *   -> 1 oferta: importa automaticamente;
     *   -> várias ofertas: abre modal.
     *
     * Edição:
     *   -> sempre reanalisa o link;
     *   -> 0 ofertas: não salva;
     *   -> 1 oferta: atualiza automaticamente;
     *   -> várias ofertas: abre modal.
     */

    if (isMercadoLivre) {
      if (!externalLink.trim()) {
        setError(
          isEditing
            ? "O link de referência do Mercado Livre é obrigatório para atualizar este produto."
            : "Informe o link de referência do Mercado Livre.",
        );
        return;
      }

      try {
        validateUrl(
          affiliateUrl,
          "Informe uma URL válida para o link de afiliado.",
        );

        validateUrl(
          externalLink,
          "Informe uma URL válida para o link de referência do Mercado Livre.",
        );
      } catch (validationError) {
        setError(
          validationError instanceof Error
            ? validationError.message
            : "Informe URLs válidas.",
        );
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const analysis = await analyzeMercadoLivreProduct(
          externalLink.trim(),
          token,
        );

        if (analysis.noOffersFound || analysis.offers.length === 0) {
          setError(
            isEditing
              ? "Nenhuma oferta foi encontrada para este produto no Mercado Livre. A atualização foi cancelada."
              : "Nenhuma oferta foi encontrada para este produto no Mercado Livre.",
          );
          return;
        }

        /*
         * Mantemos a análise no estado para o modal,
         * mas as operações seguintes recebem o objeto
         * diretamente. Assim não dependemos da atualização
         * assíncrona do React.
         */
        setMercadoLivreAnalysis(analysis);

        if (analysis.requiresOfferSelection || analysis.offers.length > 1) {
          setMercadoLivreModalOpen(true);
          return;
        }

        const selectedOffer =
          analysis.selectedOffer ?? analysis.offers[0] ?? null;

        if (!selectedOffer) {
          setError(
            "Não foi possível identificar uma oferta válida do Mercado Livre.",
          );
          return;
        }

        if (isEditing && id) {
          await saveEditedProductWithMercadoLivreOffer(selectedOffer, analysis);
        } else {
          await handleMercadoLivreImport(selectedOffer, analysis);
        }
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : isEditing
              ? "Não foi possível analisar e atualizar a oferta do Mercado Livre."
              : "Não foi possível analisar o produto do Mercado Livre.",
        );
      } finally {
        /*
         * handleMercadoLivreImport e
         * saveEditedProductWithMercadoLivreOffer
         * também controlam loading.
         *
         * O estado final continua seguro porque ambos
         * terminam com false.
         */
        setLoading(false);
      }

      return;
    }

    /*
     * ============================================================
     * CADASTRO / EDIÇÃO NORMAL
     * ============================================================
     */

    try {
      validateNormalProductForm();

      const productData = buildProductData();

      setLoading(true);

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
        <FormErrorMessage message={error} className="mb-6" />
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
          externalLink={externalLink}
          loading={loading}
          isEditing={isEditing}
          onSubcategoryChange={setSubcategoryId}
          onMarketplaceChange={setMarketplaceId}
          onAffiliateUrlChange={setAffiliateUrl}
          onExternalLinkChange={setExternalLink}
        />

        <ProductStatus
          destaque={destaque}
          bestSeller={bestSeller}
          available={available}
          active={active}
          loading={loading}
          onDestaqueChange={setDestaque}
          onBestSellerChange={setBestSeller}
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

      {mercadoLivreAnalysis && (
        <MercadoLivreOfferModal
          open={mercadoLivreModalOpen}
          title={
            mercadoLivreAnalysis.title || "Produto do catálogo do Mercado Livre"
          }
          offers={mercadoLivreAnalysis.offers}
          loading={mercadoLivreImporting}
          onCancel={handleMercadoLivreModalCancel}
          onConfirm={(selectedOffer) =>
            void handleMercadoLivreModalConfirm(selectedOffer)
          }
        />
      )}
    </section>
  );
}
