// app/hooks/connection/use-connection.ts
"use client";

import { fetchConnectionsAsync } from "@/app/services/connection/connection-service";
import IConnection from "@/types/connection/iconnection";
import { useQuery } from "@tanstack/react-query";

const useConnection = () => (useQuery<IConnection[], Error>({
  queryKey: ["connections"],
  queryFn: fetchConnectionsAsync,
  retry: 2, // Retry up to 2 times on failure
}));

export default useConnection;