import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/app/services/connection/connection-service', () => ({
  fetchConnectionsAsync: vi.fn(),
}));

import { fetchConnectionsAsync } from '@/app/services/connection/connection-service';
import useConnection from '../use-connection';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useConnection', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should fetch connections', async () => {
    const connections = [{ id: '1', name: 'conn1' }];
    vi.mocked(fetchConnectionsAsync).mockResolvedValue(connections as any);

    const { result } = renderHook(() => useConnection(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.data).toEqual(connections));
  });
});
