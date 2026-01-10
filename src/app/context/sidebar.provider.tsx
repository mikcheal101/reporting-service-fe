// app/context/sidebar.provider.tsx
"use client";

import { useMemo } from "react";
import useSidebarState from "../hooks/contexts/use-sidebar-state";
import SidebarContext from "./sidebar.context";

const SidebarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const hook = useSidebarState();

  const value = useMemo(
    () => ({ isCollapsed: hook.isCollapsed, toggleSideBar: hook.toggleSideBar }),
    [hook.isCollapsed, hook.toggleSideBar],
  );

  return (<SidebarContext.Provider value={value}>
    {children}
  </SidebarContext.Provider>);
  
};

export default SidebarContextProvider;