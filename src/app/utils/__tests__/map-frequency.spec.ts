import { describe, it, expect } from 'vitest';
import mapFrequency from '../map-frequency';

describe('mapFrequency', () => {
  it('should return "OnRequest" for OnRequest', () => { expect(mapFrequency(0)).toBe('OnRequest'); });
  it('should return "Daily" for Daily', () => { expect(mapFrequency(1)).toBe('Daily'); });
  it('should return "Weekly" for Weekly', () => { expect(mapFrequency(2)).toBe('Weekly'); });
  it('should return "Monthly" for Monthly', () => { expect(mapFrequency(3)).toBe('Monthly'); });
  it('should return "Biannual" for Biannual', () => { expect(mapFrequency(4)).toBe('Biannual'); });
  it('should return "Annually" for Annually', () => { expect(mapFrequency(5)).toBe('Annually'); });
  it('should return "Unknown" for null', () => { expect(mapFrequency(null)).toBe('Unknown'); });
  it('should return "Unknown" for unknown', () => { expect(mapFrequency(99)).toBe('Unknown'); });
});
