import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReportProviderParameter, useReportParameter } from '../ParameterContext';

describe('ParameterContext', () => {
  it('should render children', () => {
    render(<ReportProviderParameter><div data-testid="child">test</div></ReportProviderParameter>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });

  it('should throw when useReportParameter is used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow('useReport must be used within a ReportProvider');
  });
});

function TestComponent() {
  useReportParameter();
  return null;
}
