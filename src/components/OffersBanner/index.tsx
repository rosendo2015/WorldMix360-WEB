import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const offersBanners = [
  {
    eyebrow: "Ofertas imperdíveis",
    title: "Descontos de até",
    highlight: " 50%",
    description:
      "Aproveite promoções exclusivas em tecnologia, moda e muito mais.",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155223f9c8?auto=format&fit=crop&w=1600&q=85",
    imageAlt: "Produtos em promoção com grandes descontos",
    href: "/ofertas",
    cta: "Aproveitar agora",
    imageClassName: "inset-0 h-full w-full object-cover",
  },
];

export function OffersBanner() {
  return (
    <section
      aria-label="Ofertas especiais"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="offers-banner h-[400px] md:h-[500px]"
      >
        {offersBanners.map((banner) => (
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
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-white/90 md:text-lg">
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
