"use client";

import React from "react";
import { FadeIn } from "@/components/ui/fade-in";
import SettingsPageToolBar from "@/components/settings/settings-page-toolbar";
import SettingUsersPage from "@/components/settings/settings-users-page";
import useSettingsPage from "@/app/hooks/settings/use-settings-page";
import SettingsRolePage from "@/components/settings/settings-roles-page";
import SettingsUsersView from "@/components/settings/settings-users-view";
import SettingsAssignUserRolePage from "@/components/settings/settings-assign-user-role-page";
import usePermission from "@/app/hooks/auth/use-permission";
import { useRouter } from "next/navigation";
import { FE_ROUTES } from "@/app/constants/routes.constant";

export default function Settings() {
  const router = useRouter();
  const { can } = usePermission();
  const hasSettingsAccess =
    can("user", "list") || can("user", "view") ||
    can("role", "list") || can("role", "view") ||
    can("audit-log", "list") || can("audit-log", "view") ||
    can("data-retention", "view");

  React.useEffect(() => {
    if (!hasSettingsAccess) {
      router.replace(FE_ROUTES.DASHBOARD);
    }
  }, []);

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
