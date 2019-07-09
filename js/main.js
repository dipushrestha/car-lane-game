import Car from './Car.js';

const GAME_WIDTH = 390;
const GAME_HEIGHT = 600;

const canvas = document.getElementById('game-container');

let score = 0;
let roadShifter = 0;
let enemyCars = [];
let player = new Car(true);
player.y = GAME_HEIGHT - player.height - 10;

let intervalId;
let requestId;
let scoreCard = createScoreCard();
let startButton = startScreen();

window.addEventListener('keydown', e => {
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    if (player.roadLane > 0) player.changeLane(--player.roadLane);
  }

  if (e.key === 'd' || e.key === 'ArrowRight') {
    if (player.roadLane < 2) player.changeLane(++player.roadLane);
  }
});

function startScreen() {
  let startButton = document.createElement('button');
  startButton.innerHTML = 'Start';
  startButton.classList.add('start-button');
  document.body.appendChild(startButton);
  startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
    scoreCard.innerHTML = 'Score: 0';
    intervalId = setInterval(generateEnemyCars, 1300);
    draw();
  });
  return startButton;
}

function createScoreCard() {
  let scoreCard = document.createElement('span');
  scoreCard.classList.add('score-card');
  document.body.appendChild(scoreCard);
  return scoreCard;
}

function generateEnemyCars() {
  const enemyCar = new Car(false);
  enemyCar.y = -80;
  enemyCars.push(enemyCar);
}

function draw() {
  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  canvas.style.backgroundColor = '#666560';

  if (!canvas.getContext) return;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.lineDashOffset = roadShifter;
  roadShifter -= 3;

  ctx.beginPath();
  ctx.setLineDash([50, 30]);
  ctx.moveTo(130, 0);
  ctx.lineTo(130, GAME_HEIGHT);
  ctx.stroke();

  ctx.beginPath();
  ctx.setLineDash([50, 30]);
  ctx.moveTo(130 * 2, 0);
  ctx.lineTo(130 * 2, GAME_HEIGHT);
  ctx.stroke();

  ctx.fillStyle = '#008080';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  for (let i = 0; i < enemyCars.length; i++) {
    ctx.fillStyle = '#CD5C5C';
    ctx.fillRect(enemyCars[i].x, enemyCars[i].y, enemyCars[i].width, enemyCars[i].height);
    enemyCars[i].y += 2;

    if (enemyCars[i].roadLane === player.roadLane) {
      if (player.hasCollided(enemyCars[i])) {
        score = 0;
        enemyCars = [];
        clearInterval(intervalId);
        window.cancelAnimationFrame(requestId);
        startButton.style.display = 'block';
        return;
      }
    }

    if (enemyCars[i].y > GAME_HEIGHT) {
      enemyCars.splice(i, 1);
      score++;
      scoreCard.innerHTML = `Score: ${score}`;
    }
  }

  requestId = window.requestAnimationFrame(draw);
}
