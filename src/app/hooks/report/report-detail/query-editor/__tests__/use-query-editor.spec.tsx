import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/context/ReportContext', () => ({
  useReport: () => ({ currentReportParams: null }),
}));

vi.mock('@/context/ParameterContext', () => ({
  useReportParameter: () => ({ currentParameter: null }),
}));

vi.mock('../use-query-parser', () => ({
  default: () => ({
    extractParameters: vi.fn().mockReturnValue([]),
    extractParameterTypes: vi.fn().mockReturnValue({}),
  }),
}));

vi.mock('../use-query-actions', () => ({
  default: () => ({
    query: 'SELECT 1',
    setQuery: vi.fn(),
    parameters: [],
    setParameters: vi.fn(),
    setParameterTypes: vi.fn(),
    setParameterValues: vi.fn(),
    result: null,
    isLoading: false,
    isTestSuccessful: false,
    runExecute: vi.fn(),
    runTest: vi.fn(),
    parameterTypes: {},
    addManualParameter: vi.fn(),
    getAllParameters: vi.fn().mockReturnValue([]),
    updateManualParameter: vi.fn(),
    removeManualParameter: vi.fn(),
    parameterValues: {},
  }),
}));

import useQueryEditor from '../use-query-editor';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useQueryEditor', () => {
  it('should initialize with editor tab', () => {
    const { result } = renderHook(() => useQueryEditor({ report: { id: '1' } as any }), { wrapper: createWrapper() });
    expect(result.current.activeTab).toBe('editor');
    expect(result.current.query).toBe('SELECT 1');
  });

  it('should set active tab', () => {
    const { result } = renderHook(() => useQueryEditor({ report: { id: '1' } as any }), { wrapper: createWrapper() });
    act(() => result.current.setActiveTab('result'));
    expect(result.current.activeTab).toBe('result');
  });

  it('should handle editor change', () => {
    const { result } = renderHook(() => useQueryEditor({ report: { id: '1' } as any }), { wrapper: createWrapper() });
    act(() => result.current.handleEditorChange('SELECT * FROM Users WHERE id = @id'));
  });

  it('should handle AI query generated', () => {
    const { result } = renderHook(() => useQueryEditor({ report: { id: '1' } as any }), { wrapper: createWrapper() });
    act(() => result.current.handleAIQueryGenerated('SELECT * FROM users'));
    expect(result.current.activeTab).toBe('editor');
  });

  it('should handle parameter change', () => {
    const { result } = renderHook(() => useQueryEditor({ report: { id: '1' } as any }), { wrapper: createWrapper() });
    act(() => result.current.handleParameterChange('@name', 'John'));
  });
});
