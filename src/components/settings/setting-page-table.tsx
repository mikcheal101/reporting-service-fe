// components/settings/setting-page-table.tsx
"use client";

import { IUser } from "@/types/auth/iuser";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import React from "react";
import usePermission from "@/app/hooks/auth/use-permission";

type SettingsPageTableProps = {
    user: IUser;
    triggerDeleteModal: (user: IUser) => void;
    setMode: React.Dispatch<React.SetStateAction<"add" | "edit">>;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    setViewDetailsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setAssignRoleSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsPageTable = ({
    user,
    setMode,
    setIsSheetOpen,
    setSelectedUser,
    triggerDeleteModal,
    setAssignRoleSheetOpen,
    setViewDetailsSheetOpen,
}: SettingsPageTableProps) => {
  const { can } = usePermission();
  const canUpdate = can("user", "update");
  const canDelete = can("user", "delete");
  const showActions = canUpdate || canDelete;

  return (
    <tr key={user.id} className="hover:bg-muted/30 transition-colors">
      <td className="px-4 py-3.5 text-sm text-foreground">{user.username}</td>
      <td className="px-4 py-3.5 text-sm text-muted-foreground">
        {user.phone || "N/A"}
      </td>
      {showActions && (
        <td className="px-4 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-xs">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedUser(user);
                  setViewDetailsSheetOpen(true);
                }}
              >
                View Details
              </DropdownMenuItem>
              {canUpdate && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(user);
                    setIsSheetOpen(true);
                    setMode("edit");
                  }}
                >
                  Edit
                </DropdownMenuItem>
              )}
              {canUpdate && (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedUser(user);
                    setAssignRoleSheetOpen(true);
                    setMode("add");
                  }}
                >
                  Assign Role
                </DropdownMenuItem>
              )}
              {canDelete && (
                <DropdownMenuItem
                  onClick={() => {
                    triggerDeleteModal(user);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </td>
      )}
    </tr>
  );
};

export default SettingsPageTable;
