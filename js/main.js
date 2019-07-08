import Car from './Car.js';

const GAME_WIDTH = 390;
const GAME_HEIGHT = 600;

let roadShifter = 0;
const enemyCars = [];
const player = new Car(true);
player.y = GAME_HEIGHT - player.height - 10;

setInterval(generateEnemyCars, 1300);
draw();

window.addEventListener('keydown', e => {
  if (e.key === 'a' || e.key === 'ArrowLeft') {
    if (player.roadLane > 0) player.changeLane(--player.roadLane);
  }

  if (e.key === 'd' || e.key === 'ArrowRight') {
    if (player.roadLane < 2) player.changeLane(++player.roadLane);
  }
});

function generateEnemyCars() {
  const enemyCar = new Car(false);
  enemyCar.y = -80;
  enemyCars.push(enemyCar);
}

function draw() {
  const canvas = document.getElementById('game-container');

  canvas.width = GAME_WIDTH;
  canvas.height = GAME_HEIGHT;
  canvas.style.backgroundColor = '#000';

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

  ctx.fillStyle = '#00f';
  ctx.fillRect(player.x, player.y, player.width, player.height);

  for (let i = 0; i < enemyCars.length; i++) {
    ctx.fillStyle = '#f00';
    ctx.fillRect(enemyCars[i].x, enemyCars[i].y, enemyCars[i].width, enemyCars[i].height);
    enemyCars[i].y += 2;

    if (enemyCars[i].roadLane === player.roadLane) {
      if (player.hasCollided(enemyCars[i])) {
        return;
      }
    }

    if (enemyCars[i].y > GAME_HEIGHT) {
      enemyCars.splice(i, 1);
    }
  }

  window.requestAnimationFrame(draw);
}
