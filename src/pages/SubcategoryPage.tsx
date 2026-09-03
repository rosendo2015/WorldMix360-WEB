import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { ProductCard } from "../components/ProductCard";
import { useMercadoLivre } from "../contexts/MercadoLivreContext";
import type { AffiliateProduct } from "../types/AffiliateProduct";

type SubcategoryData = {
  title: string;
  category: string;
  query: string;
  description: string;
  image: string;
  imageAlt: string;
};

const subcategories: Record<string, SubcategoryData> = {
  "smartphones-acessorios": {
    title: "Smartphones e acessórios",
    category: "Tecnologia",
    query: "smartphone acessórios",
    description:
      "Encontre celulares, capas, carregadores e acessórios para acompanhar sua rotina.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Smartphone sobre uma mesa",
  },
  "audio-imagem": {
    title: "Áudio e imagem",
    category: "Tecnologia",
    query: "fone de ouvido caixa de som",
    description:
      "Explore opções para ouvir, assistir e transformar seus momentos de entretenimento.",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Fones de ouvido modernos",
  },
  "casa-inteligente": {
    title: "Casa inteligente",
    category: "Tecnologia",
    query: "casa inteligente automação",
    description:
      "Conheça dispositivos conectados que trazem mais praticidade para sua casa.",
    image:
      "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Dispositivo inteligente em uma casa",
  },
  "trabalho-lazer": {
    title: "Trabalho e lazer",
    category: "Tecnologia",
    query: "notebook acessórios informática",
    description:
      "Equipamentos e acessórios para produzir, estudar e aproveitar melhor seu tempo.",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Notebook e acessórios em uma mesa",
  },
  "organizacao-domestica": {
    title: "Organização doméstica",
    category: "Casa & Utilidades",
    query: "organização doméstica",
    description:
      "Soluções para aproveitar cada espaço e deixar a rotina mais leve.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Ambiente doméstico organizado",
  },
  decoracao: {
    title: "Decoração",
    category: "Casa & Utilidades",
    query: "decoração casa",
    description:
      "Detalhes que ajudam a transformar sua casa em um ambiente mais acolhedor.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Sala com decoração contemporânea",
  },
  "utilidades-essenciais": {
    title: "Utilidades essenciais",
    category: "Casa & Utilidades",
    query: "utilidades domésticas cozinha",
    description:
      "Itens práticos para resolver as tarefas do dia a dia com mais facilidade.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Utensílios em uma cozinha",
  },
  "conforto-rotina": {
    title: "Conforto para a rotina",
    category: "Casa & Utilidades",
    query: "conforto casa quarto",
    description:
      "Escolhas simples para tornar seus momentos em casa ainda mais agradáveis.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Quarto confortável e iluminado",
  },
  "roupas-calcados": {
    title: "Roupas e calçados",
    category: "Moda",
    query: "roupas calçados",
    description:
      "Peças para expressar seu estilo com conforto em diferentes ocasiões.",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Roupas organizadas em uma arara",
  },
  acessorios: {
    title: "Acessórios",
    category: "Moda",
    query: "acessórios moda",
    description: "Os detalhes que dão personalidade a cada produção.",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Acessórios de moda",
  },
  "casual-elegante": {
    title: "Casual e elegante",
    category: "Moda",
    query: "moda casual elegante",
    description: "Combinações versáteis para todos os seus planos.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Pessoa escolhendo roupas em uma loja",
  },
  "estilo-diario": {
    title: "Estilo diário",
    category: "Moda",
    query: "look casual feminino masculino",
    description:
      "Inspirações práticas para vestir sua melhor versão todos os dias.",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Look casual de moda",
  },
  "cuidados-higiene": {
    title: "Cuidados e higiene",
    category: "Pets",
    query: "cuidados higiene pet",
    description:
      "Produtos para cuidar do bem-estar do seu companheiro com carinho.",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cachorro recebendo cuidados",
  },
  "brinquedos-diversao": {
    title: "Brinquedos e diversão",
    category: "Pets",
    query: "brinquedos pet cachorro gato",
    description: "Mais estímulo, alegria e momentos especiais juntos.",
    image:
      "https://images.unsplash.com/photo-1535294435445-d7249524ef2e?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cachorro brincando ao ar livre",
  },
  "acessorios-pets": {
    title: "Acessórios para pets",
    category: "Pets",
    query: "acessórios pet",
    description: "Conforto e praticidade para passeios e momentos em casa.",
    image:
      "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cachorro usando acessório",
  },
  "rotina-pet": {
    title: "Rotina pet",
    category: "Pets",
    query: "produtos rotina pet",
    description: "Tudo para deixar o dia do seu companheiro mais completo.",
    image:
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Cachorros juntos em um parque",
  },
  "cursos-conteudos": {
    title: "Cursos e conteúdos",
    category: "Produtos Digitais",
    query: "cursos online",
    description: "Aprenda no seu ritmo e amplie suas possibilidades.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Pessoa estudando em um notebook",
  },
  "software-utilitarios": {
    title: "Software e utilitários",
    category: "Produtos Digitais",
    query: "software utilitários licença",
    description: "Ferramentas digitais para resolver mais com menos esforço.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Código em uma tela de computador",
  },
  produtividade: {
    title: "Produtividade",
    category: "Produtos Digitais",
    query: "produtividade software",
    description: "Organize ideias, projetos e tarefas em um só lugar.",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Mesa de trabalho organizada",
  },
  "entretenimento-digital": {
    title: "Entretenimento digital",
    category: "Produtos Digitais",
    query: "jogos digitais streaming",
    description: "Novas experiências para relaxar e se divertir.",
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=85",
    imageAlt: "Controle de videogame e televisão",
  },
};

function normalizeSlug(value: string) {
  return value.replace(/-e-/g, "-");
}

function createFallbackProducts(data: SubcategoryData, slug: string) {
  const productTypes = [
    "Seleção essencial",
    "Opção mais procurada",
    "Escolha premium",
    "Alternativa para sua rotina",
  ];

  return productTypes.map<AffiliateProduct>((productType, index) => ({
    id: `fallback-${slug}-${index}`,
    title: `${data.title} - ${productType}`,
    image: data.image,
    price: [89.9, 149.9, 249.9, 399.9][index],
    rating: 4.5,
    marketplace: "mercado-livre",
    affiliateUrl: `https://lista.mercadolivre.com.br/${encodeURIComponent(data.query)}`,
    category: data.category,
  }));
}

export function SubcategoryPage() {
  const { subcategory } = useParams();
  const { products, loading, error, search } = useMercadoLivre();
  const data = subcategory
    ? (subcategories[subcategory] ?? subcategories[normalizeSlug(subcategory)])
    : undefined;
  const fallbackProducts = data
    ? createFallbackProducts(data, subcategory ?? "subcategoria")
    : [];

  useEffect(() => {
    if (data) void search(data.query);
  }, [data, search]);

  const visibleProducts =
    products.length >= 4
      ? products
      : [...products, ...fallbackProducts].slice(0, 4);

  if (!data) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          Subcategoria não encontrada
        </h1>
        <Link to="/" className="mt-4 inline-block font-semibold text-[#1769e0]">
          Voltar para a página inicial
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-14">
      <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[#1769e0]">
          Início
        </Link>
        <span className="px-2">/</span>
        <span>{data.category}</span>
      </nav>

      <div className="mb-10 grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)] md:grid-cols-[1fr_0.85fr]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#0b3d66]">
            Seleção de produtos
          </p>
          <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#52657c]">
            {data.description}
          </p>
          <p className="mt-5 text-xs text-[#667085]">
            Produtos apresentados por marketplaces parceiros. A compra acontece
            no site do anunciante.
          </p>
        </div>
        <div className="relative min-h-[240px] overflow-hidden md:min-h-[320px]">
          <img
            src={data.image}
            alt={data.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a2f]/20 to-transparent" />
        </div>
      </div>

      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Ofertas encontradas
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#071a2f]">
            Escolha o que combina com você
          </h2>
        </div>
        <span className="hidden text-sm text-[#52657c] sm:inline">
          Links patrocinados identificados
        </span>
      </div>

      {loading && (
        <p className="py-10 text-sm text-[#52657c]">Buscando produtos...</p>
      )}
      {error && <p className="py-4 text-sm text-red-600">{error}</p>}
      {error && (
        <p className="mb-4 text-xs text-[#667085]">
          Exibindo sugestões da categoria enquanto a busca é atualizada.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
