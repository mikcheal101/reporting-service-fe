

import settingsIcon from "../../../public/assets/Settings.png";
import logout from "../../../public/assets/Logout.png";
import ILink from "@/types/components/sidebar/ilink";
import Image from "next/image";

export const bottomLinks: ILink[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: <Image src={settingsIcon} alt="Settings" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <Image src={logout} alt="Logout" />
  },
];