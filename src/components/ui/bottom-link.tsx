import ILink from "@/types/components/sidebar/ilink";
import { Settings, LogOut, User } from "lucide-react";
import { FE_ROUTES } from "@/app/constants/routes.constant";

export const bottomLinks: ILink[] = [
  {
    label: "Profile",
    href: FE_ROUTES.PROFILE,
    icon: <User className="w-5 h-5" />,
  },
  {
    label: "Settings",
    href: FE_ROUTES.SETTINGS,
    icon: <Settings className="w-5 h-5" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <LogOut className="w-5 h-5" />,
  },
];