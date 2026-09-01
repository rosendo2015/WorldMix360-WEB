import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Tipagem do card
interface ProductCardProps {
  id: string;
  image: string;
  rating: number;
  title: string;
  price: number | string;
  to: string;
}

// Componente do card
export function ProductCard({
  id,
  image,
  rating,
  title,
  price,
  to,
}: ProductCardProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  // Valores fixos para criar as estrelas
  const starPositions = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow hover:bg-gray-100">
      <img src={image} alt={title} className="w-32 h-32 object-contain mb-3" />

      {/* Avaliação dinâmica */}
      <div className="flex items-center justify-center mb-1">
        {/* Estrelas completas */}
        {starPositions.slice(0, fullStars).map((star) => (
          <FaStar key={`${id}-full-${star}`} className="text-yellow" />
        ))}

        {/* Meia estrela */}
        {hasHalfStar && (
          <FaStarHalfAlt key={`${id}-half`} className="text-yellow" />
        )}

        {/* Estrelas vazias */}
        {starPositions.slice(0, emptyStars).map((star) => (
          <FaRegStar key={`${id}-empty-${star}`} className="text-yellow" />
        ))}
      </div>

      <h3 className="text-gray-800 font-semibold text-sm mb-1">{title}</h3>

      <p className="text-gray-900 font-bold mb-3">R$ {price}</p>

      <Link
        to={to}
        className="bg-green text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-green-dark"
      >
        VER OFERTA
      </Link>
    </div>
  );
}
