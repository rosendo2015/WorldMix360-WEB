import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCreditCard,
  FiHeart,
  FiLock,
  FiSearch,
  FiShield,
  FiShoppingBag,
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

// Array de garantias
const trustBadges = [
  {
    icon: FiShoppingBag,
    title: "Compra na loja oficial",
    description:
      "Você é redirecionado para Mercado Livre, Amazon ou Shopee. O pagamento acontece diretamente no ambiente da loja parceira, nunca no WorldMix360.",
  },
  {
    icon: FiLock,
    title: "Conexão segura (HTTPS)",
    description:
      "O WorldMix360 utiliza conexão HTTPS para proteger a comunicação entre seu navegador e o site. Não coletamos dados de cartão de crédito.",
  },
  {
    icon: FiCreditCard,
    title: "Pagamentos protegidos",
    description:
      "O pagamento é realizado diretamente na plataforma da loja parceira, utilizando as opções e os meios de pagamento disponibilizados por ela.",
  },
  {
    icon: FiShield,
    title: "Garantia e suporte da loja parceira",
    description:
      "Após o redirecionamento, a compra, a emissão da nota fiscal, o suporte e as políticas de troca e devolução são tratados diretamente com a loja ou marketplace.",
  },
];

const categoryIcons = {
  tecnologia: FiShoppingBag,
  "casa-utilidades": FiTool,
  moda: FiShoppingBag,
  pets: FiHeart,
  "produtos-digitais": FiSearch,
};

// TESTE: true = Skeleton sempre visível
//        false = funcionamento normal
const FORCE_SKELETON = false;

export function HomePage() {
  const [skeletonKeys] = useState(() =>
    Array.from({ length: 8 }, () => crypto.randomUUID()),
  );

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    fetchCategories,
  } = useCategories();

  const { products, loading, error, fetchProducts } = useProducts();

  // Ref e Estados para permitir ARRASTAR com o mouse
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;

    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;

    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    void fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  const activeCategories = categories
    .filter((category) => category.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const destaqueProducts = products.filter((product) => product.destaque);

  const bestSellerProducts = products.filter((product) => product.bestSeller);

  return (
    <>
      <Banner />

      {(error || categoriesError) && (
        <div className="mx-auto max-w-[1200px] px-6 pb-2 pt-4 text-sm text-red-600">
          {error ?? categoriesError}
        </div>
      )}

      <div className="relative z-20 mx-auto -mt-40 max-w-[1200px] px-6 pb-10 md:-mt-55 md:pb-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div></div>

          <Link
            to="/categorias"
            className="hidden items-center gap-1 text-sm font-semibold text-navy transition hover:text-white sm:flex"
          >
            Ver todas as categorias <FiArrowUpRight />
          </Link>
        </div>

        {FORCE_SKELETON || categoriesLoading ? (
          <div className="flex w-full gap-3 overflow-x-auto pb-4 no-scrollbar">
            {skeletonKeys.map((key) => (
              <div
                key={key}
                className="h-36 w-36 shrink-0 animate-pulse rounded-2xl bg-gray-200 md:h-40 md:w-40"
              />
            ))}
          </div>
        ) : activeCategories.length === 0 ? (
          <div className="rounded-2xl bg-[#f7f9fc] p-6 text-center text-sm text-[#52657c]">
            Nenhuma categoria disponível no momento.
          </div>
        ) : (
          <section
            ref={scrollRef}
            aria-label="Carrossel de categorias"
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex w-full cursor-grab select-none gap-3 overflow-x-auto pb-4 no-scrollbar active:cursor-grabbing scroll-smooth touch-pan-x"
          >
            <Link
              to="/blog"
              draggable={false}
              className="group flex h-36 w-36 shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#071a2f] to-[#1769e0] p-0 text-center text-white shadow-[0_14px_30px_rgba(23,105,224,0.25)] transition hover:-translate-y-1 md:h-40 md:w-40 md:p-0"
            >
              <span className="flex h-12 w-full items-center justify-center bg-white/15 text-2xl text-[#9ad7ff] transition group-hover:scale-110 md:h-27 md:text-3xl">
                <img
                  src="https://img.magnific.com/fotos-gratis/blog-online_53876-123696.jpg?semt=ais_hybrid&w=740&q=80"
                  alt="Blog"
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="text-lg font-semibold leading-4 text-white">
                Blog
              </span>

              <span className="mb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#9ad7ff] md:text-[10px]">
                Conteúdos
              </span>
            </Link>

            {activeCategories.map((category) => {
              const IconComponent =
                categoryIcons[category.slug as keyof typeof categoryIcons] ??
                FiSearch;

              return (
                <Link
                  key={category.id}
                  to={`/categoria/${category.slug}`}
                  draggable={false}
                  className="group flex h-36 w-36 shrink-0 flex-col items-center justify-between overflow-hidden rounded-2xl bg-white text-center shadow-sm transition hover:-translate-y-1 hover:border-[#b9d6f4] hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)] md:h-40 md:w-40"
                >
                  <span className="flex h-24 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#edf5ff] text-[#1769e0] transition group-hover:scale-110 group-hover:bg-[#1769e0] group-hover:text-white md:h-28">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <IconComponent className="text-3xl md:text-4xl" />
                    )}
                  </span>

                  <span className="my-auto px-2 text-xs font-semibold leading-4 text-[#071a2f] md:text-sm">
                    {category.name}
                  </span>
                </Link>
              );
            })}
          </section>
        )}
      </div>

      <Session
        title="Ofertas em destaque"
        viewAllLink="/ofertas-destaque"
        viewAllLabel="Ver todas"
      >
        {FORCE_SKELETON || loading ? (
          <div className="flex gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skeletonKeys.map((key) => (
              <div
                key={`latest-product-skeleton-${key + 1}`}
                className="h-[420px] w-[270px] animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : destaqueProducts.length === 0 ? (
          <p className="px-6 text-sm text-[#52657c]">
            Nenhuma oferta em destaque disponível no momento.
          </p>
        ) : (
          destaqueProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Session>

      <BlogBanner />

      <Session
        title="Produtos mais vendidos"
        viewAllLink="/mais-vendidos"
        viewAllLabel="Ver todos"
      >
        {FORCE_SKELETON || loading ? (
          <div className="flex gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skeletonKeys.map((key) => (
              <div
                key={`latest-product-skeleton-${key + 1}`}
                className="h-[420px] w-[270px] animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : bestSellerProducts.length === 0 ? (
          <p className="px-6 text-sm text-[#52657c]">
            Nenhum produto mais vendido disponível no momento.
          </p>
        ) : (
          bestSellerProducts.map((product) => (
            <ProductCard key={`${product.id}-secondary`} product={product} />
          ))
        )}
      </Session>

      <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
              Novidades
            </h2>

            <p className="mt-1 text-sm text-[#52657c]">
              Confira os últimos produtos cadastrados no WorldMix360.
            </p>
          </div>

          <Link
            to="/produtos"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1769e0] transition hover:text-[#071a2f]"
          >
            Ver todos os produtos
            <FiArrowUpRight />
          </Link>
        </div>

        {FORCE_SKELETON || loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skeletonKeys.map((key) => (
              <div
                key={`latest-product-skeleton-${key + 1}`}
                className="h-[420px] animate-pulse rounded-2xl bg-gray-200"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-sm text-[#52657c]">
            Nenhum produto cadastrado recentemente.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={`${product.id}-latest`} product={product} />
            ))}
          </div>
        )}
      </section>

      <SocialBanner />

      <section className="mx-auto grid max-w-[1200px] gap-4 px-6 py-10 md:grid-cols-4 md:py-14">
        {trustBadges.map(({ icon: BadgeIcon, title, description }) => (
          <div
            key={title}
            className="flex gap-3 rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dff5e8] text-[#159447]">
              <BadgeIcon />
            </span>

            <div>
              <h3 className="font-semibold text-[#071a2f]">{title}</h3>

              <p className="mt-1 text-sm leading-5 text-[#52657c]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
