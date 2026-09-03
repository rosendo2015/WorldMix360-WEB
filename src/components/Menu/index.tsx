import { Link } from "react-router-dom";

import { menuItems } from "./items";

type MenuVariant = "header" | "footer";

interface MenuProps {
  variant?: MenuVariant;
  className?: string;
}

export function Menu({ variant = "header", className = "" }: MenuProps) {
  const isHeader = variant === "header";

  return (
    <nav
      className={[
        isHeader
          ? "hidden md:flex md:items-center md:justify-between md:gap-2 md:px-0 md:py-0 md:bg-transparent"
          : "mt-0 flex flex-col gap-1 text-sm text-white/80",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {menuItems.map(({ label, icon: Icon, href }) => (
        <Link
          key={label}
          to={href}
          className={[
            isHeader
              ? "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-[#071a2f] transition hover:text-[#0b3d66]"
              : "block text-left text-sm transition hover:text-white",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {!isHeader && <Icon className="hidden" />}
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
