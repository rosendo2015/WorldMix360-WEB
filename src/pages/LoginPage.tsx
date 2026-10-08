// src/pages/LoginPage.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { FormErrorMessage, FormInput } from "../components/FormControls";
import { useAuth } from "../contexts/useAuth";

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn, isLoading } = useAuth(); // agora pegamos também o user

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    try {
      const loggedUser = await signIn(email, password);

      if (loggedUser?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
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
          <FormInput
            id="email"
            label="E-mail"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
            required
            focusStyle="border"
            className="border-gray-500"
          />

          <FormInput
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Sua senha"
            autoComplete="current-password"
            required
            focusStyle="border"
            className="border-gray-500"
          />

          {error && (
            <FormErrorMessage
              message={error}
              className="text-red-600"
            />
          )}

          <Button
            type="submit"
            disabled={isLoading}
            variant="auth"
            size="lg"
            className="w-full font-bold"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
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
