import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, 
  Check, 
  PenTool, 
  Bot
} from "lucide-react";
import ThreeDObject from "../components/ThreeDObject";
import CinematicProjectRow from "../components/CinematicProjectRow";
import { 
  FigmaIcon, 
  FramerIcon, 
  CursorIcon, 
  AntigravityIcon
} from "../components/TechIcons";

export default function HomePage({ lang = "ua", onSelectProject }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTg, setCopiedTg] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("sokolovskiy202002@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyTg = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("@sokolovskiy202002");
    setCopiedTg(true);
    setTimeout(() => setCopiedTg(false), 2500);
  };

  const authorName = lang === "ua" ? "АРТЕМ СОКОЛОВСЬКИЙ" : "ARTEM SOKOLOVSKY";
  const homeTag = lang === "ua" ? "ГОЛОВНА" : "HOME";
  const locationText = lang === "ua" 
    ? "Україна • Доступний онлайн" 
    : lang === "de" 
      ? "Ukraine • Weltweit Online" 
      : "Ukraine • Available Worldwide";

  const specializationText = lang === "ua"
    ? "AI Дизайн-інженер"
    : lang === "de"
      ? "AI Design Engineer"
      : "AI Design Engineer";

  const activeBadgeText = lang === "ua" ? "АКТИВНИЙ" : lang === "de" ? "AKTIV" : "ACTIVE";

  // Section 2: Premium UI/UX & Frontend Development
  const processTag = lang === "ua" ? "ПРОЦЕС" : lang === "de" ? "PROZESS" : "PROCESS";
  const methodTitle = lang === "ua"
    ? "Premium UI/UX & Frontend Development"
    : lang === "de"
      ? "Premium UI/UX & Frontend Development"
      : "Premium UI/UX & Frontend Development";

  const methodText = lang === "ua"
    ? "Я веду проєкт від першої ідеї до фінального запуску. Спочатку створюю вивірену візуальну естетику та інтерфейс у Figma, а потім повністю беру на себе frontend-розробку. Трансформую статичні макети у живі інтерактивні сайти з чистим кодом і 60 FPS анімаціями. Ви отримуєте не просто красивий дизайн, а повністю готовий до роботи цифровий продукт преміум-класу."
    : lang === "de"
      ? "Ich begleite jedes Projekt von der ersten Idee bis zum finalen Launch. Zuerst entwickle ich eine präzise visuelle Ästhetik und das Interface in Figma und übernehme anschließend die Frontend-Entwicklung. Ich transformiere statische Entwürfe in lebendige, interaktive Websites mit sauberem Code und fließenden 60-FPS-Animationen. Sie erhalten ein voll funktionsfähiges digitales Premium-Produkt."
      : "I lead each project from initial vision to final launch. First, I shape a bespoke visual aesthetic and interface in Figma, then take complete ownership of frontend development. I turn static layouts into live, interactive web experiences with clean code and fluid 60 FPS motion. You receive a fully deployed, high-performance digital product.";

  const processHighlights = lang === "ua" ? [
    {
      num: "01",
      period: "2025 — 2026",
      title: "Genesis & Deep Immersion",
      desc: "Початок шляху в Design Engineering. Півтора року інтенсивного практичного дослідження, самодисципліни та індивідуального професійного наставництва, що виховали високу культуру коду, оптичну точність і впевненість у ремеслі."
    },
    {
      num: "02",
      period: "Innovation",
      title: "Analysis & Skill Integration",
      desc: "Постійний моніторинг передових технологій та безшовне впровадження сучасних інструментів (AI-агенти, інтерактивні рушії, сучасний стек) безпосередньо у робочий процес створення живих продуктів."
    },
    {
      num: "03",
      period: "Practice",
      title: "Design Experience & 3 Flagship Projects",
      desc: "Здобув ґрунтовний практичний досвід у design engineering, успішно спроєктувавши та запустивши з нуля три флагманські цифрові продукти."
    }
  ] : lang === "de" ? [
    {
      num: "01",
      period: "2025 — 2026",
      title: "Genesis & Deep Immersion",
      desc: "Einstieg in das Design-Engineering. Anderthalb Jahre intensive Praxis, Selbstdisziplin und individuelles professionelles Mentoring, die hohe Code-Kultur, optische Präzision und Souveränität schufen."
    },
    {
      num: "02",
      period: "Innovation",
      title: "Analysis & Skill Integration",
      desc: "Kontinuierliches Erforschen neuer Technologien und nahtlose Implementierung moderner Tools (KI-Agenten, Interaktions-Engines, moderne Stacks) in den Entwicklungsprozess."
    },
    {
      num: "03",
      period: "Practice",
      title: "Design Experience & 3 Flagship Projects",
      desc: "Fundierte praktische Erfahrung im Design-Engineering durch die Konzeption und Realisierung von drei vollwertigen digitalen Projekten von Grund auf."
    }
  ] : [
    {
      num: "01",
      period: "2025 — 2026",
      title: "Genesis & Deep Immersion",
      desc: "Initiation into Design Engineering. Eighteen months of intensive practical research, self-discipline, and individual professional mentorship, cultivating code culture, optical precision, and confidence in the craft."
    },
    {
      num: "02",
      period: "Innovation",
      title: "Analysis & Skill Integration",
      desc: "Continuous monitoring of next-gen technologies and seamless adoption of modern tools (AI agents, interactive engines, modern stack) directly into the live product workflow."
    },
    {
      num: "03",
      period: "Practice",
      title: "Design Experience & 3 Flagship Projects",
      desc: "Gained hands-on expertise in design engineering, successfully designing and deploying three premier digital products from scratch."
    }
  ];

  const methodBadge = lang === "ua"
    ? "Повний цикл · Від концепту до продакшену · 60+ FPS"
    : lang === "de"
      ? "Full-Cycle · Von Design bis Production · 60+ FPS"
      : "Full-Cycle · Design to Production · 60+ FPS";

  // 2 Stack Categories (ONLY 4 requested tools: Figma, Framer, Google Antigravity, Cursor AI)
  const stackGroups = lang === "ua" ? [
    {
      num: "01",
      category: "Design & Prototyping",
      icon: PenTool,
      tools: [
        {
          name: "Figma",
          tag: "UI/UX & Системи",
          icon: FigmaIcon,
          line1: "Дизайн UI/UX-архітектури та систем.",
          line2: "Опрацювання візуальної естетики та сіток."
        },
        {
          name: "Framer",
          tag: "Інтерактив та Рух",
          icon: FramerIcon,
          line1: "Розробка інтерактивних прототипів.",
          line2: "Тестування фізики та мікроанімацій."
        }
      ]
    },
    {
      num: "02",
      category: "AI & Engineering Systems",
      icon: Bot,
      tools: [
        {
          name: "Google Antigravity",
          tag: "Агентна Інженерія",
          icon: AntigravityIcon,
          line1: "Автономне агентне проєктування коду.",
          line2: "Глибокий аналіз архітектури інтерфейсу."
        },
        {
          name: "Cursor AI",
          tag: "Інтелектуальна IDE",
          icon: CursorIcon,
          line1: "Інтелектуальне середовище розробки.",
          line2: "Прискорення створення чистого коду."
        }
      ]
    }
  ] : lang === "de" ? [
    {
      num: "01",
      category: "Design & Prototyping",
      icon: PenTool,
      tools: [
        {
          name: "Figma",
          tag: "UI/UX & Systeme",
          icon: FigmaIcon,
          line1: "Design von UI/UX-Architekturen und Systemen.",
          line2: "Perfektionierung visueller Ästhetik und Raster."
        },
        {
          name: "Framer",
          tag: "Interaktiv & Motion",
          icon: FramerIcon,
          line1: "Entwicklung interaktiver Design-Prototypen.",
          line2: "Validierung fließender Animationen in Echtzeit."
        }
      ]
    },
    {
      num: "02",
      category: "AI & Engineering Systems",
      icon: Bot,
      tools: [
        {
          name: "Google Antigravity",
          tag: "Agentic Engineering",
          icon: AntigravityIcon,
          line1: "Agentenbasierte autonome Code-Entwicklung.",
          line2: "Tiefe Problemanalyse und Interface-Architektur."
        },
        {
          name: "Cursor AI",
          tag: "Intelligente IDE",
          icon: CursorIcon,
          line1: "Intelligente nächste Entwicklungs-Umgebung.",
          line2: "Beschleunigung sauberer Frontend-Lieferung."
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
          line1: "UI/UX architecture and bespoke design systems.",
          line2: "Refining visual aesthetics and Swiss grids."
        },
        {
          name: "Framer",
          tag: "Interactive & Motion",
          icon: FramerIcon,
          line1: "Interactive prototyping and user interfaces.",
          line2: "Testing spring physics and micro-animations."
        }
      ]
    },
    {
      num: "02",
      category: "AI & Engineering Systems",
      icon: Bot,
      tools: [
        {
          name: "Google Antigravity",
          tag: "Agentic Engineering",
          icon: AntigravityIcon,
          line1: "Autonomous agentic engineering and logic.",
          line2: "Deep interface reasoning and precision."
        },
        {
          name: "Cursor AI",
          tag: "Intelligent IDE",
          icon: CursorIcon,
          line1: "Next-gen intelligent coding workspace.",
          line2: "Accelerating clean frontend delivery."
        }
      ]
    }
  ];

  // Section 3: Featured Cases
  const casesTag = lang === "ua" ? "КЕЙСИ" : "CASES";
  const casesHeading = lang === "ua" ? "КЕЙСИ" : lang === "de" ? "CASES" : "CASES";
  const cinematicViewLabel = lang === "ua"
    ? "ПОВНОЕКРАННИЙ КІНЕМАТОГРАФІЧНИЙ ПЕРЕГЛЯД"
    : lang === "de"
      ? "CINEMATISCHE VOLLBILD-ANSICHT"
      : "FULL-BLEED CINEMATIC VIEW";

  const projectsSubheading = lang === "ua"
    ? "Вибрані проєкти з акцентом на чисту візуальну естетику, точність типографіки та передові технології."
    : lang === "de"
      ? "Ausgewählte Arbeiten mit Fokus auf Ästhetik, typografische Präzision und moderne Technologien."
      : "Selected digital products crafted with minimalist elegance, typography discipline, and modern engineering.";

  const viewCaseText = lang === "ua" ? "Дивитися проєкт" : lang === "de" ? "Projekt ansehen" : "Explore Case";

  const projectDescriptions = {
    aura: lang === "ua"
      ? "Екосистема розумного дому нового покоління для резиденцій та пентхаусів із глибокою інтеграцією Apple Home & Matter."
      : lang === "de"
        ? "Smart-Living-Plattform der nächsten Generation für Luxusanwesen mit nativer Apple Home- und Matter-Integration."
        : "Next-gen smart home ecosystem for luxury estates and sky penthouses with seamless Apple Home & Matter synergy.",
    amazonia: lang === "ua"
      ? "Імерсивний цифровий досвід для приватної еко-експедиції в незаймані джунглі Амазонки для 8 гостей."
      : lang === "de"
        ? "Exklusive digitale Reise für eine private Öko-Expedition in den unberührten Amazonas für nur 8 Gäste."
        : "An ultra-exclusive digital journey for a private sanctuary in the untouched Amazonian rainforest for 8 guests.",
    symmetry: lang === "ua"
      ? "Преміальна цифрова присутність клініки естетичної медицини та швейцарської стоматології."
      : lang === "de"
        ? "Digitale Präsenz für eine exklusive Klinik für ästhetische Medizin und Schweizer Zahnheilkunde."
        : "Avant-garde digital presence for an elite aesthetic dentistry and facial harmony clinic adhering to Swiss standards."
  };

  const projectSubtitles = {
    amazonia: lang === "ua" ? "ЕКО-РЕЗИДЕНЦІЯ // 2025" : lang === "de" ? "ÖKO-REFUGIUM // 2025" : "ECO-SANCTUARY // 2025",
    symmetry: lang === "ua" ? "ЕСТЕТИЧНА СТОМАТОЛОГІЯ // 2026" : lang === "de" ? "ÄSTHETISCHE ZAHNHEILKUNDE // 2026" : "AESTHETIC DENTISTRY // 2026",
    aura: lang === "ua" ? "РОЗУМНИЙ ДІМ // 2026" : lang === "de" ? "SMART HOME // 2026" : "SMART LIVING // 2026"
  };

  const projectCategoryBadges = {
    amazonia: lang === "ua" ? "ЕКО-ЕКСПЕДИЦІЯ" : lang === "de" ? "ÖKO-EXPEDITION" : "ECO-EXPEDITION",
    symmetry: lang === "ua" ? "ЕСТЕТИЧНА МЕДИЦИНА" : lang === "de" ? "ÄSTHETISCHE MEDIZIN" : "HAUTE MEDICINE",
    aura: lang === "ua" ? "РОЗУМНИЙ ДІМ • AI" : lang === "de" ? "SMART LIVING • KI" : "SMART LIVING • AI"
  };

  const projectTags = {
    amazonia: lang === "ua" 
      ? ["Едіторіал дизайн", "Кастомна анімація", "Відеопотік", "Сенсорний UI"]
      : lang === "de"
        ? ["Editorial Design", "Custom Motion", "Video-Stream", "Sensory UI"]
        : ["Editorial Design", "Custom Motion", "Video Stream", "Sensory UI"],
    symmetry: lang === "ua" 
      ? ["Інтерактивні слайдери", "Швейцарська сітка", "Естетична медицина", "Tailwind CSS"]
      : lang === "de"
        ? ["Interaktive Slider", "Schweizer Raster", "Ästhetische Medizin", "Tailwind CSS"]
        : ["Interactive Sliders", "Swiss Grid", "Haute Medicine", "Tailwind CSS"],
    aura: lang === "ua" 
      ? ["Figma UI/UX", "React 19", "Matter IoT", "Apple Екосистема"]
      : lang === "de"
        ? ["Figma UI/UX", "React 19", "Matter IoT", "Apple Ökosystem"]
        : ["Figma UI/UX", "React 19", "Matter IoT", "Apple Ecosystem"]
  };

  const projectUrls = {
    amazonia: "https://maira-amazonia.vercel.app/",
    symmetry: "https://symmetry-clinic.vercel.app/",
    aura: "https://aura-smart.vercel.app/"
  };

  // Section 4: Contact & Finale
  const contactFinaleTag = lang === "ua" ? "КОНТАКТИ" : lang === "de" ? "KONTAKT" : "CONTACT";
  const footerLocation = lang === "ua" 
    ? "УКРАЇНА • ОНЛАЙН ПО ВСЬОМУ СВІТУ" 
    : lang === "de" 
      ? "UKRAINE • WELTWEIT ONLINE" 
      : "UKRAINE • WORLDWIDE ONLINE";
  const footerCopyright = lang === "ua" ? "© 2026 Артем Соколовський" : "© 2026 Artem Sokolovsky";

  return (
    <div className="relative w-full min-h-screen bg-[#070707] text-[#ECECEC] font-sans selection:bg-[#E2D4B7] selection:text-[#070707] overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* SCREEN 1: HERO SCREEN (01 // ГОЛОВНА / HOME)                             */}
      {/* ========================================================================= */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-14 overflow-hidden text-left">
        
        {/* 3D Crystalline Jasper Background Atmosphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center"
        >
          {/* Ambient Studio Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] md:w-[1000px] h-[320px] sm:h-[550px] md:h-[800px] bg-gradient-to-b from-[#E2D4B7]/[0.18] via-white/[0.04] to-transparent rounded-full blur-3xl mix-blend-screen" />

          {/* Real-Time Interactive 3D WebGL Gem */}
          <div className="w-full h-full max-w-[1400px] max-h-[900px] flex items-center justify-center">
            <ThreeDObject className="w-full h-full" />
          </div>

          {/* Luxury Film Grain */}
          <div className="absolute inset-0 bg-grain opacity-6 pointer-events-none" />

          {/* Obsidian Edge Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 via-transparent to-[#070707]/80 pointer-events-none" />
        </motion.div>

        {/* Top Tag Pill for Screen 1 (Left-Aligned) */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-12 md:px-16 pt-2 sm:pt-4 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm shadow-sm text-left">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/80 font-medium">
              {homeTag}
            </span>
          </div>
        </motion.div>

        {/* Center Running Name Track */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 35,
            mass: 1.1,
            delay: 0.3
          }}
          className="relative z-10 w-full my-auto py-6 sm:py-14 border-y border-white/[0.08] bg-black/25 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] transform-gpu text-left"
        >
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-60 bg-gradient-to-r from-[#070707] via-[#070707]/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-60 bg-gradient-to-l from-[#070707] via-[#070707]/90 to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center whitespace-nowrap text-left">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="flex items-center gap-6 sm:gap-14 md:gap-20 px-3 sm:px-8 text-left">
                <span className="font-sans text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[135px] font-medium tracking-[0.20em] sm:tracking-[0.26em] uppercase text-white hover:text-[#E2D4B7] transition-colors leading-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                  {authorName}
                </span>
                <span className="text-xl sm:text-4xl text-white/30 font-light">
                  —
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar Badges (Left-Aligned Ergonomic Cards) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-12 md:px-16 pt-4 sm:pt-10 text-left"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-3 sm:gap-6 text-left">
            
            {/* Bottom Left: Location Badge */}
            <div className="flex items-center justify-between sm:justify-start gap-2 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl sm:rounded-full border border-white/[0.08] shadow-md text-left">
              <div className="flex items-center gap-2.5 text-left">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2D4B7] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]"></span>
                </span>
                <span className="font-sans text-xs sm:text-sm tracking-[0.16em] uppercase text-white/90 font-medium">
                  {locationText}
                </span>
              </div>
              <span className="text-[10px] font-sans text-[#E2D4B7] uppercase font-semibold sm:hidden tracking-wider">
                {activeBadgeText}
              </span>
            </div>

            {/* Bottom Right: Specialization Badge (Left-Aligned on Mobile) */}
            <div className="flex items-center justify-start bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl sm:rounded-full border border-white/[0.08] shadow-md text-left">
              <span className="font-sans text-xs sm:text-sm tracking-[0.14em] uppercase text-white/90 font-medium text-left">
                {specializationText}
              </span>
            </div>

          </div>
        </motion.div>

      </section>

      {/* ========================================================================= */}
      {/* SCREEN 2: PROCESS & STACK (02 // ПРОЦЕС / PROCESS / PROZESS)             */}
      {/* ========================================================================= */}
      <section id="process" className="relative w-full pt-14 sm:pt-28 pb-16 sm:pb-32 px-5 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden text-left">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-0 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#E2D4B7]/[0.02] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto text-left">
          
          {/* Top Section Tag */}
          <div className="mb-6 sm:mb-12 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-medium">
                {processTag}
              </span>
            </div>
          </div>

          {/* 2-Column Grid (Left Aligned) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-20 items-start text-left">
            
            {/* Left Column: Heading, Main Narrative, Value Proposition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30,
                mass: 1.0
              }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between space-y-6 sm:space-y-8 transform-gpu text-left"
            >
              <div className="space-y-6 text-left">
                <h2 className="font-sans text-2xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-[48px] xl:text-[54px] font-light leading-[1.2] tracking-[-0.02em] text-white text-left">
                  {methodTitle}
                </h2>

                <p className="font-sans text-sm xs:text-base sm:text-lg md:text-[19px] text-white/80 font-light leading-[1.7] tracking-[-0.01em] [text-wrap:pretty] text-left">
                  {methodText}
                </p>

                {/* Process & Trajectory Highlights (Haute Architecture Bento Layout) */}
                <div className="space-y-3.5 pt-2 text-left">
                  {processHighlights.map((item, hIdx) => (
                    <div 
                      key={hIdx} 
                      className="p-5 sm:p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.045] border border-white/[0.07] hover:border-[#E2D4B7]/30 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.25)] group relative overflow-hidden text-left"
                    >
                      {/* Subtle Ambient Hover Glow */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-[#E2D4B7]/[0.02] group-hover:bg-[#E2D4B7]/[0.06] rounded-full blur-2xl pointer-events-none transition-colors duration-300" />

                      <div className="space-y-2 relative z-10 text-left">
                        {/* Header: Title & Period Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-left">
                          <h3 className="font-sans text-base sm:text-lg font-medium text-white tracking-tight text-left group-hover:text-[#FAF6F0] transition-colors">
                            {item.title}
                          </h3>

                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2D4B7]/[0.08] group-hover:bg-[#E2D4B7]/[0.16] border border-[#E2D4B7]/20 text-[#E2D4B7] font-mono text-xs tracking-wider font-semibold transition-colors shrink-0 self-start sm:self-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
                            <span>· {item.period}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-sm xs:text-base text-white/70 font-light leading-[1.7] text-left [text-wrap:pretty]">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Badge (Left-Aligned) */}
              <div className="pt-1 text-left">
                <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl sm:rounded-full bg-white/[0.03] border border-white/[0.08] shadow-md text-left">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E2D4B7] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#E2D4B7] shadow-[0_0_8px_#E2D4B7]"></span>
                  </span>
                  <span className="font-sans text-xs sm:text-sm text-white/80 tracking-wider uppercase font-medium text-left">
                    {methodBadge}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: 2 Staggered Bento Cards (Figma, Framer, Google Antigravity, Cursor AI) */}
            <div className="lg:col-span-6 xl:col-span-6 space-y-4 sm:space-y-5 lg:pl-6 xl:pl-10 lg:border-l border-white/[0.06] text-left">
              
              {stackGroups.map((group, idx) => {
                const CategoryIcon = group.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 30,
                      delay: idx * 0.08,
                      mass: 1.0
                    }}
                    className="group p-5 sm:p-7 rounded-2xl bg-white/[0.02] hover:bg-white/[0.035] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 shadow-lg hover:shadow-2xl transform-gpu text-left"
                  >
                    {/* Category Top Header */}
                    <div className="flex items-center gap-3 pb-3.5 sm:pb-4 mb-4 sm:mb-5 border-b border-white/[0.06] text-left">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#E2D4B7] group-hover:scale-105 transition-transform shrink-0">
                        <CategoryIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      </div>
                      <h3 className="font-sans text-xs sm:text-[15px] tracking-[0.16em] sm:tracking-[0.18em] uppercase text-white font-semibold text-left">
                        {group.category}
                      </h3>
                    </div>

                    {/* Tools List */}
                    <div className="space-y-4 text-left">
                      {group.tools.map((tool, tIdx) => {
                        const ToolIcon = tool.icon;
                        const borderClass = tIdx > 0 ? "pt-3.5 sm:pt-4 border-t border-white/[0.04]" : "";
                        return (
                          <div 
                            key={tIdx} 
                            className={"group/tool text-left " + borderClass}
                          >
                            {/* Tool Header Row */}
                            <div className="flex items-center justify-between gap-2 mb-1.5 text-left">
                              <div className="flex items-center gap-2.5 text-left">
                                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover/tool:border-[#E2D4B7]/40 group-hover/tool:bg-white/[0.07] transition-all shadow-sm">
                                  <ToolIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </div>
                                <span className="font-sans text-xs sm:text-[15px] text-white font-semibold tracking-wide text-left">
                                  {tool.name}
                                </span>
                              </div>

                              <span className="px-2 py-0.5 rounded-full text-[10px] font-sans tracking-wider uppercase bg-white/[0.03] border border-white/[0.06] text-white/60 font-medium">
                                {tool.tag}
                              </span>
                            </div>

                            {/* 2-Line Tool Description */}
                            <div className="font-sans text-xs sm:text-[14px] text-white/70 font-light leading-[1.6] pl-[34px] sm:pl-[38px] space-y-0.5 text-left [text-wrap:pretty]">
                              <p className="text-left text-white/80">{tool.line1}</p>
                              <p className="text-left text-white/55">{tool.line2}</p>
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
      {/* SCREEN 3: CASES (03 // КЕЙСИ / CASES)                                     */}
      {/* ========================================================================= */}
      <section id="projects" className="relative w-full pt-12 sm:pt-16 pb-20 sm:pb-36 px-5 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden text-left">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/4 right-1/4 w-[350px] sm:w-[800px] h-[350px] sm:h-[800px] bg-gradient-to-b from-[#E2D4B7]/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] sm:w-[700px] h-[300px] sm:h-[700px] bg-gradient-to-t from-white/[0.015] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto text-left">
          
          {/* Section Header with "Кейси / Cases" Title (Left-Aligned) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 30
            }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-24 text-left"
          >
            <div className="text-left">
              {/* Category Badge matching Nav */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm mb-4 sm:mb-6 text-left">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
                <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-medium">
                  {casesTag}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] text-white text-left">
                {casesHeading}
              </h3>
            </div>

            {/* Subtext (Left-Aligned) */}
            <div className="max-w-md lg:border-l border-white/[0.08] lg:pl-8 text-left">
              <span className="font-sans text-[11px] text-[#E2D4B7] uppercase tracking-[0.20em] block mb-1.5 font-semibold text-left">
                {cinematicViewLabel}
              </span>
              <p className="font-sans text-xs sm:text-base text-white/60 font-light leading-relaxed text-left">
                {projectsSubheading}
              </p>
            </div>
          </motion.div>

          {/* CINEMATIC ROWS: Top to Bottom Full-Width Panoramic Showcase */}
          <div className="space-y-6 sm:space-y-10 text-left">
            
            {/* ROW 1: MAIRA */}
            <CinematicProjectRow
              id="amazonia"
              index={0}
              number="01"
              title="MAIRA"
              subtitle={projectSubtitles.amazonia}
              categoryBadge={projectCategoryBadges.amazonia}
              year="2025"
              description={projectDescriptions.amazonia}
              imageSrc="/assets/amazonia/maira_cinematic_hero.jpg"
              tags={projectTags.amazonia}
              viewText={viewCaseText}
              liveUrl={projectUrls.amazonia}
              reversed={false}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

            {/* ROW 2: SYMMETRY Dental */}
            <CinematicProjectRow
              id="symmetry"
              index={1}
              number="02"
              title="SYMMETRY Dental"
              subtitle={projectSubtitles.symmetry}
              categoryBadge={projectCategoryBadges.symmetry}
              year="2026"
              description={projectDescriptions.symmetry}
              imageSrc="/assets/symmetry/symmetry_cinematic_hero.jpg"
              tags={projectTags.symmetry}
              viewText={viewCaseText}
              liveUrl={projectUrls.symmetry}
              reversed={true}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

            {/* ROW 3: AURA */}
            <CinematicProjectRow
              id="aura"
              index={2}
              number="03"
              title="AURA"
              subtitle={projectSubtitles.aura}
              categoryBadge={projectCategoryBadges.aura}
              year="2026"
              description={projectDescriptions.aura}
              imageSrc="/assets/aura/user_hero_screen.png"
              tags={projectTags.aura}
              viewText={viewCaseText}
              liveUrl={projectUrls.aura}
              reversed={false}
              onClick={(id) => onSelectProject && onSelectProject(id)}
            />

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SCREEN 4: CONTACT (04 // КОНТАКТИ / CONTACT / KONTAKT)                    */}
      {/* ========================================================================= */}
      <section id="contact" className="relative w-full pt-16 sm:pt-48 pb-10 sm:pb-20 px-5 sm:px-12 md:px-16 bg-[#070707] border-t border-white/[0.06] overflow-hidden flex flex-col justify-between text-left">
        
        {/* Ambient Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[1200px] h-[350px] sm:h-[700px] bg-gradient-to-t from-[#E2D4B7]/[0.03] via-white/[0.01] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1800px] mx-auto my-auto text-left">
          
          {/* Top Tag Pill (Left-Aligned) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-20 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7] shadow-[0_0_6px_#E2D4B7]" />
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-white/70 font-medium">
                {contactFinaleTag}
              </span>
            </div>
          </motion.div>

          {/* OVERSIZED TYPOGRAPHIC LINKS CONTAINER */}
          <div className="space-y-6 sm:space-y-14 text-left">
            
            {/* ROW 1: OVERSIZED EMAIL LINK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30
              }}
              className="relative group transform-gpu text-left"
            >
              {/* Studio Glow on Hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E2D4B7]/[0.08] via-white/[0.04] to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <a
                href="mailto:sokolovskiy202002@gmail.com"
                className="relative flex flex-col xl:flex-row xl:items-baseline justify-between gap-3 sm:gap-4 py-4 sm:py-6 border-b border-white/[0.10] group-hover:border-[#E2D4B7]/60 transition-colors duration-500 cursor-pointer active:scale-[0.99] text-left block"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 min-w-0 text-left">
                  <span className="font-sans text-[11px] sm:text-sm text-[#E2D4B7] tracking-widest shrink-0 font-semibold uppercase text-left">
                    EMAIL
                  </span>

                  <h2 className="font-sans text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] font-normal tracking-[0.02em] sm:tracking-[0.04em] uppercase text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:1.5px_#E2D4B7] transition-all duration-500 leading-tight whitespace-nowrap text-left">
                    SOKOLOVSKIY202002@
                  </h2>
                </div>

                {/* Floating Action Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0 xl:self-center pt-1 sm:pt-0">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/[0.03] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.08] group-hover:border-[#E2D4B7] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 shrink-0">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </a>

            </motion.div>

            {/* ROW 2: OVERSIZED TELEGRAM LINK */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 30,
                delay: 0.08
              }}
              className="relative group transform-gpu text-left"
            >
              {/* Studio Glow on Hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#E2D4B7]/[0.08] via-white/[0.04] to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <a
                href="https://t.me/sokolovskiy202002"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col xl:flex-row xl:items-baseline justify-between gap-3 sm:gap-4 py-4 sm:py-6 border-b border-white/[0.10] group-hover:border-[#E2D4B7]/60 transition-colors duration-500 cursor-pointer active:scale-[0.99] text-left block"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 min-w-0 text-left">
                  <span className="font-sans text-[11px] sm:text-sm text-[#E2D4B7] tracking-widest shrink-0 font-semibold uppercase text-left">
                    TELEGRAM
                  </span>

                  <h2 className="font-sans text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] font-normal tracking-[0.02em] sm:tracking-[0.04em] uppercase text-white group-hover:text-transparent group-hover:[-webkit-text-stroke:1.5px_#E2D4B7] transition-all duration-500 leading-tight whitespace-nowrap text-left">
                    @SOKOLOVSKIY202002
                  </h2>
                </div>

                {/* Floating Action Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-3 shrink-0 xl:self-center pt-1 sm:pt-0">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/[0.03] group-hover:bg-[#E2D4B7] group-hover:text-black border border-white/[0.08] group-hover:border-[#E2D4B7] flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 shrink-0">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

              </a>

            </motion.div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* FOOTER: SINGLE-LINE MINIMALIST BOTTOM BAR (Left-Aligned on Mobile)       */}
        {/* ========================================================================= */}
        <div className="relative z-10 w-full max-w-[1800px] mx-auto mt-16 sm:mt-40 pt-6 sm:pt-10 border-t border-white/[0.08] text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs font-sans text-white/50 text-left">
            
            {/* Left: Author Identity */}
            <div className="flex items-center gap-2 text-left">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E2D4B7]" />
              <span className="tracking-wider uppercase text-white/80 font-medium">
                {authorName}
              </span>
            </div>

            {/* Center: Global Status */}
            <div className="tracking-wider uppercase text-white/40 font-normal">
              {footerLocation}
            </div>

            {/* Right: Copyright */}
            <div className="text-white/40 font-normal">
              {footerCopyright}
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
