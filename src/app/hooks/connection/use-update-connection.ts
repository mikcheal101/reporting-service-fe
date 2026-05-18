// app/hooks/connection/use-update-connection
"use client";

import { updateConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useUpdateConnection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IConnection, AxiosError<{message: string}>, IConnection>({
    mutationFn: updateConnectionAsync,
    onSuccess: (updatedConnection) => {
      toast({
        title: TOAST_TITLES.SUCCESS,
        description: "Connection updated successfully.",
        variant: "success",
      });

      // Update the query cache for "connections"
      queryClient.setQueryData<IConnection[]>([QUERY_KEYS.CONNECTIONS], (connections) => connections?.map((conn) => conn.id === updatedConnection.id ? updatedConnection : conn) || []);

    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: TOAST_TITLES.ERROR,
        description: error.response?.data?.message || "Failed to update connection. Please check your details and try again.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useUpdateConnection;