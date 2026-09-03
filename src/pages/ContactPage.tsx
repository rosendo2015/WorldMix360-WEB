import { FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function ContactPage() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-[#071a2f] md:text-5xl">
          Fale com a WorldMix360
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#52657c]">
          Estamos prontos para ajudar com dúvidas, suporte, parceiros e
          oportunidades de negócio.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:items-start">
        <aside className="rounded-[28px] bg-[#071a2f] p-8 text-white shadow-[0_24px_60px_rgba(7,26,47,0.16)]">
          <div className="mb-6 overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85"
              alt="Equipe reunida para atender e conversar com clientes"
              className="h-44 w-full object-cover"
            />
          </div>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7dd3fc]">
              Atendimento
            </p>
            <h2 className="mt-2 text-2xl font-bold">Fale conosco</h2>
          </div>

          <div className="space-y-5 text-sm text-white/80">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaPhoneAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>(11) 4002-8922</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <MdEmail className="mt-1 text-base text-[#7dd3fc]" />
              <span>contato@worldmix360.com.br</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaMapMarkerAlt className="mt-1 text-base text-[#7dd3fc]" />
              <span>Av. Paulista, 1500 - Bela Vista, São Paulo - SP</span>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <FaInstagram className="mt-1 text-base text-[#7dd3fc]" />
              <span>@worldmix360</span>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#1e3553] bg-[#0d1f37] p-4">
            <p className="text-sm font-medium text-[#dfe9f6]">
              Tempo médio de resposta
            </p>
            <p className="mt-1 text-2xl font-bold text-white">24 horas</p>
          </div>
        </aside>

        <form className="rounded-[28px] border border-[#dfe7f3] bg-white p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
              Envie uma mensagem
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#071a2f]">
              Solicite atendimento
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              Nome
              <input
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
              E-mail
              <input
                type="email"
                placeholder="seu@email.com"
                className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
              />
            </label>
          </div>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Assunto
            <input
              type="text"
              placeholder="Qual o motivo do contato?"
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#071a2f]">
            Mensagem
            <textarea
              rows={6}
              placeholder="Escreva sua mensagem..."
              className="rounded-xl border border-[#dfe7f3] bg-[#f7f9fc] px-4 py-3 text-sm text-[#071a2f] outline-none transition placeholder:text-[#7a8596] focus:border-[#0b3d66] focus:bg-white"
            />
          </label>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#edf2f7] pt-5 md:flex-row md:items-center">
            <p className="text-xs text-[#52657c]">
              Respeitamos sua privacidade e respondemos em até 24 horas.
            </p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#0b3d66] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#072b49]"
            >
              Enviar mensagem
            </button>
          </div>
        </form>
      </div>

      <div className="mt-10 rounded-[28px] border border-[#e7edf5] bg-[#f7f9fc] p-6 md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#0b3d66]">
            Atendimento em etapas
          </p>
          <h2 className="text-2xl font-bold text-[#071a2f]">
            Do primeiro contato à solução
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            [
              "01",
              "Você envia",
              "Conte o que precisa de forma rápida e objetiva.",
            ],
            [
              "02",
              "Nós analisamos",
              "Entendemos sua solicitação e buscamos o melhor caminho.",
            ],
            ["03", "Você recebe", "Respondemos com clareza e próximos passos."],
          ].map(([number, title, description]) => (
            <div
              key={number}
              className="relative rounded-2xl border border-[#dfe7f3] bg-white p-5"
            >
              <span className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#dfeeff] text-xs font-bold text-[#0b3d66]">
                {number}
              </span>
              <h3 className="mb-2 font-bold text-[#071a2f]">{title}</h3>
              <p className="text-sm leading-6 text-[#52657c]">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
