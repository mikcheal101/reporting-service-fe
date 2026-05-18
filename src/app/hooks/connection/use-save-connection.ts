// app/hooks/connection/use-save-connection.ts
"use client";

import { saveConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useSaveConnection = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<IConnection, AxiosError<{message: string}>, IConnection>({
    mutationFn: saveConnectionAsync,
    onSuccess: (newConnection) => {
      toast({
        title: TOAST_TITLES.SUCCESS,
        description: "Connection saved successfully.",
        variant: "success",
      });

      // Update the query cache for "connections"
      queryClient.setQueryData<IConnection[]>([QUERY_KEYS.CONNECTIONS], (oldData) => oldData ? [...oldData, newConnection] : [newConnection]);
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({
        title: TOAST_TITLES.ERROR,
        description: error.response?.data?.message || "Failed to save connection. Please check your details and try again.",
        variant: "destructive",
      });
    },
  });

  return mutation;
};

export default useSaveConnection;