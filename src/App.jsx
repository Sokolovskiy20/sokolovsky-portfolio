import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';

const VALID_LANGS = ['ua', 'en', 'de'];

function getLangFromLocation() {
  if (typeof window === 'undefined') return 'ua';
  
  // 1. Check pathname: /ua, /en, /de (or /uk, /ru as aliases)
  const pathSegment = window.location.pathname.replace(/^\/+/, '').split('/')[0]?.toLowerCase();
  if (VALID_LANGS.includes(pathSegment)) return pathSegment;
  if (pathSegment === 'uk' || pathSegment === 'ru') return 'ua';

  // 2. Check search params: ?lang=ua
  const params = new URLSearchParams(window.location.search);
  const langParam = params.get('lang')?.toLowerCase();
  if (VALID_LANGS.includes(langParam)) return langParam;
  if (langParam === 'uk' || langParam === 'ru') return 'ua';

  // 3. Check hash: #/ua
  const hash = window.location.hash.replace(/^#\/?/, '').split('/')[0]?.toLowerCase();
  if (VALID_LANGS.includes(hash)) return hash;

  // 4. Check localStorage
  const saved = localStorage.getItem('as_portfolio_lang')?.toLowerCase();
  if (VALID_LANGS.includes(saved)) return saved;

  return 'ua';
}

function getProjectFromLocation() {
  if (typeof window === 'undefined') return null;

  // 1. Search params: ?case=maira, ?case=amazonia, ?project=maira
  const params = new URLSearchParams(window.location.search);
  const caseParam = (params.get('case') || params.get('project'))?.toLowerCase();
  if (caseParam) {
    if (caseParam === 'maira' || caseParam === 'amazonia') return 'amazonia';
    if (caseParam === 'symmetry') return 'symmetry';
    if (caseParam === 'aura') return 'aura';
  }

  // 2. Hash: #maira, #case-maira, #amazonia
  const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (rawHash) {
    const cleanHash = rawHash.replace(/^case[-/]/, '');
    if (cleanHash === 'maira' || cleanHash === 'amazonia') return 'amazonia';
    if (cleanHash === 'symmetry') return 'symmetry';
    if (cleanHash === 'aura') return 'aura';
  }

  // 3. Path segments: /case/maira or /ua/case/maira
  const segments = window.location.pathname.replace(/^\/+/, '').split('/').map(s => s.toLowerCase());
  const caseIdx = segments.indexOf('case');
  if (caseIdx !== -1 && segments[caseIdx + 1]) {
    const target = segments[caseIdx + 1];
    if (target === 'maira' || target === 'amazonia') return 'amazonia';
    if (target === 'symmetry') return 'symmetry';
    if (target === 'aura') return 'aura';
  }

  return null;
}

export default function App() {
  const [lang, setLangState] = useState(getLangFromLocation);
  const [selectedProjectId, setSelectedProjectId] = useState(getProjectFromLocation);

  // Function to switch language and update URL
  const changeLanguage = useCallback((newLang, replace = false) => {
    if (!VALID_LANGS.includes(newLang)) return;
    setLangState(newLang);
    localStorage.setItem('as_portfolio_lang', newLang);
    document.documentElement.lang = newLang;

    // Update URL path without full reload
    const currentPath = window.location.pathname.replace(/^\/+/, '').split('/');
    const firstSegment = currentPath[0]?.toLowerCase();
    
    let targetPath = '';
    if (VALID_LANGS.includes(firstSegment) || firstSegment === 'uk' || firstSegment === 'ru') {
      currentPath[0] = newLang;
      targetPath = '/' + currentPath.join('/');
    } else {
      targetPath = '/' + newLang + (window.location.pathname === '/' ? '' : window.location.pathname);
    }

    const newUrl = targetPath + window.location.search + window.location.hash;
    if (window.location.pathname + window.location.search + window.location.hash !== newUrl) {
      if (replace) {
        window.history.replaceState({ lang: newLang }, '', newUrl);
      } else {
        window.history.pushState({ lang: newLang }, '', newUrl);
      }
    }
  }, []);

  // Handle open project and sync URL
  const handleSelectProject = useCallback((id) => {
    setSelectedProjectId(id);
    const caseSlug = id === 'amazonia' ? 'maira' : id;
    const url = new URL(window.location.href);
    url.searchParams.set('case', caseSlug);
    window.history.pushState({ case: caseSlug }, '', url.toString());
  }, []);

  // Handle close project and sync URL
  const handleCloseProject = useCallback(() => {
    setSelectedProjectId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('case');
    url.searchParams.delete('project');
    if (window.location.hash.toLowerCase().includes('maira') || window.location.hash.toLowerCase().includes('amazonia')) {
      url.hash = '';
    }
    window.history.pushState({}, '', url.toString());
  }, []);

  // Sync initial URL and popstate
  useEffect(() => {
    const currentLang = getLangFromLocation();
    changeLanguage(currentLang, true);

    const initialProject = getProjectFromLocation();
    if (initialProject) {
      setSelectedProjectId(initialProject);
    }

    const handleStateChange = () => {
      const popLang = getLangFromLocation();
      setLangState(popLang);
      localStorage.setItem('as_portfolio_lang', popLang);
      document.documentElement.lang = popLang;

      const proj = getProjectFromLocation();
      setSelectedProjectId(proj);
    };

    window.addEventListener('popstate', handleStateChange);
    window.addEventListener('hashchange', handleStateChange);
    return () => {
      window.removeEventListener('popstate', handleStateChange);
      window.removeEventListener('hashchange', handleStateChange);
    };
  }, [changeLanguage]);

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#ECECEC] selection:bg-[#E2D4B7] selection:text-[#181818]">
      
      {/* Luxury magnetic custom cursor */}
      <CustomCursor />

      {/* Floating Island Navigation Header */}
      <Header 
        lang={lang} 
        setLang={changeLanguage} 
      />

      {/* Unified Single-Page Experience */}
      <main>
        <HomePage 
          lang={lang} 
          onSelectProject={handleSelectProject}
        />
      </main>

      {/* Cinematic Full-Screen Page for deep-dive case inspection */}
      {selectedProjectId && (
        <ProjectModal 
          projectId={selectedProjectId}
          onClose={handleCloseProject}
          onSelectProject={handleSelectProject}
          lang={lang}
        />
      )}

    </div>
  );
}
