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

export type MenuItem = {
  label: string;
  icon: IconType;
  href: string;
};

export const menuItems: MenuItem[] = [
  { label: "Tecnologia", icon: FiMonitor, href: "/tecnologia" },
  { label: "Casa & Utilidades", icon: FiTool, href: "/casa-utilidades" },
  { label: "Moda", icon: FiShoppingBag, href: "/moda" },
  { label: "Pets", icon: FiHeart, href: "/pets" },
  { label: "Produtos Digitais", icon: FiGrid, href: "/produtos-digitais" },
  { label: "Ofertas", icon: FiTag, href: "/ofertas" },
  { label: "Blog", icon: FiBookOpen, href: "/blog" },
];
