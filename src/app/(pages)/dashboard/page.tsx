"use client";

import React from "react";
import Dashboard from "./Dashboard";
import DashboardLayout from "./DashboardLayout";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { can } = usePermission();

  React.useEffect(() => {
    if (!can("report", "list")) {
      router.replace(FE_ROUTES.SIGNIN);
    }
  }, []);

  return (
    <DashboardLayout>
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
