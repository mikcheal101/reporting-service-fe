// components/settings/settings-delete-user-modal.tsx
"use client";

import { IUser } from "@/types/auth/iuser";
import { Button } from "../ui/button";

type SettingsDeleteUserModalProps = {
    selectedUser: IUser | null;
    handleDeleteUser: (user: IUser) => void;
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsDeleteUserModal = ({
    selectedUser,
    setIsDeleteModalOpen,
    handleDeleteUser,
}: SettingsDeleteUserModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-[90%] sm:w-[400px] p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteUser(selectedUser!)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDeleteUserModal;
