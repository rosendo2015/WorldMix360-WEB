import { FormInput, FormSection, FormSelect } from "../../FormControls";

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
    <FormSection
      title="Relacionamentos"
      headingClassName="mb-0"
    >
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <FormSelect
          id="subcategoryId"
          label="Subcategoria"
          labelClassName="font-medium"
          value={subcategoryId}
          onChange={(event) => onSubcategoryChange(event.target.value)}
          disabled={loading}
          required
          className="px-3 py-2.5 disabled:cursor-not-allowed"
        >
            <option value="">Selecione uma subcategoria</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.category?.name
                  ? `${subcategory.category.name} / ${subcategory.name}`
                  : subcategory.name}
              </option>
            ))}
        </FormSelect>

        <FormSelect
          id="marketplaceId"
          label="Marketplace"
          labelClassName="font-medium"
          value={marketplaceId}
          onChange={(event) => onMarketplaceChange(event.target.value)}
          disabled={loading}
          required
          className="px-3 py-2.5 disabled:cursor-not-allowed"
        >
            <option value="">Selecione um marketplace</option>
            {marketplaces.map((marketplace) => (
              <option key={marketplace.id} value={marketplace.id}>
                  {marketplace.name}
              </option>
            ))}
        </FormSelect>

        <FormInput
          id="affiliateUrl"
          label="Link de afiliado"
          labelClassName="font-medium"
          type="url"
          value={affiliateUrl}
          onChange={(event) => onAffiliateUrlChange(event.target.value)}
          placeholder="https://..."
          required
          disabled={loading}
          className="px-3 py-2.5"
          wrapperClassName="sm:col-span-2"
          description="Este é o link comercial utilizado pelo visitante para acessar o marketplace e preservar o rastreamento do afiliado."
        />

        {isMercadoLivre && (
          <div className="sm:col-span-2">
            <FormInput
              id="externalLink"
              label="Link de referência do Mercado Livre"
              labelClassName="font-medium"
              type="url"
              value={externalLink}
              onChange={(event) => onExternalLinkChange(event.target.value)}
              placeholder="https://www.mercadolivre.com.br/.../p/MLB..."
              required
              disabled={loading}
              className="px-3 py-2.5"
              description="Este link é usado internamente como referência do produto no Mercado Livre. Ao alterá-lo durante a edição, o sistema irá reanalisar as ofertas. Se houver mais de uma oferta, será solicitado que você escolha qual deseja vincular ao produto."
            />
            {isEditing && (
              <p className="mt-1 text-xs font-medium text-blue-600">
                  Alterar este link não cria outro produto. A oferta vinculada ao
                  produto atual será atualizada após a confirmação.
              </p>
            )}
          </div>
        )}
      </div>
    </FormSection>
  );
}
