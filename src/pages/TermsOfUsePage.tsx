import { InfoPage } from "./ContentPages";

export function TermsOfUsePage() {
  return (
    <InfoPage
      title="Termos de uso"
      intro="Ao utilizar a WorldMix360, você concorda com nossas regras de navegação e uso da plataforma."
      image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa revisando um documento com caneta e notebook"
      visualTitle="Princípios para uma boa experiência"
      visualItems={[
        { label: "Uso responsável", value: "Respeito", level: 100 },
        { label: "Conteúdo", value: "Integridade", level: 82 },
        { label: "Relação", value: "Transparência", level: 94 },
      ]}
      sections={[
        {
          title: "Uso da plataforma",
          content:
            "Você deve utilizar a plataforma de forma responsável e conforme a legislação vigente.",
        },
        {
          title: "Conteúdo e propriedade intelectual",
          content:
            "Todo o conteúdo e os materiais da marca são protegidos e devem ser respeitados.",
        },
        {
          title: "Responsabilidade",
          content:
            "A WorldMix360 atua como canal de informação e comercialização, sem substituir a análise individual do consumidor.",
        },
      ]}
    />
  );
}
