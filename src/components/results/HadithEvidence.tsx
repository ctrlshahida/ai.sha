import { HadithReference } from '@/types';
import { ExternalLink, ShieldCheck } from 'lucide-react';

const GRADE_STYLE: Record<string, string> = {
  Sahih: 'bg-teal/10 text-teal border border-teal/25',
  Hasan: 'bg-blue-50 text-blue-700 border border-blue-200',
  "Da'if": 'bg-red-50 text-red-600 border border-red-200',
  Unknown: 'bg-gray-100 text-gray-500 border border-gray-200',
};

export default function HadithEvidence({ hadiths }: { hadiths: HadithReference[] }) {
  if (!hadiths.length) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-cream mb-3 flex items-center gap-2">
        <span className="text-amber">☪</span> Hadith Evidence
      </h2>
      <div className="space-y-3">
        {hadiths.map((h, i) => (
          <div key={i} className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm space-y-2">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm text-gray-900">{h.collection}</span>
                {h.number !== 'uncertain' && (
                  <span className="text-xs text-gray-400">#{h.number}</span>
                )}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${GRADE_STYLE[h.grade] ?? GRADE_STYLE.Unknown}`}>
                  {h.grade}
                </span>
                {h.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-teal border border-teal/25 bg-teal/10 px-1.5 py-0.5 rounded-full">
                    <ShieldCheck size={10} /> Verified
                  </span>
                )}
              </div>
              {h.sunnahLink && (
                <a
                  href={h.sunnahLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-amber hover:text-amber-light transition-colors"
                >
                  View on Sunnah.com <ExternalLink size={10} />
                </a>
              )}
            </div>
            <p className="text-sm text-gray-700 italic border-l-2 border-amber/40 pl-3 leading-relaxed">
              &ldquo;{h.text}&rdquo;
            </p>
            <p className="text-xs text-gray-500">{h.relevance}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
