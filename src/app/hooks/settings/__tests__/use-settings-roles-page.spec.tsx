import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-delete-user-role', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useSettingsRolesPage from '../use-settings-roles-page';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSettingsRolesPage', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSettingsRolesPage(), { wrapper: createWrapper() });
    expect(result.current.isRoleFormOpen).toBe(false);
    expect(result.current.form.id).toBe(0);
  });

  it('should open role form', () => {
    const { result } = renderHook(() => useSettingsRolesPage(), { wrapper: createWrapper() });
    act(() => result.current.setIsRoleFormOpen(true));
    expect(result.current.isRoleFormOpen).toBe(true);
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useSettingsRolesPage(), { wrapper: createWrapper() });
    act(() => result.current.setForm({ id: 5, name: 'Test', permissions: [] }));
    act(() => result.current.resetForm());
    expect(result.current.form.id).toBe(0);
  });

  it('should detect new form', () => {
    const { result } = renderHook(() => useSettingsRolesPage(), { wrapper: createWrapper() });
    expect(result.current.isNewForm()).toBe(true);
    act(() => result.current.setForm({ id: 1, name: 'Test', permissions: [] }));
    expect(result.current.isNewForm()).toBe(false);
  });

  it('should handle delete role', () => {
    const { result } = renderHook(() => useSettingsRolesPage(), { wrapper: createWrapper() });
    act(() => result.current.handleDeleteRole({ id: 1, name: 'Admin', permissions: [] }));
  });
});
