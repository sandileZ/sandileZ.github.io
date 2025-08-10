const QuizService = {
    baseUrl: "https://opentdb.com/api.php",

    async getQuestions(amount = 5, category = "", difficulty = "", type = "") {
        let url = `${this.baseUrl}?amount=${amount}`;
        if (category) url += `&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;
        if (type) url += `&type=${type}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        return data.results;
    }
};

export default QuizService;
