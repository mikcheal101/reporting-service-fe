import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/report-service', () => ({
  fetchReportsAsync: vi.fn(),
}));

import { fetchReportsAsync } from '@/app/services/report/report-service';
import useFetchReports from '../use-fetch-reports';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchReports', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch reports', async () => {
    const reports = [{ id: '1', name: 'Report 1' }];
    vi.mocked(fetchReportsAsync).mockResolvedValue(reports as any);

    const { result } = renderHook(() => useFetchReports(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(reports));
  });
});
