import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import AuthProvider from '../auth.provider';
import AuthContext from '../auth.context';

vi.mock('@/app/hooks/contexts/use-auth-state', () => ({
  default: () => ({
    user: null,
    loading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe('AuthProvider', () => {
  it('renders children', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Hello</div>
      </AuthProvider>,
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides auth context', () => {
    const TestComponent = () => {
      const context = React.useContext(AuthContext);
      return <div data-testid="context">{context ? 'provided' : 'not provided'}</div>;
    };
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    );
    expect(screen.getByTestId('context')).toHaveTextContent('provided');
  });
});
