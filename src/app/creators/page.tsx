import { CONTENT_CREATORS } from '@/constants/creators';
import CreatorCard from '@/components/creators/CreatorCard';
import { CheckCircle2, TrendingUp } from 'lucide-react';

export const metadata = {
  title: 'Reputable Creators - ai.sha',
};

export default function CreatorsPage() {
  const sorted = [...CONTENT_CREATORS].sort((a, b) => b.verifiedCount - a.verifiedCount);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp size={18} className="text-gold" />
          <span className="text-xs font-semibold uppercase tracking-widest text-gold/70">
            Community Verified
          </span>
        </div>
        <h1 className="text-3xl font-bold text-cream mb-3">Reputable Content Creators</h1>
        <p className="text-cream/50 leading-relaxed max-w-2xl">
          These Islamic content creators have been repeatedly fact-checked by ai.sha and flagged as
          reputable — meaning their content consistently aligns with the Quran, authenticated Hadith,
          and scholarly consensus. Sorted by number of verified fact-checks.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4">
        <div className="border border-gold/20 rounded-xl px-4 py-3 bg-forest-light flex items-center gap-3">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <div>
            <p className="text-xs text-cream/40">Total verified checks</p>
            <p className="text-lg font-bold text-cream">
              {CONTENT_CREATORS.reduce((sum, c) => sum + c.verifiedCount, 0)}
            </p>
          </div>
        </div>
        <div className="border border-gold/20 rounded-xl px-4 py-3 bg-forest-light flex items-center gap-3">
          <TrendingUp size={16} className="text-gold" />
          <div>
            <p className="text-xs text-cream/40">Creators tracked</p>
            <p className="text-lg font-bold text-cream">{CONTENT_CREATORS.length}</p>
          </div>
        </div>
      </div>

      {/* Creator grid */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((creator) => (
            <CreatorCard key={creator.handle} creator={creator} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <p className="text-xs text-cream/30 text-center pb-4">
        Reputable status reflects consistency in fact-checks performed by ai.sha and does not
        constitute a scholarly endorsement. Always verify religious guidance with a qualified scholar.
      </p>
    </div>
  );
}
