import { InfoPage } from "./ContentPages";

export function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Política de privacidade"
      intro="Seus dados são tratados com responsabilidade, transparência e segurança."
      image="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=85"
      imageAlt="Pessoa usando um notebook para acessar uma conta protegida"
      visualTitle="Como cuidamos das suas informações"
      visualItems={[
        { label: "Transparência", value: "Clareza", level: 100 },
        { label: "Necessidade", value: "Minimização", level: 72 },
        { label: "Proteção", value: "Boas práticas", level: 88 },
      ]}
      sections={[
        {
          title: "Coleta de dados",
          content:
            "Coletamos apenas informações necessárias para atender sua navegação, comunicação e pedidos.",
        },
        {
          title: "Uso dos dados",
          content:
            "Usamos dados para melhorar sua experiência, oferecer suporte e enviar comunicações relevantes.",
        },
        {
          title: "Segurança e seus direitos",
          content:
            "Aplicamos boas práticas para proteger informações sensíveis e respeitamos seus direitos previstos na legislação aplicável.",
        },
      ]}
    />
  );
}
