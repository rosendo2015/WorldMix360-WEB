import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6">
            {/* Categoria */}
            <div>
              <label
                htmlFor="categoryId"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Categoria *
              </label>

              <select
                id="categoryId"
                value={categoryId}
                onChange={(event) => setCategoryId(event.target.value)}
                disabled={isEditing || loading}
                required={!isEditing}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="">Selecione uma categoria</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {isEditing && (
                <p className="mt-2 text-xs text-gray-500">
                  A categoria não pode ser alterada durante a edição.
                </p>
              )}
            </div>

            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Nome *
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ex.: Smartphones"
                required
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                O slug será gerado automaticamente pela API.
              </p>
            </div>

            {/* Descrição */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Descrição
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Descreva brevemente esta subcategoria..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Imagem */}
            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Imagem
              </label>

              <input
                id="image"
                type="url"
                value={image}
                onChange={(event) => setImage(event.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para a imagem.
              </p>

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
            <div>
              <label
                htmlFor="sortOrder"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Ordem
              </label>

              <input
                id="sortOrder"
                type="number"
                step="1"
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Use números menores para exibir primeiro.
              </p>
            </div>

            {/* Ativa */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Subcategoria ativa
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Subcategorias inativas não devem aparecer no catálogo público.
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={active}
                disabled={loading}
                onClick={() => setActive((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${
                  active ? "bg-blue-600" : "bg-gray-300"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <span
                  className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition ${
                    active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to="/admin/subcategories"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? isEditing
                ? "Salvando..."
                : "Cadastrando..."
              : isEditing
                ? "Salvar alterações"
                : "Cadastrar subcategoria"}
          </button>
        </div>
      </form>
    </section>
  );
}
