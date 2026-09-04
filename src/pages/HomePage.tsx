import { useEffect } from "react";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiSearch,
  FiShield,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { Banner } from "../components/Banner";
import { menuItems } from "../components/Menu/items";
import { ProductCard } from "../components/ProductCard";
import { Session } from "../components/Session";
import { useProducts } from "../contexts/useProducts";

export function HomePage() {
  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Banner />

      {error && (
        <div className="mx-auto max-w-[1200px] px-6 pb-2 pt-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Explore por interesse
            </p>

            <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
              Encontre o que combina com você
            </h2>
          </div>

          <Link
            to="/ofertas"
            className="hidden items-center gap-1 text-sm font-semibold text-[#0b3d66] transition hover:text-[#1769e0] sm:flex"
          >
            Ver ofertas <FiArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              to={href}
              className={`group flex aspect-square flex-col items-center justify-between rounded-2xl border p-4 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)] ${
                label === "Blog"
                  ? "border-[#1769e0] bg-gradient-to-br from-[#071a2f] to-[#1769e0] text-white shadow-[0_14px_30px_rgba(23,105,224,0.25)]"
                  : "border-[#e7edf5] bg-white text-[#071a2f] hover:border-[#b9d6f4]"
              }`}
            >
              <span
                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-3xl transition group-hover:scale-110 md:h-20 md:w-20 md:text-4xl ${
                  label === "Blog"
                    ? "bg-white/15 text-[#9ad7ff]"
                    : "bg-[#edf5ff] text-[#1769e0] group-hover:bg-[#1769e0] group-hover:text-white"
                }`}
              >
                <Icon />
              </span>

              <span
                className={`text-sm font-semibold leading-5 ${
                  label === "Blog" ? "text-white" : "text-[#071a2f]"
                }`}
              >
                {label}
              </span>

              {label === "Blog" && (
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ad7ff]">
                  Conteúdos
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      <Session title="Ofertas em destaque">
        {loading ? (
          <p className="px-6 text-sm text-[#52657c]">Carregando produtos...</p>
        ) : products.length === 0 ? (
          <p className="px-6 text-sm text-[#52657c]">
            Nenhum produto disponível no momento.
          </p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Session>

      <Session title="Produtos mais vendidos">
        {products.map((product) => (
          <ProductCard key={`${product.id}-secondary`} product={product} />
        ))}
      </Session>

      <section className="mx-auto grid max-w-[1200px] gap-4 px-6 py-10 md:grid-cols-4 md:py-14">
        {[
          [
            FiSearch,
            "Pesquisa fácil",
            "Encontre ideias em diferentes categorias.",
          ],
          [
            FiShield,
            "Escolhas claras",
            "Veja informações antes de acessar a oferta.",
          ],
          [
            FiStar,
            "Curadoria",
            "Descubra produtos selecionados para sua rotina.",
          ],
          [
            FiCheckCircle,
            "Parceiros confiáveis",
            "A compra acontece diretamente no marketplace.",
          ],
        ].map(([Icon, title, description]) => (
          <div
            key={title as string}
            className="flex gap-3 rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-[#159447]">
              <Icon />
            </span>

            <div>
              <h3 className="font-semibold text-[#071a2f]">
                {title as string}
              </h3>

              <p className="mt-1 text-sm leading-5 text-[#52657c]">
                {description as string}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
