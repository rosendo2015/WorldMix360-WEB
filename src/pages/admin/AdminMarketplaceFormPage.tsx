import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";
import { useMarketplaces } from "../../contexts/useMarketplaces";

export function AdminMarketplaceFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useAuth();

  const { getMarketplaceById, createMarketplace, updateMarketplace } =
    useMarketplaces();

  const isEditing = Boolean(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [active, setActive] = useState(true);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    const marketplaceId = id;
    let isMounted = true;

    async function loadMarketplace() {
      if (isMounted) {
        setLoadingData(true);
        setError(null);
      }

      try {
        const marketplace = await getMarketplaceById(marketplaceId);

        if (!isMounted) {
          return;
        }

        if (!marketplace) {
          setError("Marketplace não encontrado.");
          return;
        }

        setName(marketplace.name);
        setDescription(marketplace.description ?? "");
        setWebsiteUrl(marketplace.websiteUrl ?? "");
        setLogoUrl(marketplace.logoUrl ?? "");
        setSortOrder(String(marketplace.sortOrder ?? 0));
        setActive(marketplace.active);
      } catch {
        if (!isMounted) {
          return;
        }

        setError("Não foi possível carregar o marketplace.");
      } finally {
        if (isMounted) {
          setLoadingData(false);
        }
      }
    }

    void loadMarketplace();

    return () => {
      isMounted = false;
    };
  }, [id, getMarketplaceById]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    if (!token) {
      setError("Sua sessão não está autenticada.");
      return;
    }

    if (!name.trim()) {
      setError("Informe o nome do marketplace.");
      return;
    }

    if (name.trim().length < 2) {
      setError("O nome do marketplace deve ter pelo menos 2 caracteres.");
      return;
    }

    const parsedSortOrder = Number(sortOrder);

    if (!Number.isInteger(parsedSortOrder)) {
      setError("A ordem deve ser um número inteiro.");
      return;
    }

    if (websiteUrl.trim()) {
      try {
        new URL(websiteUrl.trim());
      } catch {
        setError("Informe uma URL válida para o website.");
        return;
      }
    }

    if (logoUrl.trim()) {
      try {
        new URL(logoUrl.trim());
      } catch {
        setError("Informe uma URL válida para o logo.");
        return;
      }
    }

    setLoading(true);

    try {
      if (isEditing && id) {
        await updateMarketplace(
          id,
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      } else {
        await createMarketplace(
          {
            name: name.trim(),
            description: description.trim() || undefined,
            websiteUrl: websiteUrl.trim() || undefined,
            logoUrl: logoUrl.trim() || undefined,
            active,
            sortOrder: parsedSortOrder,
          },
          token,
        );
      }

      navigate("/admin/marketplaces");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : isEditing
            ? "Não foi possível atualizar o marketplace."
            : "Não foi possível criar o marketplace.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (loadingData) {
    return (
      <section className="mx-auto w-full max-w-4xl">
        <div className="rounded-xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">Carregando marketplace...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl">
      {/* Cabeçalho */}
      <div className="mb-6">
        <Link
          to="/admin/marketplaces"
          className="text-sm font-semibold text-blue hover:underline"
        >
          ← Voltar para marketplaces
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          {isEditing ? "Editar marketplace" : "Novo marketplace"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {isEditing
            ? "Atualize os dados do marketplace."
            : "Cadastre um novo marketplace para o WorldMix360."}
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
                placeholder="Ex.: Mercado Livre"
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
                placeholder="Descreva brevemente o marketplace..."
                rows={4}
                disabled={loading}
                className="w-full resize-y rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />
            </div>

            {/* Website */}
            <div>
              <label
                htmlFor="websiteUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Website
              </label>

              <input
                id="websiteUrl"
                type="url"
                value={websiteUrl}
                onChange={(event) => setWebsiteUrl(event.target.value)}
                placeholder="https://www.exemplo.com.br"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe a URL oficial do marketplace.
              </p>
            </div>

            {/* Logo */}
            <div>
              <label
                htmlFor="logoUrl"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Logo
              </label>

              <input
                id="logoUrl"
                type="url"
                value={logoUrl}
                onChange={(event) => setLogoUrl(event.target.value)}
                placeholder="https://exemplo.com/logo.png"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-100"
              />

              <p className="mt-2 text-xs text-gray-500">
                Informe uma URL válida para o logo.
              </p>

              {logoUrl.trim() && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-gray-500">
                    Pré-visualização
                  </p>

                  <div className="flex h-24 w-24 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <img
                      src={logoUrl}
                      alt="Pré-visualização do logo"
                      className="max-h-full max-w-full object-contain"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
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

            {/* Ativo */}
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  Marketplace ativo
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Marketplaces inativos não devem aparecer em áreas públicas do
                  catálogo.
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
            to="/admin/marketplaces"
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
                : "Cadastrar marketplace"}
          </button>
        </div>
      </form>
    </section>
  );
}
