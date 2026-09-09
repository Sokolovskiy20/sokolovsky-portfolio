import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * CinematicProjectRow — Full-bleed / Panoramic Cinematic Case Study Row
 * Mobile-First:
 * - Mobile: Visual-first immersive experience with enlarged 16/10 aspect ratio, left-aligned title & clean tags.
 * - Unified typography across all screen sizes.
 */
export default function CinematicProjectRow({
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
  liveUrl,
  reversed = false,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  // Scroll Transform parallax & scale binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale from 1.06 down to 1.0 as section moves into view
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.0, 1.02]);
  const smoothScale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  const handleClick = (e) => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 30,
        mass: 1.0
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full cursor-pointer py-4 sm:py-16 border-t border-white/[0.08] first:border-t-0 transform-gpu text-left"
    >
      {/* ========================================================================= */}
      {/* 📱 MOBILE VIEW: IMMERSIVE VISUAL PHOTO-CARD (< lg)                         */}
      {/* ========================================================================= */}
      <div className="block lg:hidden">
        <div className="relative w-full aspect-[16/11] xs:aspect-[16/10] rounded-[22px] overflow-hidden border border-white/[0.12] bg-[#0A0A0A] shadow-[0_16px_50px_rgba(0,0,0,0.9)]">
          
          {/* High-Impact Visual Photo */}
          <motion.div
            style={{
              backgroundImage: `url('${imageSrc}')`,
              scale: smoothScale
            }}
            className="absolute inset-0 bg-cover bg-center"
          />

          {/* Luxury Cinematic Obsidian Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40 pointer-events-none" />
          
          {/* Top Bar: Number + Category Badge + Year */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/12 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
              <span className="font-sans text-[10px] tracking-wider uppercase text-white/90 font-medium">
                {categoryBadge}
              </span>
            </div>

            <div className="px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 font-sans text-[11px] text-white/70 font-medium">
              {year}
            </div>
          </div>

          {/* Bottom Overlay: Title, Subtitle, Direct Tap Button (Left Aligned) */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex items-end justify-between gap-3 text-left">
            <div className="space-y-1 min-w-0 text-left">
              <div className="flex items-center gap-2 text-left">
                <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#E2D4B7] truncate font-medium">
                  {subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-light text-white tracking-[-0.02em] leading-tight drop-shadow-md truncate text-left font-sans">
                {title}
              </h3>
            </div>

            {/* Tap Action Pill Button */}
            <div className="shrink-0">
              <div className="w-11 h-11 rounded-full bg-white text-black group-active:bg-[#E2D4B7] flex items-center justify-center shadow-2xl transition-transform active:scale-90">
                <ArrowUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 💻 DESKTOP VIEW: 12-COLUMN EDITORIAL PANORAMA (>= lg)                    */}
      {/* ========================================================================= */}
      <div className={`hidden lg:grid grid-cols-12 gap-14 xl:gap-20 items-center ${
        reversed ? 'grid-flow-dense' : ''
      }`}>
        
        {/* PANORAMIC CINEMATIC IMAGE FRAME (8 of 12 cols on desktop) */}
        <div className={`col-span-8 ${
          reversed ? 'col-start-5' : 'col-start-1'
        }`}>
          <div className="relative w-full aspect-[16/9.5] rounded-[28px] overflow-hidden border border-white/[0.08] group-hover:border-white/[0.25] transition-all duration-700 bg-[#0A0A0A] shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
            
            {/* Cinematic Background Screenshot with Scroll Transform Scale & Hover Zoom */}
            <motion.div
              style={{
                backgroundImage: `url('${imageSrc}')`,
                scale: smoothScale
              }}
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            {/* Subtle Obsidian Film Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

            {/* Subtle Champagne Gold Glow On Hover */}
            <div 
              className={`absolute inset-0 bg-[#E2D4B7]/[0.035] transition-opacity duration-500 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Floating Top Category Pill inside Image */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
              <span className="font-sans text-xs tracking-wider uppercase text-white/90 font-medium">
                {categoryBadge}
              </span>
            </div>

            {/* Floating Year Pill inside Image */}
            <div className="absolute top-6 right-6 z-10 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 font-sans text-xs text-white/60 font-medium">
              {year}
            </div>

            {/* Floating Action Button inside Image Frame */}
            <div className="absolute bottom-6 right-6 z-10">
              <div className="w-12 h-12 rounded-full bg-white text-black group-hover:bg-[#E2D4B7] flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

          </div>
        </div>

        {/* SIDE TYPOGRAPHY COLUMN (4 of 12 cols on desktop) */}
        <div className={`col-span-4 flex flex-col justify-between space-y-6 text-left ${
          reversed ? 'col-start-1 row-start-1' : ''
        }`}>
          
          <div className="space-y-4 text-left">
            
            {/* Project Title */}
            <h3 className="text-4xl md:text-5xl font-light text-white tracking-[-0.02em] group-hover:text-[#E2D4B7] transition-colors leading-[1.1] font-sans text-left">
              {title}
            </h3>

            {/* Subtitle / Scope */}
            <span className="block font-sans text-xs uppercase tracking-[0.18em] text-white/50 text-left font-medium">
              {subtitle}
            </span>

            {/* Balanced Editorial Description */}
            <p className="text-base text-white/70 font-light leading-[1.65] pt-1 text-left font-sans">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2 text-left">
              {tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-sans tracking-wider bg-white/[0.03] border border-white/[0.06] text-white/60 group-hover:border-white/[0.12] transition-colors font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2 text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.12] group-hover:border-[#E2D4B7] text-white transition-all duration-300 font-sans text-xs tracking-[0.18em] uppercase font-medium shadow-md">
              <span>{viewText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
