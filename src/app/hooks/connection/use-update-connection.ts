// app/hooks/connection/use-update-connection
"use client";

import { updateConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useUpdateConnection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IConnection, AxiosError<{message: string}>, IConnection>({
    mutationFn: updateConnectionAsync,
    onSuccess: (updatedConnection) => {
      toast({
        title: "Success",
        description: "Connection updated successfully.",
      });

      // Update the query cache for "connections"
      queryClient.setQueryData<IConnection[]>(["connections"], (connections) => connections?.map((conn) => conn.id === updatedConnection.id ? updatedConnection : conn) || []);

    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: "Error",
        description: `Failed to update connection: ${error.response?.data?.message}`,
      });
    },
  });

  return mutation;
};

export default useUpdateConnection;