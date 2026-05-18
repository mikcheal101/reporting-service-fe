// app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "./constants/routes.constant";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(FE_ROUTES.SIGNIN);
  }, [router]);

  return null;
}
