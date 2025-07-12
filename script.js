const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

let basket = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  width: 100,
  height: 20,
  speed: 6,
  dx: 0
};

let stars = [];
let score = 0;

function drawBasket() {
  ctx.fillStyle = "#333";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawStars() {
  stars.forEach(star => {
    let gradient = ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.radius
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "gold");
    ctx.fillStyle = gradient;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "gold";

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.shadowBlur = 0;
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 20, 40);
}

function update() {
  basket.x += basket.dx;

  if (basket.x < 0) basket.x = 0;
  if (basket.x + basket.width > canvas.width) basket.x = canvas.width - basket.width;

  stars.forEach((star, index) => {
    star.y += star.speed;

    if (
      star.y + star.radius >= basket.y &&
      star.x > basket.x &&
      star.x < basket.x + basket.width
    ) {
      stars.splice(index, 1);
      score++;
    }

    if (star.y > canvas.height) {
      stars.splice(index, 1);
    }
  });

  if (Math.random() < 0.02) {
    stars.push({
      x: Math.random() * canvas.width,
      y: 0,
      radius: 10,
      speed: 3 + Math.random() * 2
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBasket();
  drawStars();
  drawScore();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") basket.dx = -basket.speed;
  if (e.key === "ArrowRight") basket.dx = basket.speed;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") basket.dx = 0;
});

// On-screen buttons — support both touch & click
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

function startMoveLeft() { basket.dx = -basket.speed; }
function startMoveRight() { basket.dx = basket.speed; }
function stopMove() { basket.dx = 0; }

leftBtn.addEventListener("mousedown", startMoveLeft);
leftBtn.addEventListener("mouseup", stopMove);
leftBtn.addEventListener("touchstart", startMoveLeft);
leftBtn.addEventListener("touchend", stopMove);

rightBtn.addEventListener("mousedown", startMoveRight);
rightBtn.addEventListener("mouseup", stopMove);
rightBtn.addEventListener("touchstart", startMoveRight);
rightBtn.addEventListener("touchend", stopMove);

loop();
