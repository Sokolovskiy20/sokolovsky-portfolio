import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { translations } from "../translations";
import { projectsData } from "../data/projectsData";
import { 
  X, 
  ArrowUpRight, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink
} from "lucide-react";

/* Interactive Soft Tactile Paper Press Hero Component (Zero-Re-Render 60 FPS Edition) */
function SoftPaperPressHero({ className, imageSrc, caption }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const craterRef = useRef(null);
  const rimRef = useRef(null);
  const creaseRef = useRef(null);
  const canvasRef = useRef(null);
  const badgeDotRef = useRef(null);
  const badgeTextRef = useRef(null);

  const animRef = useRef(null);
  const isRunningRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isPressedRef = useRef(false);
  const targetRef = useRef({ x: 0.5, y: 0.5, depth: 0 });
  const currentRef = useRef({ x: 0.5, y: 0.5, depth: 0, rotX: 0, rotY: 0 });
  const ripplesRef = useRef([]);

  const updateVisuals = (cur) => {
    const pixelX = (cur.x * 100).toFixed(1);
    const pixelY = (cur.y * 100).toFixed(1);

    if (cardRef.current) {
      cardRef.current.style.transform = `rotateX(${cur.rotX.toFixed(2)}deg) rotateY(${cur.rotY.toFixed(2)}deg) translateZ(${(-12 * cur.depth).toFixed(1)}px)`;
    }
    if (imgRef.current) {
      imgRef.current.style.transform = `scale(${(1 - 0.018 * cur.depth).toFixed(3)})`;
      imgRef.current.style.filter = `brightness(${(1 - 0.04 * cur.depth).toFixed(3)})`;
    }
    if (craterRef.current) {
      craterRef.current.style.opacity = cur.depth > 0.01 ? "1" : "0";
      if (cur.depth > 0.01) {
        craterRef.current.style.background = `radial-gradient(circle 240px at ${pixelX}% ${pixelY}%, rgba(0,0,0,${(0.48 * cur.depth).toFixed(3)}) 0%, rgba(0,0,0,${(0.22 * cur.depth).toFixed(3)}) 32%, rgba(0,0,0,${(0.04 * cur.depth).toFixed(3)}) 60%, transparent 80%)`;
      }
    }
    if (rimRef.current) {
      rimRef.current.style.opacity = cur.depth > 0.01 ? "1" : "0";
      if (cur.depth > 0.01) {
        rimRef.current.style.background = `radial-gradient(ellipse 260px 110px at ${pixelX}% ${Math.max(0, parseFloat(pixelY) - 4).toFixed(1)}%, rgba(255,255,255,${(0.3 * cur.depth).toFixed(3)}) 0%, rgba(255,255,255,${(0.08 * cur.depth).toFixed(3)}) 35%, transparent 65%)`;
      }
    }
    if (creaseRef.current) {
      creaseRef.current.style.opacity = cur.depth > 0.01 ? "1" : "0";
      if (cur.depth > 0.01) {
        creaseRef.current.style.background = `radial-gradient(ellipse 200px 90px at ${pixelX}% ${Math.min(100, parseFloat(pixelY) + 4).toFixed(1)}%, rgba(0,0,0,${(0.38 * cur.depth).toFixed(3)}) 0%, transparent 65%)`;
      }
    }
    if (badgeDotRef.current) {
      if (cur.depth > 0.1) {
        badgeDotRef.current.className = "w-2 h-2 rounded-full transition-colors duration-300 bg-emerald-300 scale-125";
      } else {
        badgeDotRef.current.className = "w-2 h-2 rounded-full transition-colors duration-300 bg-emerald-400 animate-pulse";
      }
    }
    if (badgeTextRef.current) {
      badgeTextRef.current.textContent = isPressedRef.current
        ? "М'який папір · Втиснуто"
        : isHoveredRef.current
        ? "М'який папір · Натисніть"
        : "Тактильний папір";
    }
  };

  const startLoop = () => {
    if (isRunningRef.current) return;
    isRunningRef.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext("2d") : null;

    const tick = () => {
      const cur = currentRef.current;
      const tar = targetRef.current;

      // Spring physics
      cur.x += (tar.x - cur.x) * 0.15;
      cur.y += (tar.y - cur.y) * 0.15;
      cur.depth += (tar.depth - cur.depth) * 0.12;

      const targetRotX = (cur.y - 0.5) * -7 * cur.depth;
      const targetRotY = (cur.x - 0.5) * 7 * cur.depth;
      cur.rotX += (targetRotX - cur.rotX) * 0.15;
      cur.rotY += (targetRotY - cur.rotY) * 0.15;

      updateVisuals(cur);

      // Render ripples on canvas if active
      if (ctx && canvas && canvas.width > 0 && canvas.height > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const ripples = ripplesRef.current;
        if (ripples.length > 0) {
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
        }
      }

      // Check resting state to auto-sleep and free up 100% CPU
      const isSettled =
        Math.abs(cur.depth - tar.depth) < 0.001 &&
        Math.abs(cur.rotX - targetRotX) < 0.01 &&
        Math.abs(cur.rotY - targetRotY) < 0.01 &&
        ripplesRef.current.length === 0 &&
        !isHoveredRef.current &&
        !isPressedRef.current;

      if (isSettled) {
        isRunningRef.current = false;
        animRef.current = null;
        return;
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    targetRef.current.x = nx;
    targetRef.current.y = ny;
    targetRef.current.depth = isPressedRef.current ? 1.6 : 1.0;

    if (Math.random() > 0.75 && ripplesRef.current.length < 5 && canvasRef.current) {
      ripplesRef.current.push({
        x: nx * canvasRef.current.width,
        y: ny * canvasRef.current.height,
        radius: 6,
        speed: 0.85,
        alpha: 0.35,
        fade: 0.012
      });
    }

    startLoop();
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    targetRef.current.depth = 1.0;
    startLoop();
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    isPressedRef.current = false;
    targetRef.current.depth = 0;
    targetRef.current.x = 0.5;
    targetRef.current.y = 0.5;
    startLoop();
  };

  const handleMouseDown = () => {
    isPressedRef.current = true;
    targetRef.current.depth = 1.7;
    if (canvasRef.current && canvasRef.current.width > 0) {
      ripplesRef.current.push({
        x: currentRef.current.x * canvasRef.current.width,
        y: currentRef.current.y * canvasRef.current.height,
        radius: 8,
        speed: 1.1,
        alpha: 0.45,
        fade: 0.014
      });
    }
    startLoop();
  };

  const handleMouseUp = () => {
    isPressedRef.current = false;
    targetRef.current.depth = isHoveredRef.current ? 1.0 : 0;
    startLoop();
  };

  const handleTouchMove = (e) => {
    if (!e.touches || !containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const nx = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
    targetRef.current.x = nx;
    targetRef.current.y = ny;
    targetRef.current.depth = 1.2;
    startLoop();
  };

  return (
    <div 
      ref={containerRef}
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
        ref={cardRef}
        className="relative w-full h-full rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A1A12] border border-black/10 sm:border-white/80 shadow-[0_20px_60px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.4)] cursor-grab active:cursor-grabbing will-change-transform transform-gpu"
        style={{
          transform: "rotateX(0deg) rotateY(0deg) translateZ(0px)",
          transition: "box-shadow 0.3s ease-out",
        }}
      >
        {/* Base Hero Screenshot */}
        <img
          ref={imgRef}
          src={imageSrc}
          alt={caption || "Hero"}
          decoding="async"
          loading="eager"
          className="w-full h-full object-cover select-none pointer-events-none transform-gpu will-change-transform"
          style={{
            transform: "scale(1)",
            filter: "brightness(1)"
          }}
        />

        {/* Soft Indentation Crater */}
        <div 
          ref={craterRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-150"
        />

        {/* Paper Specular Light Rim */}
        <div 
          ref={rimRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-150"
        />

        {/* Paper Crease Shadow Below Depressed Center */}
        <div 
          ref={creaseRef}
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-150"
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
          <div className="px-3.5 py-1.5 rounded-full bg-[#121A15]/85 border border-white/20 text-white font-mono text-xs flex items-center gap-2 shadow-md">
            <span ref={badgeDotRef} className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{caption}</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#121A15]/70 border border-white/10 text-white/85 font-mono text-[10px] uppercase tracking-wider">
            <span ref={badgeTextRef}>Тактильний папір</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectModal({ projectId, lang = "ua", onClose, onSelectProject, onOpenContact }) {
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
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
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
        // Soft Light Green Buttons (Quiet Luxury Light Sage & Eucalyptus)
        primaryBtn: "bg-[#DCECE1] hover:bg-[#CFE5D5] text-[#0C2F19] border border-[#2E7D47]/35 hover:border-[#2E7D47]/60 shadow-[0_8px_24px_rgba(46,125,71,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        primaryArrow: "text-[#1B4D3E]",
        secondaryBtn: "bg-[#F2F8F5] hover:bg-[#E6F1EA] text-[#123820] border border-emerald-800/20 hover:border-emerald-800/35 shadow-[0_6px_18px_rgba(46,125,71,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#2E7D47]",
        pillTag: "bg-[#EAF5EE] border border-emerald-700/25 text-[#103A21] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#DCECE1] hover:bg-[#CFE5D5] text-[#0C2F19] border border-[#2E7D47]/35 hover:border-[#2E7D47]/60 shadow-[0_8px_24px_rgba(46,125,71,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        liveArrow: "text-[#1B4D3E]",
        footerBtn: "bg-[#103A21] hover:bg-[#0A2615] text-[#F4F9F6] border border-emerald-500/30",
        footerArrow: "text-[#A3C9A8]"
      }
    : isAura
    ? {
        badge: "bg-amber-50/90 border-amber-600/25 text-amber-950",
        pulse: "bg-amber-500",
        sectionDot: "bg-amber-600",
        sectionNum: "text-amber-900",
        // Soft Gold Buttons (Warm Champagne & Luminous Satin Gold)
        primaryBtn: "bg-[#F3E7D0] hover:bg-[#EAD9BD] text-[#332410] border border-[#D4AF37]/50 hover:border-[#D4AF37]/75 shadow-[0_8px_24px_rgba(212,175,55,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        primaryArrow: "text-[#B8860B]",
        secondaryBtn: "bg-[#FAF6EE] hover:bg-[#F3ECE0] text-[#362612] border border-[#D4AF37]/30 hover:border-[#D4AF37]/50 shadow-[0_6px_18px_rgba(212,175,55,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#996515]",
        pillTag: "bg-[#F6EEDF] border border-[#D4AF37]/35 text-[#4D3716] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#F3E7D0] hover:bg-[#EAD9BD] text-[#332410] border border-[#D4AF37]/50 hover:border-[#D4AF37]/75 shadow-[0_8px_24px_rgba(212,175,55,0.18),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        liveArrow: "text-[#B8860B]",
        footerBtn: "bg-[#281E10] hover:bg-[#1A1308] text-[#FAF5EB] border border-amber-400/30",
        footerArrow: "text-[#E5C387]"
      }
    : {
        badge: "bg-[#F5EFEB] border-[#8C6D46]/25 text-[#3D2C22]",
        pulse: "bg-[#8C6D46]",
        sectionDot: "bg-[#8C6D46]",
        sectionNum: "text-[#5C4D3E]",
        accentText: "text-[#5C4D3E]",
        // Soft Warm Brown Buttons (Warm Mocha, Chestnut & Latte Ceramic)
        primaryBtn: "bg-[#4D3A2F] hover:bg-[#3F2E24] text-[#FAF5EF] border border-[#96785C]/40 hover:border-[#96785C]/65 shadow-[0_8px_24px_rgba(77,58,47,0.2),inset_0_1px_1px_rgba(255,255,255,0.28)]",
        primaryArrow: "text-[#DEC09B]",
        secondaryBtn: "bg-[#F6F0E8] hover:bg-[#EDE3D6] text-[#3D2C22] border border-[#8C6D46]/25 hover:border-[#8C6D46]/45 shadow-[0_6px_18px_rgba(77,58,47,0.06),inset_0_1px_2px_rgba(255,255,255,0.95)]",
        secondaryArrow: "text-[#7A5A43]",
        pillTag: "bg-[#F2EAE0] border border-[#8C6D46]/25 text-[#423024] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]",
        liveBtn: "bg-[#4D3A2F] hover:bg-[#3F2E24] text-[#FAF5EF] border border-[#96785C]/40 hover:border-[#96785C]/65 shadow-[0_8px_24px_rgba(77,58,47,0.2),inset_0_1px_1px_rgba(255,255,255,0.28)]",
        liveArrow: "text-[#DEC09B]",
        footerBtn: "bg-[#3A2B22] hover:bg-[#2A1E17] text-[#FAF5EF] border border-[#96785C]/35",
        footerArrow: "text-[#DEC09B]"
      };

  return (
    <motion.div 
      ref={scrollContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      onClick={(e) => {
        if (e.target === scrollContainerRef.current) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-[#070707]/80 text-[#121A15] selection:bg-[#2E7D47] selection:text-[#FFFFFF] font-sans p-0 sm:p-4 md:p-6 lg:p-8 overscroll-y-contain cursor-default transform-gpu"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* ATMOSPHERIC LUXURY AMBIENT BACKGROUND (Zero-Blur Fast Radial Shaders) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden select-none -z-10">
        {/* Architectural Dot Matrix Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.5px,transparent_0.5px)] [background-size:28px_28px] opacity-[0.03]" />
        
        {/* Soft Ambient Aurora (Top Right) */}
        <div 
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: isMaira
              ? "radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.02) 45%, transparent 70%)"
              : isAura
              ? "radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 45%, transparent 70%)"
              : "radial-gradient(circle, rgba(178, 142, 110, 0.09) 0%, rgba(178, 142, 110, 0.02) 45%, transparent 70%)"
          }}
        />
        
        {/* Ambient Glow (Center Left) */}
        <div 
          className="absolute top-1/3 -left-32 w-[550px] h-[550px] rounded-full pointer-events-none transition-opacity duration-500"
          style={{
            background: isMaira
              ? "radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 65%)"
              : isAura
              ? "radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 65%)"
              : "radial-gradient(circle, rgba(178, 142, 110, 0.07) 0%, transparent 65%)"
          }}
        />
      </div>
      
      {/* MAIN FLOATING MODAL CARD */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 12 }}
        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-7xl mx-auto bg-[#FAF8F5] rounded-none sm:rounded-[40px] md:rounded-[48px] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.45),0_1px_3px_rgba(0,0,0,0.08)] border border-black/[0.06] sm:border-white/90 flex flex-col my-0 sm:my-2 overflow-hidden transform-gpu"
      >
        
        {/* FLOATING TOP-RIGHT CLOSE BUTTON WITH ESC HINT */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          onClick={onClose}
          className="fixed sm:absolute top-5 right-5 sm:top-7 sm:right-7 z-50 h-11 px-3 sm:px-3.5 rounded-full bg-[#121A15]/90 hover:bg-[#121A15] text-[#FAF8F5] border border-white/20 hover:border-white/40 transition-colors duration-200 flex items-center gap-2 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.18)] group"
          aria-label="Закрити кейс"
        >
          <X className="w-4 h-4 stroke-[2.2] group-hover:rotate-90 transition-transform duration-300" />
          <span className="hidden sm:inline font-mono text-[10px] text-white/70 uppercase tracking-widest font-semibold border-l border-white/20 pl-2">
            ESC
          </span>
        </motion.button>

        {/* FULL-PAGE CASE STUDY BODY WITH FLUID CROSSFADE ON PROJECT SWITCH */}
        <AnimatePresence mode="wait">
          <motion.main 
            key={projectId}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="flex-1 w-full pb-28 text-left"
          >
          
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
                      className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full transition-all duration-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold active:scale-[0.97] group cursor-pointer whitespace-nowrap shrink-0 ${themeStyles.primaryBtn}`}
                    >
                      <span>{caseData.resultsAndLive?.liveExperience?.btnText || "Відкрити сайт"}</span>
                      <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.primaryArrow}`}>→</span>
                    </a>
                  )}

                  {/* Button 2: Обговорити проєкт */}
                  <button
                    onClick={() => { onClose(); if (onOpenContact) onOpenContact(); }}
                    className={`inline-flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full transition-all duration-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold active:scale-[0.97] group cursor-pointer whitespace-nowrap shrink-0 ${themeStyles.secondaryBtn}`}
                  >
                    <span>Обговорити проєкт</span>
                    <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.secondaryArrow}`}>→</span>
                  </button>

                  {/* Pill Tag */}
                  <span className={`px-3.5 sm:px-4 py-3 sm:py-3.5 rounded-full font-mono text-[11px] sm:text-xs uppercase tracking-wider font-semibold whitespace-nowrap shrink-0 ${themeStyles.pillTag}`}>
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
              <div className="p-7 sm:p-9 rounded-[32px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-all duration-300 space-y-3.5">
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
              <div className="p-7 sm:p-9 rounded-[32px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.05)] transition-all duration-300 space-y-3.5">
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
                  className="p-7 sm:p-8 rounded-[32px] bg-white border border-black/[0.04] hover:border-black/[0.1] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 space-y-3"
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
                  className="p-4 sm:p-4.5 rounded-[26px] bg-white border border-black/[0.05] hover:border-black/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 text-left group cursor-pointer space-y-3 relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Swatch Header Box */}
                  <div 
                    style={{ backgroundColor: color.hex }}
                    className="w-full h-24 rounded-[20px] flex items-end justify-between p-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),inset_0_-1px_2px_rgba(0,0,0,0.3)] border border-black/[0.06] relative group-hover:scale-[1.01] transition-transform duration-300"
                  >
                    <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full ${color.textDark ? "bg-black/15 text-[#121A15] font-bold" : "bg-white/20 text-white font-medium"}`}>
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
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${color.textDark ? "bg-black/15 text-[#121A15] group-hover:bg-black group-hover:text-white" : "bg-white/20 text-white group-hover:bg-white group-hover:text-black"}`}>
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
                  className="p-6 sm:p-7 rounded-[30px] bg-white border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-4 hover:border-black/[0.1] hover:-translate-y-0.5 transition-all duration-300"
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
                  Екрани & архітектура
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
                    className="group relative aspect-[16/11] rounded-[28px] overflow-hidden bg-black/5 border border-black/[0.05] shadow-[0_6px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-black/[0.12] transition-all duration-300 transform-gpu"
                  >
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out transform-gpu will-change-transform"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Editorial Bottom Capsule with Slice Caption on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-5">
                      <div className="flex items-center gap-2 text-white">
                        <span className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/20 font-semibold">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-sans font-medium line-clamp-1">
                          {item.caption}
                        </span>
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
              
              <div className="p-7 sm:p-9 rounded-[32px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-3">
                <span className={`font-mono text-xs uppercase font-bold ${themeStyles.accentText} block tracking-wider`}>
                  {caseData.resultsAndLive.summary.title1}
                </span>
                <p className="text-xs sm:text-sm text-[#2E4035] font-light leading-[1.75]">
                  {caseData.resultsAndLive.summary.desc1}
                </p>
              </div>

              <div className="p-7 sm:p-9 rounded-[32px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] space-y-3">
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
              <div className="p-7 sm:p-8 rounded-[32px] bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95)] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
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
                    className={`px-6 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2.5 active:scale-[0.97] group cursor-pointer ${themeStyles.liveBtn}`}
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectProject ? onSelectProject(prevProject.id) : null}
              className="group flex items-center gap-3.5 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-black/[0.05] hover:border-black/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-200 cursor-pointer text-left"
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
            </motion.button>

            {/* Central Main CTA: Обговорити проєкт */}
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { onClose(); if (onOpenContact) onOpenContact(); }}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] cursor-pointer inline-flex items-center justify-center gap-2.5 group ${themeStyles.footerBtn}`}
              >
                <span>Обговорити проєкт</span>
                <span className={`transition-transform duration-200 group-hover:translate-x-1 ${themeStyles.footerArrow}`}>→</span>
              </motion.button>
            </div>

            {/* Next Project Capsule */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectProject ? onSelectProject(nextProject.id) : null}
              className="group flex items-center justify-between sm:justify-end gap-3.5 p-2.5 sm:px-4 sm:py-2.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE3] border border-black/[0.05] hover:border-black/[0.12] shadow-[0_4px_16px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all duration-200 cursor-pointer text-right"
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
            </motion.button>
          </section>

        </div>

          </motion.main>
        </AnimatePresence>

      </motion.div>

    </motion.div>
  );
}
