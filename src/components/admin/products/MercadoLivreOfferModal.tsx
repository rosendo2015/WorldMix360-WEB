import { useState } from "react";

import type { MercadoLivreOffer } from "../../../services/mercadoLivreService";

type MercadoLivreOfferModalProps = {
  open: boolean;
  title: string;
  offers: MercadoLivreOffer[];
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (offer: MercadoLivreOffer | null) => void;
};

function getOfferKey(offer: MercadoLivreOffer) {
  return `${offer.itemId}-${offer.sellerId}`;
}

export function MercadoLivreOfferModal({
  open,
  title,
  offers,
  loading = false,
  onCancel,
  onConfirm,
}: MercadoLivreOfferModalProps) {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  if (!open) {
    return null;
  }

  const selectedOffer =
    offers.find((offer) => getOfferKey(offer) === selectedKey) ?? null;

  function handleCancel() {
    setSelectedKey(null);
    onCancel();
  }

  function handleConfirm() {
    /*
     * Não limpamos a seleção aqui.
     *
     * O componente pai é responsável por fechar o modal depois
     * que o cadastro for concluído. Se ocorrer algum erro durante
     * o cadastro, a oferta continua selecionada e o usuário pode
     * tentar novamente.
     */
    onConfirm(selectedOffer);
  }

  function handleSelect(value: string) {
    setSelectedKey(value);
  }

  function handleSelectNone() {
    setSelectedKey("none");
  }

  const isNoneSelected = selectedKey === "none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="presentation"
    >
      {" "}
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mercado-livre-offer-modal-title"
      >
        {" "}
        <div className="border-b border-gray-200 px-6 py-5">
          {" "}
          <h2
            id="mercado-livre-offer-modal-title"
            className="text-xl font-semibold text-gray-900"
          >
            Selecionar oferta{" "}
          </h2>
          ```
          <p className="mt-1 text-sm text-gray-600">{title}</p>
          <p className="mt-2 text-sm text-gray-500">
            Encontramos {offers.length} ofertas para este produto. Selecione
            exatamente a oferta que deseja cadastrar.
          </p>
        </div>
        <div className="max-h-[55vh] overflow-y-auto p-6">
          <div className="space-y-3">
            {offers.map((offer) => {
              const offerKey = getOfferKey(offer);
              const isSelected = selectedKey === offerKey;

              return (
                <label
                  key={offerKey}
                  className={`block cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="mercadoLivreOffer"
                      value={offerKey}
                      checked={isSelected}
                      onChange={() => handleSelect(offerKey)}
                      disabled={loading}
                      className="mt-1 h-4 w-4"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            R$ {offer.price.toFixed(2).replace(".", ",")}
                          </p>

                          {offer.originalPrice !== null &&
                            offer.originalPrice !== undefined && (
                              <p className="text-sm text-gray-500 line-through">
                                R${" "}
                                {offer.originalPrice
                                  .toFixed(2)
                                  .replace(".", ",")}
                              </p>
                            )}
                        </div>

                        {offer.freeShipping && (
                          <span className="inline-flex w-fit bg-green/20 rounded-full px-2.5 py-1 text-xs font-medium text-green">
                            Frete grátis
                          </span>
                        )}
                      </div>

                      <div className="mt-3 grid grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-2">
                        <div>
                          <span className="font-medium text-gray-700">
                            Item:
                          </span>{" "}
                          {offer.itemId}
                        </div>

                        <div>
                          <span className="font-medium text-gray-700">
                            Vendedor:
                          </span>{" "}
                          {offer.sellerId}
                        </div>

                        {offer.condition && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Condição:
                            </span>{" "}
                            {offer.condition}
                          </div>
                        )}

                        {offer.listingTypeId && (
                          <div>
                            <span className="font-medium text-gray-700">
                              Anúncio:
                            </span>{" "}
                            {offer.listingTypeId}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </label>
              );
            })}

            <label
              className={`block cursor-pointer rounded-xl border p-4 transition ${
                isNoneSelected
                  ? "border-gray-500 bg-gray-100"
                  : "border-gray-100 hover:border-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="mercadoLivreOffer"
                  value="none"
                  checked={isNoneSelected}
                  onChange={handleSelectNone}
                  disabled={loading}
                  className="mt-1 h-4 w-4"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    Nenhum dos valores
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Não cadastrar nenhuma das ofertas apresentadas.
                  </p>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={loading || selectedKey === null}
            className="rounded-lg bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}
