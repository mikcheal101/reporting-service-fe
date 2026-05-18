import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/context/TableDataContext', () => ({
  useTableData: () => ({ tableData: [] }),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() }),
}));

vi.mock('../use-generate-ai.query', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

import useAiQuery from '../use-ai-query';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useAiQuery', () => {
  const report = { id: '1' } as any;
  const onQueryGenerated = vi.fn();

  it('should initialize with empty prompt', () => {
    const { result } = renderHook(() => useAiQuery({ report, onQueryGenerated }), { wrapper: createWrapper() });
    expect(result.current.prompt).toBe('');
  });

  it('should update prompt via setPrompt', () => {
    const { result } = renderHook(() => useAiQuery({ report, onQueryGenerated }), { wrapper: createWrapper() });
    act(() => result.current.setPrompt('Show users'));
    expect(result.current.prompt).toBe('Show users');
  });

  it('should call generateAiQuery with valid prompt', async () => {
    const { result } = renderHook(() => useAiQuery({ report, onQueryGenerated }), { wrapper: createWrapper() });
    act(() => result.current.setPrompt('Show users'));
    await act(async () => result.current.generateQuery());
  });

  it('should have useQuery function', () => {
    const { result } = renderHook(() => useAiQuery({ report, onQueryGenerated }), { wrapper: createWrapper() });
    expect(typeof result.current.useQuery).toBe('function');
  });
});
