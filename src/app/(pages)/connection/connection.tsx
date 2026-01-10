"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

import ConnectionFormSheet from "@/components/connection/connection-form-sheet";
import useConnectionTable from "@/app/hooks/connection/use-connection-table";
import ConnectionList from "@/components/connection/connection-list";
import ConnectionGrid from "@/components/connection/connection-grid";
import MapToDatabaseType from "@/app/utils/map-database-type";
import ConnectionToolbar from "@/components/connection/connection-toolbar";

const Connection: React.FC = () => {
  const connectionState = useConnectionTable();

  let content;

  if (connectionState.isLoading) {
    content = (
      <div className="space-y-4">
        {[new Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-6 w-full rounded-lg" />
        ))}
      </div>
    );
  } else if (!connectionState.connections?.length) {
    content = (
      <p className="text-center text-gray-500">No connections available.</p>
    );
  } else if (connectionState.viewMode === "list") {
    content = (
      <ConnectionList
        setIsOpen={connectionState.setIsOpen}
        handleEditConnection={connectionState.handleEditConnection}
        connections={connectionState.connections || []}
        deleteId={connectionState.deleteId}
        setDeleteId={connectionState.setDeleteId}
        handleDeleteConnection={connectionState.handleDeleteConnection}
      />
    );
  } else {
    content = (
      <div>
        <ConnectionGrid
          connections={connectionState.connections || []}
          deleteId={connectionState.deleteId}
          handleDeleteConnection={connectionState.handleDeleteConnection}
          handleEditConnection={connectionState.handleEditConnection}
          isTestSuccessful={connectionState.isTestSuccessful}
          setDeleteId={connectionState.setDeleteId}
          setIsOpen={connectionState.setIsOpen}
          MapToDatabaseType={MapToDatabaseType}
        />
      </div>
    );
  }

  return (
    <div className="mt-0 p-0">
      <div className="flex justify-end mb-2 space-x-4">
        <ConnectionFormSheet
          isOpen={connectionState.isOpen}
          setIsOpen={connectionState.setIsOpen}
          connection={connectionState.connection}
          connectionId={connectionState.connectionId}
          formData={connectionState.form}
          setFormData={connectionState.setForm}
          showPassword={connectionState.showPassword}
          setShowPassword={connectionState.setShowPassword}
          resetFields={connectionState.resetFields}
          setConnection={connectionState.setConnection}
          setConnectionId={connectionState.setConnectionId}
          handleInputChange={connectionState.handleChange}
          handleTestConnection={connectionState.handleTestConnection}
          handleSubmit={connectionState.handleSubmit}
        />
      </div>

      <div className="p-6 bg-[#FAFAFA] shadow-lg rounded-lg border border-gray-200">
        <ConnectionToolbar
          viewMode={connectionState.viewMode}
          setViewMode={connectionState.setViewMode}
        />
        {content}
      </div>
    </div>
  );
};

export default Connection;
