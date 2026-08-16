const quiz = [
    {
        question: "Which language is used for web page interactivity?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "JavaScript"
    },
    {
        question: "Which tag creates a heading?",
        options: ["p", "h1", "img", "a"],
        answer: "h1"
    },
    {
        question: "Which method is used to print something to the browser console?",
        options: ["console.log()", "print()", "display()", "write()"],
        answer: "console.log()"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["let", "var", "const", "All of these"],
        answer: "All of these"
    }
];

let index = 0;
let score = 0;
let time = 30;
const question = document.getElementById("question");
const options = document.getElementById("options");
const result = document.getElementById("result");
function loadQuestion() {
    question.innerHTML = quiz[index].question;
    options.innerHTML = "";
    quiz[index].options.forEach(option => {
        options.innerHTML +=
            `<input type="radio" name="ans" value="${option}"> ${option}<br>`;
    });
}
function nextQuestion() {
    const selected = document.querySelector('input[name="ans"]:checked');
    if (selected && selected.value === quiz[index].answer) {
        score++;
    }
    index++;
    if (index < quiz.length) {
        loadQuestion();
    } else {
        clearInterval(timerInterval);
        result.innerHTML = "Your Score: " + score + "/" + quiz.length;
        question.innerHTML = "";
        options.innerHTML = "";
    }
}
loadQuestion();
const timerInterval = setInterval(function() {
    time--;
    if (time <= 0) {
        time = 0;

        document.getElementById("timer").innerHTML = "Time: " + time;
        clearInterval(timerInterval);
        result.innerHTML = "Time Over! Score: " + score + "/" + quiz.length;
        question.innerHTML = "";
        options.innerHTML = "";
    } 
    else {
        document.getElementById("timer").innerHTML = "Time: " + time;
    }
}, 1000);