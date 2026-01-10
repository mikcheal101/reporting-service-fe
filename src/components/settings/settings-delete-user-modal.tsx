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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-[90%] sm:w-[400px]">
        <h2 className="text-lg font-medium mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={(event) => handleDeleteUser(selectedUser!)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDeleteUserModal;
