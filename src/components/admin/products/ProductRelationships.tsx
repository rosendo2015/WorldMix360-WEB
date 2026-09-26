type SubcategoryOption = {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  } | null;
};

type MarketplaceOption = {
  id: string;
  name: string;
};

type ProductRelationshipsProps = {
  subcategories: SubcategoryOption[];
  marketplaces: MarketplaceOption[];

  subcategoryId: string;
  marketplaceId: string;

  affiliateUrl: string;
  externalLink: string;

  loading: boolean;
  isEditing: boolean;

  onSubcategoryChange: (value: string) => void;
  onMarketplaceChange: (value: string) => void;
  onAffiliateUrlChange: (value: string) => void;
  onExternalLinkChange: (value: string) => void;
};

const MERCADO_LIVRE_MARKETPLACE_ID = "c255826b-2073-4c76-8966-b87f22403090";

export function ProductRelationships({
  subcategories,
  marketplaces,
  subcategoryId,
  marketplaceId,
  affiliateUrl,
  externalLink,
  loading,
  isEditing,
  onSubcategoryChange,
  onMarketplaceChange,
  onAffiliateUrlChange,
  onExternalLinkChange,
}: ProductRelationshipsProps) {
  const isMercadoLivre = marketplaceId === MERCADO_LIVRE_MARKETPLACE_ID;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Relacionamentos</h2>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="subcategoryId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Subcategoria
          </label>

          <select
            id="subcategoryId"
            value={subcategoryId}
            onChange={(event) => onSubcategoryChange(event.target.value)}
            disabled={loading}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione uma subcategoria</option>

            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.category?.name
                  ? `${subcategory.category.name} / ${subcategory.name}`
                  : subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="marketplaceId"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Marketplace
          </label>

          <select
            id="marketplaceId"
            value={marketplaceId}
            onChange={(event) => onMarketplaceChange(event.target.value)}
            disabled={loading}
            required
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione um marketplace</option>

            {marketplaces.map((marketplace) => (
              <option key={marketplace.id} value={marketplace.id}>
                {marketplace.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="affiliateUrl"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Link de afiliado
          </label>

          <input
            id="affiliateUrl"
            type="url"
            value={affiliateUrl}
            onChange={(event) => onAffiliateUrlChange(event.target.value)}
            placeholder="https://..."
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            Este é o link comercial utilizado pelo visitante para acessar o
            marketplace e preservar o rastreamento do afiliado.
          </p>
        </div>

        {isMercadoLivre && (
          <div className="sm:col-span-2">
            <label
              htmlFor="externalLink"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Link de referência do Mercado Livre
            </label>

            <input
              id="externalLink"
              type="url"
              value={externalLink}
              onChange={(event) => onExternalLinkChange(event.target.value)}
              placeholder="https://www.mercadolivre.com.br/.../p/MLB..."
              required
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
            />

            <p className="mt-2 text-xs text-gray-500">
              Este link é usado internamente como referência do produto no
              Mercado Livre. Ao alterá-lo durante a edição, o sistema irá
              reanalisar as ofertas. Se houver mais de uma oferta, será
              solicitado que você escolha qual deseja vincular ao produto.
            </p>

            {isEditing && (
              <p className="mt-1 text-xs font-medium text-blue-600">
                Alterar este link não cria outro produto. A oferta vinculada ao
                produto atual será atualizada após a confirmação.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
