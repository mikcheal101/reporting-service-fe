"use client";

import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ScheduledLayout from "./scheduled-layout";
import ScheduledReport from "./scheduled-report";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const ReportingPage: React.FC = () => {
  const router = useRouter();
  const { can } = usePermission();

  React.useEffect(() => {
    if (!can("task", "list")) {
      router.replace(FE_ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <ScheduledLayout>
      <ScheduledReport />
      <Toaster />
    </ScheduledLayout>
  );
};

export default ReportingPage;
