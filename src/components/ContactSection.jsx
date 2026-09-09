import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { Mail, Send, Copy, Check, ArrowUpRight, Sparkles, Clock, Globe } from 'lucide-react';

export default function ContactSection({ lang, showToast }) {
  const t = translations[lang].contact;
  const tFooter = translations[lang].footer;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [ukraineTime, setUkraineTime] = useState('');
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Live Ukraine Clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Europe/Kyiv',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setUkraineTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(t.emailAddress);
    setCopiedEmail(true);
    showToast(t.emailCopied);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      showToast(t.successMessage);
      setFormState({
        name: '',
        email: '',
        projectType: '',
        message: ''
      });
      setTimeout(() => setIsSuccess(false), 8000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative pt-28 sm:pt-36 pb-16 border-t border-white/10 bg-[#070707] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#CBB280]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBB280] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.sectionTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury text-white font-light leading-tight">
            Let’s Build Something <br className="hidden sm:inline" />
            <span className="italic text-gradient-gold font-normal">Unforgettable Together</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-4 font-light leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Direct Communication Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location & Time Card */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-[#CBB280] uppercase tracking-wider">
                  <Globe className="w-4 h-4" />
                  <span>{t.locationHeader}</span>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-base text-white/90 font-medium">
                {t.locationDetails}
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/50">
                <span>{t.localTimeLabel}</span>
                <span className="text-white/90 font-bold tracking-wider">{ukraineTime} EET (Kyiv)</span>
              </div>
            </div>

            {/* Direct Email Card */}
            <div 
              onClick={handleCopyEmail}
              className="group p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-[#CBB280]/40 transition-all duration-300 cursor-pointer shadow-xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#CBB280] uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>{t.emailHeader}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 text-white/80 border border-white/10 group-hover:bg-white group-hover:text-[#070707] transition-all">
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied!' : 'Click to copy'}</span>
                </div>
              </div>
              <p className="text-lg sm:text-xl font-serif-luxury text-white group-hover:text-[#E2D4B7] transition-colors">
                {t.emailAddress}
              </p>
            </div>

            {/* Telegram & Instagram Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telegram */}
              <a
                href="https://t.me/sokolovskiy202002"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      <Send className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-white/40 block mb-1">
                    {t.telegramHeader}
                  </span>
                  <span className="text-sm font-medium text-white group-hover:text-[#E2D4B7] transition-colors">
                    {t.telegramHandle}
                  </span>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/artem_sokolovsky"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-xs font-mono text-white/40 block mb-1">
                    {t.instagramHeader}
                  </span>
                  <span className="text-sm font-medium text-white group-hover:text-[#E2D4B7] transition-colors">
                    {t.instagramHandle}
                  </span>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Luxury Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl sm:rounded-[36px] glass-panel-elevated border border-white/15 shadow-2xl relative">
              <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white mb-2">
                {t.writeMessageTitle}
              </h3>
              <p className="text-xs sm:text-sm text-white/60 font-light mb-8">
                Fill out the project details below to receive a direct response within 24 hours.
              </p>

              {isSuccess ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-serif-luxury text-white">Inquiry Received</h4>
                  <p className="text-xs sm:text-sm text-white/70 font-light">
                    {t.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                        Your Name / Brand *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={t.namePlaceholder}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-[#CBB280] focus:bg-white/[0.07] outline-none text-white text-sm placeholder:text-white/30 transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-[#CBB280] focus:bg-white/[0.07] outline-none text-white text-sm placeholder:text-white/30 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                      Scope / Focus
                    </label>
                    <input
                      type="text"
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      placeholder={t.projectTypePlaceholder}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-[#CBB280] focus:bg-white/[0.07] outline-none text-white text-sm placeholder:text-white/30 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/50 block">
                      Project Vision & Timeline
                    </label>
                    <textarea
                      rows="4"
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={t.messagePlaceholder}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 focus:border-[#CBB280] focus:bg-white/[0.07] outline-none text-white text-sm placeholder:text-white/30 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-white via-[#F5EBD7] to-[#CBB280] text-[#070707] font-semibold text-xs sm:text-sm uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? t.submittingButton : t.submitButton}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Footer Area */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/50">
          <div>
            <span>{tFooter.copyright}</span>
          </div>
          <div className="text-center sm:text-right">
            <span className="text-white/70 italic font-serif-luxury text-sm">
              {tFooter.tagline}
            </span>
          </div>
          <div>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors"
            >
              ↑ {tFooter.backToTop}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
