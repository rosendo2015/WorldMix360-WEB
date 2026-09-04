import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import type { Product } from "../../contexts/ProductsContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const rating = Math.min(Math.max(product.rating ?? 0, 0), 5);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  const formattedPrice = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: product.currency || "BRL",
  });

  const formattedOriginalPrice = product.originalPrice?.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: product.currency || "BRL",
    },
  );

  const starPositions = [1, 2, 3, 4, 5];

  return (
    <div className="flex h-[420px] w-full flex-col items-center rounded-2xl border border-[#e7edf5] bg-white p-4 text-center shadow-md transition-shadow hover:bg-gray-50 hover:shadow-lg">
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

      <div className="mb-1 flex h-5 shrink-0 items-center justify-center">
        {starPositions.slice(0, fullStars).map((star) => (
          <FaStar key={`${product.id}-full-${star}`} className="text-yellow" />
        ))}

        {hasHalfStar && (
          <FaStarHalfAlt key={`${product.id}-half`} className="text-yellow" />
        )}

        {starPositions.slice(0, emptyStars).map((star) => (
          <FaRegStar
            key={`${product.id}-empty-${star}`}
            className="text-yellow"
          />
        ))}
      </div>

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
