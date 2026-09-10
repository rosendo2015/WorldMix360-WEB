import { formatCurrencyInput } from "../../../utils/formatCurrency";

type ProductPricingProps = {
  price: string;
  originalPrice: string;
  currency: string;
  rating: string;
  reviewsCount: string;
  loading: boolean;
  onPriceChange: (value: string) => void;
  onOriginalPriceChange: (value: string) => void;
  onCurrencyChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onReviewsCountChange: (value: string) => void;
};

export function ProductPricing({
  price,
  originalPrice,
  currency,
  rating,
  reviewsCount,
  loading,
  onPriceChange,
  onOriginalPriceChange,
  onCurrencyChange,
  onRatingChange,
  onReviewsCountChange,
}: ProductPricingProps) {
  function handlePriceChange(value: string) {
    onPriceChange(formatCurrencyInput(value));
  }

  function handleOriginalPriceChange(value: string) {
    onOriginalPriceChange(formatCurrencyInput(value));
  }

  return (
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

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="price"
              type="text"
              inputMode="decimal"
              value={price}
              onChange={(event) => handlePriceChange(event.target.value)}
              placeholder="0,00"
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">
            Digite o valor no formato brasileiro. Ex.: 38,99
          </p>
        </div>

        <div>
          <label
            htmlFor="originalPrice"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Preço original
          </label>

          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
              R$
            </span>

            <input
              id="originalPrice"
              type="text"
              inputMode="decimal"
              value={originalPrice}
              onChange={(event) =>
                handleOriginalPriceChange(event.target.value)
              }
              placeholder="0,00"
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <p className="mt-2 text-xs text-gray-500">Opcional. Ex.: 49,90</p>
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
            onChange={(event) =>
              onCurrencyChange(event.target.value.toUpperCase())
            }
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
            onChange={(event) => onRatingChange(event.target.value)}
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
            onChange={(event) => onReviewsCountChange(event.target.value)}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
