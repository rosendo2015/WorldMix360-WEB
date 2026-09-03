const stats = [
  { value: "12k+", label: "produtos em catálogo" },
  { value: "98%", label: "satisfação de clientes" },
  { value: "24h", label: "tempo médio de resposta" },
  { value: "+200", label: "marcas parceiras" },
];

const values = [
  {
    title: "Confiança",
    description:
      "Priorizamos transparência, qualidade e suporte para que cada compra seja segura e bem informada.",
  },
  {
    title: "Curadoria",
    description:
      "Selecionamos produtos que agregam valor real à rotina das pessoas, com foco em praticidade e desempenho.",
  },
  {
    title: "Inovação",
    description:
      "Usamos tecnologia para simplificar a experiência de compra, compare e escolha de forma inteligente.",
  },
];

export function AboutPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-12 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Sobre nós
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            Conectando pessoas com melhores escolhas.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#52657c]">
            A WorldMix360 nasceu para tornar as compras mais simples, informadas
            e confiáveis. Acreditamos que a tecnologia pode transformar a
            experiência de compra em algo mais humanizado, inteligente e útil
            para a vida real.
          </p>
        </div>
        <div className="relative min-h-[260px] overflow-hidden md:min-h-[360px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85"
            alt="Grupo de pessoas colaborando em um ambiente de trabalho"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="grid gap-8 rounded-[32px] border border-[#e7edf5] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:grid-cols-2 md:p-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossa história
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Mais do que uma loja: um ecossistema de descoberta.
          </h2>
        </div>

        <div className="space-y-4 text-base leading-7 text-[#52657c]">
          <p>
            Começamos com a ideia de reunir produtos relevantes, marcas
            confiáveis e experiências de compra mais agradáveis em uma só
            plataforma.
          </p>
          <p>
            Hoje, ajudamos milhares de pessoas a encontrar soluções práticas em
            tecnologia, casa, moda, pets, ofertas e produtos digitais, sempre
            com atenção ao valor, qualidade e clareza.
          </p>
        </div>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e7edf5] bg-[#f7f9fc] p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-black text-[#071a2f]">{stat.value}</p>
            <p className="mt-2 text-sm text-[#52657c]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nossos valores
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            O que nos move todos os dias
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <article
              key={value.title}
              className="rounded-[26px] border border-[#e7edf5] bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf5ff] text-lg font-bold text-[#0b3d66]">
                {value.title.charAt(0)}
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#071a2f]">
                {value.title}
              </h3>
              <p className="text-sm leading-6 text-[#52657c]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Nosso jeito de trabalhar
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f] md:text-3xl">
            Valores presentes em cada escolha
          </h2>
        </div>
        <div className="space-y-5">
          {[
            [
              "Confiança",
              "Transparência em primeiro lugar",
              "Prioridade central",
            ],
            ["Curadoria", "Relevância para a vida real", "Foco constante"],
            ["Inovação", "Tecnologia com propósito", "Evolução contínua"],
          ].map(([label, description, level]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                <span className="font-semibold text-[#071a2f]">{label}</span>
                <span className="text-[#52657c]">{description}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#dfe7f3]">
                <div
                  className="h-full rounded-full bg-[#0b3d66]"
                  style={{ width: level }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
