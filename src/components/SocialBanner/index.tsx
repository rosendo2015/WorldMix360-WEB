import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import { Icon } from "../Icon";

const socialBanners = [
  {
    eyebrow: "Conecte-se conosco",
    title: "Siga no",
    highlight: " Instagram",
    description:
      "Acompanhe novidades, bastidores e dicas exclusivas diretamente no nosso perfil.",
    image:
      "https://images.unsplash.com/photo-1702390734475-d81dd8ae8fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZHV0b3N8ZW58MHx8MHx8fDA%3D",
    imageAlt: "Feed do Instagram com posts inspiradores",
    href: "https://instagram.com/seuperfil",
    cta: "Visitar Instagram",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-purple-900 via-pink-700 to-red-500",
  },
  {
    eyebrow: "Conteúdo em vídeo",
    title: "Assista no",
    highlight: " YouTube",
    description:
      "Tutoriais, reviews e muito mais para você aprender e se inspirar.",
    image:
      "https://images.unsplash.com/photo-1615883962708-708904fe162e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTM2fHx5b3V0dWJlfGVufDB8fDB8fHww",
    imageAlt: "Tela de vídeos no YouTube",
    href: "https://youtube.com/seucanal",
    cta: "Ir para YouTube",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-red-800 via-red-600 to-orange-500",
  },
  {
    eyebrow: "Novidades rápidas",
    title: "Acompanhe no",
    highlight: " Twitter",
    description:
      "Fique por dentro das últimas atualizações e interaja em tempo real.",
    image:
      "https://images.unsplash.com/photo-1631856955350-77f4023dff2b?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Timeline do Twitter com posts recentes",
    href: "https://twitter.com/seuperfil",
    cta: "Seguir no Twitter",
    imageClassName: "inset-0 h-full w-full object-cover",
    gradient: "from-sky-900 via-blue-700 to-cyan-500",
  },
];

export function SocialBanner() {
  return (
    <section
      aria-label="Redes sociais WorldMix360"
      className="w-full overflow-hidden bg-navy mt-10"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop
        className="social-banner h-[400px] md:h-[500px]"
      >
        {socialBanners.map((banner) => (
          <SwiperSlide key={banner.title}>
            <div
              className={`relative h-full overflow-hidden ${banner.gradient}`}
            >
              <img
                src={banner.image}
                alt={banner.imageAlt}
                className={`absolute z-0 h-auto ${banner.imageClassName}`}
              />
              {/* Overlay mais escuro para contraste */}
              <div className="absolute inset-0 z-10 bg-black/50" />
              <div className="relative z-20 mx-auto flex h-full max-w-[1200px] items-center px-10 pb-12">
                <div className="max-w-2xl bg-navy/70 p-6 rounded-lg">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-light">
                    {banner.eyebrow}
                  </p>
                  <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl drop-shadow">
                    {banner.title}
                    <span className="font-bold text-green">
                      {banner.highlight}
                    </span>
                  </h2>
                  <p className="mb-6 mt-6 max-w-xl text-base leading-7 text-gray-50 md:text-lg">
                    {banner.description}
                  </p>
                  <a
                    href={banner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue px-5 py-3 font-bold text-white transition hover:bg-navy"
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
