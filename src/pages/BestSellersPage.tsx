import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import type { Product } from "../contexts/ProductsContext";
import { useProducts } from "../contexts/useProducts";

export function BestSellersPage() {
  const { getPublicProducts } = useProducts();
  const [bestSellerProducts, setBestSellerProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void getPublicProducts({ bestSeller: true })
      .then((products) => {
        if (!cancelled) {
          setBestSellerProducts(products);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Não foi possível carregar os produtos mais vendidos.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [getPublicProducts]);

  if (loading) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-[#52657c]">
            Carregando produtos mais vendidos...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-xl font-bold text-red-700">
            Não foi possível carregar os produtos
          </h1>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            <FiArrowLeft />
            Voltar para a página inicial
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      {/* Cabeçalho */}
      <div className="mb-10">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#1769e0] transition hover:text-[#071a2f]"
        >
          <FiArrowLeft />
          Voltar para a página inicial
        </Link>

        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-[#1769e0]">
          Seleção WorldMix360
        </p>

        <h1 className="text-3xl font-bold text-[#071a2f] md:text-4xl">
          Produtos mais vendidos
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-[#52657c]">
          Confira os produtos selecionados como mais vendidos no WorldMix360.
        </p>
      </div>

      {/* Produtos */}
      {bestSellerProducts.length === 0 ? (
        <div className="rounded-2xl border border-[#e7edf5] bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#071a2f]">
            Nenhum produto mais vendido disponível
          </h2>

          <p className="mt-2 text-sm text-[#52657c]">
            Ainda não existem produtos marcados como mais vendidos no momento.
          </p>

          <Link
            to="/produtos"
            className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f58c7]"
          >
            Ver todos os produtos
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-sm text-[#52657c]">
              {bestSellerProducts.length}{" "}
              {bestSellerProducts.length === 1
                ? "produto encontrado"
                : "produtos encontrados"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
