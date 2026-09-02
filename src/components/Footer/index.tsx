import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { Logo } from "../../Logo";

export function Footer() {
  return (
    <footer className="text-white w-full bg-navy p-6">
      <div className="md:max-w-[1200px] mx-auto px-6">
        {/* Grid responsiva */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          {/* Logo */}
          <div className="flex max-w-[290px] flex-col gap-2">
            <Logo location="footer" />
            {/* Redes sociais */}
            <div className="flex items-center mt-3 justify-between max-w-[220px]">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-white hover:text-yellow text-4xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTwitterXLine className="text-white hover:text-blue text-4xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-white hover:text-gray-500 text-4xl" />
              </a>
            </div>
          </div>

          {/* Institucional */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Institucional</h3>
            <ul className="space-y-1 text-sm">
              <li>Sobre nós</li>
              <li>Como funciona</li>
              <li>Política de privacidade</li>
              <li>Termos de uso</li>
              <li>Contato</li>
            </ul>
          </div>

          {/* Categorias */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Categorias</h3>
            <ul className="space-y-1 text-sm">
              <li>Tecnologia</li>
              <li>Casa & Utilidades</li>
              <li>Moda</li>
              <li>Pets</li>
              <li>Produtos Digitais</li>
              <li>Ofertas</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-semibold mb-2">Newsletter</h3>
            <p className="text-sm mb-2">
              Receba dicas e ofertas exclusivas no seu e-mail
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-2 rounded-md text-navy bg-white"
              />
              <button
                type="submit"
                className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-dark transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-6 pt-4 text-center text-sm text-gray-300">
        © 2026 WorldMix360 – Todos os direitos reservados.
      </div>
    </footer>
  );
}
