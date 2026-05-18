import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../../user/use-create-user', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../../user/use-update-user', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useSettingsUsersForm from '../use-settings-users-form';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useSettingsUsersForm', () => {
  const setSelectedUser = vi.fn();
  const setIsSheetOpen = vi.fn();

  it('should init with empty form', () => {
    const { result } = renderHook(() => useSettingsUsersForm({ selectedUser: null, setSelectedUser, setIsSheetOpen }), { wrapper: createWrapper() });
    expect(result.current.form.id).toBe(0);
  });

  it('should handle input change', () => {
    const { result } = renderHook(() => useSettingsUsersForm({ selectedUser: null, setSelectedUser, setIsSheetOpen }), { wrapper: createWrapper() });
    act(() => result.current.handleInputChange({ target: { name: 'fullName', value: 'John Doe' } } as any));
    expect(result.current.form.fullName).toBe('John Doe');
  });

  it('should toggle password visibility', () => {
    const { result } = renderHook(() => useSettingsUsersForm({ selectedUser: null, setSelectedUser, setIsSheetOpen }), { wrapper: createWrapper() });
    expect(result.current.showPassword).toBe(false);
    act(() => result.current.togglePasswordVisibility());
    expect(result.current.showPassword).toBe(true);
  });

  it('should call createUser on submit for new user', () => {
    const { result } = renderHook(() => useSettingsUsersForm({ selectedUser: null, setSelectedUser, setIsSheetOpen }), { wrapper: createWrapper() });
    act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as any));
  });

  it('should call updateUser on submit for existing user', () => {
    const { result } = renderHook(
      () => useSettingsUsersForm({ selectedUser: { id: 1, fullName: 'John' } as any, setSelectedUser, setIsSheetOpen }),
      { wrapper: createWrapper() }
    );
    act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as any));
  });
});
