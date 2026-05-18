import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle conditional (falsy) classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('should handle tailwind merge conflicts (later wins)', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2');
  });

  it('should handle mixed arguments', () => {
    expect(cn('text-lg', ['font-bold'], { 'bg-red-500': true })).toBe(
      'text-lg font-bold bg-red-500',
    );
  });

  it('should return empty string for no inputs', () => {
    expect(cn()).toBe('');
  });
});
