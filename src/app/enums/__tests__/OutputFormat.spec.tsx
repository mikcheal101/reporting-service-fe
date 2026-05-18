import { describe, it, expect } from 'vitest';
import { OutputFormat } from '../OutputFormat';

describe('OutputFormat', () => {
  it('should have correct enum values', () => {
    expect(OutputFormat.Json).toBe(0);
    expect(OutputFormat.Csv).toBe(1);
    expect(OutputFormat.Excel).toBe(2);
    expect(OutputFormat.PDF).toBe(3);
    expect(OutputFormat.Word).toBe(4);
  });
});
