import { Logo } from "../../Logo";

export function Footer() {
  return (
    <div className="text-white w-full bg-navy p-4">
      <div className="md:max-w-[1200px] h-full mx-auto px-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2 w-[300px] border-white">
            <Logo location="footer" />
          </div>
          <div>
            <ul>
              <li>Institucional</li>
              <li>{" - "}</li>

              <li>Sobre nós</li>
              <li>Como funciona</li>
              <li>Política de privacidade</li>
              <li>Termos de uso</li>
              <li>Contato</li>
            </ul>
          </div>
          <div className="w-full">
            <ul>
              <li>Categorias</li>

              <li>Tecnologia</li>
              <li>Casa & Utilidades</li>
              <li>Moda</li>
              <li>Pets</li>
              <li>Produtos Digitais</li>
              <li>Ofertas</li>
            </ul>
          </div>
          <div className="w-full">
            <form>
              <h2>Newsletter</h2>
              <p>Receba dicas e ofertas exclusivas no seu e-mail</p>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-2 rounded-md text-navy bg-white"
              />
              <button
                type="submit"
                className="bg-green text-white px-4 py-2 rounded-md mt-2 hover:bg-green-dark transition-colors"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
