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
import useDeleteReportType from '../use-delete-report-type';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDeleteReportType', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast on delete success', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({ data: true });

    const { result } = renderHook(() => useDeleteReportType(), { wrapper: createWrapper() });

    result.current.mutate('report-type-id');

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on delete error', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Delete failed' } },
    });

    const { result } = renderHook(() => useDeleteReportType(), { wrapper: createWrapper() });

    result.current.mutate('report-type-id');

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
