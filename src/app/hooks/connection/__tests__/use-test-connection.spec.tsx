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
import useTestConnection from '../use-test-connection';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useTestConnection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast when test succeeds', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: true });

    const { result } = renderHook(() => useTestConnection(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show destructive toast when test returns false', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockResolvedValue({ data: false });

    const { result } = renderHook(() => useTestConnection(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });

  it('should show error toast on exception', async () => {
    (api.post as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Connection error' } },
    });

    const { result } = renderHook(() => useTestConnection(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
