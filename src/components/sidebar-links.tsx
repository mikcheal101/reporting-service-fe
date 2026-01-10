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
            className={`flex p-2 sm:p-4 flex-col hover:bg-[#FFFCF4] rounded-lg transition-colors duration-150 ${
              isLinkActive ? "bg-[#FFF7E8]" : ""
            }`}
          >
            <SidebarMenuButton
              onClick={() => hook.handleLinkClick(link)}
              className={`flex items-center hover:bg-[#FFFCF4] justify-between focus:ring-2 focus:ring-yellow-500 w-full text-sm font-medium ${
                isLinkActive ? "bg-[#FFF7E8]" : ""
              }`}
              aria-current={isLinkActive ? "page" : undefined}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5">
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
