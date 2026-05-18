import { renderHook, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type React from 'react';
import useAssignUserRole from '../use-assign-user-role';

const mockAssignUserToRoleAsync = vi.hoisted(() => vi.fn());
const mockToast = vi.hoisted(() => vi.fn());

vi.mock('@/app/services/auth/auth-service', () => ({
  assignUserToRoleAsync: mockAssignUserToRoleAsync,
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: mockToast,
}));

describe('useAssignUserRole', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should show success toast on successful assignment', async () => {
    mockAssignUserToRoleAsync.mockResolvedValue(true);
    const payload = { userId: 1, roleIds: [1, 2] };

    const { result } = renderHook(() => useAssignUserRole(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Role assigned successfully!',
      variant: 'success',
    });
  });

  it('should show error toast when API returns false', async () => {
    mockAssignUserToRoleAsync.mockResolvedValue(false);
    const payload = { userId: 1, roleIds: [1] };

    const { result } = renderHook(() => useAssignUserRole(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: 'Failed to assign role.',
      variant: 'destructive',
    });
  });

  it('should invalidate users query on success', async () => {
    mockAssignUserToRoleAsync.mockResolvedValue(true);
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');
    const payload = { userId: 1, roleIds: [1] };

    const { result } = renderHook(() => useAssignUserRole(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync(payload);
    });

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: ['users'] });
  });

  it('should show error toast on exception', async () => {
    const errorMessage = 'Assignment failed';
    mockAssignUserToRoleAsync.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    const { result } = renderHook(() => useAssignUserRole(), { wrapper });

    await act(async () => {
      try {
        await result.current.mutateAsync({ userId: 1, roleIds: [1] });
      } catch {
        // expected
      }
    });

    expect(mockToast).toHaveBeenCalledWith({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
  });
});
