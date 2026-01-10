// app/hooks/auth/use-auth.ts
import AuthContext from "@/app/context/auth.context";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context error!");
  return context;
};