// app/connection-table/page.tsx
"use client";

import React from "react";
import ReportTypeLayout from "./report-type-layout";
import { Toaster } from "@/components/ui/toaster";
import ReportTypeTable from "./report-type";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const ReportTablePage: React.FC = () => {
  const router = useRouter();
  const { can } = usePermission();

  React.useEffect(() => {
    if (!can("report-type", "list")) {
      router.replace(FE_ROUTES.DASHBOARD);
    }
  }, []);

  return (
    <ReportTypeLayout>
      <ReportTypeTable />
      <Toaster />
    </ReportTypeLayout>
  );
};

export default ReportTablePage;
