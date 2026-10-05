type ProductStatusProps = {
  destaque: boolean;
  bestSeller: boolean;
  available: boolean;
  active: boolean;
  loading: boolean;
  onDestaqueChange: (value: boolean) => void;
  onBestSellerChange: (value: boolean) => void;
  onAvailableChange: (value: boolean) => void;
  onActiveChange: (value: boolean) => void;
};

export function ProductStatus({
  destaque,
  bestSeller,
  available,
  active,
  loading,
  onDestaqueChange,
  onBestSellerChange,
  onAvailableChange,
  onActiveChange,
}: ProductStatusProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Visibilidade e classificação
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
              Exibir em “Ofertas em destaque”
            </span>

            <span className="block text-xs text-gray-500">
              Mostra o produto na seção de ofertas em destaque da página
              inicial e na página de ofertas, além de incluí-lo na contagem de
              destaques do painel administrativo.
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
              Exibir em “Produtos mais vendidos”
            </span>

            <span className="block text-xs text-gray-500">
              Mostra o produto na seção de mais vendidos da página inicial e na
              página correspondente.
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
              Disponível para compra no marketplace
            </span>

            <span className="block text-xs text-gray-500">
              Desmarque quando o produto não puder ser comprado no marketplace.
              Produtos indisponíveis não aparecem no catálogo público.
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
              Publicado no catálogo WorldMix360
            </span>

            <span className="block text-xs text-gray-500">
              Desmarque para ocultar o produto do site sem excluí-lo. Produtos
              não publicados não aparecem no catálogo público.
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
