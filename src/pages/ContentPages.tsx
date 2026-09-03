import { Link } from "react-router-dom";

type Section = {
  title: string;
  content: string;
};

type CategoryPageProps = {
  title: string;
  summary: string;
  highlights: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  }[];
  image: string;
  imageAlt: string;
};

export function CategoryPage({
  title,
  summary,
  highlights,
  image,
  imageAlt,
}: CategoryPageProps) {
  const categorySlug = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "e")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Categoria
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {summary}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/10 to-transparent" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[24px] border border-[#e7edf5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(15,23,42,0.1)]"
          >
            <Link
              to={`/${categorySlug}/${item.title
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .replace(/&/g, "e")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "")}`}
              className="block h-full"
            >
              <div className="h-40 overflow-hidden bg-[#edf5ff]">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="mb-2 text-lg font-semibold text-[#071a2f]">
                  {item.title}
                </p>
                <p className="text-sm leading-6 text-[#52657c]">
                  {item.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#0b3d66]">
                  Explorar seleção →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

type InfoPageProps = {
  title: string;
  intro: string;
  sections: Section[];
  image: string;
  imageAlt: string;
  visualTitle: string;
  visualItems: {
    label: string;
    value: string;
    level: number;
  }[];
};

export function InfoPage({
  title,
  intro,
  sections,
  image,
  imageAlt,
  visualTitle,
  visualItems,
}: InfoPageProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr] md:min-h-[360px]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Institucional
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            {intro}
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-full">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="mb-10 grid gap-6 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Visão geral
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">{visualTitle}</h2>
        </div>
        <div className="space-y-5">
          {visualItems.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">
                  {item.label}
                </span>
                <span className="text-[#52657c]">{item.value}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[28px] border border-[#e7edf5] bg-white p-7 shadow-sm"
          >
            <h2 className="mb-3 text-2xl font-bold text-[#071a2f]">
              {section.title}
            </h2>
            <p className="text-base leading-7 text-[#52657c]">
              {section.content}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
