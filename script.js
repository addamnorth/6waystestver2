const options = document.querySelectorAll(".option");
const message = document.querySelector(".message");
const playerScores = document.querySelectorAll(".player-score .score");
let player1Score = 0;
let player2Score = 0;
let playerTurn = 1;

options.forEach(option => {
  option.addEventListener("click", function() {
    if (playerTurn === 1) {
      const player1Choice = option.id;
      option.classList.add("selected");
      playerTurn = 2;
      message.textContent = "Player 2's turn";
    } else {
      const player2Choice = option.id;
      option.classList.add("selected");
      checkResult(player1Choice, player2Choice);
    }
  });
});

function checkResult(player1Choice, player2Choice) {
  const result = checkWinner(player1Choice, player2Choice);
  options.forEach(option => option.classList.remove("selected"));
  if (result === "tie") {
    message.textContent = "It's a tie!";
  } else if (result === "player1") {
    player1Score++;
    playerScores[0].textContent = player1Score;
    message.textContent = "Player 1 wins!";
  } else {
    player2Score++;
    playerScores[1].textContent = player2Score;
    message.textContent = "Player 2 wins!";
  }
  if (player1Score === 3 || player2Score === 3) {
    endGame();
  } else {
    playerTurn = 1;
  }
}

function checkWinner(player1Choice, player2Choice) {
  if (
    (player1Choice === "heart" && ["poison", "air", "water"].includes(player2Choice)) ||
    (player1Choice === "poison" && ["air", "earth", "water"].includes(player2Choice)) ||
    (player1Choice === "metal" && ["heart", "poison", "air"].includes(player2Choice)) ||
    (player1Choice === "water" && ["earth", "fire", "metal"].includes(player2Choice)) ||
    (player1Choice === "earth" && ["fire", "earth", "heart"].includes(player2Choice)) ||
    (player1Choice === "fire" && ["metal", "heart", "poison"].includes(player2Choice)) ||
    (player1Choice === "air" && ["water", "earth", "fire"].includes(player2Choice))
  ) {
    return "player1";
  } else if (player1Choice === player2Choice) {
    return "tie";
  } else {
    return "player2";
  }
}

function endGame() {
  options.forEach(option => option.removeEventListener("click", function() {}));
  message.textContent = player1Score === 3 ? "Player 1 wins the game!" : "Player 2 wins the game!";
}
