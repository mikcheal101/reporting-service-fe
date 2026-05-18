// app/hooks/connection/use-connection-tables.ts
"use client";

import { fetchConnectionTablesAsync } from "@/app/services/connection/connection-service";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useConnectionTables = (id: number) => (useQuery<string[], Error>({
  queryKey: [QUERY_KEYS.CONNECTION_TABLES, id],
  queryFn: () => fetchConnectionTablesAsync(id),
  enabled: id > 0,
  retry: 2, // Retry up to 2 times on failure
}));

export default useConnectionTables;