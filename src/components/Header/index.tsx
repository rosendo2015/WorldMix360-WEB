import MenuIcon from "../../assets/Icons/menuIcon.svg?react";
import SearchIcon from "../../assets/Icons/searchIcon.svg?react";
import Logo from "../../assets/images/WorldMix360-logo.png";
import { Icon } from "../Icon";

export function Header() {
  return (
    <header className="flex items-center justify-between mx-auto w-full md:max-w-[1200px] p-6">
      <button type="button" aria-label="Abrir menu">
        <Icon svg={MenuIcon} size="md" />
      </button>
      <div className="flex flex-row items-center gap-3">
        <img src={Logo} alt="Logo WorldMix360" className="w-16 h-16" />
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row  md:items-baseline md:gap-0.5">
            <span className="text-navy text-3xl font-bold leading-tight">
              WORLD
            </span>
            <div className="flex space-x-2 md:ml-1">
              <span className="text-blue text-3xl font-bold leading-3">
                MIX
              </span>
              <span className="text-green text-3xl font-bold leading-3">
                360
              </span>
            </div>
          </div>

          <p className="text-green-dark text-sm leading-5 mt-2 md:mt-0">
            Um mundo de escolhas.
          </p>
        </div>
      </div>

      <button type="button" aria-label="Pesquisar">
        <Icon svg={SearchIcon} size="md" />
      </button>
    </header>
  );
}
