import { Navigate, type RouteObject, useRoutes } from "react-router-dom";

import { AppLayout } from "../components/AppLayout";
import { authRoutes } from "./authRoutes";
import { homeRoutes } from "./homeRoutes";
import { institutionalRoutes } from "./institutionalRoutes";
import { productRoutes } from "./productRoutes";

const routes: RouteObject[] = [
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
];

export function AppRoutes() {
  return useRoutes(routes);
}
