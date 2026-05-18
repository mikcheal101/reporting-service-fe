import { describe, it, expect } from 'vitest';
import { FE_ROUTES } from '../routes.constant';

describe('FE_ROUTES', () => {
  it('should have all routes defined', () => {
    expect(FE_ROUTES.SIGNIN).toBe('/signin');
    expect(FE_ROUTES.DASHBOARD).toBe('/dashboard');
    expect(FE_ROUTES.SETTINGS).toBe('/settings');
    expect(FE_ROUTES.SETTINGS_SYSTEM).toBe('/settings/system');
    expect(FE_ROUTES.CONNECTION).toBe('/connection');
    expect(FE_ROUTES.REPORT_TYPE).toBe('/report-type');
    expect(FE_ROUTES.REPORT).toBe('/report');
    expect(FE_ROUTES.REPORT_DETAILS).toBe('/report/report-details');
    expect(FE_ROUTES.SCHEDULED_REPORT).toBe('/scheduled-report');
    expect(FE_ROUTES.HOME).toBe('/');
  });
});
