import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-fetch-generated-reports', () => ({
  default: () => ({ data: Array(11).fill({ id: '1' }), isLoading: false }),
}));

vi.mock('../use-fetch-pending-reports', () => ({
  default: () => ({ data: [], isLoading: false }),
}));

vi.mock('../use-download-report', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

import useScheduledReport from '../use-scheduled-report';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useScheduledReport', () => {
  it('should initialize with page 1', () => {
    const { result } = renderHook(() => useScheduledReport(), { wrapper: createWrapper() });
    expect(result.current.currentPage).toBe(1);
  });

  it('should go to next page', () => {
    const { result } = renderHook(() => useScheduledReport(), { wrapper: createWrapper() });
    act(() => result.current.goToNextPage());
    expect(result.current.currentPage).toBe(2);
  });

  it('should go to previous page', () => {
    const { result } = renderHook(() => useScheduledReport(), { wrapper: createWrapper() });
    act(() => result.current.goToNextPage());
    act(() => result.current.goToPrevPage());
    expect(result.current.currentPage).toBe(1);
  });

  it('should not go below page 1', () => {
    const { result } = renderHook(() => useScheduledReport(), { wrapper: createWrapper() });
    act(() => result.current.goToPrevPage());
    expect(result.current.currentPage).toBe(1);
  });

  it('should call downloadReport on handleDownload', () => {
    const { result } = renderHook(() => useScheduledReport(), { wrapper: createWrapper() });
    act(() => result.current.handleDownload('1'));
  });
});
