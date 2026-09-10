import { RichTextEditor } from "../RichTextEditor";

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
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">
        Informações do produto
      </h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Título *
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Ex.: Smartphone Samsung Galaxy"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />

          <p className="mt-2 text-xs text-gray-500">
            O slug será gerado automaticamente pela API.
          </p>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Descrição curta
          </label>

          <input
            id="shortDescription"
            type="text"
            value={shortDescription}
            onChange={(event) => onShortDescriptionChange(event.target.value)}
            placeholder="Resumo rápido do produto"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

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
          <label
            htmlFor="imageUrl"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            URL da imagem principal *
          </label>

          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(event) => onImageUrlChange(event.target.value)}
            placeholder="https://exemplo.com/produto.jpg"
            required
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
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
    </div>
  );
}
