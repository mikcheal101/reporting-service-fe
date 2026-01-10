// app/hooks/connection/use-save-connection.ts
"use client";

import { saveConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useSaveConnection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IConnection, AxiosError<{message: string}>, IConnection>({
    mutationFn: saveConnectionAsync,
    onSuccess: (newConnection) => {
      toast({
        title: "Success",
        description: "Connection saved successfully.",
      });

      // Update the query cache for "connections"
      queryClient.setQueryData<IConnection[]>(["connections"], (oldData) => oldData ? [...oldData, newConnection] : [newConnection]);
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: "Error",
        description: `Failed to save connection: ${error.response?.data?.message}`,
      });
    },
  });

  return mutation;
};

export default useSaveConnection;