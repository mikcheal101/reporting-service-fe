// app/hooks/connection/use-test-connection.ts
"use client";
import { testConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { TOAST_TITLES } from "../../constants/toast-titles.constant";

const useTestConnection = () => (useMutation<boolean, AxiosError<{ message: string }>, IConnection>({
  mutationFn: testConnectionAsync,
  onSuccess: (success) => {
    toast({ title: success ? TOAST_TITLES.SUCCESS : "Connection test failed", description: success ? "Connection test successful!" : "Could not establish connection. Please verify your credentials and server details.", variant: success ? "success" : "destructive" });
  },
  onError: (error: AxiosError<{ message: string }>) => {
    toast({ title: "Connection test failed", description: error.response?.data?.message || "Could not reach the server. Please check the address and port.", variant: "destructive" });
  },
}));

export default useTestConnection;