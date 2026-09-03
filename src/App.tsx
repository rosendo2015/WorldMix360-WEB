import { MercadoLivreProvider } from "./contexts/MercadoLivreContext";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <MercadoLivreProvider>
      <AppRoutes />
    </MercadoLivreProvider>
  );
}
