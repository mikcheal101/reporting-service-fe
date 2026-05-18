import ILink from "@/types/components/sidebar/ilink";
import useSideBarLinks from "./hooks/use-sidebar-links";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { bottomLinks } from "./ui/bottom-link";
import { mainLinks } from "./ui/main-link";

const SidebarLinks = ({ isBottom = false }: { isBottom?: boolean }) => {

  const hook = useSideBarLinks();

  const renderLinks = (links: ILink[]) => (
    <SidebarMenu className="space-y-1">
      {links.map((link) => {
        const isLinkActive = hook.isActive(link);

        return (
          <SidebarMenuItem
            key={link.href}
            className={`relative flex rounded-lg transition-all duration-200 ${
              isLinkActive
                ? "bg-sidebar-primary shadow-sm"
                : "hover:bg-sidebar-accent"
            }`}
          >
            {isLinkActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-sidebar-primary-foreground/70 rounded-full animate-in fade-in slide-in-from-left-1 duration-300" />
            )}
            <SidebarMenuButton
              onClick={() => hook.handleLinkClick(link)}
              className={`flex items-center w-full text-sm font-medium transition-all duration-200 px-3 py-2.5 ${
                isLinkActive
                  ? "text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:text-sidebar-foreground"
              }`}
              aria-current={isLinkActive ? "page" : undefined}
            >
              <div className={`flex items-center gap-3 transition-all duration-200 ${isLinkActive ? "translate-x-0.5" : ""}`}>
                <div className="flex-shrink-0 w-5 h-5">
                  {link.icon}
                </div>
                {!hook.isCollapsed && <span className="truncate">{link.label}</span>}
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return <>{renderLinks(isBottom ? bottomLinks : mainLinks)}</>;
};

export default SidebarLinks;
