import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-connection', () => ({
  default: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock('../use-save-connection', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-update-connection', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-delete-connection', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-connection-form', () => ({
  default: () => ({
    form: { id: '', name: '', server: '', port: 0, user: '', password: '', database: '', isTestSuccessful: false, databaseType: 3, description: '' },
    setForm: vi.fn(),
    resetForm: vi.fn(),
    handleChange: vi.fn(),
  }),
}));

vi.mock('../use-test-connection', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

import useConnectionTable from '../use-connection-table';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useConnectionTable', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    expect(result.current.viewMode).toBe('list');
    expect(result.current.connections).toEqual([]);
  });

  it('should reset fields', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    act(() => result.current.resetFields());
  });

  it('should handle edit connection', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    const conn = { id: '1', name: 'test', server: 'localhost', port: 1433, user: 'sa', password: '', database: 'test', isTestSuccessful: false, databaseType: 3, description: '' };
    act(() => result.current.handleEditConnection(conn));
  });

  it('should handle delete connection', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    act(() => result.current.handleDeleteConnection('5'));
  });

  it('should handle submit (update when form has id)', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    act(() => result.current.handleSubmit());
  });

  it('should handle test connection', () => {
    const { result } = renderHook(() => useConnectionTable(), { wrapper: createWrapper() });
    act(() => result.current.handleTestConnection());
  });
});
