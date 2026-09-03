import { InfoPage } from "./ContentPages";

export function HowItWorksPage() {
  return (
    <InfoPage
      title="Como funciona"
      intro="A WorldMix360 ajuda você a escolher com mais segurança, rapidez e clareza."
      image="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Equipe analisando informações em uma reunião"
      visualTitle="Uma jornada simples para decidir melhor"
      visualItems={[
        { label: "Descoberta", value: "Encontre", level: 35 },
        { label: "Comparação", value: "Avalie", level: 68 },
        { label: "Escolha", value: "Decida", level: 100 },
      ]}
      sections={[
        {
          title: "Pesquisa inteligente",
          content:
            "A plataforma reúne produtos e comparações para facilitar sua decisão.",
        },
        {
          title: "Curadoria humana",
          content:
            "Selecionamos marcas e itens com foco em qualidade, utilidade e valor.",
        },
        {
          title: "Atendimento confiável",
          content:
            "Nossa equipe responde com clareza e oferece suporte em cada etapa.",
        },
      ]}
    />
  );
}
