import { describe, it, expect } from 'vitest';
import { QUERY_KEYS } from '../query-keys.constant';

describe('QUERY_KEYS', () => {
  it('should have all query keys defined', () => {
    expect(QUERY_KEYS.CONNECTIONS).toBe('connections');
    expect(QUERY_KEYS.CONNECTION_TABLES).toBe('connection-tables');
    expect(QUERY_KEYS.REPORTS).toBe('reports');
    expect(QUERY_KEYS.REPORT).toBe('report');
    expect(QUERY_KEYS.USERS).toBe('users');
    expect(QUERY_KEYS.USER).toBe('user');
    expect(QUERY_KEYS.USER_ROLES).toBe('user-roles');
    expect(QUERY_KEYS.USER_ROLE).toBe('user-role');
    expect(QUERY_KEYS.REPORT_TYPES).toBe('report-types');
    expect(QUERY_KEYS.ROLES).toBe('roles');
    expect(QUERY_KEYS.PERMISSIONS).toBe('permissions');
    expect(QUERY_KEYS.PENDING_REPORTS).toBe('pending-reports');
    expect(QUERY_KEYS.GENERATED_REPORTS).toBe('generated-reports');
  });
});
