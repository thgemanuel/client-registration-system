import { formatCpf } from './formatters';

describe('formatCpf', () => {
  it('should format a complete 11-digit numeric CPF', () => {
    expect(formatCpf('52998224725')).toBe('529.982.247-25');
  });

  it('should format a partially typed CPF', () => {
    expect(formatCpf('529')).toBe('529');
    expect(formatCpf('52998')).toBe('529.98');
    expect(formatCpf('5299822')).toBe('529.982.2');
    expect(formatCpf('529982247')).toBe('529.982.247');
    expect(formatCpf('5299822472')).toBe('529.982.247-2');
  });

  it('should strip non-numeric characters before formatting', () => {
    expect(formatCpf('529.982.247-25')).toBe('529.982.247-25');
    expect(formatCpf('529-982-247.25')).toBe('529.982.247-25');
    expect(formatCpf('529 982 247 25')).toBe('529.982.247-25');
  });

  it('should truncate input longer than 14 characters after formatting', () => {
    const result = formatCpf('529982247251234');
    expect(result.length).toBeLessThanOrEqual(14);
  });

  it('should return empty string for empty input', () => {
    expect(formatCpf('')).toBe('');
  });

  it('should return empty string for input with only non-numeric characters', () => {
    expect(formatCpf('abc-def.ghi')).toBe('');
  });

  it('should handle input with a mix of letters and numbers', () => {
    expect(formatCpf('5a2b9c9d8e2f2g4h7i2j5')).toBe('529.982.247-25');
  });
});
