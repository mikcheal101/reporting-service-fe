import { describe, it, expect } from 'vitest';
import api from './axios';

describe('axios instance', () => {
  it('should have withCredentials true', () => {
    expect(api.defaults.withCredentials).toBe(true);
  });
});
