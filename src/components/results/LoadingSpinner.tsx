'use client';

import { useEffect, useState } from 'react';

const STEPS = [
  { label: 'Extracting the core claim',        sub: 'Understanding what is being asserted...' },
  { label: 'Searching the Quran',              sub: 'Looking for relevant ayahs and tafsir...' },
  { label: 'Consulting Hadith collections',    sub: 'Sahih Bukhari · Sahih Muslim · Sunan Abu Dawud...' },
  { label: 'Reviewing scholarly positions',    sub: "Hanafi · Maliki · Shafiʿi · Hanbali..." },
  { label: 'Weighing the evidence',            sub: "Distinguishing ijmaʼ from ikhtilaf..." },
  { label: 'Compiling your analysis',          sub: 'Almost ready...' },
];

export default function LoadingSpinner() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-24 gap-8">

      {/* Dual-ring spinner */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-2 border-amber/15" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber animate-spin" />
        <div className="absolute inset-3 rounded-full border-2 border-teal/15" />
        <div
          className="absolute inset-3 rounded-full border-2 border-transparent border-t-teal animate-spin"
          style={{ animationDuration: '1.4s', animationDirection: 'reverse' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
        </div>
      </div>

      {/* Current step message */}
      <div className="text-center space-y-1.5 max-w-xs">
        <p className="text-cream font-semibold">{STEPS[step].label}</p>
        <p className="text-cream-dark/60 text-sm">{STEPS[step].sub}</p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-500 ${
              i < step  ? 'bg-teal w-4' :
              i === step ? 'bg-amber w-4' :
                           'bg-cream/15 w-1.5'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
