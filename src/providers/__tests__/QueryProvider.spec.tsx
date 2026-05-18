import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import QueryProvider from '../QueryProvider';

describe('QueryProvider', () => {
  it('should render children', () => {
    render(<QueryProvider><div data-testid="child">test</div></QueryProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });
});
