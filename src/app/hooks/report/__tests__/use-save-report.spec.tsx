import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type React from 'react';
import useSaveReport from '../use-save-report';
import type IReport from '@/types/report/ireport';

const mockSaveReportAsync = vi.hoisted(() => vi.fn());
const mockToast = vi.hoisted(() => vi.fn());

vi.mock('@/app/services/report/report-service', () => ({
  saveReportAsync: mockSaveReportAsync,
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: mockToast,
}));

describe('useSaveReport', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should update query cache on success', async () => {
    const mockReport = { id: '1', name: 'test-report' } as IReport;
    mockSaveReportAsync.mockResolvedValue(mockReport);

    const { result } = renderHook(() => useSaveReport(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockReport);
    });

    const cached = queryClient.getQueryData<IReport[]>(['reports']);
    expect(cached).toEqual([mockReport]);
  });

  it('should append to existing reports cache', async () => {
    const existing = [{ id: '1', name: 'first' } as IReport];
    queryClient.setQueryData<IReport[]>(['reports'], existing);

    const second = { id: '2', name: 'second' } as IReport;
    mockSaveReportAsync.mockResolvedValue(second);

    const { result } = renderHook(() => useSaveReport(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(second);
    });

    const cached = queryClient.getQueryData<IReport[]>(['reports']);
    expect(cached).toHaveLength(2);
    expect(cached?.[1].name).toBe('second');
  });

  it('should show error toast on mutation error', async () => {
    const errorMessage = 'Report creation failed';
    mockSaveReportAsync.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    const { result } = renderHook(() => useSaveReport(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({} as IReport);
      } catch {
        // expected
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  });

  it('should fallback to error.message when response data is missing', async () => {
    const errorMessage = 'Network Error';
    mockSaveReportAsync.mockRejectedValue({
      response: undefined,
      message: errorMessage,
    });

    const { result } = renderHook(() => useSaveReport(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({} as IReport);
      } catch {
        // expected
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  });
});
