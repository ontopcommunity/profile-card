/**
 * Offline geometric / low-poly animated background
 * Recreates the colorful polygon network look from the archived thanhdieu.com
 */
(function () {
  const canvas = document.getElementById("geoCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h, points = [], animationId;
  const POINT_COUNT = 55;
  const CONNECT_DIST = 160;
  const colors = [
    [255, 40, 80],   // red-pink
    [255, 120, 0],   // orange
    [255, 220, 0],   // yellow
    [0, 255, 120],   // green
    [0, 220, 255],   // cyan
    [80, 80, 255],   // blue
    [180, 40, 255],  // purple
    [255, 40, 200],  // magenta
  ];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initPoints();
  }

  function initPoints() {
    points = [];
    for (let i = 0; i < POINT_COUNT; i++) {
      const c = colors[Math.floor(Math.random() * colors.length)];
      points.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: 1.5 + Math.random() * 2,
        color: c,
      });
    }
  }

  function draw() {
    // dark purple base
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    grad.addColorStop(0, "#120822");
    grad.addColorStop(0.5, "#0a0518");
    grad.addColorStop(1, "#05030e");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // connections
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i], b = points[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const alpha = (1 - dist / CONNECT_DIST) * 0.55;
          const c1 = a.color, c2 = b.color;
          const r = (c1[0] + c2[0]) / 2 | 0;
          const g = (c1[1] + c2[1]) / 2 | 0;
          const bl = (c1[2] + c2[2]) / 2 | 0;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // points + soft glow
    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},0.15)`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${p.color[0]},${p.color[1]},${p.color[2]})`;
      ctx.fill();
    }

    animationId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
