import { CategoryPage } from "./ContentPages";

export function HomeUtilitiesPage() {
  return (
    <CategoryPage
      title="Casa & Utilidades"
      summary="Itens para organização, conforto e praticidade em todos os momentos da sua rotina."
      image="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Cozinha organizada e iluminada"
      highlights={[
        {
          title: "Organização doméstica",
          description: "Soluções para aproveitar cada espaço com leveza.",
          image:
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Ambiente doméstico organizado",
        },
        {
          title: "Decoração",
          description: "Detalhes que deixam a casa mais bonita e acolhedora.",
          image:
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Sala com decoração contemporânea",
        },
        {
          title: "Utilidades essenciais",
          description:
            "Itens práticos para resolver o dia a dia com facilidade.",
          image:
            "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Utensílios em uma cozinha",
        },
        {
          title: "Conforto para a rotina",
          description:
            "Escolhas simples para tornar seus momentos mais agradáveis.",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
          imageAlt: "Quarto confortável e iluminado",
        },
      ]}
    />
  );
}
