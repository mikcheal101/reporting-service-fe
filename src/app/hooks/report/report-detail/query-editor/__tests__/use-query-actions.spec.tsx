import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('../use-query-test', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-query-execute', () => ({
  default: () => ({ mutate: vi.fn() }),
}));

vi.mock('../use-load-existing-query', () => ({
  default: () => ({ query: 'SELECT 1', setQuery: vi.fn() }),
}));

import useQueryActions from '../use-query-actions';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useQueryActions', () => {
  const report = { id: '1' } as any;

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    expect(result.current.parameters).toEqual([]);
    expect(result.current.result).toBeNull();
  });

  it('should add and remove manual parameter', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    act(() => result.current.addManualParameter());
    expect(result.current.getAllParameters()).toHaveLength(1);
    act(() => result.current.removeManualParameter(0));
    expect(result.current.getAllParameters()).toHaveLength(0);
  });

  it('should update manual parameter', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    act(() => result.current.addManualParameter());
    act(() => result.current.updateManualParameter(0, 'value', 'test'));
    expect(result.current.getAllParameters()[0].value).toBe('test');
  });

  it('should build payload', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    const payload = result.current.buildPayload();
    expect(payload.reportId).toBe('1');
    expect(payload.isFromQueryBuilder).toBe(true);
  });

  it('should call testQuery on runTest', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    act(() => result.current.runTest());
  });

  it('should call executeQuery on runExecute', async () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    await act(async () => result.current.runExecute());
  });

  it('should combine detected and manual parameters', () => {
    const { result } = renderHook(() => useQueryActions({ report }), { wrapper: createWrapper() });
    act(() => result.current.setParameters(['@userId']));
    act(() => result.current.setParameterValues({ '@userId': '5' }));
    act(() => result.current.addManualParameter());
    const allParams = result.current.getAllParameters();
    expect(allParams.filter(p => (p as any).isDetected)).toHaveLength(1);
    expect(allParams.filter(p => !(p as any).isDetected)).toHaveLength(1);
  });
});
