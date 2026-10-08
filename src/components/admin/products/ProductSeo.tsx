import { FormInput, FormSection, FormTextarea } from "../../FormControls";

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
    <FormSection title="SEO">
      <div className="grid grid-cols-1 gap-6">
        <FormInput
          id="seoTitle"
          label="SEO Title"
          type="text"
          value={seoTitle}
          onChange={(event) => onSeoTitleChange(event.target.value)}
          placeholder="Título otimizado para buscadores"
          disabled={loading}
        />

        <FormTextarea
          id="seoDescription"
          label="SEO Description"
          value={seoDescription}
          onChange={(event) => onSeoDescriptionChange(event.target.value)}
          rows={4}
          placeholder="Descrição otimizada para mecanismos de busca"
          disabled={loading}
        />
      </div>
    </FormSection>
  );
}
