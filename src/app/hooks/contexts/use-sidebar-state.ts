// app/hooks/contexts/use-sidebar-state.ts
"use client";

import { useState } from "react";

const useSidebarState = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSideBar = () => setIsCollapsed((previousState: boolean) => !previousState);

  return {
    isCollapsed,
    setIsCollapsed,
    toggleSideBar
  };
};

export default useSidebarState;