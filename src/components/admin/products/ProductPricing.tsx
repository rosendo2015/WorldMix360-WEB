import { formatCurrencyInput } from "../../../utils/formatCurrency";
import { FormInput, FormSection } from "../../FormControls";

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
    <FormSection title="Preço e avaliações">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormInput
          id="price"
          label="Preço *"
          type="text"
          inputMode="decimal"
          value={price}
          onChange={(event) => handlePriceChange(event.target.value)}
          placeholder="0,00"
          required
          disabled={loading}
          leadingAdornment="R$"
          description="Digite o valor no formato brasileiro. Ex.: 38,99"
        />

        <FormInput
          id="originalPrice"
          label="Preço original"
          type="text"
          inputMode="decimal"
          value={originalPrice}
          onChange={(event) => handleOriginalPriceChange(event.target.value)}
          placeholder="0,00"
          disabled={loading}
          leadingAdornment="R$"
          description="Opcional. Ex.: 49,90"
        />

        <FormInput
          id="currency"
          label="Moeda"
          type="text"
          value={currency}
          onChange={(event) => onCurrencyChange(event.target.value.toUpperCase())}
          maxLength={3}
          disabled={loading}
          className="uppercase"
        />

        <FormInput
          id="rating"
          label="Avaliação"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={rating}
          onChange={(event) => onRatingChange(event.target.value)}
          placeholder="Ex.: 4.8"
          disabled={loading}
        />

        <FormInput
          id="reviewsCount"
          label="Quantidade de avaliações"
          type="number"
          min="0"
          step="1"
          value={reviewsCount}
          onChange={(event) => onReviewsCountChange(event.target.value)}
          disabled={loading}
        />
      </div>
    </FormSection>
  );
}
