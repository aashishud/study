'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'inherit',
    primaryColor: '#f5f3ff',
    primaryTextColor: '#4c1d95',
    primaryBorderColor: '#8b5cf6',
    lineColor: '#6d28d9',
    secondaryColor: '#ede9fe',
    tertiaryColor: '#fff',
  }
});

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    if (ref.current) {
      mermaid.render(`mermaid-${Math.random().toString(36).substring(2, 9)}`, chart).then(({ svg }) => {
        setSvg(svg);
      }).catch(e => {
        console.error('Mermaid render error', e);
      });
    }
  }, [chart]);

  return (
    <div 
      ref={ref} 
      className="mermaid flex justify-center items-center my-6 p-4 bg-violet-50 rounded-xl border border-violet-100 overflow-x-auto" 
      dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
