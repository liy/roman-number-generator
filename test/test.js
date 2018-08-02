import RomanNumberGenerator from '../src/RomanNumberGenerator';

const generator = new RomanNumberGenerator();

describe('Roman number generator', () => {
  // Some edges cases
  it('0 should return null', () => {
    expect(generator.generate(0)).toBeNull();
  });

  it('4000 should return null', () => {
    expect(generator.generate(4000)).toBeNull();
  });

  it('Negative number should return null', () => {
    expect(generator.generate(-23)).toBeNull();
  });

  it('Floating point number should return null', () => {
    expect(generator.generate(15.22)).toBeNull();
  });

  it('Invalid number should return null', () => {
    expect(generator.generate(undefined)).toBeNull();
    expect(generator.generate(null)).toBeNull();
    expect(generator.generate("")).toBeNull();
  });

  // Arbitray number
  it('3999 should be MMMCMXCIX', () => {
    expect(generator.generate(3999)).toBe('MMMCMXCIX');
  });

  it('1219 should be MCCXIX', () => {
    expect(generator.generate(1219)).toBe('MCCXIX');
  });

  it('172 should be CLXXII', () => {
    expect(generator.generate(172)).toBe('CLXXII');
  });

  // Test factors
  it('5 should be V', () => {
    expect(generator.generate(5)).toBe('V');
  });

  it('4 should be IV', () => {
    expect(generator.generate(4)).toBe('IV');
  });

  it('10 should be X', () => {
    expect(generator.generate(10)).toBe('X');
  });

  it('40 should be XL', () => {
    expect(generator.generate(40)).toBe('XL');
  });

  it('50 should be L', () => {
    expect(generator.generate(50)).toBe('L');
  });

  it('90 should be XC', () => {
    expect(generator.generate(90)).toBe('XC');
  });

  it('100 should be C', () => {
    expect(generator.generate(100)).toBe('C');
  });

  it('400 should be CD', () => {
    expect(generator.generate(400)).toBe('CD');
  });

  it('500 should be D', () => {
    expect(generator.generate(500)).toBe('D');
  });

  it('900 should be CM', () => {
    expect(generator.generate(900)).toBe('CM');
  });

  it('1000 should be M', () => {
    expect(generator.generate(1000)).toBe('M');
  });
})