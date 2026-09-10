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
