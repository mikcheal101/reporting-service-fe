"use client";

import { useAuth } from "./use-auth";
import { useMemo } from "react";

const usePermission = () => {
  const { user } = useAuth();

  const userPermissions = useMemo(() => {
    if (!user) return new Set<string>();
    const fromRoles =
      user.roles?.flatMap((r) => r.permissions?.map((p) => p.name) ?? []) ?? [];
    const direct = user.permissions?.map((p) => p.name) ?? [];
    return new Set([...fromRoles, ...direct]);
  }, [user]);

  const hasPermission = (permission: string) =>
    userPermissions.has(permission);

  const can = (resource: string, action: string) =>
    hasPermission(`${resource}.${action}`);

  return { hasPermission, can, userPermissions };
};

export default usePermission;
