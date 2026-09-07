import { useContext } from "react";
import { MarketplacesContext } from "./MarketplacesContext";
export function useMarketplaces() {
  const context = useContext(MarketplacesContext);
  if (!context) {
    throw new Error(
      "useMarketplaces deve ser utilizado dentro de MarketplacesProvider.",
    );
  }
  return context;
}
