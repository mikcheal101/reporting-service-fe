import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-report-type', () => ({
  default: () => ({ data: [], isLoading: false, isError: false }),
}));

vi.mock('../use-save-report-type', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock('../use-update-report-type', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock('../use-delete-report-type', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

vi.mock('../use-report-type-form', () => ({
  default: () => ({
    form: { id: '', name: '', outputType: null, frequency: null, runDate: '', runTime: '', emailsToNotify: '' },
    setForm: vi.fn(),
    resetForm: vi.fn(),
    handleChange: vi.fn(),
  }),
}));

import useReportTypeTable from '../use-report-type-table';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportTypeTable', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useReportTypeTable(), { wrapper: createWrapper() });
    expect(result.current.isOpen).toBe(false);
    expect(result.current.reportTypes).toEqual([]);
  });

  it('should handle save', async () => {
    const { result } = renderHook(() => useReportTypeTable(), { wrapper: createWrapper() });
    await act(async () => result.current.handleSave());
    expect(result.current.isOpen).toBe(false);
  });

  it('should handle update', async () => {
    const { result } = renderHook(() => useReportTypeTable(), { wrapper: createWrapper() });
    await act(async () => result.current.handleUpdate());
    expect(result.current.isOpen).toBe(false);
  });

  it('should handle delete', async () => {
    const { result } = renderHook(() => useReportTypeTable(), { wrapper: createWrapper() });
    await act(async () => result.current.handleDelete('1'));
  });

  it('should handle edit report type', () => {
    const { result } = renderHook(() => useReportTypeTable(), { wrapper: createWrapper() });
    const reportType = { id: '1', name: 'Type' } as any;
    act(() => result.current.handleEditReportType(reportType));
  });
});
