import React, { useState, useEffect } from 'react';
import { translations } from '../translations';
import { projectsData } from '../data/projectsData';
import { X, ArrowUpRight, CheckCircle2, Sparkles, Layers, Image as ImageIcon, Cpu, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProjectModal({ projectId, lang, onClose, onOpenContact }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'gallery' | 'features'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const project = projectsData.find(p => p.id === projectId);
  if (!project) return null;

  const tWorks = translations[lang].works;
  const projectInfo = translations[lang].projects[project.key];

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto glass-panel-elevated rounded-3xl sm:rounded-[36px] border border-white/15 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#CBB280]" />
            <span className="text-xs font-mono tracking-wider uppercase text-white/50">
              {projectInfo.tag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Tabs */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                  activeTab === 'overview' ? 'bg-white text-[#070707] font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                {tWorks.overviewTitle}
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === 'gallery' ? 'bg-white text-[#070707] font-semibold' : 'text-white/60 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>{tWorks.galleryTitle} ({project.gallery.length})</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-full glass-panel hover:bg-white/15 text-white/80 hover:text-white transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10 custom-scrollbar">
          
          {/* Hero Banner */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[2/1] bg-black border border-white/10 shadow-xl">
            <img
              src={project.heroImage}
              alt={projectInfo.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-[#CBB280] tracking-widest uppercase">
                  {project.year} • Case Study
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif-luxury text-white mt-1">
                  {projectInfo.title}
                </h2>
                <p className="text-sm font-mono text-white/70 mt-1">
                  {projectInfo.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => { onClose(); onOpenContact(); }}
                  className="px-5 py-2.5 rounded-full bg-white text-[#070707] font-semibold text-xs uppercase tracking-widest hover:bg-[#E2D4B7] transition-colors shadow-lg flex items-center gap-1.5"
                >
                  <span>Inquire Similar Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">
                {tWorks.roleLabel}
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium">
                {projectInfo.roles}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">
                {tWorks.yearLabel}
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium">
                {projectInfo.year}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">
                Core Metrics
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium">
                {projectInfo.metrics}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-mono text-white/40 uppercase block mb-1">
                {tWorks.techLabel}
              </span>
              <span className="text-xs sm:text-sm text-white/90 font-medium font-mono">
                {projectInfo.stack.slice(0, 3).join(', ')}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-2xl font-serif-luxury text-white">
                {tWorks.overviewTitle}
              </h3>
              <p className="text-base text-white/80 font-light leading-relaxed">
                {projectInfo.fullDesc}
              </p>

              <div className="pt-4">
                <h4 className="text-sm font-mono uppercase tracking-widest text-[#CBB280] mb-4">
                  Key Deliverables & Innovations
                </h4>
                <ul className="space-y-3">
                  {projectInfo.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-white/75 font-light">
                      <CheckCircle2 className="w-4 h-4 text-[#CBB280] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#CBB280]">
                  <Cpu className="w-4 h-4" />
                  <span>Technical & AI Architecture</span>
                </div>
                <p className="text-xs text-white/70 font-light leading-relaxed">
                  Crafted with performance budgets, sub-second TTFB, micro-animations rendered at 60 FPS, and modular design tokens that guarantee longevity.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  {projectInfo.stack.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-white/90">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Full High-Resolution Gallery */}
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-serif-luxury text-white flex items-center gap-3">
                <ImageIcon className="w-5 h-5 text-[#CBB280]" />
                <span>{tWorks.galleryTitle}</span>
              </h3>
              <span className="text-xs font-mono text-white/40">
                Click any image to enlarge
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.gallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10 hover:border-[#CBB280] transition-all duration-300 cursor-pointer shadow-lg"
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs font-mono text-white/90">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-between text-xs font-mono text-white/50">
          <span>Artem Sokolovsky Portfolio · Project Case #{project.id}</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            Close ✕
          </button>
        </div>

      </div>

      {/* Lightbox Modal for Individual Image */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[80vh] flex flex-col items-center">
            <img
              src={project.gallery[selectedPhotoIndex].url}
              alt={project.gallery[selectedPhotoIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-sm font-mono text-white/80 text-center">
              {project.gallery[selectedPhotoIndex].caption} ({selectedPhotoIndex + 1} / {project.gallery.length})
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + project.gallery.length) % project.gallery.length)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % project.gallery.length)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
