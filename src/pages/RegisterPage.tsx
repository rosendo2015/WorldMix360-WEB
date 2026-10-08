import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { FormErrorMessage, FormInput } from "../components/FormControls";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível criar sua conta.");
      }

      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Não foi possível criar sua conta.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-[1200px] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-navy">Criar conta</h1>
          <p className="mt-2 text-sm text-gray-500">
            Faça seu cadastro no WorldMix360
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormInput
            id="name"
            label="Nome"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Seu nome"
            autoComplete="name"
            required
            focusStyle="border"
            className="border-gray-500"
          />

          <FormInput
            id="register-email"
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
            id="register-password"
            label="Senha"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Crie uma senha"
            autoComplete="new-password"
            required
            minLength={6}
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
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#1769e0] hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}
