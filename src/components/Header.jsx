import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLabels = {
    ru: {
      home: 'Главная',
      process: 'Процесс',
      cases: 'Кейсы',
      contact: 'Контакты',
      badge: 'Доступен для проектов'
    },
    en: {
      home: 'Home',
      process: 'Process',
      cases: 'Cases',
      contact: 'Contact',
      badge: 'Available for projects'
    },
    de: {
      home: 'Home',
      process: 'Prozess',
      cases: 'Cases',
      contact: 'Kontakt',
      badge: 'Verfügbar für Projekte'
    }
  };

  const currentNav = navLabels[lang] || navLabels.ru;

  const navItems = [
    { id: 'hero', label: currentNav.home, num: '01' },
    { id: 'process', label: currentNav.process, num: '02' },
    { id: 'projects', label: currentNav.cases, num: '03' },
    { id: 'contact', label: currentNav.contact, num: '04' }
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'ru', label: 'RU' }
  ];

  const scrollToSection = (sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 md:px-16 transition-all duration-500 ${
          scrolled 
            ? 'py-4 sm:py-6 bg-[#070707]/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
            : 'py-5 sm:py-8 bg-gradient-to-b from-[#070707]/95 via-[#070707]/50 to-transparent'
        }`}
      >
        <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
          
          {/* Left: Brand Name */}
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
          >
            <div className="w-2 h-2 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7] sm:hidden" />
            <span className="font-nav text-xs sm:text-sm font-bold tracking-[0.22em] sm:tracking-[0.26em] uppercase text-white group-hover:text-[#E2D4B7] transition-colors drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              ARTEM SOKOLOVSKY
            </span>
          </button>

          {/* Desktop Navigation Links & Language Switcher */}
          <div className="hidden md:flex items-center gap-8 md:gap-12">
            
            <nav className="flex items-center gap-7 md:gap-9">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group cursor-pointer py-1 focus:outline-none"
                >
                  <span className="font-nav text-xs sm:text-[13px] tracking-[0.20em] uppercase text-white/80 hover:text-white font-medium transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] whitespace-nowrap">
                    {item.label}
                  </span>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-[#E2D4B7] transition-all duration-300 rounded-full" />
                </button>
              ))}
            </nav>

            {/* Vertical Divider Line | */}
            <div className="h-3.5 w-px bg-white/30" />

            {/* Language Switcher: EN / DE / RU */}
            <div className="flex items-center gap-2 font-nav text-xs sm:text-[13px] tracking-[0.18em] text-white/70 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {languages.map((l, index) => {
                const isSelected = lang === l.code;
                return (
                  <React.Fragment key={l.code}>
                    <button
                      onClick={() => setLang(l.code)}
                      className={`transition-colors cursor-pointer focus:outline-none ${
                        isSelected
                          ? 'text-white font-bold underline underline-offset-4 decoration-[#E2D4B7]'
                          : 'text-white/65 hover:text-white font-medium'
                      }`}
                    >
                      {l.label}
                    </button>
                    {index < languages.length - 1 && (
                      <span className="text-white/35">/</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

          </div>

          {/* Mobile Right Controls: Language Selector + Burger Button */}
          <div className="flex items-center gap-3 md:hidden">
            
            {/* Compact Mobile Language Switcher */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-white/70">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`px-1 rounded focus:outline-none transition-colors ${
                    lang === l.code ? 'text-[#E2D4B7] font-bold' : 'text-white/50'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Premium Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white focus:outline-none active:scale-95 transition-transform"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E2D4B7]" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>

          </div>

        </div>
      </motion.header>

      {/* ========================================================================= */}
      {/* BESPOKE MOBILE OVERLAY DRAWER (Haute Editorial Mobile Experience)         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#070707]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between pt-24 pb-10 px-6 overflow-y-auto"
          >
            {/* Ambient Background Aura */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#E2D4B7]/[0.06] rounded-full blur-3xl pointer-events-none" />

            {/* Top Status Tag inside Mobile Drawer */}
            <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E2D4B7] animate-pulse" />
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {currentNav.badge}
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/40 tracking-widest">
                MENU // 2026
              </span>
            </div>

            {/* Massive Editorial Mobile Links */}
            <div className="relative z-10 my-auto py-8 space-y-4">
              {navItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  onClick={() => scrollToSection(item.id)}
                  className="w-full flex items-center justify-between py-3 group text-left border-b border-white/[0.04] focus:outline-none"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-[#E2D4B7]/70 font-semibold tracking-widest">
                      {item.num}
                    </span>
                    <span className="font-luxury-grotesque text-3xl font-light tracking-wide uppercase text-white group-hover:text-[#E2D4B7] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-[#E2D4B7] group-hover:text-black flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-black transition-colors" />
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Mobile Drawer Bottom Info */}
            <div className="relative z-10 pt-6 border-t border-white/[0.08] space-y-4">
              <div className="text-xs font-mono text-white/50 tracking-wider">
                UKRAINE • WORLDWIDE ONLINE
              </div>
              <div className="text-[11px] font-mono text-[#E2D4B7] tracking-widest">
                SOKOLOVSKY202002@GMAIL.COM
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
