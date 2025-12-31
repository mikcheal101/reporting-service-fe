import { UserDto, CreateUserDto, UpdateUserDto, UserRole, UserStats } from '@/types/user';

// Mock user data
export const mockUsers: UserDto[] = [
  {
    id: '1',
    tenantId: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@acmecorp.com',
    role: UserRole.ADMIN,
    isActive: true,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    phoneNumber: '+1 (555) 123-4567',
    department: 'Engineering',
    jobTitle: 'Senior Software Engineer',
    lastLoginAt: '2024-01-15T10:30:00Z',
    createdOn: '2023-06-15T08:00:00Z',
    updatedOn: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    tenantId: '1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@acmecorp.com',
    role: UserRole.MANAGER,
    isActive: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    phoneNumber: '+1 (555) 234-5678',
    department: 'Marketing',
    jobTitle: 'Marketing Manager',
    lastLoginAt: '2024-01-14T16:45:00Z',
    createdOn: '2023-07-20T09:15:00Z',
    updatedOn: '2024-01-14T16:45:00Z'
  },
  {
    id: '3',
    tenantId: '1',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@acmecorp.com',
    role: UserRole.USER,
    isActive: true,
    phoneNumber: '+1 (555) 345-6789',
    department: 'Sales',
    jobTitle: 'Sales Representative',
    lastLoginAt: '2024-01-13T14:20:00Z',
    createdOn: '2023-08-10T11:30:00Z',
    updatedOn: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    tenantId: '1',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@acmecorp.com',
    role: UserRole.VIEWER,
    isActive: false,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    phoneNumber: '+1 (555) 456-7890',
    department: 'HR',
    jobTitle: 'HR Coordinator',
    lastLoginAt: '2023-12-20T09:00:00Z',
    createdOn: '2023-09-05T13:45:00Z',
    updatedOn: '2023-12-20T09:00:00Z'
  },
  {
    id: '5',
    tenantId: '2',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@techstart.io',
    role: UserRole.ADMIN,
    isActive: true,
    phoneNumber: '+1 (555) 567-8901',
    department: 'Engineering',
    jobTitle: 'CTO',
    lastLoginAt: '2024-01-15T11:15:00Z',
    createdOn: '2023-05-01T10:00:00Z',
    updatedOn: '2024-01-15T11:15:00Z'
  },
  {
    id: '6',
    tenantId: '2',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@techstart.io',
    role: UserRole.MANAGER,
    isActive: true,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    phoneNumber: '+1 (555) 678-9012',
    department: 'Product',
    jobTitle: 'Product Manager',
    lastLoginAt: '2024-01-14T15:30:00Z',
    createdOn: '2023-05-15T14:20:00Z',
    updatedOn: '2024-01-14T15:30:00Z'
  }
];

// Mock API functions
export const mockUserApi = {
  async getUsers(tenantId: string): Promise<UserDto[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUsers.filter(user => user.tenantId === tenantId);
  },

  async createUser(userData: CreateUserDto): Promise<UserDto> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: UserDto = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      lastLoginAt: undefined,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    return newUser;
  },

  async updateUser(id: string, userData: UpdateUserDto): Promise<UserDto> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...mockUsers[userIndex],
      ...userData,
      updatedOn: new Date().toISOString()
    };
    
    mockUsers[userIndex] = updatedUser;
    return updatedUser;
  },

  async deleteUser(id: string): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const userIndex = mockUsers.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    mockUsers.splice(userIndex, 1);
  },

  async getUserStats(tenantId: string): Promise<UserStats> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const tenantUsers = mockUsers.filter(user => user.tenantId === tenantId);
    const active = tenantUsers.filter(user => user.isActive).length;
    const inactive = tenantUsers.length - active;
    
    const byRole = {
      [UserRole.ADMIN]: tenantUsers.filter(user => user.role === UserRole.ADMIN).length,
      [UserRole.MANAGER]: tenantUsers.filter(user => user.role === UserRole.MANAGER).length,
      [UserRole.USER]: tenantUsers.filter(user => user.role === UserRole.USER).length,
      [UserRole.VIEWER]: tenantUsers.filter(user => user.role === UserRole.VIEWER).length
    };
    
    return {
      total: tenantUsers.length,
      active,
      inactive,
      byRole
    };
  }
};

// Helper functions
export const getUserRoleColor = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case UserRole.MANAGER:
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case UserRole.USER:
      return 'bg-green-100 text-green-800 border-green-200';
    case UserRole.VIEWER:
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getUserRoleIcon = (role: UserRole): string => {
  switch (role) {
    case UserRole.ADMIN:
      return '👑';
    case UserRole.MANAGER:
      return '👔';
    case UserRole.USER:
      return '👤';
    case UserRole.VIEWER:
      return '👁️';
    default:
      return '👤';
  }
};