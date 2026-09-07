import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

import { useCategories } from "../../contexts/useCategories";
import { useSubcategories } from "../../contexts/useSubcategories";
import { getCategoryIcon } from "./items";

type MenuVariant = "header" | "footer" | "mobile";

interface MenuProps {
  variant?: MenuVariant;
  className?: string;
  onNavigate?: () => void;
}

export function Menu({
  variant = "header",
  className = "",
  onNavigate,
}: MenuProps) {
  const isHeader = variant === "header";
  const isMobile = variant === "mobile";

  const {
    categories,
    loading: categoriesLoading,
    fetchCategories,
  } = useCategories();

  const {
    subcategories,
    loading: subcategoriesLoading,
    fetchSubcategories,
  } = useSubcategories();

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  /*
   * ============================================================
   * CARREGAMENTO DAS CATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (categories.length === 0) {
      void fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  /*
   * ============================================================
   * CARREGAMENTO DAS SUBCATEGORIAS
   * ============================================================
   */

  useEffect(() => {
    if (subcategories.length === 0) {
      void fetchSubcategories();
    }
  }, [subcategories.length, fetchSubcategories]);

  /*
   * ============================================================
   * ESTRUTURA DINÂMICA DO MENU
   * ============================================================
   *
   * Categoria
   *   ├── Subcategoria
   *   ├── Subcategoria
   *   └── Subcategoria
   *
   * Somente categorias e subcategorias ativas são exibidas.
   */

  const menuCategories = useMemo(() => {
    return categories
      .filter((category) => category.active)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map((category) => ({
        id: category.id,
        label: category.name,
        slug: category.slug,
        icon: getCategoryIcon(category.slug),
        href: `/categoria/${category.slug}`,

        subcategories: subcategories
          .filter(
            (subcategory) =>
              subcategory.categoryId === category.id && subcategory.active,
          )
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((subcategory) => ({
            id: subcategory.id,
            label: subcategory.name,
            href: `/categoria/${category.slug}/${subcategory.slug}`,
          })),
      }));
  }, [categories, subcategories]);

  /*
   * ============================================================
   * FOOTER
   * ============================================================
   */

  if (variant === "footer") {
    return (
      <nav
        className={["mt-0 flex flex-col gap-1 text-sm text-white/80", className]
          .filter(Boolean)
          .join(" ")}
      >
        {menuCategories.map((category) => (
          <Link
            key={category.id}
            to={category.href}
            className="block text-left text-sm transition hover:text-white"
          >
            {category.label}
          </Link>
        ))}
      </nav>
    );
  }

  /*
   * ============================================================
   * LOADING
   * ============================================================
   */

  if (categoriesLoading || subcategoriesLoading) {
    /*
     * Loading mobile
     */

    if (isMobile) {
      return (
        <nav
          className={["flex flex-col gap-2", className]
            .filter(Boolean)
            .join(" ")}
        >
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
          <div className="h-11 animate-pulse rounded-lg bg-white/5" />
        </nav>
      );
    }

    /*
     * Loading desktop
     */

    return (
      <nav
        className={[
          "hidden md:flex md:items-center md:justify-start md:gap-2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-32 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
        <span className="h-8 w-20 animate-pulse rounded-full bg-slate-100" />
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU MOBILE
   * ============================================================
   */

  if (isMobile) {
    return (
      <nav
        className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}
      >
        {menuCategories.map((category) => {
          const Icon = category.icon;

          const isOpen = openCategory === category.id;

          const hasSubcategories = category.subcategories.length > 0;

          return (
            <div key={category.id}>
              {/* Categoria principal */}

              <div className="flex items-center rounded-lg transition hover:bg-white/5">
                <Link
                  to={category.href}
                  onClick={onNavigate}
                  className="flex min-w-0 flex-1 items-center gap-3 px-3 py-3 text-left text-base font-medium text-white/90"
                >
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <Icon className="text-base" />
                  </span>

                  <span className="truncate">{category.label}</span>
                </Link>

                {/* Botão das subcategorias */}

                {hasSubcategories && (
                  <button
                    type="button"
                    aria-label={
                      isOpen
                        ? `Recolher ${category.label}`
                        : `Expandir ${category.label}`
                    }
                    aria-expanded={isOpen}
                    onClick={() =>
                      setOpenCategory((current) =>
                        current === category.id ? null : category.id,
                      )
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center text-white/70 transition hover:text-white"
                  >
                    {isOpen ? <FiChevronDown /> : <FiChevronRight />}
                  </button>
                )}
              </div>

              {/* Subcategorias */}

              {isOpen && hasSubcategories && (
                <div className="ml-8 border-l border-white/10 pl-3">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      onClick={onNavigate}
                      className="block rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                    >
                      {subcategory.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    );
  }

  /*
   * ============================================================
   * MENU DESKTOP
   * ============================================================
   *
   * O submenu usa Tailwind group-hover.
   *
   * Isso evita onMouseEnter/onMouseLeave em elementos
   * estáticos e elimina o aviso do Biome:
   *
   * a11y/noStaticElementInteractions
   */

  return (
    <nav
      className={[
        isHeader
          ? "hidden md:flex md:items-center md:justify-start md:gap-2 md:px-0 md:py-0 md:bg-transparent"
          : "flex flex-col gap-1 text-sm",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {menuCategories.map((category) => {
        const Icon = category.icon;

        const hasSubcategories = category.subcategories.length > 0;

        return (
          <div key={category.id} className="group relative">
            {/* Categoria principal */}

            <Link
              to={category.href}
              className={[
                isHeader
                  ? "flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#071a2f] transition hover:bg-slate-50 hover:text-[#0b3d66]"
                  : "block text-left text-sm transition hover:text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {variant !== "header" && <Icon className="mr-2 inline-block" />}

              <span>{category.label}</span>

              {hasSubcategories && isHeader && (
                <FiChevronDown className="text-xs transition-transform group-hover:rotate-180" />
              )}
            </Link>

            {/* ==================================================
                SUBMENU DESKTOP
            ================================================== */}

            {isHeader && hasSubcategories && (
              <div className="absolute left-1/2 top-full z-50 hidden min-w-[250px] -translate-x-1/2 pt-3 group-hover:block">
                <div className="overflow-hidden rounded-2xl border border-[#e7edf5] bg-white p-2 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                  {/* Link para a categoria */}

                  <Link
                    to={category.href}
                    className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
                  >
                    Ver {category.label}
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  {/* Subcategorias */}

                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={subcategory.href}
                      className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      <span>{subcategory.label}</span>

                      <FiChevronRight className="text-xs text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
