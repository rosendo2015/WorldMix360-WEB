import { useEffect } from "react";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCheckCircle,
  FiGrid,
  FiHeart,
  FiSearch,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTool,
} from "react-icons/fi";
import { Link } from "react-router-dom";

import { Banner } from "../components/Banner";
import { BlogBanner } from "../components/BlogBanner";

import { ProductCard } from "../components/ProductCard";
import { Session } from "../components/Session";
import { SocialBanner } from "../components/SocialBanner";
import { useCategories } from "../contexts/useCategories";
import { useProducts } from "../contexts/useProducts";

export function HomePage() {
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const { products, loading, error, fetchProducts } = useProducts();

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const activeCategories = categories
    .filter((category) => category.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const categoryIcons = {
    tecnologia: FiGrid,
    "casa-utilidades": FiTool,
    moda: FiShoppingBag,
    pets: FiHeart,
    "produtos-digitais": FiGrid,
  };

  return (
    <>
      <Banner />

      {(error || categoriesError) && (
        <div className="mx-auto max-w-[1200px] px-6 pb-2 pt-4 text-sm text-red-600">
          {error ?? categoriesError}
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

        {categoriesLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {[
              "category-skeleton-1",
              "category-skeleton-2",
              "category-skeleton-3",
              "category-skeleton-4",
              "category-skeleton-5",
              "category-skeleton-6",
              "category-skeleton-7",
            ].map((skeletonKey) => (
              <div
                key={skeletonKey}
                className="aspect-square animate-pulse rounded-2xl border border-[#e7edf5] bg-[#f7f9fc]"
              />
            ))}
          </div>
        ) : activeCategories.length === 0 ? (
          <div className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center text-sm text-[#52657c]">
            Nenhuma categoria disponível no momento.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">
            {activeCategories.map((category) => {
              const Icon =
                categoryIcons[category.slug as keyof typeof categoryIcons] ??
                FiGrid;

              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  className="group flex aspect-square flex-col items-center justify-between overflow-hidden rounded-2xl border border-[#e7edf5] bg-white text-center shadow-sm transition hover:-translate-y-1 hover:border-[#b9d6f4] hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)]"
                >
                  <span className="flex h-40 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#edf5ff] text-[#1769e0] transition group-hover:scale-110 group-hover:bg-[#1769e0] group-hover:text-white md:h-30 md:w-full">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon className="text-3xl md:text-4xl" />
                    )}
                  </span>

                  <span className="text-sm font-semibold leading-5 text-[#071a2f] my-5">
                    {category.name}
                  </span>
                </Link>
              );
            })}

            <Link
              to="/blog"
              className="group flex aspect-square flex-col items-center justify-between rounded-2xl border border-[#1769e0] bg-gradient-to-br from-[#071a2f] to-[#1769e0] p-4 text-center text-white shadow-[0_14px_30px_rgba(23,105,224,0.25)] transition hover:-translate-y-1"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl text-[#9ad7ff] transition group-hover:scale-110 md:h-20 md:w-20 md:text-4xl">
                <FiBookOpen />
              </span>

              <span className="text-sm font-semibold leading-5 text-white">
                Blog
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ad7ff]">
                Conteúdos
              </span>
            </Link>
          </div>
        )}
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

      <BlogBanner />

      <Session title="Produtos mais vendidos">
        {products.map((product) => (
          <ProductCard key={`${product.id}-secondary`} product={product} />
        ))}
      </Session>

      <SocialBanner />

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
