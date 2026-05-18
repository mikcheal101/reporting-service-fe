"use client";
import React from "react";
import Image from "next/image";

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
        width: isCollapsed ? "100px" : "256px",
        transition: "width 0.4s ease-in-out",
      }}
      className="h-full bg-sidebar border-r border-sidebar-border"
    >
      {/* Top Logo Section */}
      <div className="p-4 flex items-center border-b border-sidebar-border/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <Image
              src="/alcestis-logo.svg"
              alt="Alcestis Reporting"
              width={50}
              height={40}
              className="w-5 h-4 brightness-0 invert"
            />
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold text-sidebar-primary-foreground leading-tight">Alcestis</p>
              <p className="text-[10px] text-sidebar-foreground leading-tight">Reporting</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Sidebar Content */}
      <SidebarContent className="flex-1 overflow-y-auto custom-scrollbar px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent className="space-y-1">
            <SidebarLinks />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Bottom Links */}
      <div className="pb-3 pt-2 border-t border-sidebar-border/50">
        <SidebarGroup>
          <SidebarGroupContent className="px-3">
            <SidebarLinks isBottom />
          </SidebarGroupContent>
        </SidebarGroup>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
