'use client';

import { useState, useCallback, useRef } from 'react';

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [rate, setRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
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

  const speak = useCallback((text: string, id: string) => {
    stop();
    
    // Slight delay to ensure previous utterance is fully cancelled
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      
      // Try to find a good English voice
      const voices = window.speechSynthesis.getVoices();
      const bestVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Premium')) || voices.find(v => v.lang.startsWith('en'));
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utteranceRef.current = utterance;
      
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          setCharIndex(event.charIndex);
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
    }, 50);
  }, [rate, stop]);

  return { speak, pause, resume, stop, isPlaying, isPaused, rate, setRate, currentId, charIndex };
}
