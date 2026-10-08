import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  FormInput,
  FormActions,
  FormErrorMessage,
  FormSection,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "../../components/FormControls";
import { useAuth } from "../../contexts/useAuth";
import { useCategories } from "../../contexts/useCategories";
import { useSubcategories } from "../../contexts/useSubcategories";

export function AdminSubcategoryFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { categories, fetchCategories } = useCategories();

  const { getSubcategoryById, createSubcategory, updateSubcategory } =
    useSubcategories();

  const isEditing = Boolean(id);

  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const subcategoryId = id;
    let isMounted = true;
    async function loadSubcategory() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }
      try {
        const subcategory = await getSubcategoryById(subcategoryId);
        if (!isMounted) {
          return;
        }
        if (!subcategory) {
          setError("Subcategoria não encontrada.");
          return;
        }
        setCategoryId(subcategory.categoryId);
        setName(subcategory.name);
        setDescription(subcategory.description ?? "");
        setImage(subcategory.image ?? "");
        setSortOrder(String(subcategory.sortOrder ?? 0));
        setActive(subcategory.active);
      } catch {
        if (!isMounted) {
          return;
        }
        setError("Não foi possível carregar a subcategoria.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }
    void loadSubcategory();
    return () => {
      isMounted = false;
    };
  }, [id, getSubcategoryById]);

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!isEditing && !categoryId) {
      setError("Selecione uma categoria.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome da subcategoria.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateSubcategory(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createSubcategory(
          {
            categoryId,
            name: name.trim(),
            description: description.trim() || undefined,
            image: image.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/subcategories");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar a subcategoria."
            : "Não foi possível criar a subcategoria.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando subcategoria...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/subcategories"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para subcategorias
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar subcategoria" : "Nova subcategoria"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados da subcategoria."
            : "Cadastre uma nova subcategoria para o WorldMix360."}
        </p>
      </div>

      {/* Erro */}
      {error && (
        <FormErrorMessage message={error} className="mb-6" />
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <FormSection>
          <div className="grid grid-cols-1 gap-6">
            {/* Categoria */}
            <FormSelect
              id="categoryId"
              label="Categoria *"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              disabled={isEditing || loading}
              required={!isEditing}
              className="disabled:cursor-not-allowed"
            >
                <option value="">Selecione uma categoria</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </FormSelect>
            {isEditing && (
              <p className="mt-2 text-xs text-gray-500">
                A categoria não pode ser alterada durante a edição.
              </p>
            )}

            {/* Nome */}
            <FormInput
              id="name"
              label="Nome *"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ex.: Smartphones"
              required
              disabled={loading}
              description="O slug será gerado automaticamente pela API."
            />

            {/* Descrição */}
            <FormTextarea
              id="description"
              label="Descrição"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descreva brevemente esta subcategoria..."
              rows={4}
              disabled={loading}
            />

            {/* Imagem */}
            <div>
              <FormInput
                id="image"
                label="Imagem"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={loading}
                description="Informe uma URL válida para a imagem."
              />

              {image.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <img
                    src={image}
                    alt="Pré-visualização"
                    className="h-24 w-24 rounded-lg object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Ordem */}
            <FormInput
              id="sortOrder"
              label="Ordem"
              type="number"
              step="1"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              disabled={loading}
              description="Use números menores para exibir primeiro."
            />

            {/* Ativa */}
            <FormSwitch
              label="Subcategoria ativa"
              description="Subcategorias inativas não devem aparecer no catálogo público."
              checked={active}
              disabled={loading}
              onCheckedChange={setActive}
            />
          </div>
        </FormSection>

        <FormActions
          cancelTo="/admin/subcategories"
          isSubmitting={loading}
          submitLabel={
            isEditing ? "Salvar alterações" : "Cadastrar subcategoria"
          }
          submittingLabel={isEditing ? "Salvando..." : "Cadastrando..."}
          cancelClassName="border-gray-200"
        />
      </form>
    </section>
  );
}
