import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report-type/report-type-service', () => ({
  fetchReportTypesAsync: vi.fn(),
}));

import { fetchReportTypesAsync } from '@/app/services/report-type/report-type-service';
import useReportType from '../use-report-type';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportType', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch report types', async () => {
    const types = [{ id: '1', name: 'Type A' }];
    vi.mocked(fetchReportTypesAsync).mockResolvedValue(types as any);

    const { result } = renderHook(() => useReportType(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(types));
  });
});
