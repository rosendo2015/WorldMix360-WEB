import { Link } from "react-router-dom";

export function ProductBreadcrumb() {
  return (
    <nav className="mb-6 text-sm text-[#52657c]" aria-label="Breadcrumb">
      <Link to="/" className="transition hover:text-[#1769e0]">
        Início
      </Link>

      <span className="px-2">/</span>

      <span>Detalhes do produto</span>
    </nav>
  );
}
