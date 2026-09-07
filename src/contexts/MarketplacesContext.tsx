import { createContext } from "react";
export type Marketplace = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  active: boolean;
  sortOrder: number;
  products?: Array<{ id: string; name: string; slug: string }>;
};
export type MarketplaceFormData = {
  name: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplaceUpdateData = {
  name?: string;
  description?: string;
  websiteUrl?: string;
  logoUrl?: string;
  active?: boolean;
  sortOrder?: number;
};
export type MarketplacesContextValue = {
  marketplaces: Marketplace[];
  loading: boolean;
  error: string | null;
  fetchMarketplaces: () => Promise<void>;
  getMarketplaceById: (id: string) => Promise<Marketplace | null>;
  createMarketplace: (
    data: MarketplaceFormData,
    token: string,
  ) => Promise<Marketplace>;
  updateMarketplace: (
    id: string,
    data: MarketplaceUpdateData,
    token: string,
  ) => Promise<Marketplace>;
  deleteMarketplace: (id: string, token: string) => Promise<void>;
};
export const MarketplacesContext = createContext<
  MarketplacesContextValue | undefined
>(undefined);
