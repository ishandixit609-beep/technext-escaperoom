import { useEffect, useRef } from 'react';
// Drifting dust + a few glowing embers in the current accent colour.
export default function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d');
    let w, h, raf;
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    resize(); addEventListener('resize', resize);
    const mk = (ember) => ({
      ember, x: Math.random() * w, y: Math.random() * h,
      r: ember ? Math.random() * 1.6 + 1.6 : Math.random() * 1.2 + .3,
      vy: ember ? Math.random() * .5 + .25 : Math.random() * .22 + .06,
      a: ember ? Math.random() * .4 + .5 : Math.random() * .4 + .12,
      ph: Math.random() * 6.28, sway: Math.random() * .5 + .15,
    });
    const P = [...Array.from({ length: 70 }, () => mk(false)), ...Array.from({ length: 12 }, () => mk(true))];
    let t = 0;
    const draw = () => {
      t += .016; x.clearRect(0, 0, w, h);
      const col = getComputedStyle(c).color; x.fillStyle = col; x.shadowColor = col;
      for (const p of P) {
        p.y -= p.vy; p.ph += .012;
        p.x += Math.sin(p.ph) * p.sway + Math.sin(t * .3) * .12;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        x.globalAlpha = p.a * (0.55 + 0.45 * Math.sin(p.ph * 2.2));
        x.shadowBlur = p.ember ? 14 : 0;
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, 6.283); x.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="particles" />;
}