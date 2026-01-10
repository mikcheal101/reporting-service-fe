// app/hooks/settings/use-settings-roles-form-permissions.ts
"use client";

import useFetchUserPermissions from "./use-fetch-user-permissions";

const useSettingsRolesFormPermissions = () => {
  const { data: permissions = [] } = useFetchUserPermissions();

  return {
    permissions
  };
};

export default useSettingsRolesFormPermissions;