// components/settings/settings-delete-user-role-modal.tsx
"use client";

import { IRole } from "@/types/auth/irole";
import { Button } from "../ui/button";

type SettingsDeleteUserRoleModalProps = {
  selectedRole: IRole | null;
  handleDeleteRole: (role: IRole) => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsDeleteUserRoleModal = ({
  selectedRole,
  handleDeleteRole,
  setIsDeleteModalOpen,
}: SettingsDeleteUserRoleModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px]">
        <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user role? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteRole(selectedRole!)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDeleteUserRoleModal;
