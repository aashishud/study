'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Force iOS WebKit to load voices into memory on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentId(null);
    setCharIndex(0);
  }, []);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    window.speechSynthesis.resume();
    setIsPaused(false);
  }, []);

  const speak = useCallback((text: string, id: string, startOffset: number = 0) => {
    stop();
    
    // We slice the text so it starts speaking from the clicked word
    const textToSpeak = startOffset > 0 ? text.slice(startOffset) : text;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    
    // Try to find a good English voice (Bypass forced regional accents on iOS)
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = 
      voices.find(v => v.name.includes('Google US English')) || 
      voices.find(v => v.name.includes('Samantha')) || 
      voices.find(v => v.name.includes('Daniel')) || 
      voices.find(v => v.lang === 'en-US') || 
      voices.find(v => v.lang === 'en-GB') || 
      voices.find(v => v.lang.startsWith('en'));
      
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utteranceRef.current = utterance;
    
    // Start highlighting immediately at the offset
    setCharIndex(startOffset);
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        setCharIndex(startOffset + event.charIndex);
      }
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentId(null);
      setCharIndex(0);
    };
    
    setCurrentId(id);
    setIsPlaying(true);
    setIsPaused(false);
    window.speechSynthesis.speak(utterance);
  }, [rate, stop]);

  return { speak, pause, resume, stop, isPlaying, isPaused, rate, setRate, currentId, charIndex };
}
