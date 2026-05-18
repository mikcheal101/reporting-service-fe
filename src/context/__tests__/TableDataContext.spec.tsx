import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableDataProvider, useTableData } from '../TableDataContext';

describe('TableDataContext', () => {
  it('should render children', () => {
    render(<TableDataProvider><div data-testid="child">test</div></TableDataProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });

  it('should throw when useTableData is used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow('useTableData must be used within a TableDataProvider');
  });
});

function TestComponent() {
  useTableData();
  return null;
}
