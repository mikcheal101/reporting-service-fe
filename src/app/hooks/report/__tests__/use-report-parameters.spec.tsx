import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/report-service', () => ({
  fetchReportParametersAsync: vi.fn(),
}));

import { fetchReportParametersAsync } from '@/app/services/report/report-service';
import useReportParameters from '../use-report-parameters';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportParameters', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch report parameters by id', async () => {
    const params = [{ name: 'param1', value: 'val1' }];
    vi.mocked(fetchReportParametersAsync).mockResolvedValue(params as any);

    const { result } = renderHook(() => useReportParameters(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(params));
  });

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => useReportParameters(0), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
  });
});
