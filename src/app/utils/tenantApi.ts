import { TenantDto, CreateTenantRequest, UpdateTenantRequest } from '@/@types/tenant';
import { buildUrl } from './urlBuilder';

export class TenantApiService {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = buildUrl(`/api${endpoint}`);
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'accept': '*/*',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle empty responses (like DELETE)
    if (response.status === 204 || response.headers.get('content-length') === '0') {
      return {} as T;
    }

    return response.json();
  }

  // GET all tenants
  static async getTenants(): Promise<TenantDto[]> {
    return this.request<TenantDto[]>('/Tenant');
  }

  // GET tenant by ID
  static async getTenantById(id: string): Promise<TenantDto> {
    return this.request<TenantDto>(`/Tenant/${id}`);
  }

  // POST create new tenant
  static async createTenant(tenant: CreateTenantRequest): Promise<TenantDto> {
    return this.request<TenantDto>('/Tenant', {
      method: 'POST',
      body: JSON.stringify(tenant),
    });
  }

  // PUT update existing tenant
  static async updateTenant(tenant: UpdateTenantRequest): Promise<TenantDto> {
    return this.request<TenantDto>('/Tenant', {
      method: 'PUT',
      body: JSON.stringify(tenant),
    });
  }

  // DELETE tenant by ID
  static async deleteTenant(id: string): Promise<void> {
    return this.request<void>(`/Tenant/${id}`, {
      method: 'DELETE',
    });
  }
}