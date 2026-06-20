'use client';

import { useState } from 'react';
import { QuranReference } from '@/types';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

function AyahCard({ ref: r }: { ref: QuranReference }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <BookOpen size={15} className="text-amber" />
          <span className="font-semibold text-gray-900 text-sm">{r.surah}</span>
          <span className="text-xs text-amber bg-amber/10 px-1.5 py-0.5 rounded font-medium">{r.ayah}</span>
        </div>
        {open
          ? <ChevronUp size={15} className="text-gray-400" />
          : <ChevronDown size={15} className="text-gray-400" />}
      </button>

      {open && (
        <div className="px-4 py-4 space-y-3 bg-white">
          {r.arabic && (
            <p className="arabic-text text-2xl text-gray-800 leading-loose px-2" dir="rtl">
              {r.arabic}
            </p>
          )}
          {r.translation && (
            <p className="text-sm text-gray-700 italic border-l-2 border-amber/40 pl-3">
              &ldquo;{r.translation}&rdquo;
            </p>
          )}
          <p className="text-xs text-gray-500 leading-relaxed">{r.relevance}</p>
        </div>
      )}
    </div>
  );
}

export default function QuranEvidence({ refs }: { refs: QuranReference[] }) {
  if (!refs.length) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-cream mb-3 flex items-center gap-2">
        <span className="text-amber text-xl">﴾</span> Quranic Evidence
      </h2>
      <div className="space-y-3">
        {refs.map((r) => (
          <AyahCard key={r.ayah} ref={r} />
        ))}
      </div>
    </section>
  );
}
