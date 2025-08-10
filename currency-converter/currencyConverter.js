import CurrencyService from './currencyService.js';

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const resultDisplay = document.getElementById("result");
const refreshBtn = document.getElementById("refresh");

const ctx = document.getElementById("exchangeChart").getContext("2d");
let chart;

// Update the displayed live rate
async function updateLiveRate() {
    try {
        const source = fromCurrency.value;
        const target = toCurrency.value;
        const amount = parseFloat(amountInput.value);

        const data = await CurrencyService.getLiveRates(source, target);
        const rate = data.quotes[`${source}${target}`];

        resultDisplay.textContent = `${amount} ${source} = ${(amount * rate).toFixed(3)} ${target}`;
    } catch (err) {
        console.error(err);
        resultDisplay.textContent = "Error fetching rate";
    }
}

// Load historical rates for the last 12 months
async function loadHistoricalChart() {
    try {
        const source = fromCurrency.value;
        const target = toCurrency.value;

        const today = new Date();
        const labels = [];
        const dataPoints = [];

        // Collect data for each month (last 12 months)
        for (let i = 11; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const formattedDate = date.toISOString().split('T')[0];

            const data = await CurrencyService.getHistoricalRates(formattedDate, source, target);
            const rate = data.quotes[`${source}${target}`];

            labels.push(formattedDate);
            dataPoints.push(rate);
        }

        if (chart) chart.destroy();
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: `${source} to ${target}`,
                    data: dataPoints,
                    borderColor: '#007bff',
                    fill: false,
                    tension: 0.1
                }]
            }
        });
    } catch (err) {
        console.error(err);
    }
}

refreshBtn.addEventListener("click", () => {
    updateLiveRate();
    loadHistoricalChart();
});

document.addEventListener("DOMContentLoaded", () => {
    updateLiveRate();
    loadHistoricalChart();
});
