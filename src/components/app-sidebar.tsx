"use client";
import React from "react";
import Image from "next/image";
import companyLogo from "../../public/assets/companylogo.png";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import SidebarLinks from "./sidebar-links";
import useSidebarState from "@/app/hooks/contexts/use-sidebar-state";


export const AppSidebar = () => {
  const { isCollapsed } = useSidebarState();
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
          <Image
            src={companyLogo}
            alt="Company Logo"
            width={50}
            height={40}
            className="w-8 h-6 sm:w-12 sm:h-10"
          />
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

export default AppSidebar;
