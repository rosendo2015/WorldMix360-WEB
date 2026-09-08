import DOMPurify from "dompurify";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import type { Product } from "../contexts/ProductsContext";
import { useProducts } from "../contexts/useProducts";

/**
 * Decodifica entidades HTML caso o backend/banco tenha armazenado
 * o HTML escapado.
 */
function decodeHtmlEntities(value: string): string {
  const textarea = document.createElement("textarea");

  textarea.innerHTML = value;

  return textarea.value;
}

/**
 * Normaliza o conteúdo da descrição.
 */
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

/**
 * Renderiza HTML sanitizado como elementos React.
 *
 * Não utiliza dangerouslySetInnerHTML.
 */
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

export function ProductPage() {
  const { slug } = useParams();

  const { getProductBySlug } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);

  /*
   * Índice da imagem atualmente selecionada.
   */
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      if (!slug) {
        setProduct(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      const data = await getProductBySlug(slug);

      if (!cancelled) {
        setProduct(data);
        setSelectedImageIndex(0);
        setLoading(false);
      }
    }

    void loadProduct();

    return () => {
      cancelled = true;
    };
  }, [slug, getProductBySlug]);

  /*
   * Carregando
   */
  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <p className="text-sm text-[#52657c]">Carregando produto...</p>
      </section>
    );
  }

  /*
   * Produto não encontrado
   */
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

  const productImages = [
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

  /*
   * Garante que o índice selecionado continue válido caso
   * a quantidade de imagens seja alterada.
   */
  const safeSelectedImageIndex =
    selectedImageIndex >= productImages.length ? 0 : selectedImageIndex;

  /*
   * Imagem atualmente exibida.
   */
  const selectedImage =
    productImages[safeSelectedImageIndex]?.imageUrl || product.imageUrl;

  /*
   * Preço atual
   */
  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: product.currency || "BRL",
  });

  /*
   * Preço original
   */
  const originalPrice = product.originalPrice?.toLocaleString("pt-BR", {
    style: "currency",
    currency: product.currency || "BRL",
  });

  /*
   * Normaliza a descrição antes da sanitização.
   */
  const normalizedDescription = normalizeDescription(product.description || "");

  /*
   * Sanitiza o HTML.
   */
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

  /*
   * Converte o HTML sanitizado em React.
   */
  const renderedDescription = renderDescriptionHtml(safeDescription);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
        <Link to="/" className="transition hover:text-[#1769e0]">
          Início
        </Link>

        <span className="px-2">/</span>

        <span>Detalhes do produto</span>
      </nav>

      {/* Card principal */}
      <div className="grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:grid-cols-[0.9fr_1.1fr]">
        {/* Imagens */}
        <div className="bg-[#f7f9fc] p-6 md:p-8">
          {/* Imagem principal exibida */}
          <div className="flex min-h-[340px] items-center justify-center md:min-h-[470px]">
            <img
              src={selectedImage}
              alt={product.title}
              className="max-h-[420px] w-full object-contain"
            />
          </div>

          {/* Miniaturas */}
          {productImages.length > 1 && (
            <div className="mt-6">
              <p className="sr-only">Galeria de imagens do produto</p>
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

        {/* Informações */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          {/* Categoria */}
          {product.category && (
            <span className="mb-5 w-fit rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#0b3d66]">
              {product.category}
            </span>
          )}

          {/* Título */}
          <h1 className="text-3xl font-black leading-tight text-[#071a2f] md:text-4xl">
            {product.title}
          </h1>

          {/* Descrição curta */}
          {product.shortDescription && (
            <p className="mt-5 text-sm leading-6 text-[#52657c]">
              {product.shortDescription}
            </p>
          )}

          {/* Preço */}
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

          {/* Informação sobre compra */}
          <p className="mt-6 text-sm leading-6 text-[#52657c]">
            Você será direcionado ao site do parceiro para conferir
            disponibilidade, frete, avaliações e finalizar a compra.
          </p>

          {/* Oferta */}
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#20b35b] px-6 font-bold text-white transition hover:bg-[#159447]"
          >
            Ver oferta
          </a>

          {/* Aviso de afiliado */}
          <p className="mt-4 text-xs text-[#667085]">
            Este é um link de afiliado. A compra é realizada diretamente no site
            do parceiro.
          </p>
        </div>
      </div>

      {/* Descrição completa */}
      {safeDescription && (
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
      )}
    </section>
  );
}
