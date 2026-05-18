import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/auth/auth-service', () => ({
  fetchPermissionsAsync: vi.fn(),
}));

import { fetchPermissionsAsync } from '@/app/services/auth/auth-service';
import useFetchUserPermissions from '../use-fetch-user-permissions';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useFetchUserPermissions', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch permissions', async () => {
    const perms = [{ id: 1, name: 'perm1' }];
    vi.mocked(fetchPermissionsAsync).mockResolvedValue(perms as any);

    const { result } = renderHook(() => useFetchUserPermissions(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(perms));
  });
});
