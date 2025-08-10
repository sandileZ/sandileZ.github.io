// currencyService.js

const API_URL = 'https://api.exchangerate.host/latest';

/**
 * Fetches exchange rates for the given base currency.
 * @param {string} base - ISO code of the base currency (e.g. 'USD').
 * @returns {Promise<Object>} - A map of currency codes to rates.
 */
export async function fetchRates(base = 'USD') {
  const res = await fetch(`${API_URL}?base=${base}`);
  if (!res.ok) {
    throw new Error('Failed to fetch exchange rates');
  }
  const data = await res.json();
  return data.rates;
}

/**
 * Converts an amount from one currency to another.
 * @param {string} from - ISO code of the source currency.
 * @param {string} to - ISO code of the target currency.
 * @param {number} amount - The amount to convert.
 * @returns {Promise<string>} - Converted amount, rounded to two decimals.
 */
export async function convertCurrency(from, to, amount) {
  const rates = await fetchRates(from);
  const rate = rates[to];
  if (rate === undefined) {
    throw new Error(`Unsupported currency: ${to}`);
  }
  return (amount * rate).toFixed(2);
}