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

describe('usePermission', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return false for all permissions when user is null', async () => {
    mockUseContext.mockReturnValue({ user: null });

    const mod = await import('../use-permission');
    const { result } = renderHook(() => mod.default());

    expect(result.current.hasPermission('anything')).toBe(false);
    expect(result.current.can('connection', 'view')).toBe(false);
    expect(result.current.can('report', 'delete')).toBe(false);
  });

  it('should detect permissions from direct user permissions', async () => {
    mockUseContext.mockReturnValue({
      user: {
        permissions: [
          { id: 1, name: 'connection.view' },
          { id: 2, name: 'connection.list' },
          { id: 3, name: 'report.create' },
        ],
        roles: [],
      },
    });

    const mod = await import('../use-permission');
    const { result } = renderHook(() => mod.default());

    expect(result.current.hasPermission('connection.view')).toBe(true);
    expect(result.current.hasPermission('connection.list')).toBe(true);
    expect(result.current.hasPermission('connection.delete')).toBe(false);
    expect(result.current.can('report', 'create')).toBe(true);
    expect(result.current.can('report', 'delete')).toBe(false);
  });

  it('should detect permissions from role permissions', async () => {
    mockUseContext.mockReturnValue({
      user: {
        permissions: [],
        roles: [
          {
            id: 1,
            name: 'viewer',
            permissions: [
              { id: 1, name: 'report.view' },
              { id: 2, name: 'report.list' },
            ],
          },
        ],
      },
    });

    const mod = await import('../use-permission');
    const { result } = renderHook(() => mod.default());

    expect(result.current.hasPermission('report.view')).toBe(true);
    expect(result.current.hasPermission('report.list')).toBe(true);
    expect(result.current.hasPermission('report.create')).toBe(false);
    expect(result.current.can('report', 'update')).toBe(false);
    expect(result.current.can('report', 'delete')).toBe(false);
  });

  it('should merge direct and role permissions', async () => {
    mockUseContext.mockReturnValue({
      user: {
        permissions: [{ id: 1, name: 'connection.delete' }],
        roles: [
          {
            id: 1,
            name: 'viewer',
            permissions: [
              { id: 2, name: 'connection.view' },
              { id: 3, name: 'connection.list' },
            ],
          },
        ],
      },
    });

    const mod = await import('../use-permission');
    const { result } = renderHook(() => mod.default());

    expect(result.current.can('connection', 'view')).toBe(true);
    expect(result.current.can('connection', 'list')).toBe(true);
    expect(result.current.can('connection', 'delete')).toBe(true);
    expect(result.current.can('connection', 'update')).toBe(false);
  });

  it('should deduplicate permissions', async () => {
    mockUseContext.mockReturnValue({
      user: {
        permissions: [{ id: 1, name: 'report.view' }],
        roles: [
          {
            id: 1,
            name: 'viewer',
            permissions: [{ id: 1, name: 'report.view' }],
          },
        ],
      },
    });

    const mod = await import('../use-permission');
    const { result } = renderHook(() => mod.default());

    expect(result.current.hasPermission('report.view')).toBe(true);
  });
});
