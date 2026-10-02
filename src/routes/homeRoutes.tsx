/** src/routes/homeRoutes.tsx */

import type { RouteObject } from "react-router-dom";

import { HomePage } from "./lazyPages";

export const homeRoutes: RouteObject[] = [
  {
    index: true,
    element: <HomePage />,
  },
];
