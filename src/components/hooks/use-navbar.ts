import { useAuth } from "@/app/hooks/auth/use-auth";
import INavbar from "@/types/components/navbar/inavbar";
import INavbarProps from "@/types/components/navbar/inavbar-props";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const useNavbar = (props: INavbarProps): INavbar => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const themeStyle = props.theme === "dark" ? "" : "p-4 bg-white";
    const showBackButton = pathname !== "/dashboard";

    const handleBackClick = () => router.back();

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleSignOut = async () => {
        await logout();
        router.push('/');
    }

    return {
        user,
        themeStyle,
        isDropdownOpen,
        showBackButton,
        handleBackClick,
        toggleDropdown,
        handleSignOut,
    }
};

export default useNavbar;