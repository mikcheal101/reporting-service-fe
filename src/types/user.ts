export interface UserDto {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
  department?: string;
  jobTitle?: string;
  lastLoginAt?: string;
  createdOn: string;
  updatedOn: string;
}

export interface CreateUserDto {
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
  department?: string;
  jobTitle?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: UserRole;
  isActive?: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
  department?: string;
  jobTitle?: string;
}

export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<UserRole, number>;
}

export interface UserFilters {
  searchTerm: string;
  roleFilter: UserRole | 'all';
  statusFilter: 'all' | 'active' | 'inactive';
  departmentFilter: string | 'all';
}