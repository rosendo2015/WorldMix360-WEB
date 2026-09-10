import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import MenuIcon from "../../assets/Icons/menuIcon.svg?react";
import SearchIcon from "../../assets/Icons/searchIcon.svg?react";

import { useAuth } from "../../contexts/useAuth";

import { Icon } from "../Icon";
import { Logo } from "../Logo";
import { Menu } from "../Menu";
import { SearchBar } from "../SearchBar";

export function Header() {
  const { user, signOut } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /*
   * ============================================================
   * FECHAR PESQUISA AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isSearchOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  /*
   * ============================================================
   * FECHAR MENU MOBILE AO CLICAR FORA
   * ============================================================
   */
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full border-b-2 border-blue/20">
      <header className="relative mx-auto w-full px-6 py-10 md:max-w-[1200px] md:py-5">
        {/* ======================================================
            HEADER PRINCIPAL
        ====================================================== */}

        <div className="flex items-center justify-between md:min-h-[60px] md:gap-6">
          {/* ====================================================
              BOTÃO MENU MOBILE
          ==================================================== */}

          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={isMenuOpen}
            onClick={() => {
              setIsMenuOpen((prev) => !prev);
              setIsSearchOpen(false);
            }}
            className="block md:hidden"
          >
            <Icon svg={MenuIcon} size="md" />
          </button>

          {/* ====================================================
              LOGO
          ==================================================== */}

          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:items-center"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Voltar para a página inicial"
          >
            <Logo />
          </Link>

          {/* ====================================================
              BOTÃO PESQUISA MOBILE
          ==================================================== */}

          {!isSearchOpen && (
            <button
              type="button"
              aria-label="Pesquisar"
              aria-expanded={isSearchOpen}
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                setIsMenuOpen(false);
              }}
              className="ml-auto block md:hidden"
            >
              <Icon svg={SearchIcon} size="md" />
            </button>
          )}

          {/* ====================================================
              ÁREA DESKTOP
          ==================================================== */}

          <div className="hidden w-full max-w-[58%] items-center justify-end gap-4 md:flex">
            {/* Pesquisa */}

            <SearchBar className="w-full" />

            {/* ==================================================
                AUTENTICAÇÃO
            ================================================== */}

            {user ? (
              <div className="flex shrink-0 items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Olá,</p>

                  <p className="max-w-[120px] truncate text-sm font-semibold text-navy">
                    {user.name}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-navy transition hover:bg-gray-50"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex shrink-0 items-center rounded-lg bg-[#1769e0] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#0f56bd]"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>

        {/* ======================================================
            MENU DESKTOP
        ====================================================== */}

        <div className="mt-3 hidden md:block">
          <Menu variant="header" />
        </div>

        {/* ======================================================
            PESQUISA MOBILE
        ====================================================== */}

        {isSearchOpen && (
          <div
            ref={searchRef}
            className="mt-10 flex items-center gap-2 md:hidden"
          >
            <SearchBar className="flex-1" />

            <button
              type="button"
              aria-label="Fechar pesquisa"
              onClick={() => setIsSearchOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-100 bg-white text-lg text-gray-700"
            >
              ×
            </button>
          </div>
        )}

        {/* ======================================================
            MENU MOBILE
        ====================================================== */}

        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-[#071a2f]/60 md:hidden">
            <div
              ref={menuRef}
              className="h-full w-[85%] max-w-[360px] overflow-y-auto bg-[#071a2f] px-5 py-6 text-white"
            >
              {/* ==================================================
                  CABEÇALHO DO MENU MOBILE
              ================================================== */}

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-lg font-bold">
                    W
                  </div>

                  <div>
                    <p className="text-xl font-bold leading-none">WORLD</p>

                    <p className="text-lg font-bold leading-none">MIX 360</p>
                  </div>
                </div>

                <button
                  type="button"
                  aria-label="Fechar menu"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light text-white"
                >
                  ×
                </button>
              </div>

              {/* ==================================================
                  PESQUISA MOBILE DO MENU
              ================================================== */}

              <div className="mb-5">
                <SearchBar
                  className="[&_input]:border-white/10 [&_input]:bg-white/5 [&_input]:text-white [&_input]:placeholder:text-white/60"
                  onSearch={() => setIsMenuOpen(false)}
                />
              </div>

              {/* ==================================================
                  AUTENTICAÇÃO MOBILE
              ================================================== */}

              <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-4">
                {user ? (
                  <div>
                    <p className="text-xs text-white/60">Olá,</p>

                    <p className="mt-1 truncate text-base font-bold text-white">
                      {user.name}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                      className="mt-3 text-sm font-semibold text-white/80 hover:text-white"
                    >
                      Sair
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded-lg bg-[#1769e0] px-4 py-3 text-center text-sm font-bold text-white"
                  >
                    Entrar
                  </Link>
                )}
              </div>

              {/* ==================================================
                  MENU DINÂMICO

                  Agora categorias e subcategorias vêm da API.
              ================================================== */}

              <Menu variant="mobile" onNavigate={() => setIsMenuOpen(false)} />

              {/* ==================================================
                  LINKS INSTITUCIONAIS
              ================================================== */}

              <div className="mt-8 border-t border-white/10 pt-5 text-sm text-white/70">
                <Link
                  to="/sobre"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Sobre nós
                </Link>

                <Link
                  to="/contato"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Contato
                </Link>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Política de Privacidade
                </button>

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-left"
                >
                  Termos de Uso
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
