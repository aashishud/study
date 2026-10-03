'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTTS } from '@/hooks/useTTS';
import Mermaid from '@/components/Mermaid';

export default function SubjectClient({ subjectMeta, studyData }: { subjectMeta: any, studyData: any }) {
  const { speak, pause, resume, stop, isPlaying, isPaused, rate, setRate, currentId, charIndex } = useTTS();
  const [activeSection, setActiveSection] = useState(0);

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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-24 font-sans selection:bg-violet-200">
      {/* Header */}
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
          
          {/* Global Controls */}
          <div className="flex items-center gap-3 bg-black/20 p-2 rounded-xl backdrop-blur-sm border border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <label htmlFor="speed" className="text-sm font-semibold text-white/90">Speed</label>
              <select 
                id="speed" 
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
                className="bg-white text-black text-sm rounded-lg px-2 py-1 font-bold outline-none cursor-pointer"
              >
                <option value="0.75">0.75x</option>
                <option value="1">1.0x</option>
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

      {/* Main Content */}
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
            {/* Section Tabs */}
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

            {/* Content List */}
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
                      {isActive ? (() => {
                        const remaining = item.a.slice(charIndex);
                        const match = remaining.match(/\s|[.,!?]/);
                        const wordLen = match && match.index !== undefined ? match.index : remaining.length;
                        
                        const before = item.a.slice(0, charIndex);
                        const currentWord = item.a.slice(charIndex, charIndex + wordLen);
                        const after = item.a.slice(charIndex + wordLen);

                        return (
                          <>
                            <span className="opacity-50">{before}</span>
                            <span className="bg-amber-200 text-amber-900 font-bold px-1 rounded shadow-sm py-0.5 transition-colors">
                              {currentWord}
                            </span>
                            <span>{after}</span>
                          </>
                        );
                      })() : (
                        item.a
                      )}
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
