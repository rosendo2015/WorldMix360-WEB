import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { User } from "../types/User";
import { AuthContext } from "./AuthContext";

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

const USER_STORAGE_KEY = "@worldmix360:user";
const TOKEN_STORAGE_KEY = "@worldmix360:token";

type LoginResponse = {
  token: string;
  user: User;
};

/**
 * Recupera o usuário salvo no navegador.
 */
function getStoredUser(): User | null {
  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);

    if (!storedUser) {
      return null;
    }

    return JSON.parse(storedUser) as User;
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

/**
 * Recupera o token salvo no navegador.
 */
function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  /**
   * O estado inicial já é carregado do localStorage.
   *
   * Dessa forma não precisamos de um useEffect para executar
   * setUser() e setToken() depois da montagem do componente.
   */
  const [user, setUser] = useState<User | null>(() => getStoredUser());

  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const [isLoading, setIsLoading] = useState(false);

  /**
   * Realiza o login.
   */
  const signIn = useCallback(
    async (email: string, password: string): Promise<User> => {
      setIsLoading(true);

      try {
        const response = await fetch(`${apiUrl}/session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        let data: Partial<LoginResponse> & {
          message?: string;
          error?: string;
        };

        try {
          data = await response.json();
        } catch {
          throw new Error("Resposta inválida do servidor.");
        }

        if (!response.ok) {
          throw new Error(
            data.message || data.error || "Email ou senha inválidos.",
          );
        }

        if (!data.token || !data.user) {
          throw new Error("Resposta de autenticação inválida.");
        }

        /**
         * Persiste a sessão.
         */
        localStorage.setItem(TOKEN_STORAGE_KEY, data.token);

        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));

        /**
         * Atualiza o estado da aplicação.
         */
        setToken(data.token);
        setUser(data.user);

        return data.user;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * Encerra a sessão.
   */
  const signOut = useCallback(() => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      signIn,
      signOut,
    }),
    [user, token, isLoading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
