import { AuthProvider } from "./contexts/AuthProvider";
import { MercadoLivreProvider } from "./contexts/MercadoLivreProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <MercadoLivreProvider>
        <ProductsProvider>
          <AppRoutes />
        </ProductsProvider>
      </MercadoLivreProvider>
    </AuthProvider>
  );
}
