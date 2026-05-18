import { describe, it, expect } from 'vitest';
import { RequestStatus } from '../RequestStatus';

describe('RequestStatus', () => {
  it('should have correct enum values', () => {
    expect(RequestStatus.New).toBe(0);
    expect(RequestStatus.InProgress).toBe(1);
    expect(RequestStatus.Completed).toBe(2);
    expect(RequestStatus.Downloaded).toBe(3);
  });
});
