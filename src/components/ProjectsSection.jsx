import React, { useState } from 'react';
import { translations } from '../translations';
import { projectsData } from '../data/projectsData';
import { ArrowUpRight, Sparkles, Layers, Cpu, Compass, CheckCircle2 } from 'lucide-react';

export default function ProjectsSection({ lang, onSelectProject }) {
  const t = translations[lang].works;
  const projectsT = translations[lang].projects;
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'tech', label: t.filterTech },
    { id: 'expedition', label: t.filterExpedition },
    { id: 'medical', label: t.filterMedical }
  ];

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="work" className="relative py-28 sm:py-36 border-t border-white/10 bg-[#070707]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBB280] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.sectionTitle}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury text-white font-light leading-tight">
              Featured Case Studies & <br className="hidden sm:inline" />
              <span className="italic text-gradient-gold font-normal">Architectural Web Systems</span>
            </h2>
            <p className="text-sm sm:text-base text-white/60 mt-4 font-light leading-relaxed">
              {t.sectionSubtitle}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 glass-panel p-1.5 rounded-full border border-white/10 w-fit">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  filter === cat.id
                    ? 'bg-white text-[#070707] font-bold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Deep List */}
        <div className="space-y-16 sm:space-y-24">
          {filteredProjects.map((project, index) => {
            const projectInfo = projectsT[project.key];
            const isEven = index % 2 === 1;

            return (
              <div
                key={project.id}
                className="group relative rounded-3xl sm:rounded-[36px] glass-panel border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl p-6 sm:p-10 lg:p-12"
              >
                {/* Background glow specific to project accent */}
                <div 
                  className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none -z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
                  style={{ background: project.accentGlow }}
                />

                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
                  
                  {/* Left Column: Information & Philosophy */}
                  <div className={`lg:col-span-5 flex flex-col justify-between h-full ${isEven ? 'lg:col-start-8' : ''}`}>
                    <div>
                      {/* Project Index & Tag */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono text-[#CBB280] tracking-widest">
                          0{index + 1}
                        </span>
                        <span className="h-3 w-px bg-white/20" />
                        <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/5 text-white/80 border border-white/10">
                          {projectInfo.tag}
                        </span>
                        <span className="text-xs font-mono text-white/40 ml-auto">
                          {projectInfo.year}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-3xl sm:text-4xl font-serif-luxury text-white mb-2 group-hover:text-[#E2D4B7] transition-colors">
                        {projectInfo.title}
                      </h3>
                      <p className="text-sm font-light text-[#CBB280]/90 mb-6 font-mono">
                        {projectInfo.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6">
                        {projectInfo.shortDesc}
                      </p>

                      {/* Key Highlight Metrics */}
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-6">
                        <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-1">
                          Impact & Architecture
                        </div>
                        <div className="text-xs sm:text-sm text-white/90 font-medium">
                          {projectInfo.metrics}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="mb-8">
                        <div className="text-[11px] font-mono text-white/40 uppercase tracking-wider mb-2.5">
                          {t.techLabel}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {projectInfo.stack.map((item, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/40 text-white/70 border border-white/5"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => onSelectProject(project.id)}
                      className="w-full sm:w-auto self-start px-6 py-3.5 rounded-full bg-white text-[#070707] hover:bg-[#E2D4B7] active:scale-95 font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2.5 shadow-xl group/btn"
                    >
                      <span>{t.viewProject}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Right Column: High-Res Interactive Media Showcase */}
                  <div 
                    onClick={() => onSelectProject(project.id)}
                    className={`lg:col-span-7 cursor-pointer ${isEven ? 'lg:col-start-1' : ''}`}
                  >
                    <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/10 group-hover:border-white/30 transition-all duration-500 shadow-2xl">
                      {/* Main Featured Photo */}
                      <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                        <img
                          src={project.heroImage}
                          alt={projectInfo.title}
                          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                        {/* Interactive prompt overlay */}
                        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono">
                          <span className="w-2 h-2 rounded-full bg-[#CBB280] animate-pulse" />
                          <span>Click to explore 6+ architectural shots</span>
                        </div>
                      </div>

                      {/* Mini Thumbnail Strip below main image */}
                      <div className="grid grid-cols-4 gap-1 p-2 bg-black/60 backdrop-blur-md border-t border-white/10">
                        {project.previewImages.map((thumb, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-[16/10] rounded-lg overflow-hidden border border-white/5 hover:border-[#CBB280]/60 transition-colors"
                          >
                            <img
                              src={thumb}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover brightness-75 hover:brightness-100 transition-all duration-300"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
