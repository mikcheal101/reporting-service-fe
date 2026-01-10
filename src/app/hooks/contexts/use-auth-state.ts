// app/hooks/use-auth-state.ts
"use client";
import IAuthContextType from "@/types/context/iauth.context";
import { IUser } from "@/types/auth/iuser"
import { useEffect, useState } from "react"
import * as authService from "../../services/auth/auth-service";

const useAuthState = (): IAuthContextType => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize app
  const initUser = async () => {
    setLoading(true);
    const fetchedUser = await authService.meAsync();
    setUser(fetchedUser);
    setLoading(false);
  }

  useEffect(() => {
    initUser();
  }, []);

  const handleLogin = async (username: string, password: string, callback?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      await authService.loginAsync(username, password);
      await initUser();
      if (callback) callback();
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        setError(exception?.message);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async (callback?: () => void) => {
    setLoading(true);
    try {
      await authService.logoutAsync();
      setUser(null);
      if (callback) callback();
    } catch (exception: unknown) {
      if (exception instanceof Error) setError(exception?.message);
    } finally {
      setLoading(false);
    }
  }

  return {
    user,
    error,
    loading,
    login: handleLogin,
    logout: handleLogout
  };
}

export default useAuthState;
