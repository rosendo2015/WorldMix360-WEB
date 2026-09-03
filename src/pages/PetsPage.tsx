import { CategoryPage } from "./ContentPages";

export function PetsPage() {
  return (
    <CategoryPage
      title="Pets"
      summary="Produtos pensados para o bem-estar, a saúde e a diversão dos seus animais."
      image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cachorro e gato juntos em um ambiente doméstico"
      highlights={[
        {
          title: "Cuidados e higiene",
          description: "Bem-estar e carinho em todos os detalhes.",
          image:
            "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro recebendo cuidados",
        },
        {
          title: "Brinquedos e diversão",
          description: "Mais estímulo, alegria e momentos juntos.",
          image:
            "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro brincando ao ar livre",
        },
        {
          title: "Acessórios para pets",
          description: "Conforto e praticidade para cada passeio.",
          image:
            "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorro usando acessório",
        },
        {
          title: "Rotina pet",
          description: "Tudo para deixar o dia do seu companheiro melhor.",
          image:
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Cachorros juntos em um parque",
        },
      ]}
    />
  );
}
