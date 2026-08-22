import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { translations } from '../translations';
import ThreeDObject from '../components/ThreeDObject';
import CinematicProjectRow from '../components/CinematicProjectRow';
import { PenTool, Terminal, Sparkles, ArrowUpRight, Check, Copy, Send, Mail } from 'lucide-react';
import {
  FigmaIcon,
  FramerIcon,
  CursorIcon,
  GoogleAntigravityIcon,
  ChatGPTIcon,
  GoogleGeminiIcon
} from '../components/TechIcons';

export default function HomePage({ lang, onNavigate, onSelectProject }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTg, setCopiedTg] = useState(false);

  const t = translations[lang] || translations.ru;

  const emailAddress = "sokolovsky202002@gmail.com";
  const telegramHandle = "@sokolovsky202002";
  const telegramUrl = "https://t.me/sokolovsky202002";

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyTg = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(telegramHandle);
    setCopiedTg(true);
    setTimeout(() => setCopiedTg(false), 2500);
  };

  const specializationText = lang === 'ru'
    ? "Джуниор веб-дизайнер & AI Разработчик"
    : lang === 'de'
      ? "Junior Web Designer & AI Entwickler"
      : "Junior Web Designer & AI Developer";

  const locationText = lang === 'ru'
    ? "БАЗИРУЕТСЯ В УКРАИНЕ • ONLINE WORLDWIDE"
    : lang === 'de'
      ? "STANDORT UKRAINE • ONLINE WORLDWIDE"
      : "BASED IN UKRAINE • ONLINE WORLDWIDE";

  // Section 1: Home Badge (01 // ГЛАВНАЯ / HOME)
  const homeTag = lang === 'ru'
    ? "01 // ГЛАВНАЯ"
    : lang === 'de'
      ? "01 // HOME"
      : "01 // HOME";

  // Section 2: Process Badge (02 // ПРОЦЕСС / PROCESS / PROZESS)
  const processTag = lang === 'ru'
    ? "02 // ПРОЦЕСС"
    : lang === 'de'
      ? "02 // PROZESS"
      : "02 // PROCESS";

  // Section 2: Premium UI/UX & Frontend Development
  const methodTitle = lang === 'ru'
    ? "Premium UI/UX & Frontend Development"
    : lang === 'de'
      ? "Premium UI/UX & Frontend-Entwicklung"
      : "Premium UI/UX & Frontend Development";

  const methodText = lang === 'ru'
    ? "Я веду проект от первой идеи до финального запуска. Сначала создаю выверенную визуальную эстетику и интерфейс в Figma, а затем полностью беру на себя frontend-разработку. Я трансформирую статический макет в живой, интерактивный сайт с чистым кодом и плавными анимациями. Вы получаете не просто красивый дизайн, а полностью готовый к работе цифровой продукт премиум-класса."
    : lang === 'de'
      ? "Ich begleite Ihr Projekt von der ersten Idee bis zum finalen Launch. Zuerst entwickle ich eine präzise visuelle Ästhetik und das Interface in Figma und übernehme anschließend die vollständige Frontend-Entwicklung. Ich transformiere statische Entwürfe in lebendige, interaktive Websites mit sauberem Code und fließenden Animationen. Sie erhalten nicht nur ansprechendes Design, sondern ein voll funktionsfähiges digitales Premium-Produkt."
      : "I lead projects from the initial concept to the final launch. First, I craft a refined visual aesthetic and intuitive interface in Figma, then take full ownership of frontend development. I transform static layouts into live, interactive web experiences with clean code and fluid motion. You receive not just exceptional design, but a fully deployed, high-performance digital product.";

  // 3 Stack Categories (Every tool has exactly 2 lines of description)
  const stackGroups = lang === 'ru' ? [
    {
      num: "01",
      category: "Design & Prototyping",
      icon: PenTool,
      tools: [
        {
          name: "Figma",
          tag: "UI/UX & Systems",
          icon: FigmaIcon,
          line1: "Проектирование UI/UX архитектуры и дизайн-систем.",
          line2: "Работа с визуальной эстетикой, сетками и типографикой."
        },
        {
          name: "Framer",
          tag: "Interactive & Motion",
          icon: FramerIcon,
          line1: "Быстрый перенос визуальных концептов в интерактивный продакшн.",
          line2: "Реализация плавных кинематографичных анимаций со скоростью 60+ FPS."
        }
      ]
    },
    {
      num: "02",
      category: "Engineering & Environment",
      icon: Terminal,
      tools: [
        {
          name: "Cursor",
          tag: "AI Code Editor",
          icon: CursorIcon,
          line1: "AI-нативная среда для ускоренного написания чистого кода.",
          line2: "Разработка высокопроизводительного, адаптивного фронтенда."
        },
        {
          name: "Google Antigravity",
          tag: "Agent Orchestration",
          icon: GoogleAntigravityIcon,
          line1: "Автономная оркестрация задач разработки и пайплайнов.",
          line2: "Агентное тестирование интерфейсов и верификация качества."
        }
      ]
    },
    {
      num: "03",
      category: "Intelligence & Generative Layer",
      icon: Sparkles,
      tools: [
        {
          name: "ChatGPT (GPT)",
          tag: "Logic & Scripts",
          icon: ChatGPTIcon,
          line1: "Генерация интерактивной логики и оптимизация скриптов.",
          line2: "Прототипирование и структурирование смыслового контента."
        },
        {
          name: "Google Gemini",
          tag: "Multimodal & Architecture",
          icon: GoogleGeminiIcon,
          line1: "Мультимодальный анализ данных и дизайн-архитектуры.",
          line2: "Проектирование сложных адаптивных веб-систем и кодинг."
        }
      ]
    }
  ] : lang === 'de' ? [
    {
      num: "01",
      category: "Design & Prototyping",
      icon: PenTool,
      tools: [
        {
          name: "Figma",
          tag: "UI/UX & Systeme",
          icon: FigmaIcon,
          line1: "Entwurf von UI/UX-Architektur und modularen Design-Systemen.",
          line2: "Visuelle Ästhetik, Schweizer Rastersysteme und Typografie."
        },
        {
          name: "Framer",
          tag: "Interaktiv & Motion",
          icon: FramerIcon,
          line1: "Schneller Übergang von visuellen Konzepten in die Produktion.",
          line2: "Interaktives Prototyping und flüssige Animationen mit 60+ FPS."
        }
      ]
    },
    {
      num: "02",
      category: "Engineering & Environment",
      icon: Terminal,
      tools: [
        {
          name: "Cursor",
          tag: "KI Code-Editor",
          icon: CursorIcon,
          line1: "KI-native Entwicklungsumgebung für sauberen Code.",
          line2: "Entwicklung hochperformanter, responsiver Frontends."
        },
        {
          name: "Google Antigravity",
          tag: "Agenten-Orchestrierung",
          icon: GoogleAntigravityIcon,
          line1: "Autonome Orchestrierung von Entwicklungs-Pipelines.",
          line2: "Agentenbasiertes UI-Testing und Code-Verifikation."
        }
      ]
    },
    {
      num: "03",
      category: "Intelligence & Generative Layer",
      icon: Sparkles,
      tools: [
        {
          name: "ChatGPT (GPT)",
          tag: "Logik & Scripts",
          icon: ChatGPTIcon,
          line1: "Generierung komplexer Logik und Script-Optimierung.",
          line2: "Strukturiertes Prototyping von Inhalten und Texten."
        },
        {
          name: "Google Gemini",
          tag: "Multimodal & Systeme",
          icon: GoogleGeminiIcon,
          line1: "Multimodale Datenanalyse und Konzeption von Systemen.",
          line2: "Entwicklung anspruchsvoller interaktiver Web-Lösungen."
        }
      ]
    }
  ] : [
    {
      num: "01",
      category: "Design & Prototyping",
      icon: PenTool,
      tools: [
        {
          name: "Figma",
          tag: "UI/UX & Systems",
          icon: FigmaIcon,
          line1: "Architecting intuitive UI/UX workflows and design systems.",
          line2: "Refining visual aesthetics, precision grids, and typography."
        },
        {
          name: "Framer",
          tag: "Interactive & Motion",
          icon: FramerIcon,
          line1: "Rapid concept-to-production deployment and testing.",
          line2: "Crafting fluid, cinematic micro-interactions at 60+ FPS."
        }
      ]
    },
    {
      num: "02",
      category: "Engineering & Environment",
      icon: Terminal,
      tools: [
        {
          name: "Cursor",
          tag: "AI Code Editor",
          icon: CursorIcon,
          line1: "AI-native IDE for rapid, clean code synthesis.",
          line2: "Engineering high-performance, responsive frontend systems."
        },
        {
          name: "Google Antigravity",
          tag: "Agent Orchestration",
          icon: GoogleAntigravityIcon,
          line1: "Autonomous orchestration of development pipelines.",
          line2: "Agentic UI verification and comprehensive code testing."
        }
      ]
    },
    {
      num: "03",
      category: "Intelligence & Generative Layer",
      icon: Sparkles,
      tools: [
        {
          name: "ChatGPT (GPT)",
          tag: "Logic & Scripts",
          icon: ChatGPTIcon,
          line1: "Generating interactive logic and script optimizations.",
          line2: "Rapid content prototyping and structured workflows."
        },
        {
          name: "Google Gemini",
          tag: "Multimodal & Systems",
          icon: GoogleGeminiIcon,
          line1: "Multimodal data analysis and architectural planning.",
          line2: "Synthesizing complex interactive systems and frontend code."
        }
      ]
    }
  ];

  // Section 3: Cases (03 // КЕЙСЫ / CASES)
  const casesTag = lang === 'ru'
    ? "03 // КЕЙСЫ"
    : lang === 'de'
      ? "03 // CASES"
      : "03 // CASES";

  // Section Header: "Кейсы" / "Case Studies"
  const casesHeading = lang === 'ru'
    ? "Кейсы"
    : lang === 'de'
      ? "Case Studies"
      : "Case Studies";

  const projectsSubheading = lang === 'ru'
    ? "Панорамные кейсы без лишних рамок. Каждый проект спроектирован как самостоятельная цифровая резиденция с акцентом на типографику и производительность."
    : lang === 'de'
      ? "Panoramische Case Studies ohne Geräte-Rahmen. Jedes Projekt ist als eigenständige digitale Residenz mit Fokus auf Typografie und Leistung konzipiert."
      : "Full-bleed panoramic case studies. Each project is engineered as an atmospheric digital sanctuary with a radical focus on typography and performance.";

  const viewCaseText = lang === 'ru'
    ? "Исследовать кейс"
    : lang === 'de'
      ? "Projekt ansehen"
      : "Explore Case Study";

  // Balanced, symmetrically structured project descriptions (+2 words added per project)
  const projectDescriptions = {
    aura: lang === 'ru'
      ? "Премиальный веб-сайт для компании-интегратора систем «Умный дом». Эксклюзивный дизайн, интерактивное управление сценариями, плавные анимации и безупречная адаптивность мирового уровня."
      : lang === 'de'
        ? "Bespoke Web-Präsenz für einen führenden Smart-Home-Integrator. Exklusives Design, interaktive Lichtszenarien, fließende Animationen und makellose Responsivität auf Weltklasse-Niveau."
        : "Bespoke digital presence for a premier smart home integration firm. Exclusive design, interactive ambient scenarios, fluid motion, and flawless world-class responsiveness.",
    amazonia: lang === 'ru'
      ? "Премиальный сервис экотуризма: приватная 10-дневная экспедиция в нетронутые реликтовые леса Амазонии для 8 избранных гостей. Абсолютное погружение в дикую природу, тишину и высокий уровень комфорта."
      : lang === 'de'
        ? "Exklusiver Ökotourismus-Service: private 10-tägige Expedition in unberührte Urwälder des Amazonas для 8 ausgewählte Gäste. Absolute Naturerfahrung, Stille und höchster persönlicher Komfort."
        : "Ultra-exclusive eco-tourism service: private 10-day expedition into pristine primordial Amazon rainforests for 8 select guests. Absolute wilderness, silence, and tailored luxury.",
    symmetry: lang === 'ru'
      ? "Премиальный авторский веб-дизайн для клиники эстетической стоматологии. Минималистичный UI, сложная швейцарская типографика и плавные микро-взаимодействия высшего европейского класса."
      : lang === 'de'
        ? "Haute Web-Design für eine Klinik für ästhetische Zahnheilkunde. Minimalistisches UI, anspruchsvolle Schweizer Typografie und fließende Mikro-Interaktionen der europäischen Spitzenklasse."
        : "Haute bespoke web design for an aesthetic dentistry clinic. Minimalist UI, sophisticated Swiss typography, and fluid micro-interactions engineered for European-tier prestige."
  };

  const projectTags = {
    aura: ["Apple HomeKit", "Matter IoT", "React 19", "Dark Obsidian UI", "< 120ms Latency"],
    amazonia: ["Eco-Sanctuary", "10-Day Expedition", "8 Exclusive Spots", "Haute Narrative"],
    symmetry: ["Aesthetic Dentistry", "Swiss Precision", "Micro-Interactions", "Haute Medical"]
  };

  const projectUrls = {
    aura: "https://aura-smart.vercel.app/",
    amazonia: "https://maira-amazonia.vercel.app/",
    symmetry: "https://symmetry-clinic.vercel.app/#/"
  };

  // Section 4: Contact (04 // КОНТАКТЫ / CONTACT / KONTAKT)
  const contactFinaleTag = lang === 'ru'
    ? "04 // КОНТАКТЫ"
    : lang === 'de'
      ? "04 // KONTAKT"
      : "04 // CONTACT";

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#ECECEC] select-none font-luxury-grotesque">
      
      {/* ========================================================================= */}
      {/* SCREEN 1: HERO SCREEN (01 // ГЛАВНАЯ / HOME) — SPRING CINEMATIC REVEAL    */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 sm:pb-14 overflow-hidden">
        
        {/* 0.0s: Revelation 21:11 3D Crystalline Jasper Background Atmosphere (Fade-in 1.3s) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center"
        >
          {/* Subtle Ambient Studio Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[550px] sm:h-[800px] bg-gradient-to-b from-[#E2D4B7]/[0.16] via-white/[0.04] to-transparent rounded-full blur-3xl mix-blend-screen" />

          {/* Real-Time Interactive 3D WebGL Crystalline Jasper Gem */}
          <div className="w-full h-full max-w-[1400px] max-h-[900px] flex items-center justify-center">
            <ThreeDObject className="w-full h-full" />
          </div>

          {/* Subtle Luxury Film Grain */}
          <div className="absolute inset-0 bg-grain opacity-6 pointer-events-none" />

          {/* Obsidian Edge Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80 pointer-events-none" />
        </motion.div>

        {/* 0.6s: Top Tag Pill for Screen 1 */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 pt-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
            <span className="font-nav text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-normal">
              {homeTag}
            </span>
          </div>
        </motion.div>

        {/* 0.3s: Center Running Name Track (Heavy Spring Physics: Stiffness 100, Damping 35, Offset 45px + Blur 10px) */}
        <motion.div
          initial={{ opacity: 0, y: 45, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 35,
            mass: 1.1,
            delay: 0.3
          }}
          className="relative z-10 w-full my-auto py-8 sm:py-14 border-y border-white/[0.08] bg-black/25 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-60 bg-gradient-to-r from-[#070707] via-[#070707]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-60 bg-gradient-to-l from-[#070707] via-[#070707]/90 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center whitespace-nowrap">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-10 sm:gap-20 px-6 sm:px-12">
                <span className="font-luxury-grotesque text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[135px] font-normal sm:font-medium tracking-[0.22em] sm:tracking-[0.26em] uppercase text-white hover:text-[#E2D4B7] transition-colors leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  ARTEM SOKOLOVSKY
                </span>
                <span className="text-2xl sm:text-4xl text-white/30 font-light">
                  —
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 0.85s: Bottom Bar Badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 md:px-16 pt-6 sm:pt-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6">
            
            {/* Bottom Left: Location Badge with Active Gold Dot */}
            <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/[0.08] shadow-md">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2D4B7] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]"></span>
              </span>
              <span className="font-nav text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/70 font-normal">
                {locationText}
              </span>
            </div>

            {/* Bottom Right: Specialization Badge */}
            <div className="flex items-center bg-black/50 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.08] shadow-md">
              <span className="font-luxury-grotesque text-xs sm:text-sm tracking-[0.14em] uppercase text-white/80 font-normal">
                {specializationText}
              </span>
            </div>

          </div>
        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* SCREEN 2: PROCESS (02 // ПРОЦЕСС / PROCESS / PROZESS) — STAGGERED CASCADE */}
      {/* ========================================================================= */}
      <section id="process" className="relative w-full pt-28 sm:pt-40 md:pt-48 pb-24 sm:pb-36 px-6 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden">
        
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-white/[0.02] via-[#E2D4B7]/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#E2D4B7]/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1800px] mx-auto">
          
          {/* Section Category Tag */}
          <div className="mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
              <span className="font-nav text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-normal">
                {processTag}
              </span>
            </div>
          </div>

          {/* Harmonious 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-start">
            
            {/* Left Column: Heading, Main Narrative, Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30,
                mass: 1.1
              }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-6">
                <h2 className="font-luxury-grotesque text-3xl sm:text-5xl md:text-5xl lg:text-[48px] xl:text-[54px] font-light leading-[1.15] tracking-[-0.025em] text-white">
                  {methodTitle}
                </h2>

                <p className="font-luxury-grotesque text-lg sm:text-xl md:text-[21px] text-white/85 font-light leading-[1.7] tracking-[-0.01em]">
                  {methodText}
                </p>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2D4B7] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]"></span>
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-white/80 tracking-wider uppercase font-medium">
                    Full-Cycle · Design to Production · 60+ FPS
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 3 Staggered Bento Cards (Delay 0.0s, 0.1s, 0.2s with Heavy Spring) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-5 lg:pl-6 xl:pl-10 lg:border-l border-white/[0.06]">
              
              {stackGroups.map((group, idx) => {
                const CategoryIcon = group.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 30,
                      delay: idx * 0.1,
                      mass: 1.0
                    }}
                    className="group p-6 sm:p-7 rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    {/* Category Top Header */}
                    <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-white/[0.06]">
                      <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#E2D4B7] group-hover:scale-105 transition-transform">
                          <CategoryIcon className="w-4.5 h-4.5" />
                        </div>
                        <h3 className="font-nav text-sm sm:text-[15px] tracking-[0.20em] uppercase text-white font-medium">
                          {group.category}
                        </h3>
                      </div>
                      <span className="font-mono text-xs text-[#E2D4B7]/70 tracking-wider">
                        {group.num} // 03
                      </span>
                    </div>

                    {/* Tools List with Exact Two-Line Formatting */}
                    <div className="space-y-5">
                      {group.tools.map((tool, tIdx) => {
                        const ToolIcon = tool.icon;
                        return (
                          <div 
                            key={tIdx} 
                            className={`group/tool ${
                              tIdx > 0 ? 'pt-4 border-t border-white/[0.04]' : ''
                            }`}
                          >
                            {/* Tool Header Row */}
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/tool:border-[#E2D4B7]/40 group-hover/tool:bg-white/[0.07] transition-all shadow-sm">
                                  <ToolIcon className="w-4 h-4" />
                                </div>
                                <span className="font-mono text-sm sm:text-[15px] text-white font-semibold tracking-wide">
                                  {tool.name}
                                </span>
                              </div>

                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/[0.03] border border-white/[0.06] text-white/50">
                                {tool.tag}
                              </span>
                            </div>

                            {/* 2-Line Tool Description */}
                            <div className="font-luxury-grotesque text-sm sm:text-[15px] text-white/75 font-light leading-relaxed pl-10 space-y-0.5">
                              <span className="block">{tool.line1}</span>
                              <span className="block text-white/60">{tool.line2}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </motion.div>
                );
              })}

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* SCREEN 3: CASES (03 // КЕЙСЫ / CASES)                                     */}
      {/* ========================================================================= */}
      <section id="projects" className="relative w-full pt-16 pb-28 sm:pb-36 px-6 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden">
        
        {/* Subtle Ambient Studio Glow */}
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] bg-gradient-to-b from-[#E2D4B7]/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-to-t from-white/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto">
          
          {/* Section Header with "Кейсы" Title */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 30
            }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24"
          >
            <div>
              {/* Category Badge matching Nav */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
                <span className="font-nav text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/60 font-normal">
                  {casesTag}
                </span>
              </div>

              {/* Title: КЕЙСЫ */}
              <h3 className="font-luxury-grotesque text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-white">
                {casesHeading}
              </h3>
            </div>

            {/* Subtext */}
            <div className="max-w-md lg:border-l border-white/[0.08] lg:pl-8">
              <span className="font-mono text-[10px] text-[#E2D4B7] uppercase tracking-[0.24em] block mb-2 font-medium">
                FULL-BLEED CINEMATIC VIEW
              </span>
              <p className="font-luxury-grotesque text-sm sm:text-base text-white/60 font-light leading-relaxed">
                {projectsSubheading}
              </p>
            </div>
          </motion.div>

          {/* CINEMATIC ROWS: Top to Bottom Full-Width Panoramic Showcase */}
          <div className="space-y-6 sm:space-y-10">
            
            {/* ROW 1: AURA (Smart Living & AI Automation) */}
            <CinematicProjectRow
              id="aura"
              index={0}
              number="01"
              title="AURA"
              subtitle="SMART LIVING // 2026"
              categoryBadge="01 // SMART LIVING • AI AUTOMATION"
              year="2026"
              description={projectDescriptions.aura}
              imageSrc="/assets/aura/aura_cinematic_hero.jpg"
              tags={projectTags.aura}
              viewText={viewCaseText}
              liveUrl={projectUrls.aura}
              reversed={false}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

            {/* ROW 2: МАИРА (10-Day Amazonian Rainforest Sanctuary) */}
            <CinematicProjectRow
              id="amazonia"
              index={1}
              number="02"
              title="МАИРА"
              subtitle="ECO-SANCTUARY // 2025"
              categoryBadge="02 // ECO-LUXURY EXPEDITION"
              year="2025"
              description={projectDescriptions.amazonia}
              imageSrc="/assets/amazonia/maira_cinematic_hero.jpg"
              tags={projectTags.amazonia}
              viewText={viewCaseText}
              liveUrl={projectUrls.amazonia}
              reversed={true}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

            {/* ROW 3: SYMMETRY Dental (Aesthetic Dentistry & Swiss Precision) */}
            <CinematicProjectRow
              id="symmetry"
              index={2}
              number="03"
              title="SYMMETRY Dental"
              subtitle="AESTHETIC DENTISTRY // 2026"
              categoryBadge="03 // HAUTE AESTHETIC MEDICINE"
              year="2026"
              description={projectDescriptions.symmetry}
              imageSrc="/assets/symmetry/symmetry_cinematic_hero.jpg"
              tags={projectTags.symmetry}
              viewText={viewCaseText}
              liveUrl={projectUrls.symmetry}
              reversed={false}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCREEN 4: CONTACT (04 // КОНТАКТЫ / CONTACT / KONTAKT)                    */}
      {/* ========================================================================= */}
      <section id="contact" className="relative w-full pt-32 sm:pt-48 pb-14 sm:pb-20 px-6 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden flex flex-col justify-between">
        
        {/* Subtle Ambient Studio Halo in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[700px] bg-gradient-to-t from-[#E2D4B7]/[0.03] via-white/[0.01] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto my-auto">
          
          {/* Top Tag Pill matching Nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
              <span className="font-nav text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-normal">
                {contactFinaleTag}
              </span>
            </div>
          </motion.div>

          {/* OVERSIZED TYPOGRAPHIC LINKS CONTAINER */}
          <div className="space-y-8 sm:space-y-14">
            
            {/* ROW 1: OVERSIZED EMAIL LINK */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30
              }}
              className="relative group"
            >
              
              {/* Studio Glow on Hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E2D4B7]/[0.08] via-white/[0.04] to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                onClick={handleCopyEmail}
                className="relative flex flex-col xl:flex-row xl:items-baseline justify-between gap-4 py-4 sm:py-6 border-b border-white/[0.10] group-hover:border-[#E2D4B7]/60 transition-colors duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-[#E2D4B7] tracking-widest shrink-0 font-medium">
                    01 // EMAIL
                  </span>

                  {/* Gigantic Grotesque Email with Outline Hover Effect */}
                  <h2 className="font-luxury-grotesque text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px] 2xl:text-[96px] font-normal tracking-[0.04em] uppercase text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:1.5px_#E2D4B7] transition-all duration-500 leading-none truncate">
                    SOKOLOVSKY202002@GMAIL.COM
                  </h2>
                </div>

                {/* Floating Arrow & Copy Badge */}
                <div className="flex items-center gap-4 shrink-0 xl:self-center pl-8 xl:pl-0">
                  {copiedEmail ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2D4B7] text-black font-nav text-xs tracking-wider uppercase font-bold animate-fade-in shadow-lg">
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'ru' ? "Скопировано!" : lang === 'de' ? "Kopiert!" : "Copied!"}</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-3 text-white/40 group-hover:text-[#E2D4B7] transition-colors font-mono text-xs tracking-wider uppercase">
                      <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {lang === 'ru' ? "Нажмите, чтобы скопировать" : "Click to copy"}
                      </span>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.03] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.08] group-hover:border-[#E2D4B7] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>

            {/* ROW 2: OVERSIZED TELEGRAM LINK */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30,
                delay: 0.1
              }}
              className="relative group"
            >
              
              {/* Studio Glow on Hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E2D4B7]/[0.08] via-white/[0.04] to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div
                onClick={handleCopyTg}
                className="relative flex flex-col xl:flex-row xl:items-baseline justify-between gap-4 py-4 sm:py-6 border-b border-white/[0.10] group-hover:border-[#E2D4B7]/60 transition-colors duration-500 cursor-pointer"
              >
                <div className="flex items-center gap-4 sm:gap-8 min-w-0">
                  <span className="font-mono text-xs sm:text-sm text-[#E2D4B7] tracking-widest shrink-0 font-medium">
                    02 // TELEGRAM
                  </span>

                  {/* Gigantic Grotesque Telegram with Outline Hover Effect */}
                  <h2 className="font-luxury-grotesque text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[86px] 2xl:text-[96px] font-normal tracking-[0.04em] uppercase text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:1.5px_#E2D4B7] transition-all duration-500 leading-none truncate">
                    @SOKOLOVSKY202002
                  </h2>
                </div>

                {/* Floating Arrow & Copy Badge */}
                <div className="flex items-center gap-4 shrink-0 xl:self-center pl-8 xl:pl-0">
                  {copiedTg ? (
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E2D4B7] text-black font-nav text-xs tracking-wider uppercase font-bold animate-fade-in shadow-lg">
                      <Check className="w-3.5 h-3.5" />
                      <span>{lang === 'ru' ? "Скопировано!" : lang === 'de' ? "Kopiert!" : "Copied!"}</span>
                    </span>
                  ) : (
                    <div className="flex items-center gap-3 text-white/40 group-hover:text-[#E2D4B7] transition-colors font-mono text-xs tracking-wider uppercase">
                      <span className="hidden sm:inline opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {lang === 'ru' ? "Нажмите, чтобы скопировать" : "Click to copy"}
                      </span>
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/[0.03] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.08] group-hover:border-[#E2D4B7] flex items-center justify-center transition-all duration-300 transform group-hover:scale-110">
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </motion.div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* FOOTER (ПОДВАЛ): SINGLE-LINE MINIMALIST BOTTOM BAR                        */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto mt-28 sm:mt-40 pt-8 sm:pt-10 border-t border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-white/50">
            
            {/* Left: Author Identity */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7]" />
              <span className="tracking-wider uppercase text-white/80">
                ARTEM SOKOLOVSKY
              </span>
            </div>

            {/* Center: Global Status */}
            <div className="tracking-wider uppercase text-white/40">
              BASED IN UKRAINE • WORLDWIDE ONLINE
            </div>

            {/* Right: Copyright */}
            <div className="text-white/40">
              © 2026 Artem Sokolovsky. All rights reserved.
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
