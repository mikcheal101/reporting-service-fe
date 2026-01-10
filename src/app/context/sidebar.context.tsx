// app/context/sidebar.context.tsx
"use client";
import ISidebarContextProps from "@/types/context/isidebar.context";
import { createContext } from "react";

const SidebarContext = createContext<ISidebarContextProps | undefined>(undefined);

export default SidebarContext;