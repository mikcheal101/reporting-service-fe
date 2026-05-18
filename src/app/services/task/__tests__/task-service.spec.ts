import { describe, it, expect } from 'vitest';

describe('task-service', () => {
  it('should be an empty module with no exports', async () => {
    const mod = await import('../task-service');
    expect(Object.keys(mod)).toHaveLength(0);
  });
});
