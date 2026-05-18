import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/report-service', () => ({
  fetchReportAsync: vi.fn(),
}));

import { fetchReportAsync } from '@/app/services/report/report-service';
import useFetchReport from '../use-fetch-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchReport', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch report by id', async () => {
    const report = { id: '1', name: 'Report 1' };
    vi.mocked(fetchReportAsync).mockResolvedValue(report as any);

    const { result } = renderHook(() => useFetchReport(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(report));
  });

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => useFetchReport(0), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
  });
});
