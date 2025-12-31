export interface TenantDto {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
  createdOn: string;
  updatedOn?: string;
}

export interface CreateTenantRequest {
  name: string;
  description?: string;
  logoUrl?: string;
}

export interface UpdateTenantRequest {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  isActive: boolean;
}