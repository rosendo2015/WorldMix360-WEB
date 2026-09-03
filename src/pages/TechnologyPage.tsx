import { CategoryPage } from "./ContentPages";

export function TechnologyPage() {
  return (
    <CategoryPage
      title="Tecnologia"
      summary="Encontre eletrônicos seguros, com a melhor relação entre qualidade, desempenho e inovação."
      image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Notebook aberto sobre uma mesa de trabalho"
      highlights={[
        {
          title: "Smartphones e acessórios",
          description: "Conectividade e praticidade para acompanhar seu ritmo.",
          image:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Smartphone sobre uma mesa",
        },
        {
          title: "Áudio e imagem",
          description: "Som envolvente e telas para transformar seus momentos.",
          image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Fones de ouvido modernos",
        },
        {
          title: "Casa inteligente",
          description:
            "Tecnologia que deixa a rotina mais simples e conectada.",
          image:
            "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Dispositivo inteligente em uma casa",
        },
        {
          title: "Trabalho e lazer",
          description:
            "Equipamentos para produzir, estudar e aproveitar melhor.",
          image:
            "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Notebook e acessórios em uma mesa",
        },
      ]}
    />
  );
}
