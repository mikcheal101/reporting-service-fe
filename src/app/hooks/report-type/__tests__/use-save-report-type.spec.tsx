import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report-type/report-type-service', () => ({
  saveReportTypeAsync: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({ toast: vi.fn() }));

import { saveReportTypeAsync } from '@/app/services/report-type/report-type-service';
import { toast } from '@/hooks/use-toast';
import useSaveReportType from '../use-save-report-type';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSaveReportType', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should show success toast on mutation success', async () => {
    vi.mocked(saveReportTypeAsync).mockResolvedValue({ id: '1', name: 'New Type' } as any);

    const { result } = renderHook(() => useSaveReportType(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on mutation error', async () => {
    vi.mocked(saveReportTypeAsync).mockRejectedValue({
      response: { data: { message: 'Save failed' } },
    });

    const { result } = renderHook(() => useSaveReportType(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
