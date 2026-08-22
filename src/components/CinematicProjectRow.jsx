import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * CinematicProjectRow — Full-bleed / Panoramic Cinematic Case Study Row
 * Features:
 * - Scroll Transform: Smooth architectural scale from 1.08 -> 1.0 on scroll into view
 * - Heavy spring entrance physics without bounce
 * - Symmetrically aligned editorial typography
 * - Prominent interactive action buttons on image and side column
 * - Smooth cinematic zoom & subtle obsidian aura on hover
 * - Direct external opening of live deployed project in a new tab
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

  // Scale from 1.08 down to 1.0 as section moves into view
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.0, 1.02]);
  const smoothScale = useSpring(rawScale, { stiffness: 100, damping: 30 });

  const handleClick = (e) => {
    if (liveUrl) {
      e.stopPropagation();
      window.open(liveUrl, '_blank', 'noopener,noreferrer');
    } else if (onClick) {
      onClick(id);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 45, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 30,
        mass: 1.1
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full cursor-pointer py-10 sm:py-16 border-t border-white/[0.08] first:border-t-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-center ${
        reversed ? 'lg:grid-flow-dense' : ''
      }`}>
        
        {/* PANORAMIC CINEMATIC IMAGE FRAME (8 of 12 cols on desktop) */}
        <div className={`lg:col-span-8 ${
          reversed ? 'lg:col-start-5' : 'lg:col-start-1'
        }`}>
          <div className="relative w-full aspect-[16/9] sm:aspect-[16/9.5] rounded-2xl sm:rounded-[28px] overflow-hidden border border-white/[0.08] group-hover:border-white/[0.25] transition-all duration-700 bg-[#0A0A0A] shadow-[0_20px_70px_rgba(0,0,0,0.85)]">
            
            {/* Cinematic Background Screenshot with Scroll Transform Scale (1.08 -> 1.0) & Hover Zoom */}
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
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]" />
              <span className="font-mono text-[10px] sm:text-xs tracking-wider uppercase text-white/90 font-medium">
                {categoryBadge}
              </span>
            </div>

            {/* Floating Year Pill inside Image */}
            <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-10 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 font-mono text-xs text-white/60">
              {year}
            </div>

            {/* Floating Action Button inside Image Frame (Both Mobile & Desktop) */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-10">
              <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white text-black group-hover:bg-[#E2D4B7] flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                <ArrowUpRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

          </div>
        </div>

        {/* SIDE TYPOGRAPHY COLUMN (4 of 12 cols on desktop) */}
        <div className={`lg:col-span-4 flex flex-col justify-between space-y-6 ${
          reversed ? 'lg:col-start-1 lg:row-start-1' : ''
        }`}>
          
          <div className="space-y-4">
            
            {/* Number Index */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#E2D4B7] tracking-[0.2em] font-semibold">
                {number} // 03
              </span>
              <div className="h-px w-8 bg-white/20" />
            </div>

            {/* Project Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[-0.02em] group-hover:text-[#E2D4B7] transition-colors leading-[1.1]">
              {title}
            </h3>

            {/* Subtitle / Scope */}
            <span className="block font-mono text-xs uppercase tracking-[0.18em] text-white/50">
              {subtitle}
            </span>

            {/* Balanced Editorial Description */}
            <p className="text-sm sm:text-base text-white/70 font-light leading-[1.65] pt-1">
              {description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/[0.03] border border-white/[0.06] text-white/60 group-hover:border-white/[0.12] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

          </div>

          {/* Action Button */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.12] group-hover:border-[#E2D4B7] text-white transition-all duration-300 font-mono text-xs tracking-[0.18em] uppercase font-medium shadow-md">
              <span>{viewText}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
}
