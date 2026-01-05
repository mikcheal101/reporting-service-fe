"use client";
import React, { useState, createContext, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { IconMenu2, IconX } from "@tabler/icons-react";
import companyLogo from "../../public/assets/companylogo.png";
import dialPad from "../../public/assets/Dialpad.png";
import bag from "../../public/assets/Bag.png";
import box from "../../public/assets/Box.png";
import chartPie from "../../public/assets/Chart-pie-alt.png";
import clock from "../../public/assets/Timer.png";
import repayment from "../../public/assets/Refresh.png";
import task from "../../public/assets/Stack.png";
import settingsIcon from "../../public/assets/Settings.png";
import logout from "../../public/assets/Logout.png";
import Cookies from "js-cookie";
import { safeLocalStorage } from "@/app/utils/useLocalStorage";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

interface Links {
  label: string;
  href: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  return (
<Sidebar
  style={{
    width: isCollapsed ? "100px" : "256px", // Replace with your desired widths
    transition: "width 0.4s ease-in-out", // Smooth transition
  }}
  className="h-full bg-white shadow-md border-r border-gray-200"
>
      {/* Top Logo Section */}
      <div className="p-2 sm:p-4 flex items-center ">
        <div className="flex justify-between">
        <Image src={companyLogo} alt="Company Logo" width={50} height={40} className="w-8 h-6 sm:w-12 sm:h-10" />
        </div>
       
      </div>

      {/* Main Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto custom-scrollbar p-2 sm:p-4">
        <SidebarGroup>
          <SidebarGroupContent className="mt-2">
            <SidebarLinks />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Links */}
      <div className="pb-2 sm:pb-4">
        <hr className="my-2 sm:my-4 border-gray-300" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarLinks isBottom />
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </Sidebar>
  );
};

const SidebarLinks = ({ isBottom = false }: { isBottom?: boolean }) => {
  const router = useRouter();
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLogout = () => {
    Cookies.remove("authToken");
    safeLocalStorage.removeItem("user");
    router.push("/signin");
  };

  const mainLinks: Links[] = [
    { label: "Dashboard", href: "/dashboard", icon: <Image src={dialPad} alt="Dashboard" /> },
    // {
    //   label: "Loan Portfolio",
    //   href: "/loan-portfolio",
    //   icon: <Image src={bag} alt="Loan Portfolio" />,
    // },
    // { label: "Disbursement", href: "/disbursement", icon: <Image src={box} alt="Disbursement" /> },
    // { label: "Repayment", href: "/repayment", icon: <Image src={repayment} alt="Repayment" /> },
    // { label: "Delinquency", href: "/delinquency", icon: <Image src={clock} alt="Delinquency" /> },
    { label: "Connection", href: "/connection-table", icon: <Image src={box} alt="Connection" /> },
    { label: "Report Types", href: "/report-type", icon: <Image src={task} alt="Types" /> },
    // { label: "Reports", href: "/reports", icon: <Image src={chartPie} alt="Reports" /> },
    { label: "Report definition", href: "/report", icon: <Image src={bag} alt="Report definition" /> },
    { label: "Scheduled reports", href: "/scheduled-report", icon: <Image src={clock} alt="Scheduled reports" /> },
    // { label: "Tenants", href: "/tenants", icon: <Image src={task} alt="Tenants" /> },
    // { label: "Task", href: "/task", icon: <Image src={task} alt="Task" /> },
  ];

  const bottomLinks: Links[] = [
    { label: "Settings", href: "/settings", icon: <Image src={settingsIcon} alt="Settings" /> },
    {
      label: "Logout",
      href: "#",
      icon: <Image src={logout} alt="Logout" />,
      onClick: handleLogout,
    },
  ];

  const isActive = (link: Links): boolean =>
    pathname === link.href;



  const handleLinkClick = (link: Links) => {
    // Handle special onClick actions (like logout) without navigation
    if (link.onClick) {
      link.onClick();
      return;
    }
    
    // Optimize navigation by checking if we're already on the target route
    if (pathname !== link.href) {
      router.push(link.href);
    }
    setActiveLink(link.href);
  };

  const renderLinks = (links: Links[]) => (
    <SidebarMenu className="space-y-1">
      {links.map((link) => {
        const isLinkActive = isActive(link);

        return (
          <SidebarMenuItem
            key={link.href}
            className={`flex p-2 sm:p-4 flex-col hover:bg-[#FFFCF4] rounded-lg transition-colors duration-150 ${
              isLinkActive ? "bg-[#FFF7E8]" : ""
            }`}
          >
            <SidebarMenuButton
              onClick={() => handleLinkClick(link)}
              className={`flex items-center hover:bg-[#FFFCF4] justify-between focus:ring-2 focus:ring-yellow-500 w-full text-sm font-medium ${
                isLinkActive ? "bg-[#FFF7E8]" : ""
              }`}
              aria-current={isLinkActive ? "page" : undefined}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5">{link.icon}</div>
                {!isCollapsed && <span className="truncate">{link.label}</span>}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return <>{renderLinks(isBottom ? bottomLinks : mainLinks)}</>;
};

export default AppSidebar;