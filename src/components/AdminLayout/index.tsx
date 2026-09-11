import { NavLink, Outlet } from "react-router-dom";

import { HeaderAdmin } from "../HeaderAdmin";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Produtos",
    href: "/admin/products",
  },
  {
    label: "Categorias",
    href: "/admin/categories",
  },
  {
    label: "Subcategorias",
    href: "/admin/subcategories",
  },
  {
    label: "Marketplaces",
    href: "/admin/marketplaces",
  },
  {
    label: "Blog",
    href: "/admin/blog",
  },
];

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#071a2f]">
      {" "}
      <HeaderAdmin />
      <div className="flex min-h-[calc(100vh-72px)]">
        <aside className="hidden w-64 shrink-0 border-r border-[#e7edf5] bg-white lg:block">
          <div className="sticky top-0 p-4">
            <div className="mb-5 px-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8a9bb0]">
                Administração
              </p>

              <p className="mt-1 text-sm text-[#52657c]">Gerencie o catálogo</p>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    [
                      "flex items-center rounded-xl px-4 py-3 text-sm font-semibold transition",
                      isActive
                        ? "bg-[#edf5ff] text-[#1769e0]"
                        : "text-[#52657c] hover:bg-[#f5f8fc] hover:text-[#071a2f]",
                    ].join(" ")
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
