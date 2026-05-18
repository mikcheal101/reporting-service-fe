import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useReportTypeForm from '../use-report-type-form';

describe('useReportTypeForm', () => {
  it('should initialize with empty form', () => {
    const { result } = renderHook(() => useReportTypeForm());
    expect(result.current.form.id).toBe('');
  });

  it('should handleChange and update form', () => {
    const { result } = renderHook(() => useReportTypeForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Monthly Report' } } as any);
    });
    expect(result.current.form.name).toBe('Monthly Report');
  });

  it('should reset form on resetForm', () => {
    const { result } = renderHook(() => useReportTypeForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'Test' } } as any);
    });
    act(() => { result.current.resetForm(); });
    expect(result.current.form.id).toBe('');
  });

  it('should set form via setForm', () => {
    const { result } = renderHook(() => useReportTypeForm());
    act(() => { result.current.setForm({ id: '2', name: 'Direct', outputType: null, frequency: null, runDate: '', runTime: '', emailsToNotify: '' }); });
    expect(result.current.form.id).toBe('2');
  });
});
