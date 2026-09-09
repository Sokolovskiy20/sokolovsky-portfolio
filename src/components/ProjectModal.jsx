import React, { useState, useEffect, useRef } from "react";
import { translations } from "../translations";
import { projectsData } from "../data/projectsData";
import { 
  X, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink,
  Maximize2
} from "lucide-react";

/* Interactive Soft Tactile Paper Press Hero Component */
function SoftPaperPressHero({ className, imageSrc, caption }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [state, setState] = useState({
    x: 0.5,
    y: 0.5,
    depth: 0,
    rotX: 0,
    rotY: 0,
    isHovered: false,
    isPressed: false,
  });

  const animRef = useRef(null);
  const targetRef = useRef({ x: 0.5, y: 0.5, depth: 0 });
  const currentRef = useRef({ x: 0.5, y: 0.5, depth: 0, rotX: 0, rotY: 0 });
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const updatePhysics = () => {
      const cur = currentRef.current;
      const tar = targetRef.current;

      // Spring lerping for tactile silk-paper response
      cur.x += (tar.x - cur.x) * 0.12;
      cur.y += (tar.y - cur.y) * 0.12;
      cur.depth += (tar.depth - cur.depth) * 0.1;

      // 3D paper bending angle
      const targetRotX = (cur.y - 0.5) * -7 * cur.depth;
      const targetRotY = (cur.x - 0.5) * 7 * cur.depth;
      cur.rotX += (targetRotX - cur.rotX) * 0.12;
      cur.rotY += (targetRotY - cur.rotY) * 0.12;

      setState(prev => ({
        ...prev,
        x: cur.x,
        y: cur.y,
        depth: cur.depth,
        rotX: cur.rotX,
        rotY: cur.rotY
      }));

      // Render micro paper tension / deformation rings on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (cur.depth > 0.05) {
        const px = cur.x * canvas.width;
        const py = cur.y * canvas.height;

        // Draw soft elastic paper contour ripples
        const ripples = ripplesRef.current;
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += r.speed;
          r.alpha -= r.fade;
          if (r.alpha <= 0) {
            ripples.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.65, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();
        }

        // Soft center tension point
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 140 * cur.depth);
        grad.addColorStop(0, `rgba(0, 0, 0, ${0.12 * cur.depth})`);
        grad.addColorStop(0.5, `rgba(0, 0, 0, ${0.04 * cur.depth})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animRef.current = requestAnimationFrame(updatePhysics);
    };

    animRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    targetRef.current.x = nx;
    targetRef.current.y = ny;
    targetRef.current.depth = state.isPressed ? 1.6 : 1.0;

    // Trigger subtle paper tension pulse
    if (Math.random() > 0.72 && ripplesRef.current.length < 8 && canvasRef.current) {
      ripplesRef.current.push({
        x: nx * canvasRef.current.width,
        y: ny * canvasRef.current.height,
        radius: 6,
        speed: 0.85,
        alpha: 0.35,
        fade: 0.012
      });
    }
  };

  const handleMouseEnter = () => {
    setState(prev => ({ ...prev, isHovered: true }));
    targetRef.current.depth = 1.0;
  };

  const handleMouseLeave = () => {
    setState(prev => ({ ...prev, isHovered: false, isPressed: false }));
    targetRef.current.depth = 0;
    targetRef.current.x = 0.5;
    targetRef.current.y = 0.5;
  };

  const handleMouseDown = () => {
    setState(prev => ({ ...prev, isPressed: true }));
    targetRef.current.depth = 1.7;
    if (canvasRef.current) {
      ripplesRef.current.push({
        x: currentRef.current.x * canvasRef.current.width,
        y: currentRef.current.y * canvasRef.current.height,
        radius: 8,
        speed: 1.1,
        alpha: 0.45,
        fade: 0.014
      });
    }
  };

  const handleMouseUp = () => {
    setState(prev => ({ ...prev, isPressed: false }));
    targetRef.current.depth = state.isHovered ? 1.0 : 0;
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
    targetRef.current.x = nx;
    targetRef.current.y = ny;
    targetRef.current.depth = 1.2;
  };

  const pixelX = state.x * 100;
  const pixelY = state.y * 100;

  return (
    <div 
      className={`perspective-[1200px] select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      <div 
        ref={containerRef}
        style={{
          transform: `rotateX(${state.rotX.toFixed(2)}deg) rotateY(${state.rotY.toFixed(2)}deg) translateZ(${(-12 * state.depth).toFixed(1)}px)`,
          transition: "box-shadow 0.3s ease-out",
        }}
        className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A1A12] border border-black/10 sm:border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] cursor-grab active:cursor-grabbing will-change-transform"
      >
        {/* Base Hero Screenshot */}
        <img
          src={imageSrc}
          alt={caption || "Hero"}
          style={{
            transform: `scale(${1 - 0.018 * state.depth})`,
            filter: `brightness(${1 - 0.04 * state.depth})`,
            transition: "transform 0.15s ease-out, filter 0.15s ease-out"
          }}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Soft Indentation Crater (Concave shadow where paper depresses inward) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: state.depth > 0.01 ? 1 : 0,
            background: `radial-gradient(circle 240px at ${pixelX}% ${pixelY}%, rgba(0,0,0,${(0.48 * state.depth).toFixed(3)}) 0%, rgba(0,0,0,${(0.22 * state.depth).toFixed(3)}) 32%, rgba(0,0,0,${(0.04 * state.depth).toFixed(3)}) 60%, transparent 80%)`
          }}
        />

        {/* Paper Specular Light Rim (ambient light bouncing on top curve of depression) */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: state.depth > 0.01 ? 1 : 0,
            background: `radial-gradient(ellipse 260px 110px at ${pixelX}% ${Math.max(0, pixelY - 4)}%, rgba(255,255,255,${(0.3 * state.depth).toFixed(3)}) 0%, rgba(255,255,255,${(0.08 * state.depth).toFixed(3)}) 35%, transparent 65%)`
          }}
        />

        {/* Paper Crease Shadow Below Depressed Center */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            opacity: state.depth > 0.01 ? 1 : 0,
            background: `radial-gradient(ellipse 200px 90px at ${pixelX}% ${Math.min(100, pixelY + 4)}%, rgba(0,0,0,${(0.38 * state.depth).toFixed(3)}) 0%, transparent 65%)`
          }}
        />

        {/* Micro Deformation Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* Subtle Ambient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Hero Interactive Status Badge */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
          <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-md">
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${state.depth > 0.1 ? "bg-emerald-300 scale-125" : "bg-emerald-400 animate-pulse"}`} />
            <span>{caption}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 font-mono text-[10px] uppercase tracking-wider">
            <span>{state.isPressed ? "М'який папір · Втиснуто" : state.isHovered ? "М'який папір · Натисніть" : "Тактильний папір"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ projectId, lang = "ua", onClose, onSelectProject, onOpenContact }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [copiedHex, setCopiedHex] = useState(null);
  const scrollContainerRef = useRef(null);

  const currentIndex = projectsData.findIndex(p => p.id === projectId);
  const project = projectsData[currentIndex] || projectsData[0];
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  const caseData = project.caseStudy || {
    hero: {
      badge: "Case Study · Design Engineering",
      title: project.title,
      subtitle: project.badge,
      heroImage: project.heroImage,
      caption: project.title,
      pillTag: project.yearTag || "2026"
    },
    problemSolution: {
      sectionNum: "01 / Головна проблема та рішення",
      sectionTitle: "Виклик бізнесу та дизайн-інженерне рішення",
      problem: {
        tag: "01 · Головна проблема ринку",
        title: "Складність та високий поріг сприйняття",
        desc: "Користувачі стикаються з візуальним шумом і перевантаженими інтерфейсами."
      },
      solution: {
        tag: "02 · Наше рішення",
        title: "Чистий простір та безшовний UX",
        desc: "Мінімалістична архітектура без зайвого когнітивного навантаження."
      }
    },
    conceptErgonomics: {
      sectionNum: "02 / Концепт та ергономіка",
      sectionTitle: "Архітектура досвіду та когнітивний баланс",
      cards: [
        { tag: "01 · Фокус", title: "Ясність", desc: "Чітка ієрархія інформації." },
        { tag: "02 · Ергономіка", title: "Зручність", desc: "Зручне керування на мобільних." },
        { tag: "03 · Довіра", title: "Якість", desc: "Високі стандарти візуального стилю." }
      ]
    },
    designSystem: {
      sectionNum: "03 / Дизайн-система",
      sectionTitle: "Колірна палітра та шрифтова ієрархія",
      palette: [
        { name: "Primary Dark", hex: "#050505", tag: "Primary", textDark: false },
        { name: "Accent Light", hex: "#F6F6F4", tag: "Canvas", textDark: true }
      ],
      typography: [
        { tag: "Display Serif", font: "Playfair Display", desc: "Іміджеві заголовки." },
        { tag: "Interface Sans", font: "Inter", desc: "Основний текст інтерфейсу." },
        { tag: "Tech Mono", font: "JetBrains Mono", desc: "Системні бейджі та параметри." }
      ]
    },
    engineeringQuality: {
      sectionNum: "04 / Інженерна якість",
      sectionTitle: "Метрики швидкодії та стандартів",
      metrics: [
        { tag: "LIGHTHOUSE", value: "99 / 100", desc: "Миттєве завантаження." },
        { tag: "FRAMERATE", value: "60 FPS", desc: "Плавна анімація." },
        { tag: "STABILITY", value: "0.00 CLS", desc: "Стабільність макета." },
        { tag: "CONTRAST", value: "WCAG AAA", desc: "Високий контраст." }
      ]
    },
    gallery: project.gallery || [],
    resultsAndLive: {
      sectionNum: "06 / Результат & Live",
      sectionTitle: "Підсумки та живий продукт",
      summary: {
        title1: "Підсумок розробки",
        desc1: "Спроєктовано та реалізовано вебплатформу світового рівня.",
        title2: "Філософія дизайну",
        desc2: "Найвищий рівень дизайну полягає у відсіканні зайвого."
      },
      liveExperience: {
        status: "Перевірити роботу наживо",
        urlDisplay: project.liveUrl?.replace("https://", "") || "production-live.app",
        url: project.liveUrl || "#",
        btnText: "Відкрити сайт"
      }
    }
  };

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedPhotoIndex !== null) {
          setSelectedPhotoIndex(null);
        } else {
          onClose();
        }
      }
      if (selectedPhotoIndex !== null && caseData.gallery) {
        if (e.key === "ArrowRight") {
          setSelectedPhotoIndex((selectedPhotoIndex + 1) % caseData.gallery.length);
        }
        if (e.key === "ArrowLeft") {
          setSelectedPhotoIndex((selectedPhotoIndex - 1 + caseData.gallery.length) % caseData.gallery.length);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, onClose, caseData.gallery]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [projectId]);

  // Project-specific themes for bespoke quiet luxury aesthetics
  const isMaira = projectId === "amazonia" || projectId === "maira";
  const isAura = projectId === "aura";
  const isSymmetry = projectId === "symmetry";

  const themeStyles = isMaira
    ? {
        badge: "bg-[#EBF5EE] border-emerald-700/20 text-[#123E25]",
        pulse: "bg-emerald-600",
        sectionDot: "bg-emerald-600",
        sectionNum: "text-emerald-900",
        // Soft Light Green Buttons (Quiet Luxury Light Sage & Eucalyptus Glass)
        primaryBtn: "bg-[#DCECE1]/90 hover:bg-[#CFE5D5] text-[#0C2F19] border border-[#2E7D47]/35 hover:border-[#2E7D47]/60 shadow-[0_8px_30px_rgba(46,125,71,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_12px_36px_rgba(46,125,71,0.25)]",
        primaryArrow: "text-[#1B4D3E]",
        secondaryBtn: "bg-[#F2F8F5]/85 hover:bg-[#E6F1EA] text-[#123820] border border-emerald-800/20 hover:border-emerald-800/35 shadow-[0_6px_22px_rgba(46,125,71,0.07),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#2E7D47]",
        pillTag: "bg-[#EAF5EE]/75 border border-emerald-700/25 text-[#103A21] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#DCECE1]/90 hover:bg-[#CFE5D5] text-[#0C2F19] border border-[#2E7D47]/35 hover:border-[#2E7D47]/60 shadow-[0_8px_30px_rgba(46,125,71,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        liveArrow: "text-[#1B4D3E]",
        footerBtn: "bg-[#103A21]/90 hover:bg-[#103A21] text-[#F4F9F6] border border-emerald-500/30",
        footerArrow: "text-[#A3C9A8]"
      }
    : isAura
    ? {
        badge: "bg-amber-50/90 border-amber-600/25 text-amber-950",
        pulse: "bg-amber-500",
        sectionDot: "bg-amber-600",
        sectionNum: "text-amber-900",
        // Soft Gold Buttons (Warm Champagne & Luminous Satin Gold Glass)
        primaryBtn: "bg-[#F3E7D0]/90 hover:bg-[#EAD9BD] text-[#332410] border border-[#D4AF37]/50 hover:border-[#D4AF37]/75 shadow-[0_8px_30px_rgba(212,175,55,0.2),inset_0_1px_2px_rgba(255,255,255,0.95)] hover:shadow-[0_12px_36px_rgba(212,175,55,0.32)]",
        primaryArrow: "text-[#B8860B]",
        secondaryBtn: "bg-[#FAF6EE]/85 hover:bg-[#F3ECE0] text-[#362612] border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 shadow-[0_6px_22px_rgba(212,175,55,0.08),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#996515]",
        pillTag: "bg-[#F6EEDF]/75 border border-[#D4AF37]/35 text-[#4D3716] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#F3E7D0]/90 hover:bg-[#EAD9BD] text-[#332410] border border-[#D4AF37]/50 hover:border-[#D4AF37]/75 shadow-[0_8px_30px_rgba(212,175,55,0.2),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        liveArrow: "text-[#B8860B]",
        footerBtn: "bg-[#281E10]/90 hover:bg-[#281E10] text-[#FAF5EB] border border-amber-400/30",
        footerArrow: "text-[#E5C387]"
      }
    : {
        badge: "bg-[#F5EFEB]/90 border-[#8C6D46]/25 text-[#3D2C22]",
        pulse: "bg-[#8C6D46]",
        sectionDot: "bg-[#8C6D46]",
        sectionNum: "text-[#5C4D3E]",
        accentText: "text-[#5C4D3E]",
        glowTop: "bg-[#8C6D46]/[0.05]",
        glowMid: "bg-amber-200/[0.12]",
        glowBottom: "bg-stone-800/[0.035]",
        // Soft Warm Brown Buttons (Warm Mocha, Chestnut & Latte Ceramic Glass)
        primaryBtn: "bg-[#4D3A2F]/90 hover:bg-[#3F2E24] text-[#FAF5EF] border border-[#96785C]/40 hover:border-[#96785C]/65 shadow-[0_8px_30px_rgba(77,58,47,0.22),inset_0_1px_1px_rgba(255,255,255,0.28)] hover:shadow-[0_12px_36px_rgba(77,58,47,0.32)]",
        primaryArrow: "text-[#DEC09B]",
        secondaryBtn: "bg-[#F6F0E8]/85 hover:bg-[#EDE3D6] text-[#3D2C22] border border-[#8C6D46]/25 hover:border-[#8C6D46]/45 shadow-[0_6px_22px_rgba(77,58,47,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#7A5A43]",
        pillTag: "bg-[#F2EAE0]/75 border border-[#8C6D46]/25 text-[#423024] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#4D3A2F]/90 hover:bg-[#3F2E24] text-[#FAF5EF] border border-[#96785C]/40 hover:border-[#96785C]/65 shadow-[0_8px_30px_rgba(77,58,47,0.22),inset_0_1px_1px_rgba(255,255,255,0.28)]",
        liveArrow: "text-[#DEC09B]",
        footerBtn: "bg-[#3A2B22]/90 hover:bg-[#3A2B22] text-[#FAF5EF] border border-[#96785C]/35",
        footerArrow: "text-[#DEC09B]"
      };

  return (
    <div 
      ref={scrollContainerRef}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#F6F5F2] text-[#121A15] selection:bg-[#2E7D47] selection:text-[#FFFFFF] animate-in fade-in duration-300 font-sans p-0 sm:p-4 md:p-6 lg:p-8 overscroll-y-contain cursor-default"
    >
      {/* ATMOSPHERIC LUXURY AMBIENT BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
        {/* Architectural Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#121A15_0.75px,transparent_0.75px)] [background-size:28px_28px] opacity-[0.035]" />
        
        {/* Soft Ambient Aurora (Top Right) */}
        <div className={`absolute -top-40 -right-40 w-[680px] h-[680px] rounded-full ${themeStyles.glowTop} blur-[140px] transition-colors duration-500`} />
        
        {/* Ambient Glow (Center Left) */}
        <div className={`absolute top-1/3 -left-48 w-[620px] h-[620px] rounded-full ${themeStyles.glowMid} blur-[150px] transition-colors duration-500`} />
        
        {/* Deep Atmosphere (Bottom Right) */}
        <div className={`absolute -bottom-32 right-1/4 w-[720px] h-[720px] rounded-full ${themeStyles.glowBottom} blur-[140px] transition-colors duration-500`} />
      </div>
      
      {/* MAIN FLOATING MODAL CARD */}
      <div className="relative w-full max-w-7xl mx-auto bg-white/92 backdrop-blur-3xl rounded-none sm:rounded-[40px] md:rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] border border-black/[0.05] sm:border-white/90 flex flex-col my-0 sm:my-2">
        
        {/* FLOATING TOP-RIGHT CLOSE BUTTON WITH ESC HINT */}
        <button
          onClick={onClose}
          className="fixed sm:absolute top-5 right-5 sm:top-7 sm:right-7 z-50 h-11 px-3 sm:px-3.5 rounded-full bg-[#121A15]/85 hover:bg-[#121A15] text-[#FAF8F5] backdrop-blur-2xl border border-white/20 hover:border-white/40 transition-all duration-200 active:scale-95 flex items-center gap-2 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.18)] group"
          aria-label="Закрити кейс"
        >
          <X className="w-4 h-4 stroke-[2.2] group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline font-mono text-[10px] text-white/70 uppercase tracking-widest font-semibold border-l border-white/20 pl-2">
            ESC
          </span>
        </button>

        {/* FULL-PAGE CASE STUDY BODY */}
        <main className="flex-1 w-full pb-28 text-left">
          
          {/* ========================================================================= */}
          {/* HERO SECTION */}
          {/* ========================================================================= */}
          <section className="w-full pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 px-6 sm:px-12 md:px-16 border-b border-black/[0.05]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              
              {/* Left Column: Title + Description + Live Link */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-7 pr-0 lg:pr-2">
                <div className="space-y-5">
                  <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border font-mono text-[11px] uppercase tracking-wider font-semibold ${themeStyles.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${themeStyles.pulse}`} />
                    {caseData.hero.badge}
                  </div>
                  
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal text-[#121A15] tracking-tight leading-[1.08]">
                    {caseData.hero.title}
                  </h1>
                  
                  <p className="text-base sm:text-lg text-[#2E4035] font-light leading-[1.7] max-w-xl">
                    {caseData.hero.subtitle}
                  </p>
                </div>

                {/* Action Buttons Side-by-Side In A Single Row */}
                <div className="flex items-center gap-2.5 sm:gap-3 flex-nowrap overflow-x-auto no-scrollbar pt-1 w-full">
                  {/* Button 1: Відкрити сайт */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold active:scale-[0.97] group cursor-pointer whitespace-nowrap shrink-0 ${themeStyles.primaryBtn}`}
                    >
                      <span>{caseData.resultsAndLive?.liveExperience?.btnText || "Відкрити сайт"}</span>
                      <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.primaryArrow}`}>→</span>
                    </a>
                  )}

                  {/* Button 2: Обговорити проєкт */}
                  <button
                    onClick={() => { onClose(); if (onOpenContact) onOpenContact(); }}
                    className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold active:scale-[0.97] group cursor-pointer whitespace-nowrap shrink-0 ${themeStyles.secondaryBtn}`}
                  >
                    <span>Обговорити проєкт</span>
                    <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.secondaryArrow}`}>→</span>
                  </button>

                  {/* Pill Tag */}
                  <span className={`px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full backdrop-blur-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap shrink-0 ${themeStyles.pillTag}`}>
                    {caseData.hero.pillTag}
                  </span>
                </div>
              </div>

              {/* Right Column: Interactive Soft Paper Press Hero Image */}
              <div className="lg:col-span-6">
                <SoftPaperPressHero
                  imageSrc={caseData.hero.heroImage}
                  caption={caseData.hero.caption}
                  className="aspect-[16/10] w-full"
                />
              </div>

            </div>
          </section>

        {/* STRUCTURED CASE STUDY CONTENT CONTAINER (Unified Single Style) */}
        <div className="max-w-6xl mx-auto px-6 sm:px-12 md:px-16 py-14 sm:py-20 space-y-16 sm:space-y-24 text-left">
          
          {/* ========================================================================= */}
          {/* 1. ГОЛОВНА ПРОБЛЕМА ТА РІШЕННЯ */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="space-y-1.5 border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${themeStyles.sectionDot}`} />
                <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${themeStyles.sectionNum}`}>
                  {caseData.problemSolution.sectionNum}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#121A15] tracking-tight">
                {caseData.problemSolution.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Problem Card */}
              <div className="p-7 sm:p-9 rounded-[32px] bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-xl border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-all duration-300 space-y-3.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-900/15 text-rose-950 font-mono text-[10px] uppercase tracking-wider font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  <span>{caseData.problemSolution.problem.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-[#121A15] tracking-tight leading-snug">
                  {caseData.problemSolution.problem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2E4035] font-light leading-[1.75]">
                  {caseData.problemSolution.problem.desc}
                </p>
              </div>

              {/* Solution Card */}
              <div className="p-7 sm:p-9 rounded-[32px] bg-gradient-to-b from-white/95 to-white/80 backdrop-blur-xl border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-all duration-300 space-y-3.5">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border font-mono text-[10px] uppercase tracking-wider font-semibold ${themeStyles.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${themeStyles.pulse}`} />
                  <span>{caseData.problemSolution.solution.tag}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-normal text-[#121A15] tracking-tight leading-snug">
                  {caseData.problemSolution.solution.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#2E4035] font-light leading-[1.75]">
                  {caseData.problemSolution.solution.desc}
                </p>
              </div>

            </div>
          </section>

          {/* ========================================================================= */}
          {/* 2. КОНЦЕПТ ТА UX-АРХІТЕКТУРА */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="space-y-1.5 border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${themeStyles.sectionDot}`} />
                <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${themeStyles.sectionNum}`}>
                  {caseData.conceptErgonomics.sectionNum}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#121A15] tracking-tight">
                {caseData.conceptErgonomics.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseData.conceptErgonomics.cards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="p-7 sm:p-8 rounded-[32px] bg-white/85 hover:bg-white backdrop-blur-xl border border-black/[0.04] hover:border-black/[0.1] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 space-y-3"
                >
                  <span className="font-mono text-[10px] text-[#5C4D3E]/70 bg-black/[0.03] px-2.5 py-1 rounded-full border border-black/[0.03] font-semibold uppercase tracking-wider inline-block">
                    {card.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-[#121A15] tracking-tight">{card.title}</h3>
                  <p className="text-xs sm:text-sm text-[#2E4035]/85 font-light leading-[1.75]">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 3. ДИЗАЙН-СИСТЕМА ТА ТОКЕНИ */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="space-y-1.5 border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${themeStyles.sectionDot}`} />
                <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${themeStyles.sectionNum}`}>
                  {caseData.designSystem.sectionNum}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#121A15] tracking-tight">
                {caseData.designSystem.sectionTitle}
              </h2>
            </div>

            {/* LUXURY COLOR PALETTE WITH ARCHITECTURAL TOKENS & ROLES */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 ${caseData.designSystem.palette?.length === 4 ? "lg:grid-cols-4" : "md:grid-cols-3 lg:grid-cols-5"} gap-3.5 sm:gap-4`}>
              {caseData.designSystem.palette.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCopyHex(color.hex)}
                  className="p-4 sm:p-4.5 rounded-[26px] bg-white/85 hover:bg-white backdrop-blur-2xl border border-black/[0.05] hover:border-black/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 text-left group cursor-pointer space-y-3 relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Swatch Header Box */}
                  <div 
                    style={{ backgroundColor: color.hex }}
                    className="w-full h-24 rounded-[20px] flex items-end justify-between p-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-black/[0.06] relative group-hover:scale-[1.01] transition-transform duration-300"
                  >
                    <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-md ${color.textDark ? "bg-black/10 text-[#121A15] font-bold" : "bg-white/15 text-white font-medium"}`}>
                      {color.tag}
                    </span>
                    
                    {/* Copy Hex Status Feedback */}
                    <div className="shrink-0">
                      {copiedHex === color.hex ? (
                        <span className="px-2 py-0.5 rounded-full bg-[#121A15] text-[#F9F6F0] text-[9px] font-mono flex items-center gap-1 font-semibold shadow-md animate-in fade-in zoom-in duration-200">
                          <Check className="w-2.5 h-2.5 text-[#E5C387]" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${color.textDark ? "bg-black/10 text-[#121A15] group-hover:bg-black group-hover:text-white" : "bg-white/15 text-white group-hover:bg-white group-hover:text-black"}`}>
                          <Copy className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Swatch Metadata */}
                  <div className="space-y-1.5 pt-0.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-sans text-xs sm:text-sm font-bold text-[#121A15] tracking-tight truncate">{color.name}</span>
                        <span className="font-mono text-[11px] font-bold text-[#8C6D46] group-hover:text-[#121A15] transition-colors shrink-0">{color.hex}</span>
                      </div>

                      {color.token && (
                        <div className="mt-1">
                          <code className="font-mono text-[9px] text-[#5C4D3E]/70 bg-black/[0.03] px-1.5 py-0.5 rounded border border-black/[0.03] block truncate">
                            {color.token}
                          </code>
                        </div>
                      )}
                    </div>

                    {color.role && (
                      <p className="font-sans text-[11px] text-[#2E4035]/80 font-normal leading-snug pt-1 border-t border-black/[0.04]">
                        {color.role}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* EDITORIAL TYPOGRAPHY SPECIMENS (Haute Hierarchy) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {caseData.designSystem.typography.map((font, idx) => (
                <div 
                  key={idx} 
                  className="p-6 sm:p-7 rounded-[30px] bg-white/85 hover:bg-white backdrop-blur-2xl border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 hover:border-black/[0.1] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase text-[#8C6D46] font-bold tracking-widest block">
                        {font.tag}
                      </span>
                      <span className="font-mono text-[10px] text-[#5C4D3E]/50">
                        {idx === 0 ? "400 Light / 600 Display" : idx === 1 ? "400 Reg / 500 Medium" : "Mono 400 Fixed"}
                      </span>
                    </div>

                    <div className={`text-2xl sm:text-3xl text-[#121A15] leading-tight tracking-tight ${idx === 0 ? "font-serif italic" : idx === 2 ? "font-mono" : "font-sans font-medium"}`}>
                      {font.font}
                    </div>

                    {/* Interactive Font Glyph Preview */}
                    <div className="font-mono text-xs text-[#5C4D3E]/40 tracking-wider py-1 border-y border-black/[0.04]">
                      Aa Bb Cc Dd Ee Ff Gg 0123456789
                    </div>
                  </div>

                  <p className="text-xs text-[#2E4035]/85 font-light leading-relaxed">
                    {font.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* 4. ІНТЕРФЕЙСНІ ЗРІЗИ ТА ГАЛЕРЕЯ */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="space-y-1.5 border-b border-black/[0.06] pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${themeStyles.sectionDot}`} />
                  <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${themeStyles.sectionNum}`}>
                    {caseData.gallerySectionNum || "04 / Галерея інтерфейсу"}
                  </span>
                </div>
                <span className={`text-xs font-mono ${themeStyles.accentText} hidden sm:block font-medium`}>
                  Клікніть для 4K перегляду
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#121A15] tracking-tight">
                Візуальні акценти та деталізація
              </h2>
            </div>

            {caseData.gallery && caseData.gallery.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {caseData.gallery.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className="group relative aspect-[16/11] rounded-[28px] overflow-hidden bg-black/5 border border-black/[0.05] shadow-[0_6px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.12)] hover:border-black/[0.15] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-[1.035] transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Subtle Frosted Bottom Capsule on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-white">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-sans font-medium line-clamp-1">
                          {item.caption}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 ml-2">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* 5. РЕЗУЛЬТАТ ТА LIVE ДОСВІД */}
          {/* ========================================================================= */}
          <section className="space-y-6">
            <div className="space-y-1.5 border-b border-black/[0.06] pb-4">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${themeStyles.sectionDot}`} />
                <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${themeStyles.sectionNum}`}>
                  {caseData.resultsAndLive.sectionNum}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#121A15] tracking-tight">
                {caseData.resultsAndLive.sectionTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="p-7 sm:p-9 rounded-[32px] bg-white/85 backdrop-blur-xl border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-3">
                <span className={`font-mono text-xs uppercase font-bold ${themeStyles.accentText} block tracking-wider`}>
                  {caseData.resultsAndLive.summary.title1}
                </span>
                <p className="text-xs sm:text-sm text-[#2E4035] font-light leading-[1.75]">
                  {caseData.resultsAndLive.summary.desc1}
                </p>
              </div>

              <div className="p-7 sm:p-9 rounded-[32px] bg-white/85 backdrop-blur-xl border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-3">
                <span className={`font-mono text-xs uppercase font-bold ${themeStyles.accentText} block tracking-wider`}>
                  {caseData.resultsAndLive.summary.title2}
                </span>
                <p className="text-xs sm:text-sm text-[#2E4035] font-light leading-[1.75]">
                  {caseData.resultsAndLive.summary.desc2}
                </p>
              </div>

            </div>

            {/* Simple Clean Live Link Card */}
            {project.liveUrl && (
              <div className="p-7 sm:p-8 rounded-[32px] bg-white/85 backdrop-blur-xl border border-black/[0.04] shadow-[0_10px_35px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#121A15] font-medium text-sm">
                    <span className={`w-2 h-2 rounded-full ${themeStyles.pulse} animate-pulse`} />
                    <span className="font-semibold">{caseData.resultsAndLive.liveExperience.status}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#2E4035]/80 font-mono">
                    {caseData.resultsAndLive.liveExperience.urlDisplay}
                  </p>
                </div>

                <div className="shrink-0">
                  {/* Button: Відкрити сайт */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3.5 rounded-full backdrop-blur-2xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2.5 active:scale-[0.97] group cursor-pointer ${themeStyles.liveBtn}`}
                  >
                    <span>{caseData.resultsAndLive.liveExperience.btnText}</span>
                    <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.liveArrow}`}>→</span>
                  </a>
                </div>
              </div>
            )}
          </section>

          {/* FOOTER NAVIGATION */}
          <section className="pt-10 border-t border-black/[0.06] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5">
            {/* Previous Project Capsule */}
            <button
              onClick={() => onSelectProject ? onSelectProject(prevProject.id) : null}
              className="group flex items-center gap-3.5 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF7F2]/70 hover:bg-[#FAF7F2] backdrop-blur-xl border border-black/[0.04] hover:border-black/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-200 cursor-pointer text-left"
            >
              <div className="w-9 h-9 rounded-full bg-black/5 group-hover:bg-[#121A15] text-[#121A15] group-hover:text-[#F9F6F0] flex items-center justify-center transition-colors duration-200 shrink-0 group-hover:-translate-x-0.5">
                <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#5C4D3E]/60">
                  Попередній кейс
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-[#201A15] group-hover:text-[#8C6D46] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            {/* Central Main CTA: Обговорити проєкт */}
            <div className="flex justify-center">
              <button
                onClick={() => { onClose(); if (onOpenContact) onOpenContact(); }}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full backdrop-blur-2xl font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] active:scale-[0.97] cursor-pointer inline-flex items-center justify-center gap-2.5 group ${themeStyles.footerBtn}`}
              >
                <span>Обговорити проєкт</span>
                <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.footerArrow}`}>→</span>
              </button>
            </div>

            {/* Next Project Capsule */}
            <button
              onClick={() => onSelectProject ? onSelectProject(nextProject.id) : null}
              className="group flex items-center justify-between sm:justify-end gap-3.5 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF7F2]/70 hover:bg-[#FAF7F2] backdrop-blur-xl border border-black/[0.04] hover:border-black/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-200 cursor-pointer text-right"
            >
              <div>
                <span className="block font-mono text-[9px] uppercase tracking-widest text-[#5C4D3E]/60">
                  Наступний кейс
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold text-[#201A15] group-hover:text-[#8C6D46] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-black/5 group-hover:bg-[#121A15] text-[#121A15] group-hover:text-[#F9F6F0] flex items-center justify-center transition-colors duration-200 shrink-0 group-hover:translate-x-0.5">
                <ChevronRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </button>
          </section>

        </div>

      </main>

      </div>

      {/* 4K LIGHTBOX */}
      {selectedPhotoIndex !== null && caseData.gallery?.[selectedPhotoIndex] && (
        <div className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-6xl max-h-[82vh] flex flex-col items-center">
            <img
              src={caseData.gallery[selectedPhotoIndex].url}
              alt={caseData.gallery[selectedPhotoIndex].caption}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <p className="mt-4 text-sm font-mono text-white/80 text-center">
              {caseData.gallery[selectedPhotoIndex].caption} ({selectedPhotoIndex + 1} / {caseData.gallery.length})
            </p>
          </div>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex - 1 + caseData.gallery.length) % caseData.gallery.length)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedPhotoIndex((selectedPhotoIndex + 1) % caseData.gallery.length)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
