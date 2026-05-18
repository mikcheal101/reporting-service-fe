import { describe, it, expect } from 'vitest';
import { ACCESS_TOKEN_COOKIE_NAME } from '../cookie.constant';

describe('cookie.constant', () => {
  it('should export cookie name', () => {
    expect(ACCESS_TOKEN_COOKIE_NAME).toBe('access_token');
  });
});
