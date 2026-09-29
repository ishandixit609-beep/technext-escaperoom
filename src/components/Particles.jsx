import { useEffect, useRef } from 'react';
// Tiny drifting motes in the current accent colour.
export default function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'); let w, h, raf;
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    const P = Array.from({ length: 45 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.6 + .4, s: Math.random() * .25 + .08, a: Math.random() * .5 + .15, d: Math.random() * 6.28 }));
    const draw = () => {
      x.clearRect(0, 0, w, h); x.fillStyle = getComputedStyle(c).color;
      for (const p of P) {
        p.y -= p.s; p.d += .01; p.x += Math.sin(p.d) * .25;
        if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
        x.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.d * 2));
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="particles" />;
}
