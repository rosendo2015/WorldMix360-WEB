import { FormCheckbox, FormSection } from "../../FormControls";

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
    <FormSection title="Visibilidade e classificação">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormCheckbox
          label="Exibir em “Ofertas em destaque”"
          description="Mostra o produto na seção de ofertas em destaque da página inicial e na página de ofertas, além de incluí-lo na contagem de destaques do painel administrativo."
          checked={destaque}
          onCheckedChange={onDestaqueChange}
          disabled={loading}
        />

        <FormCheckbox
          label="Exibir em “Produtos mais vendidos”"
          description="Mostra o produto na seção de mais vendidos da página inicial e na página correspondente."
          checked={bestSeller}
          onCheckedChange={onBestSellerChange}
          disabled={loading}
        />

        <FormCheckbox
          label="Disponível para compra no marketplace"
          description="Desmarque quando o produto não puder ser comprado no marketplace. Produtos indisponíveis não aparecem no catálogo público."
          checked={available}
          onCheckedChange={onAvailableChange}
          disabled={loading}
        />

        <FormCheckbox
          label="Publicado no catálogo WorldMix360"
          description="Desmarque para ocultar o produto do site sem excluí-lo. Produtos não publicados não aparecem no catálogo público."
          checked={active}
          onCheckedChange={onActiveChange}
          disabled={loading}
        />
      </div>
    </FormSection>
  );
}
