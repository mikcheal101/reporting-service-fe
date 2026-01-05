import { TenantDto } from '@/@types/tenant';

export const mockTenants: TenantDto[] = [
  {
    id: '1',
    name: 'Acme Financial Services',
    description: 'Leading provider of microfinance solutions for small businesses and entrepreneurs across emerging markets.',
    logoUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-01-15T10:30:00Z',
    updatedOn: '2024-01-20T14:45:00Z'
  },
  {
    id: '2',
    name: 'Global Microfinance Corp',
    description: 'Empowering communities through accessible financial services and innovative lending solutions.',
    logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-01-10T09:15:00Z',
    updatedOn: '2024-01-25T16:20:00Z'
  },
  {
    id: '3',
    name: 'Community Credit Union',
    description: 'Member-owned financial cooperative serving local communities with personalized banking services.',
    logoUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=64&h=64&fit=crop&crop=center',
    isActive: false,
    createdOn: '2023-12-05T11:00:00Z',
    updatedOn: '2024-01-18T13:30:00Z'
  },
  {
    id: '4',
    name: 'Digital Lending Solutions',
    description: 'Technology-driven platform providing instant loan approvals and digital financial services.',
    logoUrl: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-02-01T08:45:00Z',
    updatedOn: '2024-02-10T12:15:00Z'
  },
  {
    id: '5',
    name: 'Rural Development Bank',
    description: 'Specialized financial institution focused on agricultural and rural development financing.',
    logoUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2023-11-20T14:20:00Z',
    updatedOn: '2024-01-30T10:45:00Z'
  },
  {
    id: '6',
    name: 'Urban Finance Hub',
    description: 'Modern financial services provider catering to urban professionals and small enterprises.',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-01-25T16:30:00Z',
    updatedOn: '2024-02-05T09:20:00Z'
  },
  {
    id: '7',
    name: 'Green Energy Finance',
    description: 'Sustainable finance solutions for renewable energy projects and eco-friendly initiatives.',
    logoUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=64&h=64&fit=crop&crop=center',
    isActive: false,
    createdOn: '2023-10-15T12:00:00Z',
    updatedOn: '2024-01-12T15:45:00Z'
  },
  {
    id: '8',
    name: 'Student Loan Services',
    description: 'Dedicated to providing affordable education financing and student support services.',
    logoUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-02-10T11:15:00Z',
    updatedOn: '2024-02-15T14:30:00Z'
  },
  {
    id: '9',
    name: 'Healthcare Finance Partners',
    description: 'Specialized lending for healthcare providers and medical equipment financing.',
    logoUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2023-12-20T13:45:00Z',
    updatedOn: '2024-01-28T11:20:00Z'
  },
  {
    id: '10',
    name: 'Tech Startup Funding',
    description: 'Venture capital and growth financing for innovative technology startups and scale-ups.',
    logoUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=64&h=64&fit=crop&crop=center',
    isActive: true,
    createdOn: '2024-01-05T10:00:00Z',
    updatedOn: '2024-02-08T16:45:00Z'
  }
];

// Helper function to simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockTenantApi = {
  getTenants: async (): Promise<TenantDto[]> => {
    await delay(800); // Simulate network delay
    return [...mockTenants];
  },
  
  createTenant: async (tenant: Omit<TenantDto, 'id' | 'createdOn' | 'updatedOn'>): Promise<TenantDto> => {
    await delay(600);
    const newTenant: TenantDto = {
      ...tenant,
      id: (mockTenants.length + 1).toString(),
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString()
    };
    mockTenants.push(newTenant);
    return newTenant;
  },
  
  updateTenant: async (tenant: TenantDto): Promise<TenantDto> => {
    await delay(600);
    const index = mockTenants.findIndex(t => t.id === tenant.id);
    if (index !== -1) {
      mockTenants[index] = { ...tenant, updatedOn: new Date().toISOString() };
      return mockTenants[index];
    }
    throw new Error('Tenant not found');
  },
  
  deleteTenant: async (id: string): Promise<void> => {
    await delay(400);
    const index = mockTenants.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTenants.splice(index, 1);
    } else {
      throw new Error('Tenant not found');
    }
  }
};