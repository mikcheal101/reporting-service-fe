// app/(pages)/settings/page.tsx
"use client";

import SettingsPageToolBar from "@/components/settings/settings-page-toolbar";
import SettingUsersPage from "@/components/settings/settings-users-page";
import useSettingsPage from "@/app/hooks/settings/use-settings-page";
import SettingsRolePage from "@/components/settings/settings-roles-page";
import SettingsUsersView from "@/components/settings/settings-users-view";
import SettingsAssignUserRolePage from "@/components/settings/settings-assign-user-role-page";

export default function Settings() {
  const {
    view,
    setView,
    mode,
    setMode,
    selectedUser,
    setSelectedUser,
    viewDetailsSheetOpen,
    assignRoleSheetOpen,
    setAssignRoleSheetOpen,
    setViewDetailsSheetOpen,
  } = useSettingsPage();

  return (
    <div className="flex flex-col bg-white">
      <SettingsPageToolBar view={view} setView={setView} />

      {/* Main Content */}
      <div className="w-full bg-white p-4">
        {view === "Users" && (
          <SettingUsersPage
            mode={mode}
            setMode={setMode}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            setViewDetailsSheetOpen={setViewDetailsSheetOpen}
            setAssignRoleSheetOpen={setAssignRoleSheetOpen}
          />
        )}
        {view === "Roles" && (
          <SettingsRolePage />
        )}

        {/* View Details Sheet */}
        <SettingsUsersView
          selectedUser={selectedUser}
          viewDetailsSheetOpen={viewDetailsSheetOpen}
          setViewDetailsSheetOpen={setViewDetailsSheetOpen}
        />

        {/* Assign Role Sheet */}
        <SettingsAssignUserRolePage
          mode={mode}
          selectedUser={selectedUser}
          setAssignRoleSheetOpen={setAssignRoleSheetOpen}
          assignRoleSheetOpen={assignRoleSheetOpen}
        />
      </div>
    </div>
  );
};