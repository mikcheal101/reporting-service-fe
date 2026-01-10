// components/settings/settings-roles-form-permissions.tsx
"use client";

import useSettingsRolesFormPermissions from "@/app/hooks/settings/use-settings-roles-form-permissions";
import { IPermission } from "@/types/auth/ipermission";
import { IRole } from "@/types/auth/irole";

type SettingsRolesFormPermissionsProps = {
  form: IRole;
  setForm: React.Dispatch<React.SetStateAction<IRole>>;
};

const SettingsRolesFormPermissions = ({
  form,
  setForm,
}: SettingsRolesFormPermissionsProps) => {
  const { permissions } = useSettingsRolesFormPermissions();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Permissions
      </label>

      {/* Scrollable container for permissions */}
      <div className="border border-gray-300 rounded p-3 overflow-y-auto h-[70vh]">
        <div className="flex flex-col gap-4">
          {Object.entries(
            (permissions || []).reduce<Record<string, Array<IPermission>>>(
              (acc, permission) => {
                const [fieldsetName] = permission.name.split(".");
                if (!acc[fieldsetName]) acc[fieldsetName] = [];
                acc[fieldsetName].push(permission);
                return acc;
              },
              {}
            )
          ).map(([fieldsetName, groupPermissions]) => (
            <fieldset
              key={fieldsetName}
              className="border border-gray-300 rounded p-3"
            >
              <legend className="text-sm font-semibold mb-2 capitalize">
                {fieldsetName}
              </legend>
              <table className="w-full table-fixed border-collapse">
                <tbody>
                  {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {groupPermissions
                        .slice(
                          rowIndex * Math.ceil(groupPermissions.length / 3),
                          (rowIndex + 1) *
                            Math.ceil(groupPermissions.length / 3)
                        )
                        .map((permission) => (
                          <td key={permission.id} className="px-2 py-1">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={form.permissions?.some(
                                  (p) => p.id === permission.id
                                )}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setForm((prev: IRole) => ({
                                      ...prev,
                                      permissions: [
                                        ...(prev.permissions || []),
                                        permission,
                                      ],
                                    }));
                                  } else {
                                    setForm((prev: IRole) => ({
                                      ...prev,
                                      permissions: prev.permissions?.filter(
                                        (p) => p.id !== permission.id
                                      ),
                                    }));
                                  }
                                }}
                                className="h-4 w-4 text-[#FFBF48] border-gray-300 rounded"
                              />
                              <span className="text-sm">
                                {permission.name.split(".")[1]}
                              </span>
                            </label>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </fieldset>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsRolesFormPermissions;
