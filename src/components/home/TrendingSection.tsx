import { TrendingItem } from '@/types';
import VerdictBadge from '@/components/results/VerdictBadge';
import { TrendingUp } from 'lucide-react';

async function fetchTrending(): Promise<TrendingItem[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/api/trending`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function TrendingSection() {
  const trending = await fetchTrending();
  if (!trending.length) return null;

  return (
    <section className="max-w-2xl mx-auto px-4 pb-12 pt-4">
      <h2 className="flex items-center gap-2 text-xs font-semibold text-cream/40 uppercase tracking-wider mb-3">
        <TrendingUp size={13} /> Community is checking
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {trending.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 px-3 py-2.5 card rounded-xl"
          >
            <p className="text-sm text-cream/70 truncate flex-1">{item.claim}</p>
            <VerdictBadge verdict={item.verdict} size="sm" />
          </div>
        ))}
      </div>
    </section>
  );
}
