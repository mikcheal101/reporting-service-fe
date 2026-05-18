import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConnectionProvider, useConnection } from '../ConnectionContext';

describe('ConnectionContext', () => {
  it('should render children', () => {
    render(<ConnectionProvider><div data-testid="child">test</div></ConnectionProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });

  it('should throw when useConnection is used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow('useConnection must be used within a ConnectionProvider');
  });
});

function TestComponent() {
  useConnection();
  return null;
}
