// components/connection/connection-grid
"use client";

import ConnectionGridProps from "@/types/components/connection/connection-grid";
import IConnection from "@/types/connection/iconnection";
import { PlugZap, XCircle } from "lucide-react";
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

const ConnectionGrid = (properties: ConnectionGridProps) => (
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
              : "border-2 border-red-500 text-gray-500"
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
          <h3 className="text-lg font-bold mb-2 text-gray-700">
            {connection.name}
          </h3>
          <p className="text-gray-500">Server: {connection.server}</p>
          <p className="text-gray-500">
            Database: {properties.MapToDatabaseType(connection.databaseType)}
          </p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => {
                properties.setIsOpen(true);
                properties.handleEditConnection(connection); // Handle the editing logic
              }}
              className={`px-3 py-2 rounded text-xs font-medium transition
              ${
                isTested
                  ? "border-2 border-green-500 bg-green-50"
                  : "border-2 border-red-500 text-gray-500"
              }`}
            >
              Edit
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  onClick={() => properties.setDeleteId(connection.id)}
                  className={`px-3 py-2 rounded text-xs font-medium text-white transition
                  ${
                    isTested
                      ? "border-2 border-green-500 bg-green-500"
                      : "border-2 border-red-500 bg-red-500 text-gray-500"
                  }`}
                >
                  Delete
                </button>
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
          </div>
        </div>
      );
    })}
  </div>
);

export default ConnectionGrid;
