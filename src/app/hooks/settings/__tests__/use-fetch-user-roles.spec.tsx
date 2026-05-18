import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/auth/auth-service', () => ({
  fetchRolesAsync: vi.fn(),
}));

import { fetchRolesAsync } from '@/app/services/auth/auth-service';
import useFetchUserRoles from '../use-fetch-user-roles';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchUserRoles', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch user roles', async () => {
    const roles = [{ id: 1, name: 'Admin' }];
    vi.mocked(fetchRolesAsync).mockResolvedValue(roles as any);

    const { result } = renderHook(() => useFetchUserRoles(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(roles));
  });
});
