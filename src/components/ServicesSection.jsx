import React, { useState } from 'react';
import { translations } from '../translations';
import { Sparkles, ArrowUpRight, CheckCircle, Code2, Bot, Palette, Gauge } from 'lucide-react';

export default function ServicesSection({ lang, onOpenContact }) {
  const t = translations[lang].services;
  const [activeItem, setActiveItem] = useState(0);

  const icons = [
    <Palette key="0" className="w-5 h-5 text-[#CBB280]" />,
    <Bot key="1" className="w-5 h-5 text-[#CBB280]" />,
    <Code2 key="2" className="w-5 h-5 text-[#CBB280]" />,
    <Gauge key="3" className="w-5 h-5 text-[#CBB280]" />
  ];

  return (
    <section id="services" className="relative py-28 sm:py-36 border-t border-white/10 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBB280] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.sectionTitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury text-white font-light leading-tight">
            Crafting Digital Eminence with <br className="hidden sm:inline" />
            <span className="italic text-gradient-gold font-normal">Form, Code & Artificial Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-4 font-light leading-relaxed">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {t.items.map((service, index) => (
            <div
              key={service.id}
              className="group relative rounded-3xl p-8 sm:p-10 glass-panel border border-white/10 hover:border-[#CBB280]/40 transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-[#CBB280]/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <div>
                {/* Header line: ID & Icon */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#CBB280]/10 transition-colors">
                      {icons[index]}
                    </div>
                    <span className="text-xs font-mono tracking-widest uppercase text-white/40">
                      {service.category}
                    </span>
                  </div>
                  <span className="text-sm font-mono text-white/30 group-hover:text-[#CBB280] transition-colors">
                    {service.id}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-2xl sm:text-3xl font-serif-luxury text-white mb-3 group-hover:text-[#E2D4B7] transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-sm text-white/70 font-light leading-relaxed mb-8">
                  {service.description}
                </p>

                {/* Points List */}
                <ul className="space-y-2.5 mb-8">
                  {service.points.map((point, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-white/80 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#CBB280]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Link */}
              <button
                onClick={onOpenContact}
                className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-wider text-white/50 group-hover:text-white transition-colors"
              >
                <span>Request Service</span>
                <ArrowUpRight className="w-4 h-4 text-[#CBB280] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
