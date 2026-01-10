// components/ui/main-link.tsx
import React from "react";
import ILink from "@/types/components/sidebar/ilink";
import Image from "next/image";
import dialPad from "../../../public/assets/Dialpad.png";
import bag from "../../../public/assets/Bag.png";
import box from "../../../public/assets/Box.png";
import clock from "../../../public/assets/Timer.png";
import task from "../../../public/assets/Stack.png";

export const mainLinks: ILink[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Image src={dialPad} alt="Dashboard" />,
  },
  {
    label: "Connection",
    href: "/connection",
    icon: <Image src={box} alt="Connection" />,
  },
  {
    label: "Report Types",
    href: "/report-type",
    icon: <Image src={task} alt="Types" />,
  },
  {
    label: "Report definition",
    href: "/report",
    icon: <Image src={bag} alt="Report definition" />,
  },
  {
    label: "Scheduled reports",
    href: "/scheduled-report",
    icon: <Image src={clock} alt="Scheduled reports" />,
  },
];