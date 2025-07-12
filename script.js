function drawStars() {
  stars.forEach(star => {
    let gradient = ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.radius
    );
    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "gold");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();

    // Optional: a slight glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = "gold";
  });
  ctx.shadowBlur = 0; // reset so other drawings aren't blurred
}
