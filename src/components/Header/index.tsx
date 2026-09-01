import MenuIcon from "../../assets/Icons/menuIcon.svg?react";
import SearchIcon from "../../assets/Icons/searchIcon.svg?react";
import { Logo } from "../../Logo";

import { Icon } from "../Icon";

export function Header() {
  return (
    <header className="flex items-center justify-between mx-auto w-full md:max-w-[1200px] p-6">
      <button type="button" aria-label="Abrir menu">
        <Icon svg={MenuIcon} size="md" />
      </button>
      <Logo />
      <button type="button" aria-label="Pesquisar">
        <Icon svg={SearchIcon} size="md" />
      </button>
    </header>
  );
}
