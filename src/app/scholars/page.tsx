import { SCHOLARS, REFERENCE_SITES } from '@/constants/scholars';
import ScholarCard from '@/components/scholars/ScholarCard';
import { ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Scholars & Resources - ai.sha',
};

export default function ScholarsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-cream mb-2">Scholars & Resources</h1>
        <p className="text-cream/50 leading-relaxed max-w-xl">
          A curated list of reputable Islamic scholars and trusted reference sites.
          Always seek knowledge from authenticated sources and qualified scholars.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-cream mb-5 pb-2 border-b border-gold/20">
          Reputable Scholars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCHOLARS.map((s) => (
            <ScholarCard key={s.name} scholar={s} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-cream mb-5 pb-2 border-b border-gold/20">
          Reference Sites
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REFERENCE_SITES.map((site) => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-5 card hover:border-white/15 hover:brightness-110 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-cream">{site.name}</h3>
                <ExternalLink size={14} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-sm text-cream/50 leading-relaxed">{site.description}</p>
            </a>
          ))}
        </div>
      </section>

      <p className="text-xs text-cream/30 text-center pb-4">
        Note: This app uses AI to assist in fact-checking. Always verify with a qualified Islamic scholar for personal religious guidance.
      </p>
    </div>
  );
}
