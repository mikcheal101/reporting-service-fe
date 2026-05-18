"use client";

import { FadeIn } from "@/components/ui/fade-in";
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
    <div className="flex flex-col">
      <FadeIn delay={0} direction="up">
        <SettingsPageToolBar view={view} setView={setView} />
      </FadeIn>

      <FadeIn delay={100} direction="up">
        <div className="p-4 lg:p-6">
          <div className="bg-card shadow-lg rounded-lg border border-border">
            <div className="p-4 lg:p-6">
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
            </div>
          </div>

          <SettingsUsersView
            selectedUser={selectedUser}
            viewDetailsSheetOpen={viewDetailsSheetOpen}
            setViewDetailsSheetOpen={setViewDetailsSheetOpen}
          />

          <SettingsAssignUserRolePage
            mode={mode}
            selectedUser={selectedUser}
            setAssignRoleSheetOpen={setAssignRoleSheetOpen}
            assignRoleSheetOpen={assignRoleSheetOpen}
          />
        </div>
      </FadeIn>
    </div>
  );
}
