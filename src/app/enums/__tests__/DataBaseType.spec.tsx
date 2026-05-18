import { describe, it, expect } from 'vitest';
import { DataBaseType } from '../DataBaseType';

describe('DataBaseType', () => {
  it('should have correct enum values', () => {
    expect(DataBaseType.MSSQL).toBe(0);
    expect(DataBaseType.MySQL).toBe(1);
    expect(DataBaseType.Oracle).toBe(2);
    expect(DataBaseType.PostgreSQL).toBe(3);
    expect(DataBaseType.MariaDB).toBe(4);
    expect(DataBaseType.IBMDb2).toBe(5);
    expect(DataBaseType.Firebird).toBe(6);
    expect(DataBaseType.H2Database).toBe(7);
  });
});
