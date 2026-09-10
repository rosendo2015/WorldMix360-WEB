import { AuthProvider } from "./contexts/AuthProvider";
import { BlogProvider } from "./contexts/BlogProvider";
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
                <BlogProvider>
                  <AppRoutes />
                </BlogProvider>
              </ProductsProvider>
            </MarketplacesProvider>
          </SubcategoriesProvider>
        </CategoriesProvider>
      </MercadoLivreProvider>
    </AuthProvider>
  );
}
