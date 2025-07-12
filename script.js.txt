const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const basket = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 30,
  width: 80,
  height: 20,
  speed: 5,
  dx: 0
};

const stars = [];
let score = 0;

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
canvas.addEventListener('touchstart', handleTouch);
canvas.addEventListener('touchmove', handleTouch);

function keyDown(e) {
  if (e.key === 'ArrowRight') {
    basket.dx = basket.speed;
  } else if (e.key === 'ArrowLeft') {
    basket.dx = -basket.speed;
  }
}

function keyUp(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    basket.dx = 0;
  }
}

function handleTouch(e) {
  const touchX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
  if (touchX < basket.x + basket.width / 2) {
    basket.dx = -basket.speed;
  } else {
    basket.dx = basket.speed;
  }
}

function drawBasket() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function createStar() {
  const x = Math.random() * (canvas.width - 20);
  stars.push({ x: x, y: 0, radius: 10 });
}

function drawStars() {
  ctx.fillStyle = 'yellow';
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}

function moveStars() {
  for (let star of stars) {
    star.y += 3;
  }
}

function catchStars() {
  for (let i = stars.length - 1; i >= 0; i--) {
    let star = stars[i];
    if (
      star.y + star.radius >= basket.y &&
      star.x >= basket.x &&
      star.x <= basket.x + basket.width
    ) {
      stars.splice(i, 1);
      score++;
    } else if (star.y > canvas.height) {
      stars.splice(i, 1);
    }
  }
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function moveBasket() {
  basket.x += basket.dx;

  if (basket.x < 0) basket.x = 0;
  if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBasket();
  drawStars();
  drawScore();

  moveStars();
  moveBasket();
  catchStars();

  requestAnimationFrame(update);
}

setInterval(createStar, 1500);
update();
