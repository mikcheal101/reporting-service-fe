import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/auth/auth-service', () => ({
  fetchUsersAsync: vi.fn(),
}));

import { fetchUsersAsync } from '@/app/services/auth/auth-service';
import useFetchUsers from '../use-fetch-users';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchUsers', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch users', async () => {
    const users = [{ id: 1, fullName: 'John Doe' }];
    vi.mocked(fetchUsersAsync).mockResolvedValue(users as any);

    const { result } = renderHook(() => useFetchUsers(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(users));
  });
});
