import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/report-service', () => ({
  fetchPendingReportsAsync: vi.fn(),
}));

import { fetchPendingReportsAsync } from '@/app/services/report/report-service';
import useFetchPendingReports from '../use-fetch-pending-reports';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchPendingReports', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch pending reports', async () => {
    const reports = [{ id: '1', status: 'pending' }];
    vi.mocked(fetchPendingReportsAsync).mockResolvedValue(reports as any);

    const { result } = renderHook(() => useFetchPendingReports(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(reports));
  });
});
