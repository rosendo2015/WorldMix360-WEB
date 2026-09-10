import { Link } from "react-router-dom";

type ProductFormActionsProps = {
  loading: boolean;
  isEditing: boolean;
};

export function ProductFormActions({
  loading,
  isEditing,
}: ProductFormActionsProps) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <Link
        to="/admin/products"
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
      >
        Cancelar
      </Link>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue px-4 py-2 text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? isEditing
            ? "Salvando..."
            : "Cadastrando..."
          : isEditing
            ? "Salvar alterações"
            : "Cadastrar produto"}
      </button>
    </div>
  );
}
