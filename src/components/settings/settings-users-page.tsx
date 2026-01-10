// components/settings/settings-users-page.tsx
"use client";

import SettingsPageTable from "./setting-page-table";
import SettingsDeleteUserModal from "./settings-delete-user-modal";
import SettingsUsersForm from "./settings-users-form";
import { IUser } from "@/types/auth/iuser";
import renderTable from "../ui/render-table";
import useSettingsUsersPage from "@/app/hooks/settings/use-settings-users-page";

type SettingUsersPageProps = {
  mode: "add" | "edit";
  setMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  selectedUser: IUser | null;
  setAssignRoleSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewDetailsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

const SettingUsersPage = ({
  mode,
  setMode,
  selectedUser,
  setSelectedUser,
  setAssignRoleSheetOpen,
  setViewDetailsSheetOpen,
}: SettingUsersPageProps) => {
  const {
    users,
    isSheetOpen,
    setIsSheetOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,

    handleDeleteUser,
    triggerDeleteModal,
  } = useSettingsUsersPage({
    selectedUser,
    setSelectedUser,
  });


  return (
    <>
      <SettingsUsersForm
        mode={mode}
        setMode={setMode}
        selectedUser={selectedUser}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        setSelectedUser={setSelectedUser}
      />

      {isDeleteModalOpen && (
        <SettingsDeleteUserModal
          selectedUser={selectedUser}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDeleteUser={handleDeleteUser}
        />
      )}

      {renderTable(
        users,
        ["Email / User Name", "Phone Number", "Actions"],
        (user: IUser) => (
          <SettingsPageTable
            key={user.id}
            user={user}
            setMode={setMode}
            setIsSheetOpen={setIsSheetOpen}
            setSelectedUser={setSelectedUser}
            triggerDeleteModal={triggerDeleteModal}
            setAssignRoleSheetOpen={setAssignRoleSheetOpen}
            setViewDetailsSheetOpen={setViewDetailsSheetOpen}
          />
        )
      )}
    </>
  );
};

export default SettingUsersPage;
