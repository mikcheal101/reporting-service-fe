// types/components/connection/connection-grid
"use client";

import IConnection from "@/types/connection/iconnection";
import IDataBaseType from "@/types/connection/idatabase-type";
import React, { ReactNode } from "react";

type ConnectionGridProps = {
  deleteId: string | null;
  connections: IConnection[];
  setIsOpen: (open: boolean) => void;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  isTestSuccessful: Record<string, boolean>;
  MapToDatabaseType: (type: IDataBaseType) => ReactNode;
  handleEditConnection: (connection: IConnection) => void;
  handleDeleteConnection: (id: string | null) => void;
};

export default ConnectionGridProps;