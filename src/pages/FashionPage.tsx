import { CategoryPage } from "./ContentPages";

export function FashionPage() {
  return (
    <CategoryPage
      title="Moda"
      summary="Estilo, conforto e tendências em escolhas práticas para todas as ocasiões."
      image="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Araras com roupas em uma loja de moda"
      highlights={[
        {
          title: "Roupas e calçados",
          description: "Peças para expressar seu estilo com conforto.",
          image:
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Roupas organizadas em uma arara",
        },
        {
          title: "Acessórios",
          description: "Os detalhes que dão personalidade a cada produção.",
          image:
            "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Acessórios de moda",
        },
        {
          title: "Casual e elegante",
          description: "Combinações versáteis para todos os seus planos.",
          image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa escolhendo roupas em uma loja",
        },
        {
          title: "Estilo diário",
          description: "Inspirações práticas para vestir sua melhor versão.",
          image:
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Look casual de moda",
        },
      ]}
    />
  );
}
