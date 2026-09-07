import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../contexts/useAuth";

type PrivateRouteProps = {
  children: ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  /**
   * Enquanto o AuthProvider verifica o localStorage,
   * não devemos redirecionar o usuário para o login.
   */
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#dbe7f5] border-t-[#1769e0]" />

          <p className="mt-4 text-sm font-medium text-[#52657c]">
            Verificando sessão...
          </p>
        </div>
      </div>
    );
  }

  /**
   * Usuário não autenticado.
   */
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  /**
   * Usuário autenticado, mas sem permissão de administrador.
   */
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
