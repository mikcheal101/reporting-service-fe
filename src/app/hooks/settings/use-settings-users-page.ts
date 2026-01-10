// app/hooks/settings/use-settings-users-page.ts
"use client";

import { IUser } from "@/types/auth/iuser";
import { useState } from "react";
import useDeleteUser from "../user/use-delete-user";
import useFetchUsers from "../user/use-fetch-users";

type UseSettingsUsersPageProps = {
    selectedUser: IUser | null;
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const useSettingsUsersPage = ({ setSelectedUser }: UseSettingsUsersPageProps) => {
    // States
    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    // Mutations
    const { mutate: deleteUser } = useDeleteUser();

    // Queries
    const { data: users = [] } = useFetchUsers();

    const triggerDeleteModal = (user: IUser) => {
        if (!user) return;
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteUser = (user: IUser) => {
        if (!user) return;
        deleteUser(user.id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            }
        });
    };

    return {
        users,
        isSheetOpen,
        setIsSheetOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,

        handleDeleteUser,
        triggerDeleteModal,
    };
};

export default useSettingsUsersPage;