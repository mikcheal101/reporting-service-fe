import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('../use-fetch-reports', () => ({
  default: () => ({ data: [], isLoading: false }),
}));

vi.mock('../use-fetch-report', () => ({
  default: () => ({ data: null }),
}));

vi.mock('../use-report-parameters', () => ({
  default: () => ({ data: [] }),
}));

vi.mock('../use-update-report', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-delete-report', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-schedule-report', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useReportTable from '../use-report-table';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useReportTable', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    expect(result.current.viewMode).toBe('list');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.reports).toEqual([]);
  });

  it('should handle pagination', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    expect(result.current.totalPages).toBe(0);
  });

  it('should fetch report details', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.fetchReportDetails({ id: '1' } as any));
    expect(result.current.currentReportId).toBe(1);
    expect(result.current.isSheetOpen).toBe(true);
  });

  it('should handle schedule report', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.handleScheduleReport({ id: '1' } as any));
  });

  it('should handle delete report', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.handleDeleteReport('1'));
  });

  it('should call router.push on AddReports', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.AddReports());
  });

  it('should handle update report', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.setCurrentReport({ id: '1', name: 'Test' } as any));
    act(() => result.current.handleUpdateReport());
  });

  it('should handle confirm and cancel schedule', () => {
    const { result } = renderHook(() => useReportTable(), { wrapper: createWrapper() });
    act(() => result.current.setCurrentReport({ id: '5' } as any));
    act(() => result.current.confirmScheduleReport());
    act(() => result.current.cancelScheduleReport());
    expect(result.current.isAlertOpen).toBe(false);
  });
});
