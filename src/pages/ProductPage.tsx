import { Link, useLocation, useParams } from "react-router-dom";

import { useMercadoLivre } from "../contexts/MercadoLivreContext";
import type { AffiliateProduct } from "../types/AffiliateProduct";

const marketplaceLabels: Record<AffiliateProduct["marketplace"], string> = {
  "mercado-livre": "Mercado Livre",
  amazon: "Amazon",
  shopee: "Shopee",
  outro: "Marketplace parceiro",
};

export function ProductPage() {
  const { id } = useParams();
  const location = useLocation();
  const { products } = useMercadoLivre();
  const stateProduct = (location.state as { product?: AffiliateProduct } | null)
    ?.product;
  const product = products.find((item) => item.id === id) ?? stateProduct;

  if (!product) {
    return (
      <section className="mx-auto max-w-[1200px] px-6 py-16">
        <h1 className="text-3xl font-bold text-[#071a2f]">
          Produto não encontrado
        </h1>
        <p className="mt-3 text-[#52657c]">
          Esse produto pode ter sido atualizado ou removido pelo marketplace.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-lg bg-[#1769e0] px-5 py-3 font-semibold text-white"
        >
          Voltar para a página inicial
        </Link>
      </section>
    );
  }

  const price = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-10 md:py-16">
      <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[#1769e0]">
          Início
        </Link>
        <span className="px-2">/</span>
        <span>Detalhes do produto</span>
      </nav>

      <div className="grid overflow-hidden rounded-[32px] border border-[#e7edf5] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.07)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[340px] items-center justify-center bg-[#f7f9fc] p-8 md:min-h-[520px] md:p-12">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[420px] w-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="mb-5 w-fit rounded-full bg-[#edf5ff] px-3 py-1 text-xs font-semibold text-[#0b3d66]">
            {marketplaceLabels[product.marketplace]}
          </span>
          <h1 className="text-3xl font-black leading-tight text-[#071a2f] md:text-4xl">
            {product.title}
          </h1>
          <div className="mt-8 border-y border-[#edf2f7] py-6">
            <p className="text-sm text-[#667085]">
              Preço apresentado no momento da consulta
            </p>
            <p className="mt-2 text-3xl font-black text-[#071a2f]">{price}</p>
          </div>
          <p className="mt-6 text-sm leading-6 text-[#52657c]">
            Você será direcionado ao site do marketplace parceiro para conferir
            disponibilidade, frete, avaliações e finalizar a compra.
          </p>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-[#20b35b] px-6 font-bold text-white transition hover:bg-[#159447]"
          >
            Ver oferta no {marketplaceLabels[product.marketplace]}
          </a>
          <p className="mt-4 text-xs text-[#667085]">
            Este é um link de afiliado. A compra é realizada diretamente no
            marketplace.
          </p>
        </div>
      </div>
    </section>
  );
}
