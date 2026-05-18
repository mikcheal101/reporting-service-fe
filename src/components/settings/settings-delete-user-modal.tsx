"use client";

import { useState } from "react";
import { IUser } from "@/types/auth/iuser";
import { Trash2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

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
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    setIsPending(true);
    try {
      await handleDeleteUser(selectedUser!);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <AlertDialog open onOpenChange={(open) => !open && setIsDeleteModalOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this user? This action cannot be undone.
            The user will lose access to the platform and all associated data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsDeleteModalOpen(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} disabled={isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsDeleteUserModal;
