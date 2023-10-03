document.addEventListener("DOMContentLoaded", function () {
  const gameContainer = document.getElementById("gameContainer");
  const runner = document.getElementById("runner");
  const obstacle = document.getElementById("obstacle");
  const scoreElement = document.getElementById("score");
  const startButton = document.getElementById("startButton");
  const gameOverModal = document.getElementById("gameOverModal");
  const modalScore = document.getElementById("modalScore");
  const restartButton = document.getElementById("restartButton");

  let score = 0;
  let isJumping = false;
  let isPlaying = false;

  function jump() {
    if (!isJumping && isPlaying) {
      isJumping = true;
      runner.classList.add("jump");

      setTimeout(function () {
        runner.classList.remove("jump");
        isJumping = false;
      }, 500);
    }
  }

  function startGame() {
    isPlaying = true;
    startButton.style.display = "none";
    obstacle.style.animation = "block 2s linear infinite";
    gameContainer.style.animation = "bgScroll 40s linear infinite";
    obstacle.style.left = "580px";
    score = 0;
    scoreElement.textContent = score.toString().padStart(6, '0');
  }

  function endGame() {
    isPlaying = false;
    obstacle.style.animation = "none";
    gameContainer.style.animation = "none";
    gameOverModal.style.display = "block";
    modalScore.textContent = score.toString().padStart(6, '0');
  }

  function resetGame() {
    score = 0;
    scoreElement.textContent = score.toString().padStart(6, '0');
    runner.style.top = "330px";
    obstacle.style.left = "580px";
    gameOverModal.style.display = "none";
    startButton.style.display = "block";

    
    startButton.addEventListener("click", startGame);
  }

  startButton.addEventListener("click", function () {
    startGame();
    
    startButton.removeEventListener("click", startGame);
  });

  restartButton.addEventListener("click", function () {
    resetGame();
  });



  let isAlive = setInterval(function () {
   if (isPlaying) {
   
    const runnerRect = runner.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

   
    if (
      runnerRect.left < obstacleRect.right &&
      runnerRect.right > obstacleRect.left &&
      runnerRect.top < obstacleRect.bottom &&
      runnerRect.bottom > obstacleRect.top
    ) {
    	const collisionX = Math.max(runnerRect.left, obstacleRect.left);
      const collisionY = Math.max(runnerRect.top, obstacleRect.top);


      clearInterval(isAlive);

        runner.style.left = collisionX + 'px';
      	obstacle.style.left = collisionX + 'px';
      	runner.style.top = collisionY + 'px';
      	obstacle.style.top = collisionY + 'px';


      endGame();
    } else {
      if (isPlaying) {
        score += 1;
        scoreElement.textContent = score.toString().padStart(6, '0');
      }
    }
}
  }, 100);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Spacebar" || event.key === " ") {
      jump();
    }
  });
});
