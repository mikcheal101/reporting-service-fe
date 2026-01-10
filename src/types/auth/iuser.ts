// types/auth/iuser.ts
"use client";

import { IPermission } from "./ipermission";
import { IRole } from "./irole";

export interface IUser {
  id: number;
  fullName: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  username: string;
  phone: string;
  password?: string;
  roles?: Array<IRole>;
  permissions?: Array<IPermission>;
}