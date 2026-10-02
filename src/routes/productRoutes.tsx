import type { RouteObject } from "react-router-dom";

import {
  AllCategoriesPage,
  BestSellersPage,
  BlogPage,
  BlogPostPage,
  CategoryPage,
  DigitalProductsPage,
  FashionPage,
  FeaturedOffersPage,
  HomeUtilitiesPage,
  OffersPage,
  PetsPage,
  ProductPage,
  ProductsPage,
  SubcategoryPage,
  TechnologyPage,
} from "./lazyPages";

export const productRoutes: RouteObject[] = [
  // Busca de produtos
  {
    path: "produtos",
    element: <ProductsPage />,
  },

  // Detalhes do produto
  {
    path: "produto/:slug",
    element: <ProductPage />,
  },

  // Todas as categorias
  {
    path: "categorias",
    element: <AllCategoriesPage />,
  },

  // Categoria
  {
    path: "categoria/:slug",
    element: <CategoryPage />,
  },

  // Subcategoria - rota hierárquica
  {
    path: "categoria/:categorySlug/:subcategorySlug",
    element: <SubcategoryPage />,
  },

  // Rotas de categorias legadas
  {
    path: "tecnologia",
    element: <TechnologyPage />,
  },
  {
    path: "casa-utilidades",
    element: <HomeUtilitiesPage />,
  },
  {
    path: "moda",
    element: <FashionPage />,
  },
  {
    path: "pets",
    element: <PetsPage />,
  },
  {
    path: "produtos-digitais",
    element: <DigitalProductsPage />,
  },
  {
    path: "ofertas-destaque",
    element: <FeaturedOffersPage />,
  },
  {
    path: "mais-vendidos",
    element: <BestSellersPage />,
  },
  {
    path: "ofertas",
    element: <OffersPage />,
  },

  // Blog
  {
    path: "blog",
    element: <BlogPage />,
  },

  // Artigo individual do Blog
  {
    path: "blog/:slug",
    element: <BlogPostPage />,
  },

  // Compatibilidade com URLs antigas
  {
    path: ":category/:subcategory",
    element: <SubcategoryPage />,
  },
];
