import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSettingsPage from '../use-settings-page';

describe('useSettingsPage', () => {
  it('should init with Users view', () => {
    const { result } = renderHook(() => useSettingsPage());
    expect(result.current.view).toBe('Users');
  });

  it('should set view', () => {
    const { result } = renderHook(() => useSettingsPage());
    act(() => result.current.setView('Roles'));
    expect(result.current.view).toBe('Roles');
  });

  it('should set mode', () => {
    const { result } = renderHook(() => useSettingsPage());
    act(() => result.current.setMode('edit'));
    expect(result.current.mode).toBe('edit');
  });

  it('should set sheet open state', () => {
    const { result } = renderHook(() => useSettingsPage());
    act(() => result.current.setAssignRoleSheetOpen(true));
    expect(result.current.assignRoleSheetOpen).toBe(true);
  });
});
