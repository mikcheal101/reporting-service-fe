import { IUser } from "@/types/auth/iuser";
import { buildUrl } from "../../utils/urlBuilder";
import api from "../axios";
import { AxiosResponse } from "axios";
import { IRole } from "@/types/auth/irole";
import { IPermission } from "@/types/auth/ipermission";

// Users
export const fetchUserAsync = async (id: number): Promise<IUser> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_USERS)}/${id}`);
  return mapUserToIUser(apiResponse.data);
}

export const fetchUsersAsync = async (): Promise<IUser[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_USERS)}`);
  return apiResponse.data.map(mapUserToIUser);
};

export const deleteUserAsync = async (id: number): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.delete(`${buildUrl(process.env.NEXT_PUBLIC_USERS)}/${id}`);
  return apiResponse.data;
};

export const updateUserAsync = async (user: IUser): Promise<IUser> => {
  const apiResponse: AxiosResponse = await api.put(`${buildUrl(process.env.NEXT_PUBLIC_USERS)}/${user.id}`, user);
  return mapUserToIUser(apiResponse.data);
};

export const createUserAsync = async (user: IUser): Promise<IUser> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_USERS)}`, user);
  return mapUserToIUser(apiResponse.data);
};

// Roles
export const fetchRolesAsync = async (): Promise<IRole[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_ROLES)}`);
  return apiResponse.data;
};

export const fetchRoleAsync = async (id: number): Promise<IRole> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_ROLES)}/${id}`);
  return apiResponse.data;
};

export const deleteRoleAsync = async (id: number): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.delete(`${buildUrl(process.env.NEXT_PUBLIC_ROLES)}/${id}`);
  return apiResponse.data;
};

export const updateRoleAsync = async (role: IRole): Promise<IRole> => {
  const apiResponse: AxiosResponse = await api.put(`${buildUrl(process.env.NEXT_PUBLIC_ROLES)}/${role.id}`, role);
  return apiResponse.data;
};

export const createRoleAsync = async (role: IRole): Promise<IRole> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_ROLES)}`, role);
  return apiResponse.data;
};

// Permissions
export const fetchPermissionsAsync = async (): Promise<IPermission[]> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_PERMISSIONS)}`);
  return apiResponse.data;
};

// Authentication
export const loginAsync = async (username: string, password: string): Promise<void> => {
  await api.post(`${buildUrl(process.env.NEXT_PUBLIC_AUTHENTICATE)}`, { email: username, password });
}

export const logoutAsync = async (): Promise<void> => {
  await api.post(`${buildUrl(process.env.NEXT_PUBLIC_LOGOUT)}`);
}

export const meAsync = async (): Promise<IUser> => {
  const apiResponse: AxiosResponse = await api.get(`${buildUrl(process.env.NEXT_PUBLIC_PROFILE)}`);
  return mapUserToIUser(apiResponse.data);
}

export const assignUserToRoleAsync = async (payload: { userId: number; roleIds: Array<number>; }): Promise<boolean> => {
  const apiResponse: AxiosResponse = await api.post(`${buildUrl(process.env.NEXT_PUBLIC_ASSIGN_USER_ROLE)}`, payload);
  return apiResponse.data;
};

const mapUserToIUser = (user: any): IUser => {
  if (!user) return {} as IUser;

  return {
    id: user.id,
    fullName: [user.firstName, user.middleName, user.lastName].filter(Boolean).join(" "),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.email || user.username || "",
    phone: user.phoneNumber || "",
    roles: user.roles || [],
    permissions: user.permissions || [],
  };
};