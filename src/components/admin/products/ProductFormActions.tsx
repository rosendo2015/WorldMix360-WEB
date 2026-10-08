import { FormActions } from "../../FormControls";

type ProductFormActionsProps = {
  loading: boolean;
  isEditing: boolean;
};

export function ProductFormActions({
  loading,
  isEditing,
}: ProductFormActionsProps) {
  return (
    <FormActions
      cancelTo="/admin/products"
      isSubmitting={loading}
      submitLabel={isEditing ? "Salvar alterações" : "Cadastrar produto"}
      submittingLabel={isEditing ? "Salvando..." : "Cadastrando..."}
      submitClassName="px-4 py-2 text-white"
    />
  );
}
