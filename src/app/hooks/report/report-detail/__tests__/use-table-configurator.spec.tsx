import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/utils/useLocalStorage', () => ({
  safeLocalStorage: { getItem: () => '1' },
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock('../query-editor/use-query-test', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useTableConfigurator from '../use-table-configurator';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useTableConfigurator', () => {
  it('should init with one empty table', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    expect(result.current.tables).toHaveLength(1);
    expect(result.current.tables[0].tableName).toBe('');
  });

  it('should add and remove table', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    act(() => result.current.addTable());
    expect(result.current.tables).toHaveLength(2);
    act(() => result.current.removeTable(1));
    expect(result.current.tables).toHaveLength(1);
  });

  it('should update table field', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    act(() => result.current.updateTable(0, 'tableName', 'Users'));
    expect(result.current.tables[0].tableName).toBe('Users');
  });

  it('should add and remove column', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    act(() => result.current.addColumn(0));
    expect(result.current.tables[0].columns).toHaveLength(2);
    act(() => result.current.removeColumn(0, 1));
    expect(result.current.tables[0].columns).toHaveLength(1);
  });

  it('should update column', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    act(() => result.current.updateColumn(0, 0, 'name', 'id'));
    expect(result.current.tables[0].columns[0].name).toBe('id');
  });

  it('should handle drag over', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    const event = { preventDefault: vi.fn() };
    result.current.handleDragOver(event as any);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should submit with valid data', () => {
    const { result } = renderHook(() => useTableConfigurator(), { wrapper: createWrapper() });
    act(() => result.current.updateTable(0, 'tableName', 'Users'));
    act(() => result.current.updateColumn(0, 0, 'name', 'id'));
    act(() => result.current.handleSubmit());
  });
});
