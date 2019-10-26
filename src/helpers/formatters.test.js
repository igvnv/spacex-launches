import { numberFormatter, priceFormatter } from './formatters';

describe('Formatters helpers', () => {
  it('formats integer numbers correctly', () => {
    expect(numberFormatter.format(1000)).toEqual('1,000');
  });

  it('formats decimal numbers correctly', () => {
    expect(numberFormatter.format(1000.53)).toEqual('1,000.53');
  });

  it('formats price correctly', () => {
    expect(priceFormatter.format(1000)).toEqual('$1,000');
  });

  it('formats price with cents correctly', () => {
    expect(priceFormatter.format(1000.53)).toEqual('$1,000.53');
  });
});