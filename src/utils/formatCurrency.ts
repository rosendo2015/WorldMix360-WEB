export function formatCurrencyBRL(
  value: number | string | null | undefined,
): string {
  if (value === null || value === undefined || value === "") {
    return "R$ 0,00";
  }

  const numericValue =
    typeof value === "string"
      ? Number.parseFloat(value.replace(",", "."))
      : value;

  if (!Number.isFinite(numericValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}

export function parseCurrencyBRL(value: string): number {
  const normalizedValue = value
    .replace(/\s/g, "")
    .replace(/R\$/gi, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const numericValue = Number.parseFloat(normalizedValue);

  return Number.isFinite(numericValue) ? numericValue : 0;
}

export function formatCurrencyInput(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  const numericValue = Number(digits) / 100;

  return numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
