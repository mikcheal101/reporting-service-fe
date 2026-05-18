// components/connection/connection-form-list
"use client";

import ConnectionListProps from "@/types/components/connection/connection-list";
import IConnection from "@/types/connection/iconnection";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

const ConnectionList = ({
  setIsOpen,
  handleEditConnection,
  connections,
  deleteId,
  setDeleteId,
  handleDeleteConnection,
}: ConnectionListProps) => (
  <table className="w-full text-sm text-left text-gray-600">
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        <th className="px-4 py-3">Name</th>
        <th className="px-4 py-3">Description</th>
        <th className="px-4 py-3 text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      {connections?.map((connection: IConnection) => (
        <tr key={connection.id} className="border-b">
          <td className="px-4 py-3">{connection.name || ""}</td>
          <td className="px-4 py-3">{connection.description || ""}</td>
          <td className="px-4 py-3 text-right">
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(true);
                  handleEditConnection(connection);
                }}
              >
                <Pencil className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteId(connection.id || '')}
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone and will permanently delete
                      the connection.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500"
                      onClick={() =>
                        deleteId && handleDeleteConnection(deleteId)
                      }
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ConnectionList;
