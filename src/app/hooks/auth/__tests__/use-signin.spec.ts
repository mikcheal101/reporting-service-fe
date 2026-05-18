import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { FormEvent } from 'react';
import useSignin from '../use-signin';

const mockLogin = vi.hoisted(() => vi.fn());
const mockToast = vi.hoisted(() => vi.fn());
const mockPush = vi.hoisted(() => vi.fn());

vi.mock('@/app/hooks/auth/use-auth', () => ({
  useAuth: vi.fn(() => ({ login: mockLogin })),
}));

vi.mock('@/hooks/use-toast', () => ({
  useToast: vi.fn(() => ({ toast: mockToast })),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({ push: mockPush })),
}));

const createEvent = () =>
  ({ preventDefault: vi.fn() } as unknown as FormEvent);

describe('useSignin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useSignin());
    expect(result.current.formData).toEqual({ username: '', password: '' });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.showPassword).toBe(false);
  });

  it('handleInputChange updates formData', () => {
    const { result } = renderHook(() => useSignin());

    act(() => {
      result.current.handleInputChange({
        target: { name: 'username', value: 'test@user.com' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.username).toBe('test@user.com');

    act(() => {
      result.current.handleInputChange({
        target: { name: 'password', value: 'secret123' },
      } as React.ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.formData.password).toBe('secret123');
  });

  it('handleSignIn calls login and navigates on success', async () => {
    mockLogin.mockImplementation(
      async (_username: string, _password: string, callback?: () => void) => {
        if (callback) callback();
      },
    );

    const { result } = renderHook(() => useSignin());

    await act(async () => {
      await result.current.handleSignIn(createEvent());
    });

    expect(mockLogin).toHaveBeenCalledWith('', '', expect.any(Function));
    expect(mockToast).toHaveBeenCalledWith({
      variant: 'default',
      title: 'Login successful',
      description: 'Welcome back!',
    });
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('handleSignIn shows error toast on failure', async () => {
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    const { result } = renderHook(() => useSignin());

    await act(async () => {
      await result.current.handleSignIn(createEvent());
    });

    expect(result.current.error).toBe(errorMessage);
    expect(mockToast).toHaveBeenCalledWith({
      variant: 'destructive',
      title: 'Login failed',
      description: errorMessage,
    });
  });

  it('handleSignIn uses fallback message when error response has no data', async () => {
    mockLogin.mockRejectedValue({
      response: {},
    });

    const { result } = renderHook(() => useSignin());

    await act(async () => {
      await result.current.handleSignIn(createEvent());
    });

    expect(result.current.error).toBe('Something went wrong. Please try again.');
    expect(mockToast).toHaveBeenCalledWith({
      variant: 'destructive',
      title: 'Login failed',
      description: 'Something went wrong. Please try again.',
    });
  });
});
