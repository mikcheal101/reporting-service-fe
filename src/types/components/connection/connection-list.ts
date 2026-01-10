// types/components/connection/connection-list
"use client";
import IConnection from "@/types/connection/iconnection";

type ConnectionListProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditConnection: (connection: IConnection) => void;
  connections: IConnection[];
  deleteId: string | null;
  setDeleteId: React.Dispatch<React.SetStateAction<string | null>>;
  handleDeleteConnection: (id: string | null) => void;
};

export default ConnectionListProps;