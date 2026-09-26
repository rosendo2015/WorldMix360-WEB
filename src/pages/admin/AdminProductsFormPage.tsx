import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { MercadoLivreOfferModal } from "../../components/admin/products/MercadoLivreOfferModal";
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
import {
  analyzeMercadoLivreProduct,
  importMercadoLivreProduct,
  type MercadoLivreAnalyzeResult,
  type MercadoLivreOffer,
  updateMercadoLivreProductOffer,
} from "../../services/mercadoLivreService";
import { parseCurrencyBRL } from "../../utils/formatCurrency";

const MERCADO_LIVRE_MARKETPLACE_ID = "c255826b-2073-4c76-8966-b87f22403090";

type ProductMarketplaceLink = {
  id?: string;
  marketplaceId?: string | null;
  externalLink?: string | null;
  affiliateUrl?: string | null;
};

type ProductWithMarketplaceLinks = {
  marketplaceProducts?: ProductMarketplaceLink[] | null;
};

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

  // Mantido: comportamento original do featured.
  const [featured, setFeatured] = useState(false);

  // Novas opções independentes.
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

        const productWithMarketplaceLinks = product as typeof product &
          ProductWithMarketplaceLinks;

        const marketplaceProducts =
          productWithMarketplaceLinks.marketplaceProducts;

        if (Array.isArray(marketplaceProducts)) {
          const mercadoLivreProduct = marketplaceProducts.find(
            (marketplaceProduct) =>
              marketplaceProduct.marketplaceId === MERCADO_LIVRE_MARKETPLACE_ID,
          );

          const currentExternalLink = mercadoLivreProduct?.externalLink ?? "";

          setExternalLink(currentExternalLink);
        } else {
          setExternalLink("");
        }

        // featured permanece independente de destaque e bestSeller.
        setFeatured(Boolean(product.featured));
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

  async function handleMercadoLivreImport(selectedOffer: MercadoLivreOffer) {
    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!mercadoLivreAnalysis) {
      setError("A análise do Mercado Livre não está disponível.");
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
      const cleanDescription =
        description.trim() === "<p></p>"
          ? undefined
          : description.trim() || undefined;

      const parsedManualPrice = price.trim()
        ? parseCurrencyBRL(price)
        : undefined;

      const parsedManualOriginalPrice = originalPrice.trim()
        ? parseCurrencyBRL(originalPrice)
        : undefined;

      const parsedManualRating = rating.trim() ? Number(rating) : undefined;

      const parsedManualReviewsCount = Number(reviewsCount);

      const cleanGalleryImages = galleryImages
        .map((image) => ({
          imageUrl: image.imageUrl.trim(),
          sortOrder: image.sortOrder,
        }))
        .filter((image) => image.imageUrl);

      await importMercadoLivreProduct(
        {
          affiliateUrl: affiliateUrl.trim(),
          externalLink: externalLink.trim(),

          catalogProductId: mercadoLivreAnalysis.catalogProductId,

          itemId: selectedOffer.itemId,
          sellerId: selectedOffer.sellerId,

          subcategoryId,

          title: title.trim() || undefined,
          description: cleanDescription,
          shortDescription: shortDescription.trim() || undefined,
          imageUrl: imageUrl.trim() || undefined,

          images:
            cleanGalleryImages.length > 0 ? cleanGalleryImages : undefined,

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

          // Os três campos são independentes.
          featured,
          destaque,
          bestSeller,
          available,
          active,

          seoTitle: seoTitle.trim() || undefined,

          seoDescription: seoDescription.trim() || undefined,
        },
        token,
      );

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
      await saveEditedProductWithMercadoLivreOffer(selectedOffer);
      return;
    }

    await handleMercadoLivreImport(selectedOffer);
  }

  async function saveEditedProductWithMercadoLivreOffer(
    selectedOffer: MercadoLivreOffer,
  ) {
    if (!token || !id) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!mercadoLivreAnalysis) {
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
          catalogProductId: mercadoLivreAnalysis.catalogProductId,
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

      setPrice(
        selectedOfferPrice.toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );

      if (selectedOfferOriginalPrice !== null) {
        setOriginalPrice(
          selectedOfferOriginalPrice.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }),
        );
      } else {
        setOriginalPrice("");
      }

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
    const parsedPrice =
      mercadoLivrePrice !== undefined
        ? mercadoLivrePrice
        : price.trim()
          ? parseCurrencyBRL(price)
          : undefined;

    if (
      parsedPrice === undefined ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
      throw new Error("Informe um preço válido.");
    }

    let parsedOriginalPrice: number | undefined;

    if (mercadoLivreOriginalPrice !== undefined) {
      if (
        mercadoLivreOriginalPrice !== null &&
        Number.isFinite(mercadoLivreOriginalPrice) &&
        mercadoLivreOriginalPrice >= 0
      ) {
        parsedOriginalPrice = mercadoLivreOriginalPrice;
      }
    } else if (originalPrice.trim()) {
      parsedOriginalPrice = parseCurrencyBRL(originalPrice);

      if (!Number.isFinite(parsedOriginalPrice) || parsedOriginalPrice < 0) {
        throw new Error("Informe um preço original válido.");
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
        throw new Error("A avaliação deve estar entre 0 e 5.");
      }
    }

    const parsedReviewsCount = Number(reviewsCount);

    if (!Number.isInteger(parsedReviewsCount) || parsedReviewsCount < 0) {
      throw new Error("A quantidade de avaliações deve ser um número inteiro.");
    }

    const cleanGalleryImages = galleryImages
      .map((image) => ({
        imageUrl: image.imageUrl.trim(),
        sortOrder: image.sortOrder,
      }))
      .filter((image) => image.imageUrl);

    const cleanDescription =
      description.trim() === "<p></p>"
        ? undefined
        : description.trim() || undefined;

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
      destaque,
      bestSeller,
      available,
      active,

      seoTitle: seoTitle.trim() || undefined,

      seoDescription: seoDescription.trim() || undefined,
    };

    await updateProduct(productId, productData, authToken);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
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

    const isMercadoLivre = marketplaceId === MERCADO_LIVRE_MARKETPLACE_ID;

    /*
     * ============================================================
     * NOVO PRODUTO DO MERCADO LIVRE
     * ============================================================
     */
    if (!isEditing && isMercadoLivre) {
      if (!externalLink.trim()) {
        setError("Informe o link de referência do Mercado Livre.");
        return;
      }

      try {
        new URL(affiliateUrl.trim());
      } catch {
        setError("Informe uma URL válida para o link de afiliado.");
        return;
      }

      try {
        new URL(externalLink.trim());
      } catch {
        setError(
          "Informe uma URL válida para o link de referência do Mercado Livre.",
        );
        return;
      }

      setLoading(true);

      try {
        const analysis = await analyzeMercadoLivreProduct(
          externalLink.trim(),
          token,
        );

        if (analysis.noOffersFound || analysis.offers.length === 0) {
          setError(
            "Nenhuma oferta foi encontrada para este produto no Mercado Livre.",
          );
          return;
        }

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

        await handleMercadoLivreImport(selectedOffer);

        return;
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Não foi possível analisar o produto do Mercado Livre.",
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    /*
     * ============================================================
     * EDIÇÃO DE PRODUTO DO MERCADO LIVRE
     * ============================================================
     *
     * Toda atualização de produto do Mercado Livre:
     *   -> exige externalLink;
     *   -> analisa novamente o link;
     *   -> busca as ofertas;
     *   -> 0 ofertas: não salva;
     *   -> 1 oferta: atualiza automaticamente;
     *   -> várias ofertas: abre o modal para seleção.
     *
     * O externalLink atual é preservado mesmo quando o usuário
     * não alterou o campo.
     */
    if (isEditing && isMercadoLivre) {
      if (!externalLink.trim()) {
        setError(
          "O link de referência do Mercado Livre é obrigatório para atualizar este produto.",
        );
        return;
      }

      try {
        new URL(externalLink.trim());
      } catch {
        setError(
          "Informe uma URL válida para o link de referência do Mercado Livre.",
        );
        return;
      }

      setLoading(true);
      setError(null);

      try {
        /*
         * Sempre analisa novamente o produto no Mercado Livre,
         * mesmo que o externalLink não tenha sido alterado.
         */
        const analysis = await analyzeMercadoLivreProduct(
          externalLink.trim(),
          token,
        );

        if (analysis.noOffersFound || analysis.offers.length === 0) {
          setError(
            "Nenhuma oferta foi encontrada para este produto no Mercado Livre. A atualização foi cancelada.",
          );
          return;
        }

        setMercadoLivreAnalysis(analysis);

        /*
         * Mais de uma oferta:
         * deixa o usuário escolher no modal.
         */
        if (analysis.requiresOfferSelection || analysis.offers.length > 1) {
          setMercadoLivreModalOpen(true);
          return;
        }

        /*
         * Apenas uma oferta:
         * usa automaticamente.
         */
        const selectedOffer =
          analysis.selectedOffer ?? analysis.offers[0] ?? null;

        if (!selectedOffer) {
          setError(
            "Não foi possível identificar uma oferta válida do Mercado Livre.",
          );
          return;
        }

        await updateMercadoLivreProductOffer(
          id!,
          {
            externalLink: externalLink.trim(),
            catalogProductId: analysis.catalogProductId,
            itemId: selectedOffer.itemId,
            sellerId: selectedOffer.sellerId,
          },
          token,
        );

        /*
         * Depois que a oferta foi validada e vinculada,
         * salva os demais dados normalmente.
         */
        await saveNormalProductUpdate(id!, token);

        setMercadoLivreAnalysis(null);
        setMercadoLivreModalOpen(false);

        navigate("/admin/products");
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Não foi possível analisar e atualizar a oferta do Mercado Livre.",
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    /*
     * ============================================================
     * CADASTRO / EDIÇÃO NORMAL
     * ============================================================
     */

    if (!title.trim()) {
      setError("Informe o título do produto.");
      return;
    }

    if (!imageUrl.trim()) {
      setError("Informe a URL da imagem.");
      return;
    }

    const parsedPrice = price.trim() ? parseCurrencyBRL(price) : undefined;

    if (
      parsedPrice === undefined ||
      !Number.isFinite(parsedPrice) ||
      parsedPrice < 0
    ) {
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

    const cleanDescription =
      description.trim() === "<p></p>"
        ? undefined
        : description.trim() || undefined;

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

      // Mantidos os três campos independentes.
      featured,
      destaque,
      bestSeller,
      available,
      active,

      seoTitle: seoTitle.trim() || undefined,

      seoDescription: seoDescription.trim() || undefined,
    };

    setLoading(true);

    try {
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
          externalLink={externalLink}
          loading={loading}
          isEditing={isEditing}
          onSubcategoryChange={setSubcategoryId}
          onMarketplaceChange={setMarketplaceId}
          onAffiliateUrlChange={setAffiliateUrl}
          onExternalLinkChange={setExternalLink}
        />

        <ProductStatus
          featured={featured}
          destaque={destaque}
          bestSeller={bestSeller}
          available={available}
          active={active}
          loading={loading}
          onFeaturedChange={setFeatured}
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
        {error && (
          <div className="mb-6 rounded-lg bg-danger-light px-4 py-3 text-sm text-danger">
            {error}
          </div>
        )}
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
