// app/context/auth.context.tsx
"use client";
import IAuthContextType from "@/types/context/iauth.context";
import { createContext } from "react";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export default AuthContext;