import type { RouteObject } from "react-router-dom";

import { AboutPage } from "../pages/AboutPage";
import { ContactPage } from "../pages/ContactPage";
import { HowItWorksPage } from "../pages/HowItWorksPage";
import { PrivacyPolicyPage } from "../pages/PrivacyPolicyPage";
import { TermsOfUsePage } from "../pages/TermsOfUsePage";

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
