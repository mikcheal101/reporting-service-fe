import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../axios';
import { buildUrl } from '@/app/utils/urlBuilder';

vi.mock('../axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@/app/utils/urlBuilder', () => ({
  buildUrl: vi.fn((path: string) => `http://localhost:4050${path}`),
}));

describe('connection-service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(buildUrl).mockReturnValue('http://localhost:4050/api/v1/reporting');
  });

  describe('saveConnectionAsync', () => {
    it('should post payload to reporting endpoint', async () => {
      const { saveConnectionAsync } = await import('./connection-service');
      const mockPost = vi.mocked(api.post);
      mockPost.mockResolvedValue({ data: { id: '1' } });

      const payload = { id: '1', name: 'test' } as any;
      const result = await saveConnectionAsync(payload);

      expect(mockPost).toHaveBeenCalledWith(
        'http://localhost:4050/api/v1/reporting',
        payload,
      );
      expect(result).toEqual({ id: '1' });
    });
  });

  describe('testConnectionAsync', () => {
    it('should post payload with test endpoint', async () => {
      const { testConnectionAsync } = await import('./connection-service');
      const mockPost = vi.mocked(api.post);
      mockPost.mockResolvedValue({ data: true });

      vi.mocked(buildUrl).mockReturnValue('http://localhost:4050/api/v1/reporting');
      const testEndpoint = '/test';
      vi.stubEnv('NEXT_PUBLIC_APP_TEST_CONNECTION_ENDPOINT', testEndpoint);

      const result = await testConnectionAsync({} as any);

      expect(mockPost).toHaveBeenCalledWith(
        'http://localhost:4050/api/v1/reporting/test',
        {},
      );
      expect(result).toBe(true);
    });
  });

  describe('fetchConnectionsAsync', () => {
    it('should get all connections', async () => {
      const { fetchConnectionsAsync } = await import('./connection-service');
      const mockGet = vi.mocked(api.get);
      const connections = [{ id: '1', name: 'conn1' }];
      mockGet.mockResolvedValue({ data: connections });

      const result = await fetchConnectionsAsync();

      expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reporting');
      expect(result).toEqual(connections);
    });
  });

  describe('fetchConnectionAsync', () => {
    it('should get a single connection by id', async () => {
      const { fetchConnectionAsync } = await import('./connection-service');
      const mockGet = vi.mocked(api.get);
      mockGet.mockResolvedValue({ data: { id: '5' } });

      const result = await fetchConnectionAsync(5);

      expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reporting/5');
      expect(result).toEqual({ id: '5' });
    });
  });

  describe('updateConnectionAsync', () => {
    it('should put payload to connection endpoint', async () => {
      const { updateConnectionAsync } = await import('./connection-service');
      const mockPut = vi.mocked(api.put);
      mockPut.mockResolvedValue({ data: { id: '3' } });

      const payload = { id: '3', name: 'updated' } as any;
      const result = await updateConnectionAsync(payload);

      expect(mockPut).toHaveBeenCalledWith(
        'http://localhost:4050/api/v1/reporting/3',
        payload,
      );
      expect(result).toEqual({ id: '3' });
    });
  });

  describe('deleteConnectionAsync', () => {
    it('should delete connection by id', async () => {
      const { deleteConnectionAsync } = await import('./connection-service');
      const mockDelete = vi.mocked(api.delete);
      mockDelete.mockResolvedValue({ data: true });

      const result = await deleteConnectionAsync(10);

      expect(mockDelete).toHaveBeenCalledWith('http://localhost:4050/api/v1/reporting/10');
      expect(result).toBe(true);
    });
  });

  describe('fetchConnectionTablesAsync', () => {
    it('should get tables for a connection', async () => {
      const { fetchConnectionTablesAsync } = await import('./connection-service');
      const mockGet = vi.mocked(api.get);
      mockGet.mockResolvedValue({ data: ['users', 'orders'] });

      const result = await fetchConnectionTablesAsync(2);

      expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reporting/2/tables');
      expect(result).toEqual(['users', 'orders']);
    });
  });
});
