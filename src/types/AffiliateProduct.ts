export type Marketplace = "mercado-livre" | "amazon" | "shopee" | "outro";

export type AffiliateProduct = {
  id: string;
  title: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  marketplace: Marketplace;
  affiliateUrl: string;
  category?: string;
};
