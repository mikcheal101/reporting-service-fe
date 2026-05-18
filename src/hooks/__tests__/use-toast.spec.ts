import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';

describe('toast', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should create a toast and return dismiss and update', async () => {
    const { toast } = await import('@/hooks/use-toast');
    const result = toast({ title: 'Test', description: 'Description' });
    expect(result).toHaveProperty('id');
    expect(typeof result.dismiss).toBe('function');
    expect(typeof result.update).toBe('function');
  });

  it('should limit toasts to TOAST_LIMIT via reducer', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    toast({ title: 'First' });
    toast({ title: 'Second' });

    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe('Second');
  });

  it('dismiss should close the toast', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    const t = toast({ title: 'Test' });
    t.dismiss();

    const { result } = renderHook(() => useToast());
    expect(result.current.toasts[0].open).toBe(false);
  });

  it('useToast should return dismiss function', async () => {
    const { useToast } = await import('@/hooks/use-toast');
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.dismiss).toBe('function');
    expect(typeof result.current.toast).toBe('function');
  });

  it('dismiss from useToast should dismiss matching toast', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    const t = toast({ title: 'Test' });

    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss(t.id);
    });

    const { result: result2 } = renderHook(() => useToast());
    expect(result2.current.toasts[0].open).toBe(false);
  });

  it('dismiss without id should dismiss all toasts', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    toast({ title: 'First' });
    toast({ title: 'Second' });

    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss();
    });

    const { result: result2 } = renderHook(() => useToast());
    expect(result2.current.toasts[0].open).toBe(false);
  });

  it('update should modify the toast', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    const t = toast({ title: 'Original' });
    t.update({ title: 'Updated' } as any);

    const { result } = renderHook(() => useToast());
    expect(result.current.toasts[0].title).toBe('Updated');
  });

  it('onOpenChange dismisses when set to false', async () => {
    const { toast, useToast } = await import('@/hooks/use-toast');

    const t = toast({ title: 'Test', onOpenChange: (open: boolean) => {} });
    const { result } = renderHook(() => useToast());
    const toastItem = result.current.toasts[0];

    act(() => {
      toastItem.onOpenChange?.(false);
    });

    expect(result.current.toasts[0].open).toBe(false);
  });
});
