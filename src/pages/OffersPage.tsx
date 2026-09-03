import { CategoryPage } from "./ContentPages";

export function OffersPage() {
  return (
    <CategoryPage
      title="Ofertas"
      summary="Confira oportunidades selecionadas com bom custo-benefício e qualidade em destaque."
      image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Sacolas de compras representando uma experiência de varejo"
      highlights={[
        {
          title: "Promoções selecionadas",
          description: "Oportunidades que merecem entrar no seu radar.",
          image:
            "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sacolas de compras em uma loja",
        },
        {
          title: "Economia inteligente",
          description: "Compare antes de comprar e faça escolhas melhores.",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa fazendo uma compra online",
        },
        {
          title: "Produtos em alta",
          description: "Descubra o que está chamando a atenção agora.",
          image:
            "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Pessoa segurando uma sacola de compras",
        },
        {
          title: "Valores competitivos",
          description: "Boas oportunidades para aproveitar com confiança.",
          image:
            "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Interior de uma loja com produtos",
        },
      ]}
    />
  );
}
