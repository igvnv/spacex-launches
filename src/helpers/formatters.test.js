import {
  numberFormatter,
  priceFormatter,
  shortDateFormatter,
  shortDateTimeFormatter,
  fullDateFormatter,
  fullDateTimeFormatter,
} from './formatters';

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

  it('formats short date correctly', () => {
    expect(shortDateFormatter.format(new Date(2012, 0, 10)))
      .toEqual('Jan 10, 2012');
  });

  it('formats short date and time correctly', () => {
    expect(shortDateTimeFormatter.format(new Date(2012, 0, 10, 13, 30)))
      .toEqual('Jan 10, 2012, 1:30 PM');
  });

  it('formats full date correctly', () => {
    expect(fullDateFormatter.format(new Date(2012, 0, 10)))
      .toEqual('January 10, 2012');
  });

  it('formats full date and time correctly', () => {
    expect(fullDateTimeFormatter.format(new Date(2012, 0, 10, 13, 30)))
      .toEqual('January 10, 2012, 1:30 PM');
  });
});
