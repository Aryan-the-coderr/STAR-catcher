const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let basket = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 50,
  width: 100,
  height: 20,
  speed: 5,
  dx: 0
};

let stars = [];
let score = 0;

function drawBasket() {
  ctx.fillStyle = "#333";
  ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

function drawStars() {
  ctx.fillStyle = "gold";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawScore() {
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 20, 30);
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
      speed: 3
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

// On-screen buttons
document.getElementById("leftBtn").addEventListener("touchstart", () => {
  basket.dx = -basket.speed;
});
document.getElementById("leftBtn").addEventListener("touchend", () => {
  basket.dx = 0;
});

document.getElementById("rightBtn").addEventListener("touchstart", () => {
  basket.dx = basket.speed;
});
document.getElementById("rightBtn").addEventListener("touchend", () => {
  basket.dx = 0;
});

loop();
