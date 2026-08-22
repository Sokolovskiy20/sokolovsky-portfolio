import React, { useRef, useEffect } from 'react';

/**
 * ThreePortalsConvergenceCanvas
 * Renders 3 distinct cinematic WebGL portals converging in real-time:
 * 1. AI Portal (Left / Azure & Violet Neural Synapses & Data Stream)
 * 2. Luxury Design Portal (Top / Champagne Gold Ribbons & Polished Glass Shards)
 * 3. Architecture/Engineering Portal (Right / Monolithic Obsidian & Teal Geometric Blocks)
 * Converges into a central precision metal & sapphire glass dock with light particles.
 */
export default function ThreePortalsConvergenceCanvas({ activePortal = 'all' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for the 3 distinct portal energies
    const numParticles = 80;
    const particles = [];

    for (let i = 0; i < numParticles; i++) {
      // 0: AI (Blue/Violet), 1: Luxury (Gold), 2: Architecture (Teal/Emerald)
      const type = i % 3;
      particles.push({
        type,
        x: Math.random() * width,
        y: Math.random() * height,
        originX: type === 0 ? 0.15 * width : type === 1 ? 0.5 * width : 0.85 * width,
        originY: type === 1 ? 0.1 * height : 0.5 * height,
        targetX: 0.5 * width + (Math.random() - 0.5) * 200,
        targetY: 0.5 * height + (Math.random() - 0.5) * 150,
        speed: 0.008 + Math.random() * 0.012,
        progress: Math.random(),
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6,
        orbitAngle: Math.random() * Math.PI * 2,
        orbitRadius: 20 + Math.random() * 120
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // 1. Draw Ambient Radial Background Fields for the 3 Portals
      
      // Portal 1: AI (Left) - Electric Azure / Violet
      const gradAI = ctx.createRadialGradient(
        width * 0.18, height * 0.45, 10,
        width * 0.18, height * 0.45, width * 0.35
      );
      gradAI.addColorStop(0, 'rgba(56, 189, 248, 0.14)');
      gradAI.addColorStop(0.5, 'rgba(139, 92, 246, 0.06)');
      gradAI.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradAI;
      ctx.fillRect(0, 0, width, height);

      // Portal 2: Luxury Design (Top) - Champagne Gold & Warm Obsidian
      const gradLux = ctx.createRadialGradient(
        width * 0.5, height * 0.2, 10,
        width * 0.5, height * 0.2, width * 0.4
      );
      gradLux.addColorStop(0, 'rgba(226, 212, 183, 0.16)');
      gradLux.addColorStop(0.5, 'rgba(214, 194, 154, 0.05)');
      gradLux.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradLux;
      ctx.fillRect(0, 0, width, height);

      // Portal 3: Architecture & Engineering (Right) - Teal & Monolithic Emerald
      const gradArch = ctx.createRadialGradient(
        width * 0.82, height * 0.55, 10,
        width * 0.82, height * 0.55, width * 0.35
      );
      gradArch.addColorStop(0, 'rgba(20, 184, 166, 0.12)');
      gradArch.addColorStop(0.5, 'rgba(6, 95, 70, 0.05)');
      gradArch.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradArch;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Convergence Stream Lines toward Central Dock
      ctx.lineWidth = 1;
      
      // AI Portal Synapses Stream
      for (let j = 0; j < 6; j++) {
        const offset = Math.sin(time * 1.5 + j) * 40;
        ctx.beginPath();
        ctx.moveTo(width * 0.1, height * 0.4 + j * 30);
        ctx.bezierCurveTo(
          width * 0.25, height * 0.4 + offset,
          width * 0.38, centerY + offset * 0.5,
          centerX, centerY
        );
        ctx.strokeStyle = `rgba(96, 165, 250, ${0.06 + Math.sin(time + j) * 0.04})`;
        ctx.stroke();
      }

      // Luxury Gold Layers Stream
      for (let j = 0; j < 5; j++) {
        const offset = Math.cos(time * 1.2 + j) * 35;
        ctx.beginPath();
        ctx.moveTo(centerX - 120 + j * 60, height * 0.08);
        ctx.bezierCurveTo(
          centerX - 80 + j * 40, height * 0.25 + offset,
          centerX + offset * 0.4, height * 0.38,
          centerX, centerY
        );
        ctx.strokeStyle = `rgba(226, 212, 183, ${0.07 + Math.cos(time + j) * 0.04})`;
        ctx.stroke();
      }

      // Architecture Geometric Grid Stream
      for (let j = 0; j < 6; j++) {
        const offset = Math.sin(time * 1.3 + j) * 45;
        ctx.beginPath();
        ctx.moveTo(width * 0.9, height * 0.5 + j * 25);
        ctx.bezierCurveTo(
          width * 0.75, height * 0.55 + offset,
          width * 0.62, centerY + offset * 0.5,
          centerX, centerY
        );
        ctx.strokeStyle = `rgba(45, 212, 191, ${0.06 + Math.sin(time + j) * 0.04})`;
        ctx.stroke();
      }

      // 3. Draw Flowing Energy Particles
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress > 1) {
          p.progress = 0;
        }

        // Interpolate position with curve
        const t = p.progress;
        const startX = p.type === 0 ? width * 0.12 : p.type === 1 ? centerX + (Math.sin(p.orbitAngle) * 200) : width * 0.88;
        const startY = p.type === 1 ? height * 0.08 : centerY + (Math.cos(p.orbitAngle) * 200);

        const curX = (1 - t) * startX + t * centerX + Math.sin(time * 2 + p.orbitAngle) * p.orbitRadius * (1 - t);
        const curY = (1 - t) * startY + t * centerY + Math.cos(time * 2 + p.orbitAngle) * p.orbitRadius * (1 - t);

        ctx.beginPath();
        ctx.arc(curX, curY, p.size * (1 - t * 0.4), 0, Math.PI * 2);

        if (p.type === 0) {
          ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha * (1 - t * 0.3)})`;
          ctx.shadowColor = '#6366F1';
          ctx.shadowBlur = 6;
        } else if (p.type === 1) {
          ctx.fillStyle = `rgba(226, 212, 183, ${p.alpha * (1 - t * 0.3)})`;
          ctx.shadowColor = '#E2D4B7';
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = `rgba(45, 212, 191, ${p.alpha * (1 - t * 0.3)})`;
          ctx.shadowColor = '#14B8A6';
          ctx.shadowBlur = 6;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      // 4. Central Convergence Nexus & Sapphire Core
      const nexusRadius = 70 + Math.sin(time * 2) * 10;
      const coreGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, nexusRadius
      );
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.18)');
      coreGrad.addColorStop(0.3, 'rgba(226, 212, 183, 0.12)');
      coreGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.05)');
      coreGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, nexusRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      // Precision Convergence Ring
      ctx.beginPath();
      ctx.arc(centerX, centerY, 90 + Math.sin(time) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
