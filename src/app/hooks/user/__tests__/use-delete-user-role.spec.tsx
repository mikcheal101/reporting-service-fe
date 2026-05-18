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
import useDeleteUserRole from '../use-delete-user-role';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useDeleteUserRole', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show success toast when delete returns true', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({ data: true });

    const { result } = renderHook(() => useDeleteUserRole(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'User role deleted successfully',
        description: 'User role with ID 1 deleted successfully',
        variant: 'success',
      });
    });
  });

  it('should show destructive toast when delete returns false', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockResolvedValue({ data: false });

    const { result } = renderHook(() => useDeleteUserRole(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Error deleting user role',
        description: 'Error deleting user role',
        variant: 'destructive',
      });
    });
  });

  it('should show error toast on mutation error', async () => {
    (api.delete as ReturnType<typeof vi.fn>).mockRejectedValue({
      response: { data: { message: 'Delete failed' } },
    });

    const { result } = renderHook(() => useDeleteUserRole(), { wrapper: createWrapper() });

    result.current.mutate(1);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({ variant: 'destructive' }));
    });
  });
});
