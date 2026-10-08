import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FormCheckbox,
  FormActions,
  FormErrorMessage,
  FormInput,
  FormTextarea,
} from "../../components/FormControls";
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
          <FormErrorMessage message={error} className="mb-6" />
        )}

        <div className="space-y-6">
          <FormInput
            id="category-name"
            label="Nome"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Tecnologia"
            required
            minLength={2}
          />

          <FormTextarea
            id="category-description"
            label="Descrição"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descreva brevemente esta categoria."
            rows={4}
          />

          <div>
            <FormInput
              id="category-image"
              label="URL da imagem"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://..."
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
              <FormInput
                id="category-sort-order"
                label="Ordem de exibição"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              />
            </div>

            <div className="flex items-center">
              <FormCheckbox
                label="Categoria ativa"
                description="Permitir que a categoria seja exibida."
                checked={active}
                onCheckedChange={setActive}
                className="bg-transparent p-0"
                checkboxClassName="h-5 w-5 rounded border-gray-300"
              />
            </div>
          </div>
        </div>

        <FormActions
          cancelTo="/admin/categories"
          isSubmitting={saving}
          submitLabel={
            isEditing ? "Salvar alterações" : "Cadastrar categoria"
          }
          submittingLabel="Salvando..."
          className="mt-8 border-t pt-6"
          cancelClassName="border-gray-500 text-center"
        />
      </form>
    </section>
  );
}
