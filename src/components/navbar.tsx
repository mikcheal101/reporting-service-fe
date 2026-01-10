"use client";

import Image from "next/image";
import { HiOutlineLogout, HiArrowLeft } from "react-icons/hi";
import profile from "../../public/assets/profile.png";
import { SidebarTrigger } from "./ui/sidebar";
import NotificationIcon from "./NotificationIcon";
import INavbarProps from "@/types/components/navbar/inavbar-props";
import useNavbar from "./hooks/use-navbar";

const Navbar = (props: INavbarProps) => {
  const hook = useNavbar(props);

  return (
    <header className={`flex items-center ${hook.themeStyle}`}>
      <div className="flex items-center gap-2 sm:gap-3">
        {hook.showBackButton && (
          <button
            onClick={hook.handleBackClick}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 mr-1 sm:mr-2"
            aria-label="Go back"
          >
            <HiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        )}
        <SidebarTrigger />
        <div className="text-lg sm:text-2xl font-bold truncate">
          {props.title}
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
        <NotificationIcon />
        <div className="flex items-center gap-4">
          <div className="relative inline-block text-left">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={hook.toggleDropdown}
            >
              <p className="font-medium text-gray-800 hover:text-gray-900 flex items-center gap-1">
                {hook.user?.fullName.toUpperCase()}
              </p>
              <Image
                src={profile}
                alt="Profile Picture"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-gray-400"
              />
            </div>

            {hook.isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-10 border border-gray-200">
                <div className="p-4">
                  {/* User Details */}
                  {hook.user?.username && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Email / Username:
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {hook.user?.username}
                      </p>
                    </div>
                  )}
                  {hook.user?.phone && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700">
                        Phone:
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {hook.user?.phone}
                      </p>
                    </div>
                  )}

                  {/* Divider */}
                  <hr className="border-gray-200 my-2" />

                  {/* Sign Out Button */}
                  <button
                    onClick={hook.handleSignOut}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-semibold text-red-600 bg-gray-50 hover:bg-red-100 rounded-lg transition duration-300"
                  >
                    <HiOutlineLogout size={20} className="text-red-600" />
                    Sign Out
                  </button>
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
