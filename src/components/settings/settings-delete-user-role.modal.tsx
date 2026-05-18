"use client";

import { useState } from "react";
import { IRole } from "@/types/auth/irole";
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
  const [isPending, setIsPending] = useState(false);

  const onDelete = async () => {
    setIsPending(true);
    try {
      await handleDeleteRole(selectedRole!);
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
            Are you sure you want to delete this user role? This action cannot be undone.
            Any users assigned to this role will lose their associated permissions.
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

export default SettingsDeleteUserRoleModal;
