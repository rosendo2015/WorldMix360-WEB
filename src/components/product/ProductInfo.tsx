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
