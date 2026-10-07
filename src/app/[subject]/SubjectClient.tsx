'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTTS } from '@/hooks/useTTS';
import Mermaid from '@/components/Mermaid';
import './retro.css';

const ClickableText = ({ text, itemId, isActive, charIndex, speak }: any) => {
  const tokens = text.match(/\S+|\s+/g) || [];
  let runningIndex = 0;
  
  return (
    <>
      {tokens.map((token: string, i: number) => {
        const tokenStart = runningIndex;
        runningIndex += token.length;
        
        const isWhitespace = /^\s+$/.test(token);
        
        if (isWhitespace) {
          return <span key={i}>{token}</span>;
        }

        let isHighlighted = false;
        if (isActive) {
          isHighlighted = charIndex >= tokenStart && charIndex < tokenStart + token.length;
        }

        return (
          <span 
            key={i} 
            id={isHighlighted ? "active-tts-word" : undefined}
            onClick={() => speak(text, itemId, tokenStart)}
            style={{ 
              cursor: 'pointer',
              backgroundColor: isHighlighted ? 'var(--velvet-purple)' : 'transparent',
              color: isHighlighted ? 'white' : 'inherit',
              padding: isHighlighted ? '0 2px' : '0',
              borderRadius: '2px'
            }}
            title="Click to play from here"
          >
            {token}
          </span>
        );
      })}
    </>
  );
};

export default function SubjectClient({ subjectMeta, studyData }: { subjectMeta: any, studyData: any }) {
  const { speak, pause, resume, stop, isPlaying, isPaused, rate, setRate, currentId, charIndex } = useTTS();
  const [activeSection, setActiveSection] = useState(0);
  const [isRetroMode, setIsRetroMode] = useState(true);
  const [currentTime, setCurrentTime] = useState("");

  // Hydration-safe clock
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Smart Auto-Scroll to active word
  useEffect(() => {
    if (isPlaying && !isPaused) {
      const activeWord = document.getElementById('active-tts-word');
      if (activeWord) {
        const rect = activeWord.getBoundingClientRect();
        // Scroll if the word is out of the comfortable viewing area (top 15% or bottom 15% of screen)
        const isVisible = rect.top >= window.innerHeight * 0.15 && rect.bottom <= window.innerHeight * 0.85;
        if (!isVisible) {
          activeWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  }, [charIndex, isPlaying, isPaused]);

  const handlePlayToggle = (text: string, id: string) => {
    if (currentId === id) {
      if (isPaused) {
        resume();
      } else if (isPlaying) {
        pause();
      } else {
        speak(text, id);
      }
    } else {
      speak(text, id);
    }
  };

  if (isRetroMode) {
    return (
      <div className="retro-theme">
        <div className="desktop">
          <div className="window">
            <div className="titlebar">
              <span className="titlebar-icon">🌸</span>
              <span className="titlebar-text">{subjectMeta.id}.doc - WordPad</span>
              <div className="titlebar-controls">
                <button className="win-btn" onClick={() => setIsRetroMode(false)} aria-label="Minimize" title="Exit Retro Mode">_</button>
                <button className="win-btn" aria-label="Maximize">□</button>
                <Link href="/" onClick={stop} className="win-btn win-btn-close flex items-center justify-center text-white" aria-label="Close" style={{ textDecoration: 'none' }}>×</Link>
              </div>
            </div>

            <div className="menubar">
              {studyData.map((section: any, idx: number) => (
                <span 
                  key={idx} 
                  onClick={() => setActiveSection(idx)}
                  style={{
                    fontWeight: activeSection === idx ? 'bold' : 'normal',
                    textDecoration: activeSection === idx ? 'underline' : 'none'
                  }}
                >
                  {section.section.replace('SECTION ', 'Sec ')}
                </span>
              ))}
              <span 
                onClick={() => setIsRetroMode(false)} 
                style={{ marginLeft: 'auto', color: 'var(--velvet-purple)', fontWeight: 'bold' }}
                title="Switch back to Modern UI"
              >
                [Exit Retro]
              </span>
            </div>

            <div className="content-panel">
              {studyData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                  {subjectMeta.id === 'ad-designing' ? (
                    <>
                      <h2 style={{ color: 'var(--velvet-purple)' }}>No written exam.</h2>
                      <p>Viva only.</p>
                    </>
                  ) : (
                    <>
                      <h2 style={{ color: 'var(--velvet-purple)' }}>Notes pending.</h2>
                      <p>Study material will be uploaded soon.</p>
                    </>
                  )}
                </div>
              ) : (
                studyData[activeSection]?.items.map((item: any, idx: number) => {
                  const itemId = `item-${activeSection}-${idx}`;
                  const isActive = currentId === itemId;
                  
                  return (
                    <div key={idx} style={{ marginBottom: '2.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <h1 style={{ margin: 0, paddingRight: '1rem' }}>{idx + 1}. {item.q}</h1>
                        <button 
                          onClick={() => handlePlayToggle(item.a, itemId)}
                          style={{ 
                            flexShrink: 0,
                            padding: '3px 8px', 
                            fontFamily: 'Tahoma', 
                            fontSize: '11px', 
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            background: isActive && !isPaused ? 'var(--velvet-purple)' : 'var(--lilac)',
                            color: isActive && !isPaused ? 'white' : 'black',
                            borderTop: '2px solid var(--white)',
                            borderLeft: '2px solid var(--white)',
                            borderBottom: '2px solid var(--midnight-violet)',
                            borderRight: '2px solid var(--midnight-violet)',
                          }}
                        >
                          {isActive && !isPaused ? '⏸ Pause' : '▶ Play'}
                        </button>
                      </div>
                      
                      {item.diagram && <Mermaid chart={item.diagram} />}

                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.55' }}>
                        <ClickableText text={item.a} itemId={itemId} isActive={isActive} charIndex={charIndex} speak={speak} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="statusbar">
              <div className="statusbar-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isPlaying && !isPaused ? '🔊 Reading aloud...' : 'Ready'}
                {/* Embedded Speed Control */}
                <select 
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  style={{ 
                    fontSize: '10px', 
                    background: 'var(--white)', 
                    border: '1px solid var(--midnight-violet)',
                    marginLeft: '8px'
                  }}
                >
                  <option value="0.75">0.75x</option>
                  <option value="0.9">0.9x</option>
                  <option value="1">1.0x</option>
                  <option value="1.1">1.1x</option>
                  <option value="1.2">1.2x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                  <option value="2">2.0x</option>
                </select>
              </div>
              <span className="statusbar-panel">Sec {activeSection + 1}</span>
              <span className="statusbar-panel">{studyData[activeSection]?.items?.length || 0} Items</span>
            </div>
          </div>

          <div className="taskbar">
            <Link href="/" onClick={stop} className="start-btn" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap', gap: '4px', flexShrink: 0 }}>
              <img src="/windows-logo.png" alt="Start" style={{ width: '14px', height: '14px' }} />
              <span className="hidden sm:inline">Start</span>
            </Link>
            
            {/* Sticky Global Playback Controls */}
            {isPlaying && (
              <div style={{ display: 'flex', gap: '4px', marginLeft: '4px', flexShrink: 0 }}>
                <button 
                  onClick={isPaused ? resume : pause}
                  className="start-btn" 
                  style={{ background: 'var(--velvet-purple)', color: 'white', padding: '2px 8px', flexShrink: 0 }}
                  title={isPaused ? "Resume" : "Pause"}
                >
                  {isPaused ? '▶' : '⏸'}
                </button>
                <button 
                  onClick={stop}
                  className="start-btn" 
                  style={{ background: 'var(--amethyst-smoke)', color: 'white', padding: '2px 8px', flexShrink: 0 }}
                  title="Stop"
                >
                  ⏹
                </button>
              </div>
            )}
            
            <div className="taskbar-item" style={{ marginLeft: isPlaying ? '4px' : '0', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              🌸 {subjectMeta.id}.doc
            </div>
            
            <div 
              className="start-btn" 
              onClick={() => setIsRetroMode(false)} 
              style={{ cursor: 'pointer', background: 'var(--amethyst-smoke)', color: 'white', marginLeft: 'auto', flexShrink: 0, whiteSpace: 'nowrap', padding: '2px 8px' }}
            >
              <span className="hidden sm:inline">Switch to Modern</span>
              <span className="sm:hidden">Modern</span>
            </div>
            
            <div className="taskbar-clock hidden sm:flex" style={{ marginLeft: '4px', flexShrink: 0 }}>{currentTime}</div>
          </div>
        </div>
      </div>
    );
  }

  // Modern UI Default
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 font-sans selection:bg-violet-200">
      <header className={`bg-gradient-to-r ${subjectMeta.color} text-white shadow-lg sticky top-0 z-50`}>
        <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" onClick={stop} className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">{subjectMeta.title}</h1>
              <p className="text-xs sm:text-sm text-white/80 font-medium tracking-wide">{subjectMeta.date}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
            <button 
              onClick={() => setIsRetroMode(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-2 mr-2"
              title="Switch to Retro Win95 Mode"
            >
              🌸 Retro Mode
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="speed" className="text-sm font-semibold text-white/90">Speed</label>
              <select 
                id="speed" 
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="bg-white text-black text-sm rounded-lg px-2 py-1 font-bold outline-none cursor-pointer"
              >
                <option value="0.75">0.75x</option>
                <option value="0.9">0.9x</option>
                <option value="1">1.0x</option>
                <option value="1.1">1.1x</option>
                <option value="1.2">1.2x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2.0x</option>
              </select>
            </div>
            <button 
              onClick={stop}
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white px-4 py-1 rounded-lg text-sm font-bold transition-all shadow-sm"
            >
              Stop
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {studyData.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300">
            <div className="text-4xl mb-4">📚</div>
            {subjectMeta.id === 'ad-designing' ? (
              <>
                <h2 className="text-2xl font-bold text-gray-400">No written exam.</h2>
                <p className="text-gray-500 mt-2">Viva only.</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-400">Notes pending.</h2>
                <p className="text-gray-500 mt-2">Study material will be uploaded soon.</p>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {studyData.map((section: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveSection(idx)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                    activeSection === idx 
                      ? 'bg-slate-800 text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-slate-100 border border-gray-200'
                  }`}
                >
                  {section.section.replace('SECTION ', 'Sec ')}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {studyData[activeSection].items.map((item: any, idx: number) => {
                const itemId = `item-${activeSection}-${idx}`;
                const isActive = currentId === itemId;
                
                return (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-2xl p-6 transition-all duration-300 border-2 ${
                      isActive 
                        ? isPaused 
                          ? 'border-gray-300 shadow-md scale-[1.01]' 
                          : 'border-slate-800 shadow-xl shadow-slate-200 scale-[1.02]' 
                        : 'border-transparent shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h2 className="text-xl font-bold text-gray-800 leading-tight">
                        {item.q}
                      </h2>
                      <button
                        onClick={() => handlePlayToggle(item.a, itemId)}
                        className={`shrink-0 flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                          isActive && !isPaused
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isActive && !isPaused ? (
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                        ) : (
                          <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        )}
                      </button>
                    </div>
                    
                    {item.diagram && <Mermaid chart={item.diagram} />}

                    <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                      <ClickableText text={item.a} itemId={itemId} isActive={isActive} charIndex={charIndex} speak={speak} />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
