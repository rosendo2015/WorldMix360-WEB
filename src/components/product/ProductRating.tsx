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
