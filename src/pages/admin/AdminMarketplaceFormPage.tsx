import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { FormActions, FormErrorMessage } from "../../components/FormControls";
import { MarketplaceFormFields } from "../../components/admin/marketplaces/MarketplaceFormFields";
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
  const [badgeColor, setBadgeColor] = useState("#f3f4f6");
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
        setBadgeColor(marketplace.badgeColor ?? "#f3f4f6");
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
            badgeColor,
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
            badgeColor,
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
        <FormErrorMessage message={error} className="mb-6" />
      )}

      {/* Formulário */}
      <form
        onSubmit={(event) => void handleSubmit(event)}
        className="space-y-6"
      >
        <MarketplaceFormFields
          name={name}
          description={description}
          websiteUrl={websiteUrl}
          logoUrl={logoUrl}
          badgeColor={badgeColor}
          sortOrder={sortOrder}
          active={active}
          disabled={loading}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onWebsiteUrlChange={setWebsiteUrl}
          onLogoUrlChange={setLogoUrl}
          onBadgeColorChange={setBadgeColor}
          onSortOrderChange={setSortOrder}
          onActiveToggle={() => setActive((value) => !value)}
        />

        <FormActions
          cancelTo="/admin/marketplaces"
          isSubmitting={loading}
          submitLabel={
            isEditing ? "Salvar alterações" : "Cadastrar marketplace"
          }
          submittingLabel={isEditing ? "Salvando..." : "Cadastrando..."}
        />
      </form>
    </section>
  );
}
