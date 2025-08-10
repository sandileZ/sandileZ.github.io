// currency-converter/currencyConverter.js
import { fetchRates, convertCurrency } from './currencyService.js';

let isInitialized = false;

export function initCurrencyConverter() {
    if (isInitialized) return; // avoid double-init
    isInitialized = true;

    const fromSelect = document.getElementById('fromCurrency');
    const toSelect = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const btn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');

    // Populate dropdowns
    fetchRates()
        .then(rates => {
            Object.keys(rates).sort().forEach(code => {
                fromSelect.innerHTML += `<option value="${code}">${code}</option>`;
                toSelect.innerHTML += `<option value="${code}">${code}</option>`;
            });
            fromSelect.value = 'USD';
            toSelect.value = 'EUR';
        })
        .catch(err => {
            resultDiv.textContent = err.message;
        });

    // Handle conversion
    btn.addEventListener('click', async () => {
        const from = fromSelect.value;
        const to = toSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!amount || amount <= 0) {
            resultDiv.textContent = 'Enter a valid amount';
            return;
        }

        resultDiv.textContent = 'Converting…';

        try {
            const converted = await convertCurrency(from, to, amount);
            resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
        } catch (e) {
            resultDiv.textContent = e.message;
        }
    });
}

// This ensures the converter initializes when the page loads
document.addEventListener('DOMContentLoaded', initCurrencyConverter);