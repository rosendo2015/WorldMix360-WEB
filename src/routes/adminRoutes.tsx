import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "../components/AdminLayout";
import {
  AdminBlogFormPage,
  AdminBlogPage,
  AdminCategoriesPage,
  AdminCategoryFormPage,
  AdminDashboardPage,
  AdminMarketplaceFormPage,
  AdminMarketplacesPage,
  AdminProductsFormPage,
  AdminProductsPage,
  AdminSubcategoriesPage,
  AdminSubcategoryFormPage,
} from "./lazyPages";
import PrivateRoute from "./PrivateRoute";

export const adminRoutes: RouteObject[] = [
  {
    path: "admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },

      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "products/new",
        element: <AdminProductsFormPage />,
      },
      {
        path: "products/:id/edit",
        element: <AdminProductsFormPage />,
      },

      {
        path: "categories",
        element: <AdminCategoriesPage />,
      },
      {
        path: "categories/new",
        element: <AdminCategoryFormPage />,
      },
      {
        path: "categories/:id/edit",
        element: <AdminCategoryFormPage />,
      },

      {
        path: "subcategories",
        element: <AdminSubcategoriesPage />,
      },
      {
        path: "subcategories/new",
        element: <AdminSubcategoryFormPage />,
      },
      {
        path: "subcategories/:id/edit",
        element: <AdminSubcategoryFormPage />,
      },

      {
        path: "marketplaces",
        element: <AdminMarketplacesPage />,
      },
      {
        path: "marketplaces/new",
        element: <AdminMarketplaceFormPage />,
      },
      {
        path: "marketplaces/:id/edit",
        element: <AdminMarketplaceFormPage />,
      },

      {
        path: "blog",
        element: <AdminBlogPage />,
      },
      {
        path: "blog/novo",
        element: <AdminBlogFormPage />,
      },
      {
        path: "blog/editar/:id",
        element: <AdminBlogFormPage />,
      },
    ],
  },
];
