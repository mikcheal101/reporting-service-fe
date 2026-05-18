import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@/app/services/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

import { toast } from '@/hooks/use-toast';
import api from '@/app/services/axios';
import useUpdateReportType from '../use-update-report-type';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUpdateReportType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast on mutation success', async () => {
    const updated = { id: '1', name: 'Updated Report Type' };
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValue({ data: updated });

    const { result } = renderHook(() => useUpdateReportType(), { wrapper: createWrapper() });

    result.current.mutate(updated as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on mutation error', async () => {
    (api.put as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Update failed' } },
    });

    const { result } = renderHook(() => useUpdateReportType(), { wrapper: createWrapper() });

    result.current.mutate({ id: '1' } as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
