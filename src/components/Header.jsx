import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ lang, setLang }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'process', 'projects', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // If near bottom of the page, activate 'contact'
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection('contact');
        return;
      }

      // Viewport-based threshold for minimal highlighting
      const viewportThreshold = scrollY + windowHeight * 0.35;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const sectionId = sectionIds[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          if (viewportThreshold >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLabels = {
    ua: {
      home: 'Головна',
      process: 'Процес',
      cases: 'Кейси',
      contact: 'Контакти',
      badge: 'Доступний для проєктів'
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

  const currentNav = navLabels[lang] || navLabels.ua;

  const navItems = [
    { id: 'hero', label: currentNav.home },
    { id: 'process', label: currentNav.process },
    { id: 'projects', label: currentNav.cases },
    { id: 'contact', label: currentNav.contact }
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'ua', label: 'UA' }
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 px-5 sm:px-12 md:px-16 transition-all duration-500 ${
          scrolled 
            ? 'py-3.5 sm:py-5 bg-[#070707]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
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
            <span className="font-sans text-xs sm:text-sm font-bold tracking-[0.22em] sm:tracking-[0.26em] uppercase text-white group-hover:text-[#E2D4B7] transition-colors drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              {lang === 'ua' ? 'АРТЕМ СОКОЛОВСЬКИЙ' : 'ARTEM SOKOLOVSKY'}
            </span>
          </button>

          {/* Desktop Navigation Links & Perfectly Aligned Language Switcher */}
          <div className="hidden md:flex items-center gap-8 md:gap-10">
            
            <nav className="flex items-center gap-7 md:gap-9">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="relative cursor-pointer py-1 focus:outline-none text-left flex items-center gap-2 group"
                  >
                    {/* Active Little Circle Indicator Only */}
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7] shrink-0"
                      />
                    )}
                    <span className={`font-sans text-xs sm:text-[13px] tracking-[0.20em] uppercase transition-colors duration-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] whitespace-nowrap ${
                      isActive
                        ? 'text-[#E2D4B7] font-semibold'
                        : 'text-white/80 group-hover:text-white font-medium'
                    }`}>
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Vertical Divider Line | */}
            <div className="h-3.5 w-px bg-white/20" />

            {/* Desktop Language Switcher: Centered Fixed-Width Pills */}
            <div className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-sm">
              {languages.map((l) => {
                const isSelected = lang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`w-8 h-6 flex items-center justify-center font-sans text-xs tracking-wider transition-all duration-200 rounded-full cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'bg-[#E2D4B7] text-black font-bold shadow-sm'
                        : 'text-white/60 hover:text-white font-medium'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Mobile Right Controls: Language Selector + Burger Button */}
          <div className="flex items-center gap-2.5 md:hidden">
            
            {/* Perfectly Aligned Mobile Language Switcher */}
            <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/[0.10] shadow-sm backdrop-blur-md">
              {languages.map((l) => {
                const isSelected = lang === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`w-7 h-6 flex items-center justify-center font-sans text-[11px] font-semibold tracking-wider transition-all duration-200 rounded-full cursor-pointer focus:outline-none ${
                      isSelected
                        ? 'bg-[#E2D4B7] text-black shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

            {/* Premium Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white focus:outline-none active:scale-95 transition-transform shadow-md"
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
      {/* 📱 BESPOKE LUXURY MOBILE OVERLAY DRAWER (Deep Screen-1 Obsidian Style)    */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#060606]/99 backdrop-blur-3xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-y-auto"
          >
            {/* Deep Atmospheric Glow Matching Screen 1 (Subtle & Dark) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 40%, rgba(110, 75, 42, 0.15) 0%, rgba(45, 28, 15, 0.08) 45%, rgba(6, 6, 6, 0.95) 75%, #050505 100%)'
              }}
            />

            {/* Subtle Atmospheric Top-Center Light */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#E2D4B7]/[0.04] rounded-full blur-3xl pointer-events-none" />

            {/* Subtle Luxury Film Grain */}
            <div className="absolute inset-0 bg-grain opacity-6 pointer-events-none" />

            {/* Top Status Tag inside Mobile Drawer (Left-Aligned) */}
            <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-2.5 text-left">
                <span className="w-2 h-2 rounded-full bg-[#E2D4B7] animate-pulse shadow-[0_0_8px_#E2D4B7]" />
                <span className="font-sans text-[11px] uppercase tracking-[0.20em] text-white/80 font-medium">
                  {currentNav.badge}
                </span>
              </div>

              {/* Language Switcher inside Drawer */}
              <div className="flex items-center p-0.5 rounded-full bg-black/60 border border-white/[0.10] shadow-inner">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`w-7 h-5 flex items-center justify-center font-sans text-[10px] font-semibold tracking-wider rounded-full ${
                      lang === l.code ? 'bg-[#E2D4B7] text-black font-bold' : 'text-white/60'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Massive Editorial Mobile Links (Left-Aligned, Studio Luxury Touch) */}
            <div className="relative z-10 my-auto py-6 space-y-3">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.35 }}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center justify-between py-3.5 px-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] active:bg-white/[0.08] border border-white/[0.06] transition-all text-left group focus:outline-none shadow-md backdrop-blur-sm"
                  >
                    <div className="flex items-baseline gap-3.5 text-left">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7] shrink-0 self-center" />
                      )}
                      <span className={`font-sans text-2xl xs:text-3xl font-light tracking-wide uppercase transition-colors ${
                        isActive ? 'text-[#E2D4B7]' : 'text-white group-hover:text-[#E2D4B7]'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-[#E2D4B7] flex items-center justify-center transition-all duration-300 border border-white/[0.08]">
                      <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-black transition-colors" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Drawer Bottom Info (Left-Aligned) */}
            <div className="relative z-10 pt-5 border-t border-white/[0.08] space-y-2.5 text-left">
              <div className="text-left font-sans text-xs text-white/60 tracking-wider uppercase font-medium">
                {lang === 'ua' ? 'УКРАЇНА • ОНЛАЙН ПО ВСЬОМУ СВІТУ' : lang === 'de' ? 'UKRAINE • WELTWEIT ONLINE' : 'UKRAINE • WORLDWIDE ONLINE'}
              </div>
              <a 
                href="mailto:sokolovskiy202002@gmail.com"
                className="block text-left font-sans text-xs text-[#E2D4B7] tracking-wider font-semibold hover:underline"
              >
                SOKOLOVSKIY202002@GMAIL.COM
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
