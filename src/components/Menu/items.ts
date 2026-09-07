import type { IconType } from "react-icons";
import {
  FiBookOpen,
  FiGrid,
  FiHeart,
  FiMonitor,
  FiShoppingBag,
  FiTag,
  FiTool,
} from "react-icons/fi";

export type MenuCategory = {
  label: string;
  icon: IconType;
  href: string;
  slug: string;
};

export type MenuItem = MenuCategory & {
  subcategories: Array<{
    id: string;
    label: string;
    href: string;
  }>;
};

/**
 * Ícone padrão para categorias.
 *
 * O slug é usado para manter os ícones atuais
 * mesmo com as categorias vindo da API.
 */
export function getCategoryIcon(slug: string): IconType {
  const normalizedSlug = slug.toLowerCase();

  if (normalizedSlug.includes("tecnologia")) {
    return FiMonitor;
  }

  if (normalizedSlug.includes("casa") || normalizedSlug.includes("utilidade")) {
    return FiTool;
  }

  if (normalizedSlug.includes("moda")) {
    return FiShoppingBag;
  }

  if (normalizedSlug.includes("pet")) {
    return FiHeart;
  }

  if (
    normalizedSlug.includes("digital") ||
    normalizedSlug.includes("produto-digital")
  ) {
    return FiGrid;
  }

  if (normalizedSlug.includes("oferta")) {
    return FiTag;
  }

  if (normalizedSlug.includes("blog")) {
    return FiBookOpen;
  }

  return FiGrid;
}
