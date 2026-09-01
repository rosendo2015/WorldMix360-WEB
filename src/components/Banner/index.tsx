import ArrowRight from "../../assets/icons/arrow-right-bold.svg?react";
import ProdutosBunner from "../../assets/images/banner1.png";
import { Icon } from "../Icon";
export function Banner() {
  return (
    <div className="relative w-full min-h-[400px] bg-gradient-to-b from-navy to-blue overflow-hidden p-4">
      <div className="relative z-10 max-w-55">
        <h1 className="text-white text-4xl font-bold">
          Um mundo de
          <span className="font-bold text-green"> escolhas.</span>
        </h1>
        <p className="text-white mt-6 mb-6">
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
        className="z-0 absolute h-auto -bottom-6 right-0 opacity-80 max-w-[350px] md:max-w-[500px] lg:max-w-[500px] h-auto"
        src={ProdutosBunner}
        alt="produtos bunner"
      />
    </div>
  );
}
