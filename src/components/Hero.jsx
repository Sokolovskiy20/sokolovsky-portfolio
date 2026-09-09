import React, { useState } from 'react';
import { translations } from '../translations';
import { ArrowDown, ArrowUpRight, Sparkles, Compass, ShieldCheck, Cpu } from 'lucide-react';

export default function Hero({ lang, onSelectProject, onOpenContact }) {
  const t = translations[lang].hero;
  const [hoveredCard, setHoveredCard] = useState(null);

  const previewCards = [
    {
      id: 'aura',
      title: 'AURA Living',
      subtitle: 'Apple Ecosystem & Smart Villa Automation',
      image: '/assets/aura/azure_hero_premium.jpg',
      badge: 'AI & Smart Living'
    },
    {
      id: 'amazonia',
      title: 'MAIRA Amazonia',
      subtitle: '10-Day Deep Rainforest Private Expedition',
      image: '/assets/amazonia/hero.jpg',
      badge: 'Luxury Expedition'
    },
    {
      id: 'symmetry',
      title: 'SYMMETRY Clinic',
      subtitle: 'Haute Aesthetic Medicine & Swiss Dentistry',
      image: '/assets/symmetry/hero_bg_symmetry_v2.jpg',
      badge: 'Swiss Aesthetic'
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 sm:pt-36 pb-16 flex flex-col justify-between overflow-hidden bg-grain">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[1000px] h-[400px] sm:h-[600px] bg-gradient-to-b from-[#CBB280]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
        
        {/* Top Identification Pill */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CBB280] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CBB280]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              {t.roleBadge}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-xs font-mono text-white/60">
              {t.locationTag}
            </span>
          </div>
        </div>

        {/* Big Impact Headline */}
        <div className="text-center max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif-luxury font-light tracking-tight text-white leading-[0.98] sm:leading-[0.98] mb-6">
            <span className="block text-gradient-silver font-normal tracking-tight uppercase">
              Artem Sokolovsky
            </span>
            <span className="block text-xl sm:text-3xl md:text-4xl font-display-luxury font-light tracking-widest text-[#CBB280] mt-3 uppercase">
              AI Web Designer & Frontend Developer
            </span>
          </h1>

          {/* Sincere, human subheadline */}
          <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed mb-8 tracking-tight">
            {t.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#work"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-[#070707] font-semibold text-xs sm:text-sm uppercase tracking-widest hover:bg-[#E2D4B7] active:scale-95 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{t.exploreWorks}</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={onOpenContact}
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/15 text-white/90 font-medium text-xs sm:text-sm uppercase tracking-widest hover:text-white hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.directContact}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* SPECTACULAR LARGE RUNNING MARQUEE TICKER (Бегущая строка)                */}
      {/* ========================================================================= */}
      <div className="relative w-full my-8 sm:my-12 py-6 sm:py-8 border-y border-white/10 bg-black/40 backdrop-blur-md overflow-hidden select-none">
        
        {/* Left & Right gradient masks for smooth edge fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track 1: Forward Fast */}
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {[...Array(4)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-8 sm:gap-16 px-4 sm:px-8">
              <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display-luxury font-extrabold uppercase tracking-tight text-white/90 hover:text-[#E2D4B7] transition-colors">
                ARTEM SOKOLOVSKY
              </span>
              <span className="text-2xl sm:text-5xl text-[#CBB280] font-serif-luxury italic">
                ✦
              </span>
              <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-luxury italic font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#CBB280]">
                AI Web Designer & Frontend Developer
              </span>
              <span className="text-2xl sm:text-5xl text-[#CBB280] font-serif-luxury italic">
                ✦
              </span>
              <span className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-display-luxury font-bold uppercase tracking-tight text-white/40">
                UKRAINE • WORLDWIDE
              </span>
              <span className="text-2xl sm:text-5xl text-[#CBB280] font-serif-luxury italic">
                ✦
              </span>
            </div>
          ))}
        </div>

        {/* Marquee Track 2: Reverse Ambient Subline */}
        <div className="animate-marquee-reverse flex items-center whitespace-nowrap mt-3 sm:mt-4 opacity-70">
          {[...Array(4)].map((_, loopIdx) => (
            <div key={loopIdx} className="flex items-center gap-6 sm:gap-12 px-4 sm:px-6">
              <span className="text-xs sm:text-base font-mono tracking-widest uppercase text-white/60">
                LUXURY MINIMALISM
              </span>
              <span className="text-xs text-[#CBB280]">/</span>
              <span className="text-xs sm:text-base font-mono tracking-widest uppercase text-white/90">
                NEXT-GEN AI WORKFLOWS
              </span>
              <span className="text-xs text-[#CBB280]">/</span>
              <span className="text-xs sm:text-base font-mono tracking-widest uppercase text-white/60">
                AESTHETIC PRECISION
              </span>
              <span className="text-xs text-[#CBB280]">/</span>
              <span className="text-xs sm:text-base font-mono tracking-widest uppercase text-white/90">
                RADICAL SINCERITY & CRAFT
              </span>
              <span className="text-xs text-[#CBB280]">/</span>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive 3 Flagship Projects Preview Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full mt-4 sm:mt-6">
        <div className="text-center mb-4">
          <span className="text-[11px] font-mono uppercase tracking-widest text-white/40">
            Interactive Showcase · Click any card to inspect
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectProject(card.id)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-[#CBB280]/40 transition-all duration-500 cursor-pointer shadow-2xl hover:-translate-y-2"
            >
              {/* Image Container with smooth zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/20" />
                
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
                    {card.badge}
                  </span>
                </div>

                {/* Corner inspect icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Content caption */}
              <div className="p-5 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif-luxury text-white group-hover:text-[#E2D4B7] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-white/60 line-clamp-1 mt-1 font-light">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/80 transition-colors">
                  <span>Case Study & Gallery</span>
                  <span className="text-[#CBB280]">Explore →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Bottom Bar with Key Stats */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {t.stats.map((stat, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-light font-serif-luxury text-white text-gradient-silver">
                  {stat.value}
                </span>
                <span className="text-[11px] font-mono tracking-wider uppercase text-white/50 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
