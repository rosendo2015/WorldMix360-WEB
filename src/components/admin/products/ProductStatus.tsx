type ProductStatusProps = {
  featured: boolean;
  available: boolean;
  active: boolean;
  loading: boolean;
  onFeaturedChange: (value: boolean) => void;
  onAvailableChange: (value: boolean) => void;
  onActiveChange: (value: boolean) => void;
};

export function ProductStatus({
  featured,
  available,
  active,
  loading,
  onFeaturedChange,
  onAvailableChange,
  onActiveChange,
}: ProductStatusProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Status do produto
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              Exibir como produto destacado.
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
