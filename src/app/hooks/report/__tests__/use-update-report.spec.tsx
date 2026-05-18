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
import useUpdateReport from '../use-update-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUpdateReport', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast on mutation success', async () => {
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValue({ data: { id: 1, name: 'Updated' } });

    const { result } = renderHook(() => useUpdateReport(), { wrapper: createWrapper() });

    result.current.mutate({ id: 1 } as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on mutation error', async () => {
    (api.put as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Update failed' } },
    });

    const { result } = renderHook(() => useUpdateReport(), { wrapper: createWrapper() });

    result.current.mutate({ id: 1 } as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
