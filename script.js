function drawStars() {
  ctx.strokeStyle = "gold";
  ctx.lineWidth = 2;
  stars.forEach(star => {
    ctx.beginPath();
    ctx.moveTo(star.x - star.radius, star.y);
    ctx.lineTo(star.x + star.radius, star.y);
    ctx.moveTo(star.x, star.y - star.radius);
    ctx.lineTo(star.x, star.y + star.radius);
    ctx.stroke();

    // Optional: add glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = "gold";
  });
  ctx.shadowBlur = 0;
}
