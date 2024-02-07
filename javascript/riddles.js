const riddles = [
    { image: "../images/riddle1.png", answer: "Watermelon" },
    { image: "../images/riddle2.jpg", answer: "Time to fix fence" },
    { image: "../images/riddle3.png", answer: "Battery" },
    { image: "../images/riddle4.png", answer: "egg" },
    { image: "../images/riddle5.png", answer: "Candel" },
    { image: "../images/riddle6.png", answer: "Spounge" },
    { image: "../images/riddle7.png", answer: "you asleep yet" },
    { image: "../images/riddle8.png", answer: "Promise" },
    { image: "../images/riddle9.png", answer: "age" }, 
    { image: "../images/riddle10.png", answer: "clock" }, 
];

let currentRiddleIndex = 0;

function submitAnswer() {
    const answerInput = document.getElementById("answerInput");
    const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();
    const userAnswer = answerInput.value.toLowerCase();

    if (userAnswer === correctAnswer) {
        Swal.fire({
        title: 'You did it!',
        text: "try next",
        icon: 'success',
        confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
        title: 'try again',
        text: "almost there",
        icon: 'info',
        confirmButtonText: 'OK'
        });
    }
}

function reveal() {
    const answerDisplay = document.getElementById("answerDisplay");
    const correctAnswer = riddles[currentRiddleIndex].answer;
    answerDisplay.textContent = correctAnswer;
}

function nextRiddle() {
    const answerInput = document.getElementById("answerInput");
    const riddleImage = document.getElementById("riddleImage");

    // Load the next riddle
    currentRiddleIndex++;
    if (currentRiddleIndex < riddles.length) {
        riddleImage.style.backgroundImage = `url('${riddles[currentRiddleIndex].image}')`;
        answerInput.value = "";
        answerInput.classList.remove("answer-correct", "answer-incorrect");
        document.getElementById("answerDisplay").textContent = ""; // Reset revealed answer
    } else {
        Swal.fire({
        title: 'Congratulation you solve all riddles ',
        icon: 'success',
        confirmButtonText: 'OK'
        });
    }
}
function goHome(){
    window.location.href="../html/index.html";
}