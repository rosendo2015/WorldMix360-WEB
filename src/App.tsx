import { AuthProvider } from "./contexts/AuthProvider";
import { CategoriesProvider } from "./contexts/CategoriesProvider";
import { MarketplacesProvider } from "./contexts/MarketplacesProvider";
import { MercadoLivreProvider } from "./contexts/MercadoLivreProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { SubcategoriesProvider } from "./contexts/SubcategoriesProvider";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <MercadoLivreProvider>
        <CategoriesProvider>
          <SubcategoriesProvider>
            <MarketplacesProvider>
              <ProductsProvider>
                <AppRoutes />
              </ProductsProvider>
            </MarketplacesProvider>
          </SubcategoriesProvider>
        </CategoriesProvider>
      </MercadoLivreProvider>
    </AuthProvider>
  );
}
