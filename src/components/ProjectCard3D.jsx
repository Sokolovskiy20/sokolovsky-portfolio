import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * Premium 3D Tilt Card with dynamic lighting sheen, smooth damping, and depth
 */
export default function ProjectCard3D({
  id,
  title,
  categoryBadge,
  year,
  description,
  imageSrc,
  tags = [],
  viewText = "Explore Case",
  isPanoramic = false,
  onClick,
  index = 0
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for staggered 3D entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    setCoords({ x: normX, y: normY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Subtle luxury 3D tilt angles (max ~6-8 deg for ultra refined feel)
  const rotateX = isHovered ? -coords.y * (isPanoramic ? 7 : 10) : 0;
  const rotateY = isHovered ? coords.x * (isPanoramic ? 7 : 10) : 0;
  const lightX = isHovered ? (coords.x + 0.5) * 100 : 50;
  const lightY = isHovered ? (coords.y + 0.5) * 100 : 50;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(id)}
      style={{
        perspective: '1200px',
        transitionDelay: `${index * 120}ms`
      }}
      className={`relative w-full cursor-pointer transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-16 scale-[0.97]'
      } ${
        isPanoramic 
          ? 'h-[520px] sm:h-[640px] lg:h-[720px]' 
          : 'h-[480px] sm:h-[580px] lg:h-[620px]'
      }`}
    >
      {/* 3D Transform Container */}
      <div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
          transformStyle: 'preserve-3d',
          transition: isHovered 
            ? 'transform 0.15s ease-out' 
            : 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="group relative w-full h-full rounded-2xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] hover:border-white/[0.24] shadow-[0_20px_70px_rgba(0,0,0,0.85)] hover:shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
      >
        
        {/* Background Photographic Layer with Smooth Scale */}
        <div
          style={{
            backgroundImage: `url('${imageSrc}')`,
            transform: `scale(${isHovered ? 1.06 : 1}) translateZ(-10px)`,
            transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute inset-0 bg-cover bg-center"
        />

        {/* Ambient Obsidian & Film Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/45 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-black/40 pointer-events-none" />

        {/* Dynamic 3D Specular Light Glare (follows cursor) */}
        <div
          style={{
            background: `radial-gradient(circle 500px at ${lightX}% ${lightY}%, rgba(255,255,255,0.12), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
        />

        {/* Subtle Gold Accent Aura on Hover */}
        <div
          style={{
            background: `radial-gradient(circle 400px at ${lightX}% ${lightY}%, rgba(226,212,183,0.14), transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />

        {/* Top Bar Metadata (Elevated in 3D Space) */}
        <div 
          style={{ transform: 'translateZ(30px)' }}
          className="absolute top-6 sm:top-10 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between z-20 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-white/90 font-medium">
              {categoryBadge}
            </span>
          </div>

          <span className="font-mono text-[11px] sm:text-xs text-white/60 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
            {year}
          </span>
        </div>

        {/* Bottom Content Area (Elevated in 3D Space) */}
        <div 
          style={{ transform: 'translateZ(40px)' }}
          className={`absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-20 flex flex-col ${
            isPanoramic 
              ? 'md:flex-row md:items-end md:justify-between gap-6' 
              : 'justify-between gap-4'
          }`}
        >
          <div className={isPanoramic ? 'max-w-2xl' : 'w-full'}>
            <h4 className={`font-sans font-light tracking-tight text-white group-hover:text-[#E2D4B7] transition-colors duration-300 ${
              isPanoramic 
                ? 'text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-4' 
                : 'text-2xl sm:text-4xl mb-2 sm:mb-3'
            }`}>
              {title}
            </h4>

            <p className={`font-sans text-white/75 font-light leading-relaxed mb-4 sm:mb-5 ${
              isPanoramic 
                ? 'text-sm sm:text-base max-w-xl' 
                : 'text-xs sm:text-sm line-clamp-2'
            }`}>
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono tracking-wider text-white/70 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="shrink-0 pt-2 md:pt-0">
            {isPanoramic ? (
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white text-black font-nav text-xs tracking-[0.16em] uppercase font-semibold group-hover:bg-[#E2D4B7] group-hover:text-black transition-all duration-300 shadow-xl group-hover:shadow-[0_0_30px_rgba(226,212,183,0.35)]">
                <span>{viewText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            ) : (
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] w-full">
                <span className="font-nav text-[11px] tracking-wider uppercase text-white/60 group-hover:text-white transition-colors">
                  {viewText}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
