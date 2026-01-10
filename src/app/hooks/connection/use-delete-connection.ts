// app/hooks/connection/use-delete-connection
"use client";

import { deleteConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useDeleteConnection = () => {
  const queryClient = useQueryClient();
  return useMutation<boolean, AxiosError<{message: string}>, number>( {
    mutationFn: deleteConnectionAsync,
    onSuccess: () => {
      toast({
        title: `Deleted`,
        description: `Connection deleted successfully!`
      });
      
      queryClient.invalidateQueries({ queryKey: ['connections'] });
    },
    onError: (error: AxiosError<{message: string}>) => {
      toast({ title: "Failed to delete connection", description: `Error: ${error.response?.data?.message}` });
    }
  });
};

export default useDeleteConnection;