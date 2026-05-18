import React from "react";
import ILink from "@/types/components/sidebar/ilink";
import { LayoutDashboard, Plug, Layers, FileText, Clock } from "lucide-react";
import { FE_ROUTES } from "@/app/constants/routes.constant";

export const mainLinks: ILink[] = [
  {
    label: "Dashboard",
    href: FE_ROUTES.DASHBOARD,
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Connection",
    href: FE_ROUTES.CONNECTION,
    icon: <Plug className="w-5 h-5" />,
  },
  {
    label: "Report Types",
    href: FE_ROUTES.REPORT_TYPE,
    icon: <Layers className="w-5 h-5" />,
  },
  {
    label: "Report definition",
    href: FE_ROUTES.REPORT,
    icon: <FileText className="w-5 h-5" />,
  },
  {
    label: "Scheduled reports",
    href: FE_ROUTES.SCHEDULED_REPORT,
    icon: <Clock className="w-5 h-5" />,
  },
];