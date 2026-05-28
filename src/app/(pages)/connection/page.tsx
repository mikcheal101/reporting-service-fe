// app/connection-table/page.tsx
"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ConnectionLayout from "./connection-layout";
import Connection from "./connection";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const ConnectionPage: React.FC = () => {
  const router = useRouter();
  const { can } = usePermission();

  React.useEffect(() => {
    if (!can("connection", "list")) {
      router.replace(FE_ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <ConnectionLayout>
      <Connection />
      <Toaster />
    </ConnectionLayout>
  );
};

export default ConnectionPage;
