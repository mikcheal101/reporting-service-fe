import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('../../connection/use-connection', () => ({
  default: () => ({ data: [], isLoading: false }),
}));

vi.mock('../../report-type/use-report-type', () => ({
  default: () => ({ data: [], isLoading: false }),
}));

vi.mock('../../report/use-save-report', () => ({
  default: () => ({ mutate: vi.fn(), isPending: false }),
}));

import useReportFormSection from '../use-report-form-section';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

const emptyForm = { id: '', name: '', description: '', connectionId: '', reportTypeId: '' };
const setForm = vi.fn();

describe('useReportFormSection', () => {
  it('should handle input change via event', () => {
    const { result } = renderHook(() => useReportFormSection({ form: emptyForm, setForm }), { wrapper: createWrapper() });
    act(() => result.current.handleInput({ target: { name: 'name', value: 'Test' } } as any));
    expect(setForm).toHaveBeenCalled();
  });

  it('should handle input change via object', () => {
    const { result } = renderHook(() => useReportFormSection({ form: emptyForm, setForm }), { wrapper: createWrapper() });
    act(() => result.current.handleInput({ name: 'name', value: 'Test' }));
    expect(setForm).toHaveBeenCalled();
  });

  it('should validate form correctly', () => {
    const { result, rerender } = renderHook(
      ({ form }) => useReportFormSection({ form, setForm }),
      { wrapper: createWrapper(), initialProps: { form: emptyForm } }
    );
    expect(result.current.isFormValid()).toBe(false);

    rerender({ form: { id: '', name: 'Report', description: 'Desc', connectionId: '1', reportTypeId: '1' } });
    expect(result.current.isFormValid()).toBe(true);
  });

  it('should handle save', () => {
    const { result } = renderHook(() => useReportFormSection({ form: { ...emptyForm, name: 'Report', description: 'Desc', connectionId: '1', reportTypeId: '1' }, setForm }), { wrapper: createWrapper() });
    act(() => result.current.handleSave());
  });

  it('should handle view report', () => {
    const { result } = renderHook(() => useReportFormSection({ form: emptyForm, setForm }), { wrapper: createWrapper() });
    act(() => result.current.handleViewReport());
  });
});
