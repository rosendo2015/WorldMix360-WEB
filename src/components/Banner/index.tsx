import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import ProdutosBunner from "../../assets/images/banner1.png";
import { Icon } from "../Icon";
export function Banner() {
  return (
    <div className="w-full h-[500px] md:h-[600px] bg-gradient-to-b from-navy to-blue overflow-hidden">
      <div className="relative md:max-w-[1200px] h-full mx-auto px-10 ">
        <div className="mt-8 max-w-100 h-full md:max-w-2xl lg:max-w-3xl">
          <h1 className="text-white text-4xl font-bold md:text-5xl lg:text-6xl">
            Um mundo de
            <span className="font-bold text-green"> escolhas.</span>
          </h1>
          <p className="text-white mt-6 mb-6 md:text-2xl lg:text-3xl">
            As melhores recomendações dos principais marketplaces em um só lugar
            para você
          </p>
          <a
            href="##"
            className="flex  items-center justify-center  gap-2 bg-green px-4 py-2 rounded-lg text-white font-bold w-[170px] cursor-pointer"
          >
            VER OFERTAS <Icon svg={ArrowRight} className="fill-white w-5 h-5" />
          </a>
        </div>
        <img
          className="z-0 absolute -bottom-4 right-0 opacity-80 max-w-[500px] md:max-w-[800px] lg:max-w-[900px] h-auto"
          src={ProdutosBunner}
          alt="produtos bunner"
        />
      </div>
    </div>
  );
}
