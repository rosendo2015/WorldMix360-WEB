import type { RouteObject } from "react-router-dom";

import { BlogPage } from "../pages/BlogPage";
import { DigitalProductsPage } from "../pages/DigitalProductsPage";
import { FashionPage } from "../pages/FashionPage";
import { HomeUtilitiesPage } from "../pages/HomeUtilitiesPage";
import { OffersPage } from "../pages/OffersPage";
import { PetsPage } from "../pages/PetsPage";
import { ProductPage } from "../pages/ProductPage";
import { SubcategoryPage } from "../pages/SubcategoryPage";
import { TechnologyPage } from "../pages/TechnologyPage";

export const productRoutes: RouteObject[] = [
  { path: "produto/:id", element: <ProductPage /> },
  { path: "tecnologia", element: <TechnologyPage /> },
  { path: "casa-utilidades", element: <HomeUtilitiesPage /> },
  { path: "moda", element: <FashionPage /> },
  { path: "pets", element: <PetsPage /> },
  { path: "produtos-digitais", element: <DigitalProductsPage /> },
  { path: "ofertas", element: <OffersPage /> },
  { path: "blog", element: <BlogPage /> },
  {
    path: ":category/:subcategory",
    element: <SubcategoryPage />,
  },
];
