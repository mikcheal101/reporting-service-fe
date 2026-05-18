import { describe, it, expect } from 'vitest';
import { buildUrl } from './urlBuilder';

const ORIGINAL_ENV = process.env;

describe('buildUrl', () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterAll(() => {
    process.env = ORIGINAL_ENV;
  });

  it('should build URL from env vars', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
    process.env.NEXT_PUBLIC_APP_API_PORT = '4050';

    const result = buildUrl('/api/v1/users');
    expect(result).toBe('http://localhost:4050/api/v1/users');
  });

  it('should prepend slash if path does not start with one', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
    process.env.NEXT_PUBLIC_APP_API_PORT = '4050';

    const result = buildUrl('api/v1/users');
    expect(result).toBe('http://localhost:4050/api/v1/users');
  });

  it('should throw if env vars are missing', () => {
    delete process.env.NEXT_PUBLIC_URL_SCHEME;

    expect(() => buildUrl('/test')).toThrow(
      'Missing one or more required environment variables',
    );
  });

  it('should throw when NEXT_PUBLIC_URL_SCHEME is missing', () => {
    delete process.env.NEXT_PUBLIC_URL_SCHEME;
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
    process.env.NEXT_PUBLIC_APP_API_PORT = '4050';

    expect(() => buildUrl('/test')).toThrow(
      'Missing one or more required environment variables',
    );
  });

  it('should throw when NEXT_PUBLIC_IP_ADDRESS is missing', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
    delete process.env.NEXT_PUBLIC_IP_ADDRESS;
    process.env.NEXT_PUBLIC_APP_API_PORT = '4050';

    expect(() => buildUrl('/test')).toThrow(
      'Missing one or more required environment variables',
    );
  });

  it('should throw when NEXT_PUBLIC_APP_API_PORT is missing', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
    delete process.env.NEXT_PUBLIC_APP_API_PORT;

    expect(() => buildUrl('/test')).toThrow(
      'Missing one or more required environment variables',
    );
  });

  it('should build URL with custom path values', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'https';
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'api.example.com';
    process.env.NEXT_PUBLIC_APP_API_PORT = '443';

    const result = buildUrl('/custom/path');
    expect(result).toBe('https://api.example.com:443/custom/path');
  });

  it('should handle empty path', () => {
    process.env.NEXT_PUBLIC_URL_SCHEME = 'http';
    process.env.NEXT_PUBLIC_IP_ADDRESS = 'localhost';
    process.env.NEXT_PUBLIC_APP_API_PORT = '4050';

    const result = buildUrl('');
    expect(result).toBe('http://localhost:4050/');
  });
});
