type ProductSeoProps = {
  seoTitle: string;
  seoDescription: string;
  loading: boolean;
  onSeoTitleChange: (value: string) => void;
  onSeoDescriptionChange: (value: string) => void;
};

export function ProductSeo({
  seoTitle,
  seoDescription,
  loading,
  onSeoTitleChange,
  onSeoDescriptionChange,
}: ProductSeoProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-gray-900">SEO</h2>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label
            htmlFor="seoTitle"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Title
          </label>

          <input
            id="seoTitle"
            type="text"
            value={seoTitle}
            onChange={(event) => onSeoTitleChange(event.target.value)}
            placeholder="Título otimizado para buscadores"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="seoDescription"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            SEO Description
          </label>

          <textarea
            id="seoDescription"
            value={seoDescription}
            onChange={(event) => onSeoDescriptionChange(event.target.value)}
            rows={4}
            placeholder="Descrição otimizada para mecanismos de busca"
            disabled={loading}
            className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
