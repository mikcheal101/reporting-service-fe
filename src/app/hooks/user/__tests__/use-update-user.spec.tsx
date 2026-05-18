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
import useUpdateUser from '../use-update-user';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useUpdateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast on mutation success', async () => {
    const apiUser = { id: 1, firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com' };
    (api.put as ReturnType<typeof vi.fn>).mockResolvedValue({ data: apiUser });

    const { result } = renderHook(() => useUpdateUser(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'User updated successfully',
        description: 'User Jane Smith (jane@test.com) updated successfully',
        variant: 'success',
      });
    });
  });

  it('should show error toast on mutation error', async () => {
    (api.put as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Update failed' } },
    });

    const { result } = renderHook(() => useUpdateUser(), { wrapper: createWrapper() });

    result.current.mutate({} as any);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
