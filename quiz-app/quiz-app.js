import QuizService from './quizService.js';

const setupScreen = document.getElementById("setup");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");

const amountInput = document.getElementById("amount");
const difficultySelect = document.getElementById("difficulty");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const scoreEl = document.getElementById("score");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

let questions = [];
let currentIndex = 0;
let score = 0;

startBtn.addEventListener("click", async () => {
    const amount = amountInput.value;
    const difficulty = difficultySelect.value;

    questions = await QuizService.getQuestions(amount, "", difficulty, "multiple");
    currentIndex = 0;
    score = 0;

    setupScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        scoreEl.textContent = `${score} / ${questions.length}`;
    }
});

restartBtn.addEventListener("click", () => {
    resultScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
});

function showQuestion() {
    const question = questions[currentIndex];
    questionEl.innerHTML = decodeHTML(question.question);

    const answers = [...question.incorrect_answers, question.correct_answer];
    shuffleArray(answers);

    answersEl.innerHTML = "";
    answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.textContent = decodeHTML(answer);
        btn.classList.add("answer-btn");
        btn.addEventListener("click", () => {
            if (answer === question.correct_answer) {
                score++;
            }
            nextBtn.disabled = false;
        });
        answersEl.appendChild(btn);
    });

    nextBtn.disabled = true;
}

// Utility: Shuffle array
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// Utility: Decode HTML entities from API
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
