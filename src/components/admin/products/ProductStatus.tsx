type ProductStatusProps = {
  featured: boolean;
  destaque: boolean;
  bestSeller: boolean;
  available: boolean;
  active: boolean;
  loading: boolean;
  onFeaturedChange: (value: boolean) => void;
  onDestaqueChange: (value: boolean) => void;
  onBestSellerChange: (value: boolean) => void;
  onAvailableChange: (value: boolean) => void;
  onActiveChange: (value: boolean) => void;
};

export function ProductStatus({
  featured,
  destaque,
  bestSeller,
  available,
  active,
  loading,
  onFeaturedChange,
  onDestaqueChange,
  onBestSellerChange,
  onAvailableChange,
  onActiveChange,
}: ProductStatusProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Status do produto
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={featured}
            onChange={(event) => onFeaturedChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Destaque
            </span>

            <span className="block text-xs text-gray-500">
              Define se o produto possui o status de destaque no sistema.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={destaque}
            onChange={(event) => onDestaqueChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Ofertas em destaque
            </span>

            <span className="block text-xs text-gray-500">
              Exibir o produto na seção de ofertas em destaque.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={bestSeller}
            onChange={(event) => onBestSellerChange(event.target.checked)}
            disabled={loading}
            className="h-4 w-4"
          />

          <span>
            <span className="block text-sm font-semibold text-gray-700">
              Produtos mais vendidos
            </span>

            <span className="block text-xs text-gray-500">
              Exibir o produto na seção de produtos mais vendidos.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-gray-50 p-4">
          <input
            type="checkbox"
            checked={available}
            onChange={(event) => onAvailableChange(event.target.checked)}
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
            onChange={(event) => onActiveChange(event.target.checked)}
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
  );
}
