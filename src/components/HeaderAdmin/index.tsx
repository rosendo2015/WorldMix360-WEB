import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";

export function HeaderAdmin() {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    closeMenu();
    signOut();
  };

  return (
    <>
      <header className="w-full bg-gray-900 text-white px-4 md:px-6 py-4 flex justify-between items-center">
        {/* Logo / título */}
        <Link
          to="/admin/dashboard"
          className="text-lg font-bold hover:text-blue-300 transition-colors"
          onClick={closeMenu}
        >
          Painel Administrativo
        </Link>

        {/* Menu desktop */}
        <nav className="hidden md:flex items-center gap-5">
          <Link
            to="/admin/dashboard"
            className={`transition-colors ${
              isActive("/admin/dashboard")
                ? "text-blue-300"
                : "hover:text-blue-300"
            }  md:hidden`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/products"
            className={`transition-colors ${
              isActive("/admin/products")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Produtos
          </Link>

          <Link
            to="/admin/categories"
            className={`transition-colors ${
              isActive("/admin/categories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Categorias
          </Link>

          <Link
            to="/admin/subcategories"
            className={`transition-colors ${
              isActive("/admin/subcategories")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Subcategorias
          </Link>

          <Link
            to="/admin/marketplaces"
            className={`transition-colors ${
              isActive("/admin/marketplaces")
                ? "text-blue-300"
                : "hover:text-blue-300"
            } md:hidden`}
          >
            Marketplaces
          </Link>

          <span className="text-sm text-gray-300">Olá, {user?.name}</span>

          <button
            type="button"
            onClick={handleSignOut}
            className="bg-danger px-3 py-1.5 rounded text-sm hover:bg-red-500 transition-colors"
          >
            Sair
          </button>
        </nav>

        {/* Área mobile */}
        <div className="flex md:hidden items-center gap-3">
          <span className="text-sm text-gray-300 max-w-24 truncate">
            {user?.name}
          </span>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 rounded hover:bg-gray-800 transition-colors"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />

            <span
              className={`block w-6 h-0.5 bg-white transition-transform ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Overlay mobile */}
      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Menu lateral mobile */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-gray-900 text-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-700">
          <div>
            <p className="font-bold">WorldMix360</p>
            <p className="text-sm text-gray-400">Painel Administrativo</p>
          </div>

          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="text-gray-300 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="text-sm text-gray-400 mb-4">Olá, {user?.name}</p>

          <nav className="flex flex-col gap-2">
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/dashboard")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/products"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/products")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Produtos
            </Link>

            <Link
              to="/admin/categories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/categories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Categorias
            </Link>

            <Link
              to="/admin/subcategories"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/subcategories")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Subcategorias
            </Link>

            <Link
              to="/admin/marketplaces"
              onClick={closeMenu}
              className={`px-4 py-3 rounded-lg transition-colors ${
                isActive("/admin/marketplaces")
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-800"
              }`}
            >
              Marketplaces
            </Link>
          </nav>

          <div className="border-t border-gray-700 mt-6 pt-6">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full bg-red-600 px-4 py-3 rounded-lg text-sm font-medium hover:bg-red-500 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
