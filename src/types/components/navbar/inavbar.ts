import { IUser } from "@/types/auth/iuser";

export default interface INavbar {
    user: IUser | null;
    themeStyle: string;
    isDropdownOpen: boolean;
    showBackButton: boolean;
    handleBackClick: () => void;
    toggleDropdown: () => void;
    handleSignOut: () => Promise<void>;
}