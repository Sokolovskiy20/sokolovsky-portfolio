import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * ProjectCardEditorial — Clean, Flat Luxury Editorial Project Card
 * Ultra-crisp typography, smooth 2D scale, refined borders, and seamless hover transitions.
 */
export default function ProjectCardEditorial({
  id,
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onClick && onClick(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full cursor-pointer rounded-2xl sm:rounded-[32px] overflow-hidden border border-white/[0.08] hover:border-white/[0.24] transition-all duration-500 bg-[#0c0c0c] shadow-[0_15px_50px_rgba(0,0,0,0.85)] ${
        isPanoramic
          ? 'h-[500px] sm:h-[620px] lg:h-[680px]'
          : 'h-[480px] sm:h-[560px] lg:h-[600px]'
      }`}
    >
      {/* Background Photography with Clean Cinematic Zoom */}
      <div
        style={{
          backgroundImage: `url('${imageSrc}')`,
          transform: `scale(${isHovered ? 1.04 : 1})`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="absolute inset-0 bg-cover bg-center"
      />

      {/* Deep Obsidian Vignettes & Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/50 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-black/40 pointer-events-none" />

      {/* Subtle Gold Ambient Overlay on Hover */}
      <div 
        className={`absolute inset-0 bg-[#E2D4B7]/[0.03] transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Giant Monolithic Outline Watermark Number */}
      <div className="absolute right-4 sm:right-8 bottom-2 sm:bottom-6 z-10 pointer-events-none select-none">
        <span 
          className="font-nav text-7xl sm:text-9xl md:text-[130px] font-bold text-transparent leading-none tracking-tighter"
          style={{
            WebkitTextStroke: isHovered ? '1px rgba(226, 212, 183, 0.22)' : '1px rgba(255, 255, 255, 0.06)',
            transition: 'all 0.5s ease'
          }}
        >
          {number}
        </span>
      </div>

      {/* Top Header Metadata Bar */}
      <div className="absolute top-6 sm:top-8 left-6 sm:left-8 right-6 sm:right-8 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-white/90 font-medium">
            {categoryBadge}
          </span>
        </div>

        <div className="flex items-center px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 font-mono text-xs">
          {year}
        </div>
      </div>

      {/* Bottom Content Area */}
      <div 
        className={`absolute bottom-6 sm:bottom-8 left-6 sm:left-8 right-6 sm:right-8 z-20 flex flex-col ${
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
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white text-black font-nav text-xs tracking-[0.16em] uppercase font-semibold group-hover:bg-[#E2D4B7] group-hover:text-black transition-all duration-300 shadow-xl group-hover:shadow-[0_0_30px_rgba(226,212,183,0.3)]">
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
  );
}
