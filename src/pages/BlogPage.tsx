import { CategoryPage } from "./ContentPages";

export function BlogPage() {
  return (
    <CategoryPage
      title="Blog"
      summary="Conteúdos úteis para ajudar você a comprar melhor e descobrir novas tendências."
      image="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Caderno, café e notebook em uma mesa de trabalho"
      highlights={[
        {
          title: "Dicas de consumo",
          description: "Informação para comprar com mais consciência.",
          image:
            "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Caderno com anotações e caneta",
        },
        {
          title: "Guias de compras",
          description: "Critérios práticos para encontrar o produto certo.",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa pesquisando em um notebook",
        },
        {
          title: "Tendências e novidades",
          description: "O que está mudando no mundo dos produtos e serviços.",
          image:
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook em uma mesa de trabalho",
        },
        {
          title: "Conteúdo confiável",
          description: "Leituras úteis, diretas e feitas para ajudar você.",
          image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa lendo notícias em um jornal",
        },
      ]}
    />
  );
}
