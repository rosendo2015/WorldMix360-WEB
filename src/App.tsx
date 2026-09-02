import { v4 as uuidv4 } from "uuid";
import { Banner } from "./components/Banner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Session } from "./components/Session";

const FoneJBL = "/produtos/D_NQ_NP_2X_913023-MLA110131689717_042026-F.webp";
const Fone = "/produtos/D_NQ_NP_2X_966790-CBT91219370952_092025-F-fones-de-ouvido-atualizados-de-alta-resolucao-qcy-h3-pro-anc.webp";
const FoneSony = "/produtos/s-l960.webp";

const products = [
  {
    id: uuidv4(),
    image: FoneJBL,
    rating: 4.5,
    title:
      "Fone de Ouvido JBL Quantum 100M2 Gamer Over-ear com Microfone Removível para PS4 e PS5",
    price: 229.9,
    to: "https://www.mercadolivre.com.br/fone-de-ouvido-jbl-quantum-100m2-gamer-over-ear-com-microfone-removivel-para-ps4-e-ps5/p/MLB47044981?pdp_filters=deal%3AMLB1578289-1&extra_comm=false&brand_comm=false#polycard_client=affiliates&wid=MLB4590134133&sid=affiliates",
  },
  {
    id: uuidv4(),
    image: FoneSony,
    rating: 4,
    title: "Sony WH-CH510",
    price: 1199.9,
    to: "",
  },
  {
    id: uuidv4(),
    image: Fone,
    rating: 5,
    title: "Anker Soundcore Q30",
    price: 500.9,
    to: "",
  },
  {
    id: uuidv4(),
    image: Fone,
    rating: 5,
    title: "Anker Soundcore Q30",
    price: 500.9,
    to: "",
  },
];

export function App() {
  return (
    <div>
      <Header />
      <Banner />
      <Session title="Ofertas em destaque">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            rating={product.rating}
            to={product.to}
          />
        ))}
      </Session>
      <Session title="Produtos mais vendidos">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            price={product.price}
            title={product.title}
            rating={product.rating}
            to={product.to}
          />
        ))}
      </Session>
      <Footer></Footer>
    </div>
  );
}
