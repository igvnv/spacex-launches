export const numberFormatter = new Intl.NumberFormat('en-US');

export const priceFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  minimumFractionDigits: 0,
  style: 'currency'
});
