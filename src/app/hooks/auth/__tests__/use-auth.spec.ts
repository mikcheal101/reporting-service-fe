import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';

const mockUseContext = vi.hoisted(() => vi.fn());

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>();
  return {
    ...actual,
    useContext: mockUseContext,
  };
});

vi.mock('@/app/context/auth.context', () => ({
  default: 'auth-context',
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return context when provided', async () => {
    mockUseContext.mockReturnValue({ user: null, loading: false, error: null, login: vi.fn(), logout: vi.fn() });

    const { useAuth } = await import('../use-auth');
    const { result } = renderHook(() => useAuth());

    expect(result.current).toBeDefined();
    expect(result.current.user).toBeNull();
  });

  it('should throw when context is undefined', async () => {
    mockUseContext.mockReturnValue(undefined);

    const { useAuth } = await import('../use-auth');

    expect(() => useAuth()).toThrow('Auth context error!');
  });
});
