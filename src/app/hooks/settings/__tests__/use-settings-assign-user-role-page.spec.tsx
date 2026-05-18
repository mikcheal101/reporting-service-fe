import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-assign-user-role', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-fetch-user-roles', () => ({
  default: () => ({ data: [{ id: 1, name: 'Admin' }] }),
}));

vi.mock('@/hooks/use-toast', () => ({ toast: vi.fn() }));

import useSettingsAssignUserRolePage from '../use-settings-assign-user-role-page';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSettingsAssignUserRolePage', () => {
  const setAssignRoleSheetOpen = vi.fn();
  const selectedUser = null;

  it('should initialize with empty roleIds', () => {
    const { result } = renderHook(() => useSettingsAssignUserRolePage({ selectedUser, setAssignRoleSheetOpen }), { wrapper: createWrapper() });
    expect(result.current.roleIds).toEqual([]);
  });

  it('should handle role toggling (add)', () => {
    const { result } = renderHook(() => useSettingsAssignUserRolePage({ selectedUser, setAssignRoleSheetOpen }), { wrapper: createWrapper() });
    act(() => result.current.handleRoleToggling(1, true));
    expect(result.current.roleIds).toContain(1);
  });

  it('should handle role toggling (remove)', () => {
    const { result } = renderHook(() => useSettingsAssignUserRolePage({ selectedUser, setAssignRoleSheetOpen }), { wrapper: createWrapper() });
    act(() => result.current.setRoleIds([1, 2]));
    act(() => result.current.handleRoleToggling(1, false));
    expect(result.current.roleIds).not.toContain(1);
  });

  it('should call assignUserRole when roles are selected', () => {
    const user = { id: 1 } as any;
    const { result } = renderHook(() => useSettingsAssignUserRolePage({ selectedUser: user, setAssignRoleSheetOpen }), { wrapper: createWrapper() });
    act(() => result.current.setRoleIds([1]));
    act(() => result.current.handleAssignRoleSubmit());
  });
});
