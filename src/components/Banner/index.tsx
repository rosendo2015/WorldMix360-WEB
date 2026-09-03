import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import ProdutosBunner from "../../assets/images/banner1.png";
import { Icon } from "../Icon";

const banners = [
  {
    eyebrow: "Escolhas que fazem sentido",
    title: "Um mundo de",
    highlight: " escolhas.",
    description:
      "As melhores recomendações dos principais marketplaces em um só lugar para você.",
    image: ProdutosBunner,
    imageAlt: "Seleção de produtos recomendados pela WorldMix360",
    href: "/ofertas",
    cta: "Ver ofertas",
    imageClassName:
      "-bottom-4 right-0 max-w-[500px] opacity-80 md:max-w-[800px] lg:max-w-[900px]",
  },
  {
    eyebrow: "Compra mais inteligente",
    title: "Descubra produtos",
    highlight: " para sua rotina.",
    description:
      "Compare ideias, encontre novidades e escolha com mais confiança em cada categoria.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa escolhendo produtos em uma experiência de compra",
    href: "/tecnologia",
    cta: "Explorar categorias",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
  {
    eyebrow: "Curadoria de parceiros",
    title: "Encontre sua próxima",
    highlight: " boa escolha.",
    description:
      "Confira produtos de marketplaces parceiros e acesse as ofertas diretamente no site do anunciante.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoas felizes fazendo compras online em um notebook",
    href: "/ofertas",
    cta: "Ver produtos",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function Banner() {
  return (
    <section
      aria-label="Destaques WorldMix360"
      className="w-full overflow-hidden bg-navy"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="home-banner h-[500px] md:h-[600px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div className="relative h-full overflow-hidden bg-gradient-to-br from-navy via-[#0b3d66] to-blue">
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-navy via-navy/80 to-transparent" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#9ad7ff]">
                    {banner.eyebrow}
                  </p>
                  <h1 className="text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h1>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-xl">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green px-5 py-3 font-bold text-white transition hover:bg-green-dark"
                  >
                    {banner.cta}
                    <Icon svg={ArrowRight} className="h-5 w-5 fill-white" />
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
