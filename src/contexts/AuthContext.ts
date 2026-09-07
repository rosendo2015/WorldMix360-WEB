import { createContext } from "react";
import type { User } from "../types/User";

export type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
