import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '../theme-provider';

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

describe('ThemeProvider', () => {
  it('should render children', () => {
    render(<ThemeProvider><div data-testid="child">test</div></ThemeProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });
});
