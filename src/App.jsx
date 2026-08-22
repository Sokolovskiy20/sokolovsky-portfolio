import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  // 3-language state: 'ru' | 'en' | 'de'
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('as_portfolio_lang') || 'ru';
  });
  
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Sync language with localStorage & document attribute
  useEffect(() => {
    localStorage.setItem('as_portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className="relative min-h-screen bg-[#070707] text-[#ECECEC] selection:bg-[#E2D4B7] selection:text-[#181818]">
      
      {/* Luxury magnetic custom cursor */}
      <CustomCursor />

      {/* Floating Island Navigation Header */}
      <Header 
        lang={lang} 
        setLang={setLang} 
      />

      {/* Unified Single-Page Experience */}
      <main>
        <HomePage 
          lang={lang} 
          onSelectProject={(id) => setSelectedProjectId(id)}
        />
      </main>

      {/* Cinematic Modal for deep-dive case inspection if needed */}
      {selectedProjectId && (
        <ProjectModal 
          projectId={selectedProjectId}
          onClose={() => setSelectedProjectId(null)}
          lang={lang}
        />
      )}

    </div>
  );
}
