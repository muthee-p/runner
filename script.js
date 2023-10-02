const runner = document.getElementById("runner");
//const obstacle = document.getElementById("obstacle");
const scoreElement = document.getElementById("score");

let score = 0;

function jump(){

	if (runner.classList!= "jump"){
	runner.classList.add("jump")

	setTimeout(function (){
		runner.classList.remove("jump")
	}, 500);
}
}

let isAlive = setInterval(function () {
 let runnerRect = runner.getBoundingClientRect();
      let obstacleRect = obstacle.getBoundingClientRect();

      if (
        runnerRect.right > obstacleRect.left &&
        runnerRect.left < obstacleRect.right &&
        runnerRect.bottom > obstacleRect.top &&
        runnerRect.top < obstacleRect.bottom
      ) {
        alert("Game over");
        clearInterval(isAlive);
      } else{
		score += 1;
		scoreElement.textContent =score.toString().padStart(6, '0')
	}
}, 100);

document.addEventListener("keydown", function (event){
	if (event.key === "Spacebar" || event.key === " ") {
    	jump();
  }
})