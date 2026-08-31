let userScore = 0;
let computerScore = 0;

function playGame(userChoice) {

    const choices = ["rock", "paper", "scissors"];

    const randomIndex = Math.floor(Math.random() * choices.length);

    const computerChoice = choices[randomIndex];

    document.getElementById("user-choice").textContent =
        "Your Choice: " + userChoice;

    document.getElementById("computer-choice").textContent =
        "Computer Choice: " + computerChoice;

    let result = "";

    if (userChoice === computerChoice) {

        result = "It's a Draw! 🤝";

    } 
    else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {

        result = "You Win! 🎉";
        userScore++;

    } 
    else {

        result = "Computer Wins! 😢";
        computerScore++;

    }

    document.getElementById("result").textContent = result;

    document.getElementById("user-score").textContent = userScore;

    document.getElementById("computer-score").textContent = computerScore;
}


function resetGame() {

    userScore = 0;
    computerScore = 0;

    document.getElementById("user-score").textContent = 0;

    document.getElementById("computer-score").textContent = 0;

    document.getElementById("user-choice").textContent =
        "Your Choice: -";

    document.getElementById("computer-choice").textContent =
        "Computer Choice: -";

    document.getElementById("result").textContent =
        "Choose an option to start!";
}