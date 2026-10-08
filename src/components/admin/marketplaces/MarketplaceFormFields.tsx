import {
  FormInput,
  FormLabel,
  FormSection,
  FormSwitch,
  FormTextarea,
} from "../../FormControls";
import { getContrastTextColor } from "../../../utils/colorContrast";

type MarketplaceFormFieldsProps = {
  name: string;
  description: string;
  websiteUrl: string;
  logoUrl: string;
  badgeColor: string;
  sortOrder: string;
  active: boolean;
  disabled: boolean;
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onWebsiteUrlChange: (value: string) => void;
  onLogoUrlChange: (value: string) => void;
  onBadgeColorChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
  onActiveToggle: () => void;
};

export function MarketplaceFormFields({
  name,
  description,
  websiteUrl,
  logoUrl,
  badgeColor,
  sortOrder,
  active,
  disabled,
  onNameChange,
  onDescriptionChange,
  onWebsiteUrlChange,
  onLogoUrlChange,
  onBadgeColorChange,
  onSortOrderChange,
  onActiveToggle,
}: MarketplaceFormFieldsProps) {
  return (
    <FormSection>
      <div className="grid grid-cols-1 gap-6">
        <FormInput
          id="name"
          label="Nome *"
          type="text"
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Ex.: Mercado Livre"
          required
          disabled={disabled}
          description="O slug será gerado automaticamente pela API."
        />

        <FormTextarea
          id="description"
          label="Descrição"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          placeholder="Descreva brevemente o marketplace..."
          rows={4}
          disabled={disabled}
        />

        <FormInput
          id="websiteUrl"
          label="Website"
          type="url"
          value={websiteUrl}
          onChange={(event) => onWebsiteUrlChange(event.target.value)}
          placeholder="https://www.exemplo.com.br"
          disabled={disabled}
          description="Informe a URL oficial do marketplace."
        />

        <div>
          <FormInput
            id="logoUrl"
            label="Logo"
            type="url"
            value={logoUrl}
            onChange={(event) => onLogoUrlChange(event.target.value)}
            placeholder="https://exemplo.com/logo.png"
            disabled={disabled}
            description="Informe uma URL válida para o logo."
          />

          {logoUrl.trim() && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Pré-visualização
              </p>
              <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <img
                  src={logoUrl}
                  alt="Pré-visualização do logo"
                  className="max-h-full max-w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <FormLabel htmlFor="badgeColor">
            Cor da etiqueta nos produtos
          </FormLabel>
          <div className="flex items-center gap-3">
            <input
              id="badgeColor"
              type="color"
              value={badgeColor}
              onChange={(event) => onBadgeColorChange(event.target.value)}
              disabled={disabled}
              className="h-11 w-16 cursor-pointer rounded-lg border border-gray-300 bg-white p-1 disabled:cursor-not-allowed"
              aria-label="Escolher cor da etiqueta do marketplace"
            />
            <span className="font-mono text-sm uppercase text-gray-600">
              {badgeColor}
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold text-gray-900"
              style={{
                backgroundColor: badgeColor,
                color: getContrastTextColor(badgeColor),
              }}
            >
              {name.trim() || "Marketplace"}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Escolha a cor de fundo da etiqueta exibida nos cards de produtos.
          </p>
        </div>

        <FormInput
          id="sortOrder"
          label="Ordem"
          type="number"
          step="1"
          value={sortOrder}
          onChange={(event) => onSortOrderChange(event.target.value)}
          disabled={disabled}
          description="Use números menores para exibir primeiro."
        />

        <FormSwitch
          label="Marketplace ativo"
          description="Marketplaces inativos não devem aparecer em áreas públicas do catálogo."
          checked={active}
          disabled={disabled}
          onCheckedChange={onActiveToggle}
        />
      </div>
    </FormSection>
  );
}
