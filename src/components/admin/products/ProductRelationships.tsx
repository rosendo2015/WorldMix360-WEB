type Subcategory = {
  id: string;
  name: string;
  category?: {
    name: string;
  } | null;
};

type Marketplace = {
  id: string;
  name: string;
};

type ProductRelationshipsProps = {
  subcategories: Subcategory[];
  marketplaces: Marketplace[];
  subcategoryId: string;
  marketplaceId: string;
  affiliateUrl: string;
  loading: boolean;
  onSubcategoryChange: (value: string) => void;
  onMarketplaceChange: (value: string) => void;
  onAffiliateUrlChange: (value: string) => void;
};

export function ProductRelationships({
  subcategories,
  marketplaces,
  subcategoryId,
  marketplaceId,
  affiliateUrl,
  loading,
  onSubcategoryChange,
  onMarketplaceChange,
  onAffiliateUrlChange,
}: ProductRelationshipsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Classificação e marketplace
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="subcategoryId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Subcategoria *
          </label>

          <select
            id="subcategoryId"
            value={subcategoryId}
            onChange={(event) => onSubcategoryChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Selecione uma subcategoria</option>

            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.category?.name
                  ? `${subcategory.category.name} → ${subcategory.name}`
                  : subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="marketplaceId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Marketplace *
          </label>

          <select
            id="marketplaceId"
            value={marketplaceId}
            onChange={(event) => onMarketplaceChange(event.target.value)}
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
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
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Link de afiliado *
          </label>

          <input
            id="affiliateUrl"
            type="url"
            value={affiliateUrl}
            onChange={(event) => onAffiliateUrlChange(event.target.value)}
            placeholder="https://..."
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            Este será o link utilizado pelo botão de compra/afiliado.
          </p>
        </div>
      </div>
    </div>
  );
}
