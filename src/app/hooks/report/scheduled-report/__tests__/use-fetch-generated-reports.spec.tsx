import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/report-service', () => ({
  fetchGeneratedReportsAsync: vi.fn(),
}));

import { fetchGeneratedReportsAsync } from '@/app/services/report/report-service';
import useFetchGeneratedReports from '../use-fetch-generated-reports';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchGeneratedReports', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch generated reports', async () => {
    const reports = [{ id: '1', name: 'Report' }];
    vi.mocked(fetchGeneratedReportsAsync).mockResolvedValue(reports as any);

    const { result } = renderHook(() => useFetchGeneratedReports(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(reports));
  });
});
