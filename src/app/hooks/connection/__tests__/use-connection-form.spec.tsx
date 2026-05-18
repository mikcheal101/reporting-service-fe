import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useConnectionForm from '../use-connection-form';

describe('useConnectionForm', () => {
  it('should initialize with empty form', () => {
    const { result } = renderHook(() => useConnectionForm());
    expect(result.current.form.id).toBe('');
    expect(result.current.form.name).toBe('');
  });

  it('should handleChange and update form', () => {
    const { result } = renderHook(() => useConnectionForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'test-db' } } as any);
    });
    expect(result.current.form.name).toBe('test-db');
  });

  it('should reset form on resetForm', () => {
    const { result } = renderHook(() => useConnectionForm());
    act(() => {
      result.current.handleChange({ target: { name: 'name', value: 'test-db' } } as any);
    });
    act(() => { result.current.resetForm(); });
    expect(result.current.form.name).toBe('');
  });

  it('should convert databaseType to number', () => {
    const { result } = renderHook(() => useConnectionForm());
    act(() => {
      result.current.handleChange({ target: { name: 'databaseType', value: '5' } } as any);
    });
    expect(result.current.form.databaseType).toBe(5);
  });

  it('should update form via setForm', () => {
    const { result } = renderHook(() => useConnectionForm());
    act(() => {
      result.current.setForm({ id: '1', name: 'direct', server: '', port: 0, user: '', password: '', database: '', isTestSuccessful: false, databaseType: 3, description: '' });
    });
    expect(result.current.form.id).toBe('1');
  });
});
