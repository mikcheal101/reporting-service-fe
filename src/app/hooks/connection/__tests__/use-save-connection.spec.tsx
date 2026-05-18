import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type React from 'react';
import useSaveConnection from '../use-save-connection';
import type IConnection from '@/types/connection/iconnection';

const mockSaveConnectionAsync = vi.hoisted(() => vi.fn());
const mockToast = vi.hoisted(() => vi.fn());

vi.mock('@/app/services/connection/connection-service', () => ({
  saveConnectionAsync: mockSaveConnectionAsync,
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: mockToast,
}));

describe('useSaveConnection', () => {
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

  it('should show success toast on mutation success', async () => {
    const mockConnection = { id: '1', name: 'test-db' } as IConnection;
    mockSaveConnectionAsync.mockResolvedValue(mockConnection);

    const { result } = renderHook(() => useSaveConnection(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockConnection);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Connection saved successfully.',
      variant: 'success',
    });
  });

  it('should update query cache on mutation success', async () => {
    const mockConnection = { id: '1', name: 'test-db' } as IConnection;
    mockSaveConnectionAsync.mockResolvedValue(mockConnection);

    const { result } = renderHook(() => useSaveConnection(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(mockConnection);
    });

    const cached = queryClient.getQueryData<IConnection[]>(['connections']);
    expect(cached).toEqual([mockConnection]);
  });

  it('should show error toast on mutation error', async () => {
    const errorMessage = 'Connection failed';
    mockSaveConnectionAsync.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    const { result } = renderHook(() => useSaveConnection(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({} as IConnection);
      } catch {
        // expected
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: `Failed to save connection: ${errorMessage}`,
      variant: 'destructive',
    });
  });

  it('should append to existing cache on success', async () => {
    const existing = [{ id: '1', name: 'first' } as IConnection];
    queryClient.setQueryData<IConnection[]>(['connections'], existing);

    const second = { id: '2', name: 'second' } as IConnection;
    mockSaveConnectionAsync.mockResolvedValue(second);

    const { result } = renderHook(() => useSaveConnection(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(second);
    });

    const cached = queryClient.getQueryData<IConnection[]>(['connections']);
    expect(cached).toHaveLength(2);
    expect(cached?.[1].name).toBe('second');
  });
});
