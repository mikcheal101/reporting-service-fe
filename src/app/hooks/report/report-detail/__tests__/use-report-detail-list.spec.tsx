import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/utils/useLocalStorage', () => ({
  safeLocalStorage: { getItem: vi.fn(), setItem: vi.fn(), removeItem: vi.fn() },
}));

vi.mock('@/context/TableDataContext', () => ({
  useTableData: () => ({
    tableData: [],
    setTableData: vi.fn(),
    isLoading: false,
    setIsLoading: vi.fn(),
    error: null,
    setError: vi.fn(),
  }),
}));

vi.mock('../../connection/use-connection-tables', () => ({
  default: () => ({ data: [] }),
}));

import useReportDetailList from '../use-report-detail-list';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportDetailList', () => {
  it('should initialize with empty expanded tables', () => {
    const { result } = renderHook(() => useReportDetailList({ activeConnectionId: 1 }), { wrapper: createWrapper() });
    expect(result.current.expandedTables).toEqual({});
  });

  it('should toggle table expansion', () => {
    const { result } = renderHook(() => useReportDetailList({ activeConnectionId: 1 }), { wrapper: createWrapper() });
    act(() => result.current.toggleTable('Users'));
    expect(result.current.expandedTables.Users).toBe(true);
    act(() => result.current.toggleTable('Users'));
    expect(result.current.expandedTables.Users).toBe(false);
  });

  it('should handle drag start', () => {
    const { result } = renderHook(() => useReportDetailList({ activeConnectionId: 1 }), { wrapper: createWrapper() });
    const setData = vi.fn();
    result.current.handleDragStart({ dataTransfer: { setData } } as any, 'Users', 'id');
    expect(setData).toHaveBeenCalledWith('column', JSON.stringify({ tableName: 'Users', columnName: 'id' }));
  });
});
