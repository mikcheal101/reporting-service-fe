// components/connection/connection-grid
"use client";

import ConnectionGridProps from "@/types/components/connection/connection-grid";
import IConnection from "@/types/connection/iconnection";
import { PlugZap, XCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import usePermission from "@/app/hooks/auth/use-permission";

const ConnectionGrid = (properties: ConnectionGridProps) => {
  const { can } = usePermission();
  const canUpdate = can("connection", "update");
  const canDelete = can("connection", "delete");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {properties.connections?.map((connection: IConnection) => {
        const isTested = connection.id
          ? properties.isTestSuccessful[connection.id] ?? false
          : false; // Check if test was successful

        return (
          <div
            key={connection.id}
            className={`relative p-6 rounded-2xl ${
              isTested
                ? "border-2 border-green-500 bg-green-50"
                : "border-2 border-red-500 text-gray-500 dark:text-gray-400"
            }`}
          >
            {/* Success or Failure Icon */}
            <div className="absolute top-3 right-3">
              {isTested ? (
                <PlugZap size={28} className="text-green-600" />
              ) : (
                <XCircle size={28} className="text-red-500" />
              )}
            </div>
            <h3 className="text-lg font-bold mb-2 text-gray-700 dark:text-gray-300">
              {connection.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">Server: {connection.server}</p>
            <p className="text-gray-500 dark:text-gray-400">
              Database: {properties.MapToDatabaseType(connection.databaseType)}
            </p>
            { (canUpdate || canDelete) && (
              <div className="mt-4 flex justify-end space-x-2">
                {canUpdate && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      properties.setIsOpen(true);
                      properties.handleEditConnection(connection);
                    }}
                  >
                    <Pencil className="mr-1 h-3 w-3" />
                    Edit
                  </Button>
                )}
                {canDelete && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => properties.setDeleteId(connection.id)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone and will permanently delete the
                          connection.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500"
                          onClick={() =>
                            properties.deleteId &&
                            properties.handleDeleteConnection(properties.deleteId)
                          }
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            ) }
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionGrid;
