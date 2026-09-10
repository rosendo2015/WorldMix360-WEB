import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { CategoryFormData } from "../../contexts/CategoriesContext";
import { useAuth } from "../../contexts/useAuth";
import { useCategories } from "../../contexts/useCategories";

export function AdminCategoryFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getCategoryById, createCategory, updateCategory } = useCategories();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  const [sortOrder, setSortOrder] = useState("0");

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const categoryId = id;

    async function loadCategory() {
      setLoading(true);
      setError(null);

      const category = await getCategoryById(categoryId);

      if (!category) {
        setError("Categoria não encontrada.");
        setLoading(false);
        return;
      }

      setName(category.name);
      setDescription(category.description ?? "");
      setImage(category.image ?? "");
      setActive(category.active);
      setSortOrder(String(category.sortOrder ?? 0));

      setLoading(false);
    }

    void loadCategory();
  }, [id, getCategoryById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome da categoria deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    const data: CategoryFormData = {
      name: name.trim(),
      description: description.trim() || undefined,
      image: image.trim() || undefined,
      active,
      sortOrder: parsedSortOrder,
    };

    setSaving(true);

    try {
      if (isEditing && id) {
        await updateCategory(id, data, token);
      } else {
        await createCategory(data, token);
      }

      navigate("/admin/categories", {
        replace: true,
      });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível salvar a categoria.",
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="mx-auto w-full max-w-3xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando categoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <div className="mb-6">
        <Link
          to="/admin/categories"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Voltar para categorias
        </Link>

        <h1 className="mt-3 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar categoria" : "Nova categoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize as informações da categoria."
            : "Cadastre uma nova categoria no WorldMix360."}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-5 shadow-sm md:p-8"
      >
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="category-name"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Nome
            </label>

            <input
              id="category-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Tecnologia"
              required
              minLength={2}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Descrição
            </label>

            <textarea
              id="category-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva brevemente esta categoria."
              rows={4}
              className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category-image"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              URL da imagem
            </label>

            <input
              id="category-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {image && (
              <div className="mt-3">
                <img
                  src={image}
                  alt="Pré-visualização da categoria"
                  className="h-32 w-32 rounded-xl object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category-sort-order"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem de exibição
              </label>

              <input
                id="category-sort-order"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(event) => setActive(event.target.checked)}
                  className="h-5 w-5 rounded border-gray-300"
                />

                <span>
                  <span className="block text-sm font-semibold text-gray-700">
                    Categoria ativa
                  </span>

                  <span className="block text-xs text-gray-500">
                    Permitir que a categoria seja exibida.
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/admin/categories"
            className="rounded-lg border border-gray-500 px-5 py-3 text-center text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar categoria"}
          </button>
        </div>
      </form>
    </section>
  );
}
