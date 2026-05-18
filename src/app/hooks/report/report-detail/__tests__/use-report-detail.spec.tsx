import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../../use-fetch-report', () => ({
  default: vi.fn(() => ({ data: null, isLoading: false, isError: false })),
}));

import useReportDetail from '../use-report-detail';
import useFetchReport from '../../use-fetch-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportDetail', () => {
  it('should init with empty form', () => {
    const { result } = renderHook(() => useReportDetail(), { wrapper: createWrapper() });
    expect(result.current.form.id).toBe('');
  });

  it('should set form from report data', () => {
    const report = { id: '1', name: 'Test Report', description: 'desc', connectionId: '1', reportTypeId: '1' };
    (useFetchReport as ReturnType<typeof vi.fn>).mockReturnValue({ data: report, isLoading: false, isError: false });

    const { result } = renderHook(() => useReportDetail('1'), { wrapper: createWrapper() });
    expect(result.current.form.id).toBe('1');
  });

  it('should update form via setForm', () => {
    const { result } = renderHook(() => useReportDetail(), { wrapper: createWrapper() });
    act(() => result.current.setForm({ id: '2', name: 'New' } as any));
    expect(result.current.form.id).toBe('2');
  });
});
