import { FiBox } from "react-icons/fi"; // exemplo de ícone

interface SessionProps {
  children: React.ReactNode;
}
export function Session({ children }: SessionProps) {
  return (
    <section className="w-full bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-md">
      {/* Cabeçalho */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FiBox className="text-white text-xl" />
          <h2 className="text-blue text-lg font-bold">Produtos</h2>
        </div>
        <a href="##" className="text-sm font-medium text-navy hover:underline">
          Ver todos
        </a>
      </header>

      {/* Área central para os cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {children}
      </div>
    </section>
  );
}
