import type { RouteObject } from "react-router-dom";

import { AdminLayout } from "../components/AdminLayout";
import { AdminBlogFormPage } from "../pages/admin/AdminBlogFormPage";
import { AdminBlogPage } from "../pages/admin/AdminBlogPage";
import { AdminCategoryFormPage } from "../pages/admin/AdminCategoriesFormPage";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboarPage";
import { AdminMarketplaceFormPage } from "../pages/admin/AdminMarketplaceFormPage";
import { AdminMarketplacesPage } from "../pages/admin/AdminMarketplacesPage";
import { AdminProductsFormPage } from "../pages/admin/AdminProductsFormPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { AdminSubcategoriesPage } from "../pages/admin/AdminSubcategoriesPage";
import { AdminSubcategoryFormPage } from "../pages/admin/AdminSubcategoryFormPage";
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
