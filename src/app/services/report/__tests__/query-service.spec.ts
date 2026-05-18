import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../axios';

vi.mock('../../axios', () => ({
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
  process.env.NEXT_PUBLIC_TEST_QUERY = '/api/v1/reports/test-query';
  process.env.NEXT_PUBLIC_EXECUTE_QUERY = '/api/v1/reports/execute-query';
  process.env.NEXT_PUBLIC_AI_GENERATE_QUERY = '/api/v1/reports/ai-generate-query';
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('testQueryAsync', () => {
  it('should post to test-query endpoint', async () => {
    const { testQueryAsync } = await import('../query-service');
    const mockPost = vi.mocked(api.post);
    const payload = { queryString: 'SELECT 1', reportId: '1', filters: [], joins: [], computedColumns: [], parameters: [], isFromQueryBuilder: false, limit: 100 };
    mockPost.mockResolvedValue({ data: [{ col: 1 }] });

    const result = await testQueryAsync(payload as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/test-query', payload);
    expect(result).toEqual([{ col: 1 }]);
  });
});

describe('executeQueryAsync', () => {
  it('should post to execute-query endpoint', async () => {
    const { executeQueryAsync } = await import('../query-service');
    const mockPost = vi.mocked(api.post);
    const payload = { queryString: 'SELECT *', reportId: '2', filters: [], joins: [], computedColumns: [], parameters: [], isFromQueryBuilder: false, limit: 50 };
    mockPost.mockResolvedValue({ data: [{ id: 1 }] });

    const result = await executeQueryAsync(payload as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/execute-query', payload);
    expect(result).toEqual([{ id: 1 }]);
  });
});

describe('generateAiQueryAsync', () => {
  it('should post to ai-generate-query endpoint', async () => {
    const { generateAiQueryAsync } = await import('../query-service');
    const mockPost = vi.mocked(api.post);
    const payload = { reportId: '1', prompt: 'show users', schemas: [] };
    mockPost.mockResolvedValue({ data: { query: 'SELECT * FROM users' } });

    const result = await generateAiQueryAsync(payload as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/ai-generate-query', payload);
    expect(result).toEqual({ query: 'SELECT * FROM users' });
  });
});
