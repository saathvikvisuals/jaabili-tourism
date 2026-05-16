import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  size: number;
  gold: boolean;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = 220;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * 1400 - 200,
      y: Math.random() * 900 - 100,
      z: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 1.8 + 0.4,
      gold: Math.random() < 0.18,
      opacity: Math.random() * 0.6 + 0.15,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.012,
    }));

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const pulsed = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        // subtle mouse parallax
        const px = p.x + (mx - W / 2) * 0.03 * p.z;
        const py = p.y + (my - H / 2) * 0.02 * p.z;

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -200) p.x = W + 100;
        if (p.x > W + 200) p.x = -100;
        if (p.y < -100) p.y = H + 60;
        if (p.y > H + 100) p.y = -60;

        const color = p.gold ? `rgba(196,147,63,${pulsed})` : `rgba(255,255,255,${pulsed * 0.55})`;
        ctx.beginPath();
        ctx.arc(px, py, p.size * (0.5 + p.z * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // glow for gold
        if (p.gold && p.size > 1.2) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196,147,63,${pulsed * 0.08})`;
          ctx.fill();
        }
      });

      // Draw subtle wireframe sphere-like arcs in the right half
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = '#C4933F';
      ctx.lineWidth = 0.8;
      const cx = W * 0.78;
      const cy = H * 0.55;
      const r = Math.min(W, H) * 0.32;
      const rot = frame * 0.003;

      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI + rot;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * Math.abs(Math.cos(a)), Math.sin(a) * 0.5, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let i = 0; i < 4; i++) {
        const lat = ((i + 1) / 5) * Math.PI - Math.PI / 2;
        const lr = r * Math.cos(lat);
        const ly = cy + r * Math.sin(lat);
        ctx.beginPath();
        ctx.ellipse(cx, ly, lr, lr * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
