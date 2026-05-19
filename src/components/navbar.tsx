"use client";

import Image from "next/image";
import { LogOut, ArrowLeft, User } from "lucide-react";
import profile from "../../public/assets/profile.png";
import { SidebarTrigger } from "./ui/sidebar";
import { Button } from "./ui/button";
import NotificationIcon from "./NotificationIcon";
import ThemeToggle from "./theme-toggle";
import INavbarProps from "@/types/components/navbar/inavbar-props";
import useNavbar from "./hooks/use-navbar";

const Navbar = (props: INavbarProps) => {
  const hook = useNavbar(props);

  return (
    <header className={`flex items-center ${hook.themeStyle}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        {hook.showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={hook.handleBackClick}
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
        <SidebarTrigger />
        <div className="text-lg sm:text-2xl font-bold truncate">
          {props.title}
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
        <ThemeToggle />
        <NotificationIcon />
        <div className="flex items-center gap-4">
          <div className="relative inline-block text-left">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={hook.toggleDropdown}
            >
              <p className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1">
                {hook.user?.fullName.toUpperCase()}
              </p>
              <Image
                src={profile}
                alt="Profile Picture"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-border hover:border-primary transition-colors"
              />
            </div>

            {hook.isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-lg z-10 border border-border">
                <div className="p-4">
                  {hook.user?.username && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Email / Username:
                      </p>
                      <p className="text-sm text-card-foreground truncate">
                        {hook.user?.username}
                      </p>
                    </div>
                  )}
                  {hook.user?.phone && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        Phone:
                      </p>
                      <p className="text-sm text-card-foreground truncate">
                        {hook.user?.phone}
                      </p>
                    </div>
                  )}

                  <hr className="border-border my-2" />

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-card-foreground hover:text-card-foreground hover:bg-muted/50"
                    onClick={hook.handleProfileClick}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={hook.handleSignOut}
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
