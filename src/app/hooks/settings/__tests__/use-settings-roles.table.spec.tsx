import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-fetch-user-roles', () => ({
  default: () => ({ data: [{ id: 1, name: 'Admin' }] }),
}));

import useSettingsRolesTable from '../use-settings-roles.table';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSettingsRolesTable', () => {
  const setForm = vi.fn();
  const setIsRoleFormOpen = vi.fn();
  const setIsDeleteModalOpen = vi.fn();

  it('should return roles', () => {
    const { result } = renderHook(() => useSettingsRolesTable({ setForm, setIsRoleFormOpen, setIsDeleteModalOpen }), { wrapper: createWrapper() });
    expect(result.current.roles).toHaveLength(1);
  });

  it('should trigger update role', () => {
    const { result } = renderHook(() => useSettingsRolesTable({ setForm, setIsRoleFormOpen, setIsDeleteModalOpen }), { wrapper: createWrapper() });
    act(() => result.current.triggerUpdateRole({ id: 1, name: 'Admin' } as any));
    expect(setForm).toHaveBeenCalledWith({ id: 1, name: 'Admin' });
    expect(setIsRoleFormOpen).toHaveBeenCalledWith(true);
  });

  it('should trigger delete role modal', () => {
    const { result } = renderHook(() => useSettingsRolesTable({ setForm, setIsRoleFormOpen, setIsDeleteModalOpen }), { wrapper: createWrapper() });
    act(() => result.current.triggerDeleteRoleModal({ id: 1, name: 'Admin' } as any));
    expect(setForm).toHaveBeenCalledWith({ id: 1, name: 'Admin' });
    expect(setIsDeleteModalOpen).toHaveBeenCalledWith(true);
  });
});
