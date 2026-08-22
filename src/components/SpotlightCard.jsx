import React, { useRef, useState } from 'react';

/**
 * SpotlightCard — 60+ FPS Interactive Magnetic & Border Glow Card
 * Tracks cursor movement across the bounding box and renders a dynamic ambient radial illumination.
 */
export default function SpotlightCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setPosition({ x: -500, y: -500 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/[0.06] transition-all duration-300 ${className}`}
    >
      {/* 60+ FPS Dynamic Border Glow Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(226, 212, 183, 0.25), transparent 70%)`,
        }}
      />

      {/* 60+ FPS Dynamic Surface Illumination Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 mix-blend-screen"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(226, 212, 183, 0.06), transparent 80%)`,
        }}
      />

      {/* Card Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
