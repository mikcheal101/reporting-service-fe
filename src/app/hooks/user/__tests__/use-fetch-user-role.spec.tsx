import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/auth/auth-service', () => ({
  fetchRoleAsync: vi.fn(),
}));

import { fetchRoleAsync } from '@/app/services/auth/auth-service';
import useFetchUserRole from '../use-fetch-user-role';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchUserRole', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch user role by id', async () => {
    const role = { id: 1, name: 'Admin' };
    vi.mocked(fetchRoleAsync).mockResolvedValue(role as any);

    const { result } = renderHook(() => useFetchUserRole(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(role));
  });

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => useFetchUserRole(0), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
  });
});
