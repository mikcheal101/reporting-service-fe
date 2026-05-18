import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/auth/auth-service', () => ({
  fetchUserAsync: vi.fn(),
}));

import { fetchUserAsync } from '@/app/services/auth/auth-service';
import useFetchUser from '../use-fetch-user';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchUser', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch user by id', async () => {
    const user = { id: 1, fullName: 'John Doe' };
    vi.mocked(fetchUserAsync).mockResolvedValue(user as any);

    const { result } = renderHook(() => useFetchUser(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(user));
  });

  it('should not fetch when id is falsy', () => {
    const { result } = renderHook(() => useFetchUser(0), { wrapper: createWrapper() });
    expect(result.current.isFetching).toBe(false);
  });
});
