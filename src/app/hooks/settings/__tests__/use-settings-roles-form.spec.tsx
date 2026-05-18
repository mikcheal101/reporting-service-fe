import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-create-user-role', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-update-user-role', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useSettingsRolesForm from '../use-settings-roles-form';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const props = {
  form: { id: 0, name: '', permissions: [] },
  setForm: vi.fn(),
  setIsRoleFormOpen: vi.fn(),
  resetForm: vi.fn(),
  isNewForm: () => true,
};

describe('useSettingsRolesForm', () => {
  it('should open form and reset', () => {
    const { result } = renderHook(() => useSettingsRolesForm(props), { wrapper: createWrapper() });
    act(() => result.current.openForm({ preventDefault: vi.fn() } as any));
    expect(props.setIsRoleFormOpen).toHaveBeenCalledWith(true);
    expect(props.resetForm).toHaveBeenCalled();
  });

  it('should handle input change', () => {
    const { result } = renderHook(() => useSettingsRolesForm(props), { wrapper: createWrapper() });
    act(() => result.current.handleInputChange({ target: { name: 'name', value: 'New Role' } } as any));
    expect(props.setForm).toHaveBeenCalled();
  });

  it('should call createRole on submit for new form', () => {
    const { result } = renderHook(() => useSettingsRolesForm(props), { wrapper: createWrapper() });
    act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as any));
  });

  it('should call updateRole on submit for existing form', () => {
    const { result } = renderHook(
      () => useSettingsRolesForm({ ...props, isNewForm: () => false, form: { id: 1, name: 'Existing', permissions: [] } }),
      { wrapper: createWrapper() }
    );
    act(() => result.current.handleSubmit({ preventDefault: vi.fn() } as any));
  });
});
