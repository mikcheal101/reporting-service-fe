import { describe, it, expect, beforeEach } from 'vitest';
import { safeLocalStorage } from '../useLocalStorage';

describe('safeLocalStorage', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  it('should set and get an item', () => {
    safeLocalStorage.setItem('testKey', 'testValue');
    expect(safeLocalStorage.getItem('testKey')).toBe('testValue');
  });

  it('should remove an item', () => {
    safeLocalStorage.setItem('testKey', 'testValue');
    safeLocalStorage.removeItem('testKey');
    expect(safeLocalStorage.getItem('testKey')).toBeNull();
  });

  it('should return null for non-existent key', () => {
    expect(safeLocalStorage.getItem('nonExistent')).toBeNull();
  });
});
