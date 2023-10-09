const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which device is used to measure blood pressure?",
    answers: [
      { text: "Salinometer", correct: false },
      { text: "Barometer", correct: false },
      { text: "Sphygmomanometer", correct: true },
      { text: "Photometer", correct: false },
    ],
  },
  {
    question: "What is the SI unit of distance?",
    answers: [
      { text: "Meter", correct: true },
      { text: "Kilometer", correct: false },
      { text: "Millimeter", correct: false },
      { text: "Centimeter", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "A light year is a measure of____?",
    answers: [
      { text: "Speed", correct: false },
      { text: "Velocity", correct: false },
      { text: "Distance", correct: true },
      { text: "Time", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalhari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ],
  },
  {
    question: "What is the national flower of India?",
    answers: [
      { text: "Rose", correct: false },
      { text: "Marigold", correct: false },
      { text: "Tulip", correct: false },
      { text: "Lotus", correct: true },
    ],
  },
  {
    question: "What is the minimum age to be a member of Lok Sabha?",
    answers: [
      { text: "35 years", correct: false },
      { text: "20 years", correct: false },
      { text: "25 years", correct: true },
      { text: "30 years", correct: false },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "What is the Ph value of blood?",
    answers: [
      { text: "6.4", correct: false },
      { text: "7.4", correct: true },
      { text: "5", correct: false },
      { text: "8.5", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const scoreElement = document.getElementById("score_txt");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const resultImg = document.getElementById("result_img");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  resultImg.src = "";
  resultImg.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  scoreElement.innerHTML = "";
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = ``;
  scoreElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  let resultImgSrc = "";
  if (score >= 6) {
    resultImgSrc = "./congrats.gif";
  } else {
    resultImgSrc = "./failed.gif";
  }
  resultImg.src = resultImgSrc;
  resultImg.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
