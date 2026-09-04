import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      await signIn(email, password);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível realizar o login.",
      );
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Entrar</h1>
          <p className="mt-2 text-sm text-gray-500">
            Acesse sua conta WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="seu@email.com"
              autoComplete="email"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Sua senha"
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-gray-500 px-4 py-3 outline-none transition focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#1769e0] px-5 py-3 font-bold text-white transition hover:bg-[#0f56bd] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Ainda não possui uma conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </section>
  );
}
