import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../../user/use-delete-user', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../../user/use-fetch-users', () => ({
  default: () => ({ data: [] }),
}));

import useSettingsUsersPage from '../use-settings-users-page';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSettingsUsersPage', () => {
  let setSelectedUser: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setSelectedUser = vi.fn();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSettingsUsersPage({ selectedUser: null, setSelectedUser }), { wrapper: createWrapper() });
    expect(result.current.users).toEqual([]);
    expect(result.current.isSheetOpen).toBe(false);
  });

  it('should trigger delete modal', () => {
    const { result } = renderHook(() => useSettingsUsersPage({ selectedUser: null, setSelectedUser }), { wrapper: createWrapper() });
    const user = { id: 1, fullName: 'John' } as any;
    act(() => result.current.triggerDeleteModal(user));
    expect(setSelectedUser).toHaveBeenCalledWith(user);
  });

  it('should not trigger delete modal for null user', () => {
    const { result } = renderHook(() => useSettingsUsersPage({ selectedUser: null, setSelectedUser }), { wrapper: createWrapper() });
    act(() => result.current.triggerDeleteModal(null as any));
    expect(setSelectedUser).not.toHaveBeenCalled();
  });
});
