import { createContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin" | "sale";
};

export type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
