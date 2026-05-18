// app/services/axios.ts
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { TOAST_TITLES } from "../constants/toast-titles.constant";
import { FE_ROUTES } from "../constants/routes.constant";

const api = axios.create({
  withCredentials: true,
});

// Globally handle 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // redirect to login
      if (globalThis.location.pathname !== FE_ROUTES.SIGNIN) {
        toast({
          title: TOAST_TITLES.SESSION_EXPIRED,
          description: "Please sign in again.",
          variant: "warning",
        });
        globalThis.location.href = FE_ROUTES.SIGNIN;
      }
    }
    return Promise.reject(error);
  }
);

export default api;