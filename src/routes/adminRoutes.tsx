import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "../components/AdminLayout";
import { AdminCategoryFormPage } from "../pages/AdminCategoriesFormPage";
import { AdminCategoriesPage } from "../pages/AdminCategoriesPage";
import AdminDashboardPage from "../pages/AdminDashboarPage";
import { AdminMarketplaceFormPage } from "../pages/AdminMarketplaceFormPage";
import { AdminMarketplacesPage } from "../pages/AdminMarketplacesPage";
import { AdminProductsPage } from "../pages/AdminProductsPage";
import { AdminSubcategoriesPage } from "../pages/AdminSubcategoriesPage";
import { AdminSubcategoryFormPage } from "../pages/AdminSubcategoryFormPage";
import { AdminProductsFormPage } from "../pages/admin/AdminProductsFormPage";
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
    ],
  },
];
