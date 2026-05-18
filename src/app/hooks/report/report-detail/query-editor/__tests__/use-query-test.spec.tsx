import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/query-service', () => ({
  testQueryAsync: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({ toast: vi.fn() }));

import { testQueryAsync } from '@/app/services/report/query-service';
import { toast } from '@/hooks/use-toast';
import useQueryTest from '../use-query-test';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useQueryTest', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should show success toast on success', async () => {
    vi.mocked(testQueryAsync).mockResolvedValue('result');

    const { result } = renderHook(() => useQueryTest(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on error', async () => {
    vi.mocked(testQueryAsync).mockRejectedValue({
      response: { data: { message: 'Query failed' } },
    });

    const { result } = renderHook(() => useQueryTest(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
