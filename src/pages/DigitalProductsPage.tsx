import { CategoryPage } from "./ContentPages";

export function DigitalProductsPage() {
  return (
    <CategoryPage
      title="Produtos Digitais"
      summary="Ferramentas digitais para produtividade, entretenimento e inovação."
      image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Estação de trabalho com computador e ferramentas digitais"
      highlights={[
        {
          title: "Cursos e conteúdos",
          description: "Aprenda no seu ritmo e amplie suas possibilidades.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa estudando em um notebook",
        },
        {
          title: "Software e utilitários",
          description:
            "Ferramentas digitais para resolver mais com menos esforço.",
          image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Código em uma tela de computador",
        },
        {
          title: "Produtividade",
          description: "Organize ideias, projetos e tarefas em um só lugar.",
          image:
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Mesa de trabalho organizada",
        },
        {
          title: "Entretenimento digital",
          description: "Novas experiências para relaxar e se divertir.",
          image:
            "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Controle de videogame e televisão",
        },
      ]}
    />
  );
}
