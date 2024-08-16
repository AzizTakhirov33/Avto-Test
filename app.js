

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const questionLimit = 10; // quiz.length
let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// Push the question into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i]);
    }
}

// Set question number and question and options
function getNewQuestion() {
    console.log(availableOptions);
    // Set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + questionLimit;

    // Get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    
    // Clear previous question and image
    questionText.innerHTML = '';

    // Set question text
    const questionTextElement = document.createElement('div');
    questionTextElement.innerHTML = currentQuestion.q;
    questionText.appendChild(questionTextElement);

    // Show question img if 'img' property exists
    if (currentQuestion.hasOwnProperty('img') && currentQuestion.img !== '') {
        const img = document.createElement('img');
        img.src = currentQuestion.img;
        questionText.appendChild(img);
    }

    // Get the position of 'questionIndex' from the availableQuestion Array
    const index1 = availableQuestions.indexOf(questionIndex);
    // Remove the 'questionIndex' from the availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1, 1);

    // Set options
    const optionLen = currentQuestion.options.length;
    // Push options into availableOptions Array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;
    // Create options in HTML
    for (let i = 0; i < optionLen; i++) {
        // Random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // Get the position of 'optionIndex' from the availableOptions Array
        const index2 = availableOptions.indexOf(optionIndex);
        // Remove the 'optionIndex' from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2, 1);

        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optionIndex].text;
        if (currentQuestion.options[optionIndex].img) {
            const img = document.createElement('img');
            img.src = currentQuestion.options[optionIndex].img;
            option.appendChild(img);
        }
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = 'option';
        optionContainer.appendChild(option);
        option.setAttribute('onclick', 'getResult(this)');
    }
    questionCounter++;
}

// Get the result of current attempt question
function getResult(element) {
    const id = parseInt(element.id);
    // Get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // Set the green color to the correct option
        element.classList.add('correct');
        // Add the indicator to correct mark
        updateAnswerIndicator('correct');
        correctAnswers++;
        console.log("correct:" + correctAnswers);
    } else {
        // Set the red color to the incorrect option
        element.classList.add('wrong');

        // Add the indicator to wrong mark
        updateAnswerIndicator('wrong');

        // If the answer is incorrect then show the correct option by adding green color to the correct option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add('correct');
            }
        }
    }
    attempt++;
    unclickableOptions();

    // Show the solution image if it exists
    if (currentQuestion.solutionText) {
        const img = document.createElement('img');
        img.src = currentQuestion.solutionText;
        img.classList.add('solution-image');
        optionContainer.appendChild(img);
    }
}

// Make all the options unclickable once the user selects an option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add('already-answered');
    }
}

// Make all the options unclickable once the user selects an option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add('already-answered');
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = questionLimit;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement('div');
        answersIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answersIndicatorContainer.children[questionCounter - 1].classList.add(markType);
}

function next() {
    if (questionCounter === questionLimit) {
        console.log("quiz over");
        quizOver();
    } else {
        getNewQuestion();
    }
}

function quizOver() {
    // Hide quizBox
    quizBox.classList.add('hide');
    // Show resultBox
    resultBox.classList.remove('hide');
    quizResult();
}

// Get the quiz result
function quizResult() {
    resultBox.querySelector('.total-question').innerHTML = questionLimit;
    resultBox.querySelector('.total-attempt').innerHTML = attempt;
    resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
    resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers / questionLimit) * 100;
    resultBox.querySelector('.percentage').innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector('.total-score').innerHTML = correctAnswers + " / " + questionLimit;
}

function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
    availableQuestions = [];
}

function tryAgainQuiz() {
    // Hide resultBox
    resultBox.classList.add('hide');
    // Show quizBox
    quizBox.classList.remove('hide');
    resetQuiz();
    startQuiz();
}

function goToHome() {
    // Hide resultBox
    homeBox.classList.remove('hide');
    // Show homeBox
    resultBox.classList.add('hide');
    resetQuiz();
}

// #### STARTING POINT ####

function startQuiz() {
    // Hide homeBox
    homeBox.classList.add('hide');
    // Show quizBox
    quizBox.classList.remove('hide');

    // First, we will set all questions in availableQuestions Array
    setAvailableQuestions();
    // Second, we will call getNewQuestion() function
    getNewQuestion();
    // To create indicator of answers
    answersIndicator();
}

window.onload = function () {
    homeBox.querySelector('.total-question').innerHTML = questionLimit;
}
