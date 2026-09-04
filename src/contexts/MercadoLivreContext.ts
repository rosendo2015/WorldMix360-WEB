import { createContext } from "react";

import type { AffiliateProduct } from "../types/AffiliateProduct";

export type MercadoLivreProduct = AffiliateProduct;

export type MercadoLivreContextValue = {
  products: MercadoLivreProduct[];
  loading: boolean;
  error: string | null;
  search: (term: string) => Promise<void>;
};

export const MercadoLivreContext = createContext<
  MercadoLivreContextValue | undefined
>(undefined);
