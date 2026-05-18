import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import useAuthState from '../use-auth-state';

vi.mock('../../../services/auth/auth-service', () => ({
  meAsync: vi.fn(),
  loginAsync: vi.fn(),
  logoutAsync: vi.fn(),
}));

import * as authService from '../../../services/auth/auth-service';

describe('useAuthState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(authService.meAsync).mockResolvedValue({ id: 1, fullName: 'Admin', username: 'admin', firstName: 'A', lastName: 'B', phone: '123', roles: [], permissions: [] } as any);
  });

  it('should init and load user', async () => {
    const { result } = renderHook(() => useAuthState());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.user).toBeTruthy();
  });

  it('should handle login', async () => {
    vi.mocked(authService.loginAsync).mockResolvedValue(undefined);
    const callback = vi.fn();

    const { result } = renderHook(() => useAuthState());
    await act(async () => {
      await result.current.login('admin@test.com', 'password', callback);
    });
    expect(authService.loginAsync).toHaveBeenCalledWith('admin@test.com', 'password');
  });

  it('should handle login error', async () => {
    vi.mocked(authService.loginAsync).mockRejectedValue(new Error('Invalid credentials'));

    const { result } = renderHook(() => useAuthState());
    await act(async () => {
      try {
        await result.current.login('bad@test.com', 'wrong');
      } catch { /* expected */ }
    });
    expect(result.current.error).toBe('Invalid credentials');
  });

  it('should handle logout', async () => {
    vi.mocked(authService.logoutAsync).mockResolvedValue(undefined);
    const callback = vi.fn();

    const { result } = renderHook(() => useAuthState());
    await act(async () => {
      await result.current.logout(callback);
    });
    expect(authService.logoutAsync).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });
});
