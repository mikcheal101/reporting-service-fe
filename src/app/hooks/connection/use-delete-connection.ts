// app/hooks/connection/use-delete-connection
"use client";

import { deleteConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";
import { QUERY_KEYS } from "../../constants/query-keys.constant";

const useDeleteConnection = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError<{message: string}>, number>( {
    mutationFn: deleteConnectionAsync,
    onSuccess: () => {
      toast({
        title: TOAST_TITLES.DELETED,
        description: `Connection deleted successfully!`,
        variant: "success",
      });
      
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CONNECTIONS] });
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({ title: TOAST_TITLES.FAILED_TO_DELETE_CONNECTION, description: error.response?.data?.message || "Something went wrong. Please try again.", variant: "destructive" });
    }
  });
};

export default useDeleteConnection;