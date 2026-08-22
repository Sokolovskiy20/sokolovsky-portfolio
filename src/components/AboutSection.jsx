import React from 'react';
import { translations } from '../translations';
import { Sparkles, Heart, Zap, Globe2, Shield, Award, Terminal, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function AboutSection({ lang, onOpenContact }) {
  const t = translations[lang].about;

  return (
    <section id="about" className="relative py-28 sm:py-36 border-t border-white/10 bg-[#0A0A0A] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#CBB280]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBB280] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.sectionTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury text-white font-light leading-tight">
            {t.sectionHeading.split('&')[0]} & <br className="hidden sm:inline" />
            <span className="italic text-gradient-gold font-normal">
              {t.sectionHeading.split('&')[1] || 'Sincerity in Craft'}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-4 font-light leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Bio & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16">
          
          {/* Left: Visual Identity & Monogram Emblem */}
          <div className="lg:col-span-4">
            <div className="relative rounded-3xl p-8 sm:p-10 glass-panel border border-white/15 flex flex-col items-center text-center shadow-2xl overflow-hidden group">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#1A1A1A] via-[#2A241C] to-[#CBB280] p-1 shadow-2xl mb-6 group-hover:scale-105 transition-transform duration-500">
                <div className="w-full h-full rounded-full bg-[#070707] flex flex-col items-center justify-center text-white">
                  <span className="font-serif-luxury font-bold text-3xl sm:text-4xl text-gradient-gold">AS</span>
                  <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase mt-0.5">EST. 2026</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif-luxury text-white mb-1">
                Artem Sokolovsky
              </h3>
              <p className="text-xs font-mono text-[#CBB280] tracking-wider uppercase mb-4">
                Web Designer & AI Developer
              </p>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Ukraine • Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Right: Personal Narrative & Philosophy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white">
                {t.bioTitle}
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {t.bioText1}
              </p>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                {t.bioText2}
              </p>
            </div>
          </div>

        </div>

        {/* Big Editorial Quote Frame */}
        <div className="relative rounded-3xl sm:rounded-[36px] glass-panel border border-white/15 p-8 sm:p-14 lg:p-16 mb-16 shadow-2xl overflow-hidden">
          <div className="absolute -top-10 -right-10 text-[180px] font-serif-luxury text-white/[0.02] select-none pointer-events-none">
            “
          </div>

          <div className="relative max-w-4xl">
            <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-light text-white leading-relaxed sm:leading-snug mb-8">
              "{t.quote}"
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/10 to-[#CBB280] p-0.5 shadow-lg">
                <div className="w-full h-full rounded-full bg-[#070707] flex items-center justify-center text-white font-serif-luxury font-semibold text-sm">
                  AS
                </div>
              </div>
              <div>
                <div className="text-sm sm:text-base font-serif-luxury text-white">
                  {t.author}
                </div>
                <div className="text-[11px] font-mono text-white/50 tracking-wider">
                  {t.authorRole} • Ukraine
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Three Pillars of Sincerity & Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {t.principles.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono text-[#CBB280] tracking-widest">
                    0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#CBB280]/40" />
                </div>
                <h4 className="text-lg sm:text-xl font-serif-luxury text-white mb-3">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities Summary Strip */}
        <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-white/10">
          <h3 className="text-xl sm:text-2xl font-serif-luxury text-white mb-6">
            {t.capabilitiesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.capabilities.map((cap, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-2 text-[#CBB280] font-mono text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-semibold">{cap.title}</span>
                </div>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech & AI Ecosystem Badges */}
        <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#CBB280] mb-1">
              Technology Stack & Toolchain
            </div>
            <div className="text-sm sm:text-base text-white/90 font-light font-mono">
              Figma · React 19 · Vite · Tailwind · Framer Motion · LLM Integrations · Python AI Agents · Vercel
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 rounded-full bg-white text-[#070707] font-semibold text-xs uppercase tracking-widest hover:bg-[#E2D4B7] transition-all duration-300 flex items-center gap-2 shadow-xl"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
