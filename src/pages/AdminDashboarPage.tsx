// src/pages/admin/AdminDashboardPage.tsx

import { useEffect } from "react";
import { useAuth } from "../contexts/useAuth";
import { useProducts } from "../contexts/useProducts";

export default function AdminDashboardPage() {
  const { products, fetchAdminProducts, loading, error } = useProducts();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      return;
    }

    void fetchAdminProducts(token);
  }, [token, fetchAdminProducts]);

  const totalProducts = products.length;

  const activeProducts = products.filter((p) => p.active).length;

  const featuredProducts = products.filter((p) => p.featured).length;

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Administrativo</h1>

      {loading ? (
        <p className="text-gray-600 mb-6">Carregando estatísticas...</p>
      ) : error ? (
        <p className="text-red-600 mb-6">Erro ao carregar produtos: {error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg bg-white shadow p-6">
            <h2 className="text-lg font-semibold">Total de Produtos</h2>

            <p className="text-3xl font-bold mt-2">{totalProducts}</p>
          </div>

          <div className="rounded-lg bg-white shadow p-6">
            <h2 className="text-lg font-semibold">Produtos Ativos</h2>

            <p className="text-3xl font-bold mt-2">{activeProducts}</p>
          </div>

          <div className="rounded-lg bg-white shadow p-6">
            <h2 className="text-lg font-semibold">Produtos em Destaque</h2>

            <p className="text-3xl font-bold mt-2">{featuredProducts}</p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <p className="text-gray-600">
          Bem-vindo ao painel administrativo. Aqui você pode gerenciar produtos,
          categorias, usuários e acompanhar estatísticas do sistema.
        </p>
      </div>
    </section>
  );
}
