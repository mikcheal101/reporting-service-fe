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
  process.env.NEXT_PUBLIC_REPORT_TYPES = '/api/v1/report-types';
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('fetchReportTypesAsync', () => {
  it('should get all report types', async () => {
    const { fetchReportTypesAsync } = await import('../report-type-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ id: '1', name: 'Type A' }] });

    const result = await fetchReportTypesAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-types');
    expect(result).toEqual([{ id: '1', name: 'Type A' }]);
  });
});

describe('fetchReportTypeAsync', () => {
  it('should get a report type by id', async () => {
    const { fetchReportTypeAsync } = await import('../report-type-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: { id: '2', name: 'Type B' } });

    const result = await fetchReportTypeAsync('2');

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-types/2');
    expect(result).toEqual({ id: '2', name: 'Type B' });
  });
});

describe('saveReportTypeAsync', () => {
  it('should post a new report type', async () => {
    const { saveReportTypeAsync } = await import('../report-type-service');
    const mockPost = vi.mocked(api.post);
    const payload = { id: '', name: 'New Type', outputType: null, frequency: null, runDate: '', runTime: '', emailsToNotify: '' };
    mockPost.mockResolvedValue({ data: { ...payload, id: '3' } });

    const result = await saveReportTypeAsync(payload as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-types', payload);
    expect(result.id).toBe('3');
  });
});

describe('updateReportTypeAsync', () => {
  it('should put to update a report type', async () => {
    const { updateReportTypeAsync } = await import('../report-type-service');
    const mockPut = vi.mocked(api.put);
    const payload = { id: '1', name: 'Updated Type', outputType: null, frequency: null, runDate: '', runTime: '', emailsToNotify: '' };
    mockPut.mockResolvedValue({ data: payload });

    const result = await updateReportTypeAsync(payload as any);

    expect(mockPut).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-types/1', payload);
    expect(result.name).toBe('Updated Type');
  });
});

describe('deleteReportTypeAsync', () => {
  it('should delete a report type by id', async () => {
    const { deleteReportTypeAsync } = await import('../report-type-service');
    const mockDelete = vi.mocked(api.delete);
    mockDelete.mockResolvedValue({ data: true });

    const result = await deleteReportTypeAsync('5');

    expect(mockDelete).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-types/5');
    expect(result).toBe(true);
  });
});
