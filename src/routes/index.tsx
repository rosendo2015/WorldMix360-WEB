/* src/routes/index.tsx */
import { Navigate, type RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { institutionalRoutes } from "./institutionalRoutes";
import { productRoutes } from "./productRoutes";

const routes: RouteObject[] = [
  // Rotas públicas
  {
    element: <AppLayout />,
    children: [
      ...homeRoutes,
      ...institutionalRoutes,
      ...productRoutes,
      ...authRoutes,
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

  // Rotas administrativas (layout separado)
  ...adminRoutes,
];

export function AppRoutes() {
  return useRoutes(routes);
}
