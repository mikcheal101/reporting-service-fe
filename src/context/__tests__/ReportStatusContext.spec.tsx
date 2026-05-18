import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ReportStatusProvider, useReportStatus } from '../ReportStatusContext';

vi.mock('@/app/utils/useLocalStorage', () => ({
  safeLocalStorage: {
    getItem: vi.fn().mockReturnValue(null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('ReportStatusContext', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('should render children', () => {
    render(<ReportStatusProvider><div data-testid="child">test</div></ReportStatusProvider>);
    expect(screen.getByTestId('child')).toHaveTextContent('test');
  });

  it('should throw when useReportStatus is used outside provider', () => {
    expect(() => render(<TestComponent />)).toThrow('useReportStatus must be used within a ReportStatusProvider');
  });
});

function TestComponent() {
  useReportStatus();
  return null;
}
