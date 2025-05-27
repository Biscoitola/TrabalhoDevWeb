

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.id = "led-canvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "9999"; // 👉 fica NA FRENTE de tudo
canvas.style.pointerEvents = "none"; // 👉 não interfere nos cliques
document.body.appendChild(canvas);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const colors = ["#00ffff", "#ff00cc", "#ff6f00"]; // Ciano, rosa neon, laranja queimado
const dots = [];

for (let i = 0; i < 15; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: 1.2 + Math.random() * 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: 0.4 + Math.random() * 0.6,
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const dot of dots) {
    dot.x += dot.vx;
    dot.y += dot.vy;

    if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;

    ctx.beginPath();
    ctx.fillStyle = `${dot.color}${Math.floor(dot.alpha * 255).toString(16)}`;
    ctx.shadowColor = dot.color;
    ctx.shadowBlur = 10;
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  requestAnimationFrame(draw);
}

draw();
