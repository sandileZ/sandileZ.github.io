const CurrencyService = {
    baseUrl: "https://api.exchangerate.host",
    accessKey: "db224b03cb9a2cbdb51ac88d46d75213", // <-- replace with your real key

    // Get most recent exchange rates
    async getLiveRates(source, currencies) {
        const url = `${this.baseUrl}/live?access_key=${this.accessKey}&source=${source}&currencies=${currencies}&format=1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch live exchange rates");
        return await response.json(); // full object with quotes
    },

    // Get historical rates for a given date
    async getHistoricalRates(date, source, currencies) {
        const url = `${this.baseUrl}/historical?access_key=${this.accessKey}&date=${date}&source=${source}&currencies=${currencies}&format=1`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch historical exchange rates");
        return await response.json(); // full object with quotes
    }
};

export default CurrencyService;
