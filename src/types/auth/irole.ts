// types/auth/irole.ts
"use client";

import { IPermission } from "./ipermission";

export interface IRole {
  id: number;
  name: string;
  permissions?: IPermission[];
}
