import { describe, it, expect } from 'vitest';
import MapToDatabaseType from '../map-database-type';

describe('MapToDatabaseType', () => {
  it('should return "MS SQL Server" for MSSQL(0)', () => { expect(MapToDatabaseType(0)).toBe('MS SQL Server'); });
  it('should return "MySQL" for MySQL(1)', () => { expect(MapToDatabaseType(1)).toBe('MySQL'); });
  it('should return "Oracle" for Oracle(2)', () => { expect(MapToDatabaseType(2)).toBe('Oracle'); });
  it('should return "PostgreSQL" for PostgreSQL(3)', () => { expect(MapToDatabaseType(3)).toBe('PostgreSQL'); });
  it('should return "MariaDB" for MariaDB(4)', () => { expect(MapToDatabaseType(4)).toBe('MariaDB'); });
  it('should return "IBMDb2" for IBMDb2(5)', () => { expect(MapToDatabaseType(5)).toBe('IBMDb2'); });
  it('should return "Firebird" for Firebird(6)', () => { expect(MapToDatabaseType(6)).toBe('Firebird'); });
  it('should return "H2Database" for H2Database(7)', () => { expect(MapToDatabaseType(7)).toBe('H2Database'); });
  it('should return "Unknown" for unknown value', () => { expect(MapToDatabaseType(99)).toBe('Unknown'); });
});
