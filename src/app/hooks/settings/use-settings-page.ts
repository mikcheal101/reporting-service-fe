// app/hooks/settings/use-settings-page.ts
"use client";

import { useState } from "react";
import { IUser } from "@/types/auth/iuser";

const useSettingsPage = () => {
    const [view, setView] = useState<string>("Users");
    const [mode, setMode] = useState<"add" | "edit">("add");
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [assignRoleSheetOpen, setAssignRoleSheetOpen] = useState<boolean>(false);
    const [viewDetailsSheetOpen, setViewDetailsSheetOpen] = useState<boolean>(false);

    return {
        view,
        setView,
        mode,
        setMode,
        selectedUser,
        setSelectedUser,
        assignRoleSheetOpen,
        setAssignRoleSheetOpen,
        viewDetailsSheetOpen,
        setViewDetailsSheetOpen,
    }
};

export default useSettingsPage;
