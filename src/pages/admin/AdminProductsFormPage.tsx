import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RichTextEditor } from "../../components/admin/RichTextEditor";
import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";
import { useProducts } from "../../contexts/useProducts";
import { useSubcategories } from "../../contexts/useSubcategories";

type ProductImageForm = {
  id: string;
  imageUrl: string;
  sortOrder: number;
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

        setPrice(String(product.price ?? ""));

        setOriginalPrice(
          product.originalPrice !== null && product.originalPrice !== undefined
            ? String(product.originalPrice)
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

    const parsedPrice = Number(price);

    if (!price.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      setError("Informe um preço válido.");
      return;
    }

    let parsedOriginalPrice: number | undefined;

    if (originalPrice.trim()) {
      parsedOriginalPrice = Number(originalPrice);

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

        currency: currency.trim() || "BRL",

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
        {/* Informações principais */}
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
                onChange={(event) => setTitle(event.target.value)}
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
                onChange={(event) => setShortDescription(event.target.value)}
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
                onChange={setDescription}
                disabled={loading}
                placeholder="Escreva uma descrição completa e detalhada do produto..."
              />

              <p className="mt-2 text-xs text-gray-500">
                Use títulos, negrito, listas, links e outros recursos para
                deixar a descrição mais organizada e agradável para o cliente.
              </p>
            </div>

            {/* Imagem principal */}
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
                onChange={(event) => setImageUrl(event.target.value)}
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

            {/* Galeria */}
            <div className="border-t border-gray-100 pt-6">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">
                    Galeria de imagens
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Adicione imagens adicionais para exibir na página do
                    produto.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddGalleryImage}
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
                            Imagem {image.sortOrder}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Ordem: {image.sortOrder}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(image.id)}
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
                            onChange={(event) =>
                              handleGalleryImageChange(
                                image.id,
                                event.target.value,
                              )
                            }
                            placeholder="https://exemplo.com/imagem.jpg"
                            disabled={loading}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                          />
                        </div>

                        <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                          {image.imageUrl.trim() ? (
                            <img
                              src={image.imageUrl}
                              alt={`Pré-visualização da imagem ${image.sortOrder}`}
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
          </div>
        </div>

        {/* Preço e avaliações */}
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

              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="0,00"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="originalPrice"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Preço original
              </label>

              <input
                id="originalPrice"
                type="number"
                min="0"
                step="0.01"
                value={originalPrice}
                onChange={(event) => setOriginalPrice(event.target.value)}
                placeholder="0,00"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
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
                onChange={(event) => setCurrency(event.target.value)}
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
                onChange={(event) => setRating(event.target.value)}
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
                onChange={(event) => setReviewsCount(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Relacionamentos */}
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
                onChange={(event) => setSubcategoryId(event.target.value)}
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
                onChange={(event) => setMarketplaceId(event.target.value)}
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
                onChange={(event) => setAffiliateUrl(event.target.value)}
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

        {/* Status */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Status do produto
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
              <input
                type="checkbox"
                checked={featured}
                onChange={(event) => setFeatured(event.target.checked)}
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
                onChange={(event) => setAvailable(event.target.checked)}
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
                onChange={(event) => setActive(event.target.checked)}
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

        {/* SEO */}
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
                onChange={(event) => setSeoTitle(event.target.value)}
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
                onChange={(event) => setSeoDescription(event.target.value)}
                rows={4}
                placeholder="Descrição otimizada para mecanismos de busca"
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Ações */}
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
            className="rounded-lg bg-blue px-4 py-2 text-white transition hover:bg-navy"
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
      </form>
    </section>
  );
}
