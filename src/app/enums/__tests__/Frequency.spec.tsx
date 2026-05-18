import { describe, it, expect } from 'vitest';
import { Frequency } from '../Frequency';

describe('Frequency', () => {
  it('should have correct enum values', () => {
    expect(Frequency.OnRequest).toBe(0);
    expect(Frequency.Daily).toBe(1);
    expect(Frequency.Weekly).toBe(2);
    expect(Frequency.Monthly).toBe(3);
    expect(Frequency.Biannual).toBe(4);
    expect(Frequency.Annually).toBe(5);
  });
});
