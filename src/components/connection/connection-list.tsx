// components/connection/connection-form-list
"use client";

import ConnectionListProps from "@/types/components/connection/connection-list";
import IConnection from "@/types/connection/iconnection";
import { FaEdit, FaTrash } from "react-icons/fa";
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
              <button
                onClick={() => {
                  setIsOpen(true);
                  handleEditConnection(connection); // Handle the editing logic
                }}
                className="flex items-center px-3 py-2 bg-white border-[#FFA500] border-2 text-[#FFA500] text-xs font-medium rounded transition"
              >
                <FaEdit className="mr-2" />
                Edit
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    onClick={() => setDeleteId(connection.id || '')}
                    className="flex items-center px-3 py-2 bg-[#FFA500] text-white text-xs font-medium rounded transition"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
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
