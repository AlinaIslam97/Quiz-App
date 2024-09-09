var quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<scripting>", "<javascript>", "<js>", "<script>"],
    correct: "<script>"

  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["alert('Hello World');", "msg('Hello World');",
      "alertBox('Hello World');", "msgBox('Hello World');"],
    correct: "alert('Hello World');"
  },
  {
    question: "How to write an IF statement in JavaScript?",
    options: ["if i == 5 then", "if i = 5 then",
      "if (i == 5)", "if i = 5"],
    correct: "if (i == 5)"
  }
];

var currentQuestion = 0;
var score = 0;
var timeLeft = 10;
var timerInterval;

var questionElement = document.getElementById("question");
var optionButtons = document.querySelectorAll(".option");
var nextButton = document.getElementById("next-btn");
var timeElement = document.getElementById("time");

function loadQuestion() {
  var currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  optionButtons.forEach((button, index) => {
    button.textContent = currentQuiz.options[index];
    button.onclick = () => {
      stopTimer(); // Stop the timer when answer is selected
      selectAnswer(button);
    };
  });

  startTimer(); // Start the timer for each question
}

function selectAnswer(button) {
  var correctAnswer = quizData[currentQuestion].correct;
  if (button.textContent === correctAnswer) {
    score++;
    button.style.backgroundColor = "#28a745"; // green for correct answer
  } else {
    button.style.backgroundColor = "#dc3545"; // red for incorrect answer
  }
  optionButtons.forEach(btn => btn.disabled = true); // Disable all options after selection
}

function startTimer() {
  timeLeft = 10; // Reset to 10 seconds
  timeElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      autoSelectAnswer(); // Auto-move if time runs out
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
}

function autoSelectAnswer() {
  optionButtons.forEach(button => {
    button.disabled = true; // Disable all options
  });
  nextQuestion(); // Move to the next question
}

nextButton.addEventListener("click", () => {
  stopTimer(); // Stop the timer for the current question
  nextQuestion(); // Load the next question
});

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    resetOptions();
    loadQuestion();
  } else {
    alert(`Quiz finished! Your score is ${score} out of ${quizData.length}`);
  }
}

function resetOptions() {
  optionButtons.forEach(button => {
    button.style.backgroundColor = "#559eec"; // Reset to default color
    button.disabled = false; // Enable buttons for the next question
  });
}

// Initialize Quiz
loadQuestion();