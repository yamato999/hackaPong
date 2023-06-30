import Ball from "./Ball.js"
import Paddle from "./Paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")
let lastTime


function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
    computerPaddle.update(delta, 0); // Передаем направление 0, так как будет использоваться управление вторым игроком
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    )


    document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

    if (isLose()) handleLose()
  }

  lastTime = time
  window.requestAnimationFrame(update)
}

function isLose() {
  const rect = ball.rect()
  return rect.right >= window.innerWidth || rect.left <= 0

}

function handleLose() {
  const rect = ball.rect()
  if (rect.right >= window.innerWidth) {
    playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    playGoalSound();
  } else {
    computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    playGoalSound();
  }
  ball.reset()
  computerPaddle.reset()

}

function playGoalSound() {
  const goalSound = document.getElementById("goalSound");
  goalSound.play();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp") {
      // Движение платформы вверх
      
      computerPaddle.position -= 7; //
    } else if (e.key === "ArrowDown") {
      // Движение платформы вниз
      computerPaddle.position += 7;

    }
      else if (e.key === "w") {
        // Движение второй платформы вверх
        playerPaddle.position -= 7;
      } else if (e.key === "s") {
        // Движение второй платформы вниз
        playerPaddle.position += 7;
    }
  })

const backgroundMusic = document.getElementById("backgroundMusic");

// Воспроизведение аудио при загрузке страницы
window.addEventListener("DOMContentLoaded", () => {
  backgroundMusic.play();
});

// Приостановка и возобновление воспроизведения аудио при нажатии кнопки
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  })
})

window.requestAnimationFrame(update)