import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReportProvider, useReport } from '../ReportContext';

describe('ReportContext', () => {
  it('should render children', () => {
    render(<ReportProvider><div data-testid="child">test</div></ReportProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });

  it('should throw when useReport is used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow('useReport must be used within a ReportProvider');
  });
});

function TestComponent() {
  useReport();
  return null;
}
