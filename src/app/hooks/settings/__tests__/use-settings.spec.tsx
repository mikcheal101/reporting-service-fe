import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
}));

import { usePathname, useRouter } from 'next/navigation';
import useSettings from '../use-settings';

describe('useSettings', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue({ push: vi.fn() } as any);
    vi.mocked(usePathname).mockReturnValue('/settings');
  });

  it('should return pathname', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.pathName).toBe('/settings');
  });

  it('should handle button click', () => {
    const mockPush = vi.fn();
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    const { result } = renderHook(() => useSettings());
    act(() => result.current.handleButtonClick('/settings/system'));
    expect(mockPush).toHaveBeenCalledWith('/settings/system');
  });

  it('should expose paths', () => {
    const { result } = renderHook(() => useSettings());
    expect(result.current.paths.userManagement).toBe('/settings');
  });
});
