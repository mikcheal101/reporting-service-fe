import { describe, it, expect, vi, beforeEach } from 'vitest';
import api from '../../axios';
import { buildUrl } from '@/app/utils/urlBuilder';

vi.mock('../../axios', () => ({
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

const ORIGINAL_ENV = process.env;

beforeEach(() => {
  vi.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
  process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
  process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
  process.env.NEXT_PUBLIC_APP_API_PORT = '4050';
  process.env.NEXT_PUBLIC_REPORTS = '/api/v1/reports';
  process.env.NEXT_PUBLIC_REPORT_PARAMETERS = '/api/v1/report-parameters';
  process.env.NEXT_PUBLIC_GENERATE_REPORT = '/api/v1/reports/generate';
  process.env.NEXT_PUBLIC_SCHEDULED_REPORT = '/api/v1/reports/scheduled';
  process.env.NEXT_PUBLIC_PENDING_REPORT = '/api/v1/reports/pending';
  process.env.NEXT_PUBLIC_DOWNLOAD_REPORT = '/api/v1/reports/download';
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe('saveReportAsync', () => {
  it('should post to reports endpoint', async () => {
    const { saveReportAsync } = await import('../report-service');
    const mockPost = vi.mocked(api.post);
    const report = { id: '1', name: 'test-report' };
    mockPost.mockResolvedValue({ data: report });

    const result = await saveReportAsync(report as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports', report);
    expect(result).toEqual(report);
  });
});

describe('deleteReportAsync', () => {
  it('should delete report by id', async () => {
    const { deleteReportAsync } = await import('../report-service');
    const mockDelete = vi.mocked(api.delete);
    mockDelete.mockResolvedValue({ data: true });

    const result = await deleteReportAsync(5);

    expect(mockDelete).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/5');
    expect(result).toBe(true);
  });
});

describe('updateReportAsync', () => {
  it('should put to reports endpoint', async () => {
    const { updateReportAsync } = await import('../report-service');
    const mockPut = vi.mocked(api.put);
    const report = { id: '2', name: 'updated' };
    mockPut.mockResolvedValue({ data: report });

    const result = await updateReportAsync(report as any);

    expect(mockPut).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/2', report);
    expect(result).toEqual(report);
  });
});

describe('fetchReportAsync', () => {
  it('should get report by id', async () => {
    const { fetchReportAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: { id: '3' } });

    const result = await fetchReportAsync(3);

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/3');
    expect(result).toEqual({ id: '3' });
  });
});

describe('fetchReportsAsync', () => {
  it('should get all reports', async () => {
    const { fetchReportsAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ id: '1' }, { id: '2' }] });

    const result = await fetchReportsAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports');
    expect(result).toHaveLength(2);
  });
});

describe('fetchReportParametersAsync', () => {
  it('should get parameters by id', async () => {
    const { fetchReportParametersAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ name: 'param1' }] });

    const result = await fetchReportParametersAsync(4);

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/report-parameters/4');
    expect(result).toEqual([{ name: 'param1' }]);
  });
});

describe('scheduleReportAsync', () => {
  it('should post to generate endpoint', async () => {
    const { scheduleReportAsync } = await import('../report-service');
    const mockPost = vi.mocked(api.post);
    mockPost.mockResolvedValue({ data: true });

    const result = await scheduleReportAsync({} as any);

    expect(mockPost).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/generate', {});
    expect(result).toBe(true);
  });
});

describe('fetchGeneratedReportsAsync', () => {
  it('should get scheduled reports', async () => {
    const { fetchGeneratedReportsAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ id: '1' }] });

    const result = await fetchGeneratedReportsAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/scheduled');
    expect(result).toEqual([{ id: '1' }]);
  });
});

describe('fetchPendingReportsAsync', () => {
  it('should get pending reports', async () => {
    const { fetchPendingReportsAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({ data: [{ id: '1' }] });

    const result = await fetchPendingReportsAsync();

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/pending');
    expect(result).toEqual([{ id: '1' }]);
  });
});

describe('downloadReportAsync', () => {
  it('should get blob and parse filename from content-disposition', async () => {
    const { downloadReportAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    const blob = new Blob(['test']);
    mockGet.mockResolvedValue({
      data: blob,
      headers: { 'content-disposition': 'attachment; filename="report.pdf"' },
    });

    const result = await downloadReportAsync('abc-123');

    expect(mockGet).toHaveBeenCalledWith('http://localhost:4050/api/v1/reports/download/abc-123', { responseType: 'blob' });
    expect(result.blob).toBe(blob);
    expect(result.filename).toBe('report.pdf');
  });

  it('should handle UTF-8 encoded filename', async () => {
    const { downloadReportAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({
      data: new Blob(['']),
      headers: { 'content-disposition': "attachment; filename*=UTF-8''report%C3%A9.pdf" },
    });

    const result = await downloadReportAsync('id');

    expect(result.filename).toBe('reporté.pdf');
  });

  it('should default filename when no content-disposition', async () => {
    const { downloadReportAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({
      data: new Blob(['']),
      headers: {},
    });

    const result = await downloadReportAsync('id');

    expect(result.filename).toBe('download');
  });

  it('should default filename when content-disposition has unrecognized format', async () => {
    const { downloadReportAsync } = await import('../report-service');
    const mockGet = vi.mocked(api.get);
    mockGet.mockResolvedValue({
      data: new Blob(['']),
      headers: { 'content-disposition': 'inline' },
    });

    const result = await downloadReportAsync('id');

    expect(result.filename).toBe('download');
  });
});
