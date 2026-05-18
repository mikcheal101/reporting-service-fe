import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/connection/connection-service', () => ({
  fetchConnectionTablesAsync: vi.fn(),
}));

import { fetchConnectionTablesAsync } from '@/app/services/connection/connection-service';
import useConnectionTables from '../use-connection-tables';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useConnectionTables', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch connection tables for valid id', async () => {
    vi.mocked(fetchConnectionTablesAsync).mockResolvedValue(['users', 'orders']);

    const { result } = renderHook(() => useConnectionTables(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(['users', 'orders']));
  });

  it('should not fetch when id is 0', () => {
    const { result } = renderHook(() => useConnectionTables(0), { wrapper: createWrapper() });

    expect(result.current.isFetching).toBe(false);
  });
});
