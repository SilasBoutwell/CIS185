"use client";
import { useEffect, useRef } from "react";

export default function BlobMorph() {
  const container = useRef(null);

  const blobs = [
    { size: "35vw", top: "20%", left: "5%", hueSpeed: 0.18, startHue: 10 },
    { size: "40vw", top: "10%", left: "40%", hueSpeed: 0.09, startHue: 150 },
    { size: "30vw", top: "60%", left: "65%", hueSpeed: 0.12, startHue: 270 },
  ];

  function hslA(h, s = 90, l = 60, a = 0.16) {
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  }

  useEffect(() => {
    const elContainer = container.current;
    if (!elContainer) return;
    const els = elContainer.children;

    const perBlob = blobs.map((cfg, i) => {
      const jitter = (Math.random() - 0.5) * 18;
      const initialHue = (cfg.startHue + jitter + 360) % 360;
      const phase = Math.random() * 1000;
      const drift = {
        x: 0,
        y: 0,
        targetX: Math.random() * 240 - 120,
        targetY: Math.random() * 240 - 120,
        speed: 0.0015 + Math.random() * 0.0035,
      };
      const el = els[i];
      if (el) {
        const hue2 = (initialHue + 70) % 360;
        el.style.background = `radial-gradient(circle at 40% 40%, ${hslA(initialHue, 90, 60, 0.2)}, ${hslA(hue2, 90, 60, 0.06)})`;
        el.style.mixBlendMode = "normal";
        el.style.willChange = "transform, background";
      }
      return { initialHue, phase, drift };
    });

    let t = 0;

    const animate = () => {
      t += 0.006;

      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        const cfg = blobs[i];
        const meta = perBlob[i];
        const d = meta.drift;

        if (Math.abs(d.x - d.targetX) < 1 && Math.abs(d.y - d.targetY) < 1) {
          d.targetX = Math.random() * 240 - 120;
          d.targetY = Math.random() * 240 - 120;
        }

        d.x += (d.targetX - d.x) * d.speed;
        d.y += (d.targetY - d.y) * d.speed;

        const localT = t + meta.phase * 0.0008;

        const hue = (meta.initialHue + localT * 200 * cfg.hueSpeed) % 360;
        const hue2 = (hue + 70) % 360;

        el.style.background = `radial-gradient(circle at 40% 40%, ${hslA(hue, 92, 60, 0.21)}, ${hslA(hue2, 92, 60, 0.06)})`;

        const scaleX = 1 + 0.06 * Math.sin(localT * 2.8 + i);
        const scaleY = 1 + 0.06 * Math.cos(localT * 2.4 + i);
        const rotate = Math.sin(localT * 1.9 + i) * 18;

        const dx = d.x;
        const dy = d.y;

        el.style.transform = `translate(${dx}px, ${dy}px) scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotate}deg)`;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {

    };
  }, []);

  return (
    <div
      ref={container}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden"
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[200px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
          }}
        />
      ))}
    </div>
  );
}
