'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSubjectData } from '@/data/subjects';
import './test.css';

export default function TestUIPage() {
  const [activeSection, setActiveSection] = useState(0);
  const studyData = getSubjectData('ancient-indian-comm');

  return (
    <div className="retro-theme">
      <div className="desktop">
        <div className="window">
          {/* Title Bar */}
          <div className="titlebar">
            <span className="titlebar-icon">🌸</span>
            <span className="titlebar-text">ancient_indian_comm.doc - WordPad</span>
            <div className="titlebar-controls">
              <button className="win-btn" aria-label="Minimize">_</button>
              <button className="win-btn" aria-label="Maximize">□</button>
              <Link href="/" className="win-btn win-btn-close flex items-center justify-center text-white" aria-label="Close" style={{ textDecoration: 'none' }}>×</Link>
            </div>
          </div>

          {/* Menubar acts as Section Switcher */}
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
          </div>

          {/* Document Content */}
          <div className="content-panel">
            {studyData[activeSection]?.items.map((item: any, idx: number) => (
              <div key={idx} style={{ marginBottom: '2rem' }}>
                <h1>{idx + 1}. {item.q}</h1>
                <p style={{ whiteSpace: 'pre-wrap' }}>{item.a}</p>
              </div>
            ))}
          </div>

          {/* Status Bar */}
          <div className="statusbar">
            <span className="statusbar-panel" style={{ flex: 1 }}>Ready</span>
            <span className="statusbar-panel">Sec {activeSection + 1}</span>
            <span className="statusbar-panel">{studyData[activeSection]?.items.length} Items</span>
          </div>
        </div>

        {/* Taskbar */}
        <div className="taskbar">
          <Link href="/" className="start-btn" style={{ textDecoration: 'none', color: 'black' }}>
            <span className="start-icon">⊞</span> Start
          </Link>
          <div className="taskbar-item">🌸 ancient_indian_comm.doc</div>
          <div className="taskbar-clock">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
}
