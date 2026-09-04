import { useContext } from "react";

import { MercadoLivreContext } from "./MercadoLivreContext";

export function useMercadoLivre() {
  const context = useContext(MercadoLivreContext);

  if (!context) {
    throw new Error(
      "useMercadoLivre deve ser usado dentro de MercadoLivreProvider",
    );
  }

  return context;
}
