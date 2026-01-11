// app/(pages)/layout.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/auth/use-auth";
import { useEffect } from "react";

type PagesLayoutProps = {
  children: React.ReactNode;
};

const PagesLayout = ({ children }: PagesLayoutProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [user, loading, router]);

  if (loading && !user) return null;

  return <>{children}</>;
};

export default PagesLayout;
