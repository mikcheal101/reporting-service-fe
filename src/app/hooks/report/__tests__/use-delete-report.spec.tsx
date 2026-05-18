import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

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

import api from '@/app/services/axios';
import { toast } from '@/hooks/use-toast';
import useDeleteReport from '../use-delete-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDeleteReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast on mutation success', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({ data: true });

    const { result } = renderHook(() => useDeleteReport(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on mutation error', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Delete failed' } },
    });

    const { result } = renderHook(() => useDeleteReport(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
