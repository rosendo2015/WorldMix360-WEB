import { RichTextEditor } from "./RichTextEditor";
import { FormInput, FormSection } from "../../FormControls";

type ProductBasicInfoProps = {
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  loading: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onShortDescriptionChange: (value: string) => void;
  onImageUrlChange: (value: string) => void;
};

export function ProductBasicInfo({
  title,
  description,
  shortDescription,
  imageUrl,
  loading,
  onTitleChange,
  onDescriptionChange,
  onShortDescriptionChange,
  onImageUrlChange,
}: ProductBasicInfoProps) {
  return (
    <FormSection title="Informações do produto">
      <div className="grid grid-cols-1 gap-6">
        <FormInput
          id="title"
          label="Título *"
          type="text"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Ex.: Smartphone Samsung Galaxy"
          required
          disabled={loading}
          description="O slug será gerado automaticamente pela API."
        />

        <FormInput
          id="shortDescription"
          label="Descrição curta"
          type="text"
          value={shortDescription}
          onChange={(event) => onShortDescriptionChange(event.target.value)}
          placeholder="Resumo rápido do produto"
          disabled={loading}
        />

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição
          </label>

          <RichTextEditor
            value={description}
            onChange={onDescriptionChange}
            disabled={loading}
            placeholder="Escreva uma descrição completa e detalhada do produto..."
          />

          <p className="mt-2 text-xs text-gray-500">
            Use títulos, negrito, listas, links e outros recursos para deixar a
            descrição mais organizada e agradável para o cliente.
          </p>
        </div>

        <div>
          <FormInput
            id="imageUrl"
            label="URL da imagem principal *"
            type="url"
            value={imageUrl}
            onChange={(event) => onImageUrlChange(event.target.value)}
            placeholder="https://exemplo.com/produto.jpg"
            required
            disabled={loading}
          />

          {imageUrl.trim() && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-gray-500">
                Pré-visualização da imagem principal
              </p>

              <div className="flex h-40 w-40 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                <img
                  src={imageUrl}
                  alt="Pré-visualização do produto"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </FormSection>
  );
}
