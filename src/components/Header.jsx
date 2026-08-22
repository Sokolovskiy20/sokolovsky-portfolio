import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ lang, setLang }) {
  const navLabels = {
    ru: {
      home: 'Главная',
      process: 'Процесс',
      cases: 'Кейсы',
      contact: 'Контакты'
    },
    en: {
      home: 'Home',
      process: 'Process',
      cases: 'Cases',
      contact: 'Contact'
    },
    de: {
      home: 'Home',
      process: 'Prozess',
      cases: 'Cases',
      contact: 'Kontakt'
    }
  };

  const currentNav = navLabels[lang] || navLabels.ru;

  const navItems = [
    { id: 'hero', label: currentNav.home },
    { id: 'process', label: currentNav.process },
    { id: 'projects', label: currentNav.cases },
    { id: 'contact', label: currentNav.contact }
  ];

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'ru', label: 'RU' }
  ];

  const scrollToSection = (sectionId) => {
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
    <motion.header
      initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: 0.8, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 md:px-16 py-6 sm:py-8 transition-all duration-300 bg-gradient-to-b from-[#070707]/92 via-[#070707]/65 to-transparent backdrop-blur-md"
    >
      <div className="w-full max-w-[1800px] mx-auto flex items-center justify-between">
        
        {/* Left: Brand Name */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-nav text-xs sm:text-sm font-bold tracking-[0.26em] uppercase text-white group-hover:text-[#E2D4B7] transition-colors drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
            ARTEM SOKOLOVSKY
          </span>
        </button>

        {/* Right: Section Anchor Links & Language Switcher */}
        <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
          
          <nav className="flex items-center gap-4 sm:gap-7 md:gap-9">
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
          <div className="h-3.5 w-px bg-white/30 hidden sm:block" />

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

      </div>
    </motion.header>
  );
}
