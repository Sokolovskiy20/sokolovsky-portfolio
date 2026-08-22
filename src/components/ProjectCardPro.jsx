import React, { useRef, useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * ProjectCardPro — World-Class / Pro-Level Interactive Case Study Card
 * Features:
 * - Magnetic floating cursor badge tracking pointer inside card
 * - Dynamic specular border illumination following mouse coordinates
 * - Giant parallax outline watermark index (01, 02, 03)
 * - Cinematic image scale + exposure shift
 * - Scroll-triggered entrance animation with cubic-bezier easing
 */
export default function ProjectCardPro({
  id,
  index = 0,
  number = "01",
  title,
  subtitle,
  categoryBadge,
  year,
  description,
  imageSrc,
  tags = [],
  viewText = "Explore Case",
  isPanoramic = false,
  onClick
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, normX: 0, normY: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Scroll Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
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
    
    setMousePos({
      x,
      y,
      normX: (x / rect.width) - 0.5,
      normY: (y / rect.height) - 0.5
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
  };

  // 3D Tilt calculation (subtle luxury angles)
  const tiltX = isHovered ? -mousePos.normY * (isPanoramic ? 4 : 6) : 0;
  const tiltY = isHovered ? mousePos.normX * (isPanoramic ? 4 : 6) : 0;
  const lightPercentX = isHovered ? ((mousePos.normX + 0.5) * 100) : 50;
  const lightPercentY = isHovered ? ((mousePos.normY + 0.5) * 100) : 50;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick && onClick(id)}
      style={{
        perspective: '1400px',
        transitionDelay: `${index * 100}ms`
      }}
      className={`relative w-full cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-20 scale-[0.96]'
      } ${
        isPanoramic
          ? 'h-[520px] sm:h-[640px] lg:h-[720px]'
          : 'h-[500px] sm:h-[580px] lg:h-[620px]'
      }`}
    >
      {/* Main Card Bezel with 3D Tilt */}
      <div
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`,
          transformStyle: 'preserve-3d',
          transition: isHovered
            ? 'transform 0.12s ease-out'
            : 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="group relative w-full h-full rounded-2xl sm:rounded-[36px] overflow-hidden border border-white/[0.08] hover:border-white/[0.28] transition-colors duration-500 shadow-[0_20px_80px_rgba(0,0,0,0.9)] hover:shadow-[0_30px_100px_rgba(0,0,0,0.98)]"
      >
        
        {/* Photographic Background Canvas with Zoom */}
        <div
          style={{
            backgroundImage: `url('${imageSrc}')`,
            transform: `scale(${isHovered ? 1.05 : 1})`,
            transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute inset-0 bg-cover bg-center"
        />

        {/* Multi-layered Obsidian Film Shading */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/50 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/85 via-transparent to-black/50 pointer-events-none" />

        {/* Dynamic Light Sheen Beam following Cursor */}
        <div
          style={{
            background: `radial-gradient(circle 600px at ${lightPercentX}% ${lightPercentY}%, rgba(226,212,183,0.12), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease'
          }}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />

        {/* Giant Monolithic Outline Watermark Index (Parallax) */}
        <div
          style={{
            transform: `translateX(${isHovered ? -15 : 0}px) translateY(${isHovered ? -10 : 0}px) translateZ(10px)`,
            transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="absolute right-4 sm:right-10 bottom-2 sm:bottom-6 z-10 pointer-events-none select-none"
        >
          <span 
            className="font-nav text-7xl sm:text-9xl md:text-[140px] font-bold text-transparent leading-none tracking-tighter"
            style={{
              WebkitTextStroke: isHovered ? '1px rgba(226, 212, 183, 0.25)' : '1px rgba(255, 255, 255, 0.08)',
              transition: 'all 0.5s ease'
            }}
          >
            {number}
          </span>
        </div>

        {/* Top Floating Header Metadata */}
        <div 
          style={{ transform: 'translateZ(35px)' }}
          className="absolute top-6 sm:top-9 left-6 sm:left-10 right-6 sm:right-10 flex items-center justify-between z-20 pointer-events-none"
        >
          {/* Category Chip */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-white/90 font-medium">
              {categoryBadge}
            </span>
          </div>

          {/* Year Chip */}
          <div className="flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 font-mono text-xs">
            {year}
          </div>
        </div>

        {/* Bottom Content Area */}
        <div 
          style={{ transform: 'translateZ(45px)' }}
          className={`absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 z-20 flex flex-col ${
            isPanoramic 
              ? 'md:flex-row md:items-end md:justify-between gap-6' 
              : 'justify-between gap-4'
          }`}
        >
          <div className={isPanoramic ? 'max-w-2xl' : 'w-full'}>
            
            {subtitle && (
              <span className="font-mono text-[10px] sm:text-xs tracking-[0.20em] uppercase text-[#E2D4B7] font-medium block mb-2">
                {subtitle}
              </span>
            )}

            <h3 className={`font-sans font-light tracking-tight text-white group-hover:text-[#E2D4B7] transition-colors duration-300 ${
              isPanoramic 
                ? 'text-3xl sm:text-5xl md:text-6xl mb-3 sm:mb-4' 
                : 'text-2xl sm:text-4xl mb-2 sm:mb-3'
            }`}>
              {title}
            </h3>

            <p className={`font-sans text-white/70 font-light leading-relaxed mb-4 sm:mb-5 ${
              isPanoramic 
                ? 'text-sm sm:text-base max-w-xl' 
                : 'text-xs sm:text-sm line-clamp-2 max-w-md'
            }`}>
              {description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono tracking-wider text-white/70 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm group-hover:border-white/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="shrink-0 pt-2 md:pt-0">
            {isPanoramic ? (
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-nav text-xs tracking-[0.16em] uppercase font-semibold group-hover:bg-[#E2D4B7] group-hover:text-black transition-all duration-300 shadow-xl group-hover:shadow-[0_0_35px_rgba(226,212,183,0.35)] group-hover:scale-105">
                <span>{viewText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            ) : (
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] w-full">
                <span className="font-nav text-[11px] tracking-wider uppercase text-white/60 group-hover:text-white transition-colors">
                  {viewText}
                </span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all group-hover:scale-105">
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Magnetic Floating "VIEW CASE" Pill (Tracks Cursor inside card) */}
        {isHovered && mousePos.x > 0 && (
          <div
            style={{
              left: `${mousePos.x}px`,
              top: `${mousePos.y}px`,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.2s ease, transform 0.05s ease-out'
            }}
            className="absolute z-30 pointer-events-none hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-[#E2D4B7]/40 shadow-[0_0_25px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-75 duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] animate-ping" />
            <span className="font-nav text-[10px] tracking-[0.20em] uppercase text-white font-medium whitespace-nowrap">
              {viewText}
            </span>
            <ArrowUpRight className="w-3 h-3 text-[#E2D4B7]" />
          </div>
        )}

      </div>
    </div>
  );
}
