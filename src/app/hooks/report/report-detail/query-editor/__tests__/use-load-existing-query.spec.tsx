import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLoadExistingQuery from '../use-load-existing-query';

describe('useLoadExistingQuery', () => {
  it('should initialize with template query', () => {
    const report = {} as any;
    const { result } = renderHook(() => useLoadExistingQuery({ report }));
    expect(result.current.query).toBe('SELECT * FROM Users WHERE Id = @userId');
  });

  it('should use report queryString when provided', () => {
    const report = { queryString: 'SELECT 1' } as any;
    const { result } = renderHook(() => useLoadExistingQuery({ report }));
    expect(result.current.query).toBe('SELECT 1');
  });

  it('should update query via setQuery', () => {
    const report = {} as any;
    const { result } = renderHook(() => useLoadExistingQuery({ report }));
    act(() => { result.current.setQuery('SELECT 2'); });
    expect(result.current.query).toBe('SELECT 2');
  });
});
