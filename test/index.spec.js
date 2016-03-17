import expect from 'expect';
import add from '../src/index';

describe('string calculator', () => {
  it('should return zero for an empty string', () => {
    let actual = add('');
    let expected = 0;

    expect(actual).toEqual(expected);
  });

  it('should return one for a string with only a one', () => {
    let actual = add('1');
    let expected = 1;

    expect(actual).toEqual(expected);
  });

  it('should return the sum for a string with two numbers', () => {
    let actual = add('1,2');
    let expected = 3;

    expect(actual).toEqual(expected);
  });

  it('should return the sum for an unknown amount of numbers', () => {
    let actual = add('1,2,3,6');
    let expected = 12;

    expect(actual).toEqual(expected);
  });

  it('should allow new lines between numbers (instead of commas', () => {
    let actual = add('1\n2,3');
    let expected = 6;

    expect(actual).toEqual(expected); 
  });

  it('should allow other delimiters given a special syntax', () => {
    let actual = add('//[;]\n1;2\n3');
    let expected = 6;

    expect(actual).toEqual(expected); 
  });

  it('should throw with negative numbers', () => {
    expect(() => {
      let actual = add('//[;]\n1;-2\n3');
    }).toThrow("Negatives not allowed. -2"); 
  });

  xit('should throw with the accumulation of failed negative numbers', () => {
    expect(() => {
      let actual = add('//[;]\n1;-2\n-3');
    }).toThrow("Negatives not allowed. -2 -3"); 
  });

  it('should ignore numbers bigger than 1000', () => {
    let actual = add('//[;]\n1;2000\n3');
    let expected = 4;

    expect(actual).toEqual(expected);  
  });

  it('should support delimiters of any length', () => {
    let actual = add('//[***]\n1***2***3');
    let expected = 6;

    expect(actual).toEqual(expected);
  });

  /*
    [::][;]
  */

  it('should allow multiple delimiters', () => {
    let actual = add('//[*][%]\n1*2%3');
    let expected = 6;

    expect(actual).toEqual(expected);
  });
});