import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/report/query-service', () => ({
  generateAiQueryAsync: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({ toast: vi.fn() }));

import { generateAiQueryAsync } from '@/app/services/report/query-service';
import { toast } from '@/hooks/use-toast';
import useGenerateAiQuery from '../use-generate-ai.query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useGenerateAiQuery', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should show success toast on success', async () => {
    vi.mocked(generateAiQueryAsync).mockResolvedValue('SELECT * FROM users');

    const { result } = renderHook(() => useGenerateAiQuery(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'success' }));
    });
  });

  it('should show error toast on error', async () => {
    vi.mocked(generateAiQueryAsync).mockRejectedValue(new Error('AI failed'));

    const { result } = renderHook(() => useGenerateAiQuery(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
