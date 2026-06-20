import { SchoolPosition } from '@/types';
import { BookOpen, Users } from 'lucide-react';

const SCHOOL_CONFIG: Record<string, {
  text: string;
  iconBg: string;
  iconText: string;
  chipBorder: string;
  chipBg: string;
  chipText: string;
}> = {
  Hanafi: {
    text: 'text-blue-700',
    iconBg: 'bg-blue-50',
    iconText: 'text-blue-400',
    chipBorder: 'border-blue-200',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-600',
  },
  Maliki: {
    text: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    iconText: 'text-emerald-400',
    chipBorder: 'border-emerald-200',
    chipBg: 'bg-emerald-50',
    chipText: 'text-emerald-600',
  },
  "Shafi'i": {
    text: 'text-purple-700',
    iconBg: 'bg-purple-50',
    iconText: 'text-purple-400',
    chipBorder: 'border-purple-200',
    chipBg: 'bg-purple-50',
    chipText: 'text-purple-600',
  },
  Hanbali: {
    text: 'text-orange-700',
    iconBg: 'bg-orange-50',
    iconText: 'text-orange-400',
    chipBorder: 'border-orange-200',
    chipBg: 'bg-orange-50',
    chipText: 'text-orange-600',
  },
};

const DEFAULT_CONFIG = {
  text: 'text-gray-700',
  iconBg: 'bg-gray-50',
  iconText: 'text-gray-400',
  chipBorder: 'border-gray-200',
  chipBg: 'bg-gray-50',
  chipText: 'text-gray-600',
};

export default function SchoolsOfThought({ positions }: { positions: SchoolPosition[] }) {
  if (!positions.length) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-cream mb-3 flex items-center gap-2">
        <Users size={18} className="text-amber" /> Schools of Thought
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {positions.map((p) => {
          const cfg = SCHOOL_CONFIG[p.school] ?? DEFAULT_CONFIG;
          return (
            <div key={p.school} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-lg ${cfg.iconBg}`}>
                    <BookOpen size={13} className={cfg.iconText} />
                  </span>
                  <span className={`font-bold text-sm ${cfg.text}`}>{p.school}</span>
                </div>
                {p.consensus && (
                  <span className="text-xs border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                    Majority view
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">{p.position}</p>
              {p.sources && p.sources.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {p.sources.map((src, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-0.5 rounded-full border ${cfg.chipBorder} ${cfg.chipBg} ${cfg.chipText}`}
                    >
                      {src}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
