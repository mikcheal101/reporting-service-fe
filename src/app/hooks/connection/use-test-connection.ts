// app/hooks/connection/use-test-connection.ts
"use client";
import { testConnectionAsync } from "@/app/services/connection/connection-service";
import { toast } from "@/hooks/use-toast";
import IConnection from "@/types/connection/iconnection";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useTestConnection = () => (useMutation<boolean, AxiosError<{ message: string }>, IConnection>({
  mutationFn: testConnectionAsync,
  onSuccess: (success) => {
    toast({ title: success ? "Success" : "Failed", description: success ? "Connection Successful!" : "Connection Failed" });
  },
  onError: (error: AxiosError<{ message: string }>) => {
    toast({ title: "Error", description: error.response?.data?.message });
  },
}));

export default useTestConnection;