import type { ProductImageForm } from "./types";

type ProductGalleryProps = {
  galleryImages: ProductImageForm[];
  loading: boolean;
  onAdd: () => void;
  onChange: (id: string, value: string) => void;
  onRemove: (id: string) => void;
};

export function ProductGallery({
  galleryImages,
  loading,
  onAdd,
  onChange,
  onRemove,
}: ProductGalleryProps) {
  return (
    <div className="border-t border-gray-100 pt-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            Galeria de imagens
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Adicione imagens adicionais para exibir na página do produto.
          </p>
        </div>

        <button
          type="button"
          onClick={onAdd}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-blue px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          + Adicionar imagem
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-center">
          <p className="text-sm text-gray-500">
            Nenhuma imagem adicional adicionada.
          </p>

          <p className="mt-1 text-xs text-gray-400">
            A imagem principal continuará sendo utilizada normalmente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Imagem {image.sortOrder + 1}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Ordem: {image.sortOrder + 1}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(image.id)}
                  disabled={loading}
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Remover
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto]">
                <div>
                  <label
                    htmlFor={`gallery-image-${image.id}`}
                    className="mb-2 block text-xs font-semibold text-gray-600"
                  >
                    URL da imagem
                  </label>

                  <input
                    id={`gallery-image-${image.id}`}
                    type="url"
                    value={image.imageUrl}
                    onChange={(event) => onChange(image.id, event.target.value)}
                    placeholder="https://exemplo.com/imagem.jpg"
                    disabled={loading}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
                  />
                </div>

                <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white p-2">
                  {image.imageUrl.trim() ? (
                    <img
                      src={image.imageUrl}
                      alt={`Pré-visualização da imagem ${image.sortOrder + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs text-gray-400">
                      Sem imagem
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
