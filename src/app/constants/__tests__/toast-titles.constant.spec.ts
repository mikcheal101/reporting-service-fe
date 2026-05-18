import { describe, it, expect } from 'vitest';
import { TOAST_TITLES } from '../toast-titles.constant';

describe('TOAST_TITLES', () => {
  it('should have all toast titles defined', () => {
    expect(TOAST_TITLES.SUCCESS).toBe('Success');
    expect(TOAST_TITLES.ERROR).toBe('Error');
    expect(TOAST_TITLES.WARNING).toBe('Warning');
    expect(TOAST_TITLES.LOGIN_FAILED).toBe('Login failed');
    expect(TOAST_TITLES.LOGIN_SUCCESSFUL).toBe('Login successful');
    expect(TOAST_TITLES.USER_CREATED_SUCCESSFULLY).toBe('User created successfully');
  });
});
