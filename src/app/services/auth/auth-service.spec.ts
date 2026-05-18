import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../axios';

vi.mock('../axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
  process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
  process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
  process.env.NEXT_PUBLIC_APP_API_PORT = '4050';
  process.env.NEXT_PUBLIC_AUTHENTICATE = '/api/v1/auth/login';
  process.env.NEXT_PUBLIC_LOGOUT = '/api/v1/auth/logout';
  process.env.NEXT_PUBLIC_PROFILE = '/api/v1/auth/profile';
  process.env.NEXT_PUBLIC_USERS = '/api/v1/users';
  process.env.NEXT_PUBLIC_ROLES = '/api/v1/roles';
  process.env.NEXT_PUBLIC_ASSIGN_USER_ROLE = '/api/v1/users/assign-role';
  process.env.NEXT_PUBLIC_PERMISSIONS = '/api/v1/permissions';
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('loginAsync', () => {
  it('should post email and password to the authenticate endpoint', async () => {
    const { loginAsync } = await import('./auth-service');
    const mockPost = vi.mocked(api.post);
    mockPost.mockResolvedValue({});

    await loginAsync('test@example.com', 'password123');

    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/auth/login',
      { email: 'test@example.com', password: 'password123' },
    );
  });
});

describe('logoutAsync', () => {
  it('should post to the logout endpoint', async () => {
    const { logoutAsync } = await import('./auth-service');
    const mockPost = vi.mocked(api.post);
    mockPost.mockResolvedValue({});

    await logoutAsync();

    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/auth/logout',
    );
  });
});

describe('meAsync', () => {
  it('should get profile and map to IUser', async () => {
    const { meAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    const apiUser = {
      id: 1,
      firstName: 'John',
      middleName: 'M',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      roles: [{ id: 1, name: 'admin' }],
      permissions: [{ id: 1, name: 'read' }],
    };
    mockGet.mockResolvedValue({ data: apiUser });

    const result = await meAsync();

    expect(mockGet).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/auth/profile',
    );
    expect(result).toEqual({
      id: 1,
      fullName: 'John M Doe',
      firstName: 'John',
      lastName: 'Doe',
      username: 'john@example.com',
      phone: '1234567890',
      roles: [{ id: 1, name: 'admin' }],
      permissions: [{ id: 1, name: 'read' }],
    });
  });
});

describe('fetchUserAsync', () => {
  it('should fetch a single user by id', async () => {
    const { fetchUserAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    const apiUser = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phoneNumber: '0987654321',
      roles: [],
      permissions: [],
    };
    mockGet.mockResolvedValue({ data: apiUser });

    const result = await fetchUserAsync(2);

    expect(mockGet).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/users/2',
    );
    expect(result.id).toBe(2);
    expect(result.fullName).toBe('Jane Smith');
    expect(result.username).toBe('jane@example.com');
  });
});

describe('fetchUsersAsync', () => {
  it('should fetch all users and map them', async () => {
    const { fetchUsersAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    const apiUsers = [
      { id: 1, firstName: 'A', lastName: 'B', email: 'a@b.com', phoneNumber: '111', roles: [], permissions: [] },
      { id: 2, firstName: 'C', lastName: 'D', email: 'c@d.com', phoneNumber: '222', roles: [], permissions: [] },
    ];
    mockGet.mockResolvedValue({ data: apiUsers });

    const result = await fetchUsersAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/users');
    expect(result).toHaveLength(2);
    expect(result[0].fullName).toBe('A B');
    expect(result[1].fullName).toBe('C D');
  });
});

describe('createUserAsync', () => {
  it('should post user and return mapped IUser', async () => {
    const { createUserAsync } = await import('./auth-service');
    const mockPost = vi.mocked(api.post);
    const newUser = {
      id: 0,
      firstName: 'New',
      lastName: 'User',
      email: 'new@user.com',
      password: 'secret',
      roles: [],
      permissions: [],
    } as any;
    const createdUser = {
      id: 3,
      firstName: 'New',
      lastName: 'User',
      email: 'new@user.com',
      phoneNumber: '',
      roles: [],
      permissions: [],
    };
    mockPost.mockResolvedValue({ data: createdUser });

    const result = await createUserAsync(newUser);

    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/users',
      newUser,
    );
    expect(result.id).toBe(3);
    expect(result.fullName).toBe('New User');
  });
});

describe('mapUserToIUser', () => {
  it('should return empty object when user is null', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const result = mapUserToIUser(null);
    expect(result).toEqual({});
  });

  it('should map all fields correctly', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 10,
      firstName: 'Alice',
      middleName: undefined,
      lastName: 'Wonder',
      email: 'alice@wonder.com',
      username: 'alice_w',
      phoneNumber: '555-0100',
      roles: [{ id: 2, name: 'editor' }],
      permissions: [{ id: 5, name: 'write' }],
    };

    const result = mapUserToIUser(raw);

    expect(result).toEqual({
      id: 10,
      fullName: 'Alice Wonder',
      firstName: 'Alice',
      lastName: 'Wonder',
      username: 'alice@wonder.com',
      phone: '555-0100',
      roles: [{ id: 2, name: 'editor' }],
      permissions: [{ id: 5, name: 'write' }],
    });
  });

  it('should prefer email over username for the username field', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 1,
      firstName: '',
      lastName: '',
      email: 'primary@email.com',
      username: 'fallback',
    };

    const result = mapUserToIUser(raw);

    expect(result.username).toBe('primary@email.com');
  });

  it('should fallback to username when email is not provided', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 1,
      firstName: '',
      lastName: '',
      username: 'fallback_user',
    };

    const result = mapUserToIUser(raw);

    expect(result.username).toBe('fallback_user');
  });

  it('should handle missing middleName', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
    };

    const result = mapUserToIUser(raw);

    expect(result.fullName).toBe('John Doe');
  });

  it('should use username fallback when email is missing', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'jane_doe',
    };

    const result = mapUserToIUser(raw);

    expect(result.username).toBe('jane_doe');
  });

  it('should default fields when missing', async () => {
    const { mapUserToIUser } = await import('./auth-service');
    const raw = {
      id: 3,
      firstName: 'No',
      lastName: 'Email',
    };

    const result = mapUserToIUser(raw);

    expect(result.username).toBe('');
    expect(result.phone).toBe('');
    expect(result.roles).toEqual([]);
    expect(result.permissions).toEqual([]);
  });
});

describe('updateUserAsync', () => {
  it('should call put with correct URL and user data', async () => {
    const { updateUserAsync } = await import('./auth-service');
    const mockPut = vi.mocked(api.put);
    mockPut.mockResolvedValue({ data: { id: 1, firstName: 'Updated', lastName: 'User', email: 'u@u.com', phoneNumber: '', roles: [], permissions: [] } });

    const user = { id: 1, firstName: 'Updated', lastName: 'User', username: 'u@u.com', phone: '', roles: [], permissions: [] } as any;
    await updateUserAsync(user);

    expect(mockPut).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/users/1',
      user,
    );
  });
});

describe('deleteUserAsync', () => {
  it('should call delete with correct URL', async () => {
    const { deleteUserAsync } = await import('./auth-service');
    const mockDelete = vi.mocked(api.delete);
    mockDelete.mockResolvedValue({ data: true });

    const result = await deleteUserAsync(5);

    expect(mockDelete).toHaveBeenCalledWith('http://localhost:4050/api/v1/users/5');
    expect(result).toBe(true);
  });
});

describe('assignUserToRoleAsync', () => {
  it('should call post with correct URL and payload', async () => {
    const { assignUserToRoleAsync } = await import('./auth-service');
    const mockPost = vi.mocked(api.post);
    mockPost.mockResolvedValue({ data: true });

    const payload = { userId: 1, roleIds: [2, 3] };
    const result = await assignUserToRoleAsync(payload);

    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/users/assign-role',
      payload,
    );
    expect(result).toBe(true);
  });
});

describe('fetchRoleAsync', () => {
  it('should call get with correct URL by id', async () => {
    const { fetchRoleAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: { id: 3, name: 'viewer' } });

    const result = await fetchRoleAsync(3);

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/roles/3');
    expect(result).toEqual({ id: 3, name: 'viewer' });
  });
});

describe('deleteRoleAsync', () => {
  it('should call delete with correct URL', async () => {
    const { deleteRoleAsync } = await import('./auth-service');
    const mockDelete = vi.mocked(api.delete);
    mockDelete.mockResolvedValue({ data: true });

    const result = await deleteRoleAsync(7);

    expect(mockDelete).toHaveBeenCalledWith('http://localhost:4050/api/v1/roles/7');
    expect(result).toBe(true);
  });
});

describe('updateRoleAsync', () => {
  it('should call put with correct URL', async () => {
    const { updateRoleAsync } = await import('./auth-service');
    const mockPut = vi.mocked(api.put);
    mockPut.mockResolvedValue({ data: { id: 2, name: 'editor-updated' } });

    const result = await updateRoleAsync({ id: 2, name: 'editor-updated' } as any);

    expect(mockPut).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/roles/2',
      { id: 2, name: 'editor-updated' },
    );
    expect(result).toEqual({ id: 2, name: 'editor-updated' });
  });
});

describe('createRoleAsync', () => {
  it('should call post with correct URL', async () => {
    const { createRoleAsync } = await import('./auth-service');
    const mockPost = vi.mocked(api.post);
    mockPost.mockResolvedValue({ data: { id: 10, name: 'new-role' } });

    const result = await createRoleAsync({ name: 'new-role' } as any);

    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:4050/api/v1/roles',
      { name: 'new-role' },
    );
    expect(result).toEqual({ id: 10, name: 'new-role' });
  });
});

describe('fetchPermissionsAsync', () => {
  it('should call get with correct URL', async () => {
    const { fetchPermissionsAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ id: 1, name: 'read' }, { id: 2, name: 'write' }] });

    const result = await fetchPermissionsAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/permissions');
    expect(result).toEqual([{ id: 1, name: 'read' }, { id: 2, name: 'write' }]);
  });
});

describe('fetchRolesAsync', () => {
  it('should call get with correct URL', async () => {
    const { fetchRolesAsync } = await import('./auth-service');
    const mockGet = vi.mocked(api.get);
    const roles = [{ id: 1, name: 'admin' }, { id: 2, name: 'editor' }];
    mockGet.mockResolvedValue({ data: roles });

    const result = await fetchRolesAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/roles');
    expect(result).toEqual(roles);
  });
});
