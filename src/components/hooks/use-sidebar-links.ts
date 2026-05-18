"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/hooks/auth/use-auth";
import ILink from "@/types/components/sidebar/ilink";
import useSidebarState from "@/app/hooks/contexts/use-sidebar-state";
import { FE_ROUTES } from "@/app/constants/routes.constant";

const useSideBarLinks = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { isCollapsed } = useSidebarState();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>("");

  const handleLogout = async () => await logout(() => router.replace(FE_ROUTES.HOME));

  const isActive = (link: ILink): boolean => pathname === link.href;

  const handleLinkClick = (link: ILink) => {
    if (link.label.toLowerCase() === 'logout'.toLowerCase()) {
      handleLogout();
      return;
    }

    if (pathname !== link.href) {
      router.push(link.href);
    }

    setActiveLink(link.href);
  };

  return {
    isCollapsed,
    activeLink,
    handleLogout,
    isActive,
    handleLinkClick,
  };
}

export default useSideBarLinks;