import { describe, it, expect } from 'vitest';
import mapOutputType from '../map-output-type';

describe('mapOutputType', () => {
  it('should return "Json" for Json', () => { expect(mapOutputType(0)).toBe('Json'); });
  it('should return "Csv" for Csv', () => { expect(mapOutputType(1)).toBe('Csv'); });
  it('should return "Excel" for Excel', () => { expect(mapOutputType(2)).toBe('Excel'); });
  it('should return "PDF" for PDF', () => { expect(mapOutputType(3)).toBe('PDF'); });
  it('should return "Word" for Word', () => { expect(mapOutputType(4)).toBe('Word'); });
  it('should return "Unknown" for null', () => { expect(mapOutputType(null)).toBe('Unknown'); });
  it('should return "Unknown" for unknown', () => { expect(mapOutputType(99)).toBe('Unknown'); });
});
