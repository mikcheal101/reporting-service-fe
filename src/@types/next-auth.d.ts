// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    idToken?: string;
    jwt?: string;
    accessToken?: string;
  }

  interface JWT extends DefaultJWT {
    idToken?: string;
    jwt?: string;
    accessToken?: string;
  }
}