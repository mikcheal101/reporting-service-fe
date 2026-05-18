import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import useQueryParser from '../use-query-parser';

describe('useQueryParser', () => {
  it('should extract parameters from query', () => {
    const { result } = renderHook(() => useQueryParser());
    const params = result.current.extractParameters('SELECT * FROM Users WHERE Id = @userId AND Name = @name');
    expect(params).toEqual(['@userId', '@name']);
  });

  it('should return empty array for no parameters', () => {
    const { result } = renderHook(() => useQueryParser());
    expect(result.current.extractParameters('SELECT * FROM Users')).toEqual([]);
  });

  it('should deduplicate parameters', () => {
    const { result } = renderHook(() => useQueryParser());
    const params = result.current.extractParameters('SELECT @a, @a WHERE @b = 1');
    expect(params).toEqual(['@a', '@b']);
  });

  it('should extract parameter types from declare statements', () => {
    const { result } = renderHook(() => useQueryParser());
    const query = 'DECLARE @userId As INT\nDECLARE @name As NVARCHAR(50)\nSELECT * FROM Users';
    const types = result.current.extractParameterTypes(query);
    expect(types).toEqual({ '@userId': 'INT', '@name': 'NVARCHAR' });
  });

  it('should return empty object for no declare statements', () => {
    const { result } = renderHook(() => useQueryParser());
    expect(result.current.extractParameterTypes('SELECT * FROM Users')).toEqual({});
  });
});
