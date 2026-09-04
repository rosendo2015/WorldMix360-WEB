import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const blogBanners = [
  {
    eyebrow: "No nosso blog",
    title: "Dicas práticas sobre",
    highlight: " tecnologia",
    description:
      "Descubra como escolher gadgets e apps que realmente facilitam sua rotina.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Pessoa usando notebook e smartphone",
    href: "/blog/tecnologia",
    cta: "Ler matéria",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-blue", // usa azul da paleta
  },
  {
    eyebrow: "Conteúdo exclusivo",
    title: "Tendências em",
    highlight: " consumo consciente",
    description:
      "Saiba como fazer escolhas mais sustentáveis e inteligentes no dia a dia.",
    image:
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Sacolas ecológicas e produtos sustentáveis",
    href: "/blog/sustentabilidade",
    cta: "Explorar artigo",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-green", // verde da paleta
  },
  {
    eyebrow: "Insights do mercado",
    title: "O futuro das",
    highlight: " compras online",
    description:
      "Entenda como marketplaces estão mudando a forma de consumir e vender.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Carrinho de compras digital",
    href: "/blog/ecommerce",
    cta: "Ver análise",
    imageClassName: "inset-0 h-full w-full object-cover",
    bgColor: "bg-yellow", // amarelo da paleta
  },
];

export function BlogBanner() {
  return (
    <section
      aria-label="Matérias do Blog WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="blog-banner h-[400px] md:h-[500px]"
      >
        {blogBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.bgColor}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-yellow">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
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
