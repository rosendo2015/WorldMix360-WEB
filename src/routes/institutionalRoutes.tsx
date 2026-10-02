import type { RouteObject } from "react-router-dom";

import {
  AboutPage,
  ContactPage,
  HowItWorksPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from "./lazyPages";

export const institutionalRoutes: RouteObject[] = [
  { path: "sobre", element: <AboutPage /> },
  { path: "contato", element: <ContactPage /> },
  { path: "como-funciona", element: <HowItWorksPage /> },
  {
    path: "politica-de-privacidade",
    element: <PrivacyPolicyPage />,
  },
  { path: "termos-de-uso", element: <TermsOfUsePage /> },
];
