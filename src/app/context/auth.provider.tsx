// app/context/auth.provider.tsx
"use client";
import { ReactNode } from "react";
import useAuthState from "../hooks/contexts/use-auth-state";
import AuthContext from "./auth.context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export default AuthProvider;
