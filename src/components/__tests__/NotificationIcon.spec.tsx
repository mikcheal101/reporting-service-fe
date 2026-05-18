import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

vi.mock('react-icons/fa', () => ({
  FaBell: () => React.createElement('div', { 'data-testid': 'bell-icon' }),
}));

vi.mock('../SignalRNotifiication', () => ({
  default: () => ({}),
}));

import NotificationIcon from '../NotificationIcon';

describe('NotificationIcon', () => {
  it('should render bell icon', () => {
    const { container } = render(React.createElement(NotificationIcon));
    expect(container.querySelector('[data-testid="bell-icon"]')).toBeTruthy();
  });
});
