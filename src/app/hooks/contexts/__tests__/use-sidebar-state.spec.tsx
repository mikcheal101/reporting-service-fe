import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSidebarState from '../use-sidebar-state';

describe('useSidebarState', () => {
  it('should initialize with isCollapsed false', () => {
    const { result } = renderHook(() => useSidebarState());
    expect(result.current.isCollapsed).toBe(false);
  });

  it('should toggle isCollapsed', () => {
    const { result } = renderHook(() => useSidebarState());
    act(() => { result.current.toggleSideBar(); });
    expect(result.current.isCollapsed).toBe(true);
    act(() => { result.current.toggleSideBar(); });
    expect(result.current.isCollapsed).toBe(false);
  });

  it('should set isCollapsed directly', () => {
    const { result } = renderHook(() => useSidebarState());
    act(() => { result.current.setIsCollapsed(true); });
    expect(result.current.isCollapsed).toBe(true);
  });
});
