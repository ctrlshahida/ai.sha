import { SuggestedResource } from '@/types';
import { BookOpen, User, Globe, PlayCircle, ExternalLink } from 'lucide-react';

const TYPE_CONFIG: Record<
  SuggestedResource['type'],
  { label: string; Icon: React.ElementType; color: string; bg: string }
> = {
  book:    { label: 'Book',    Icon: BookOpen,    color: 'text-amber',      bg: 'bg-amber/10 border-amber/25' },
  scholar: { label: 'Scholar', Icon: User,        color: 'text-teal',       bg: 'bg-teal/10 border-teal/25' },
  website: { label: 'Website', Icon: Globe,       color: 'text-cream-dark', bg: 'bg-cream/5 border-cream/10' },
  lecture: { label: 'Lecture', Icon: PlayCircle,  color: 'text-coral-light', bg: 'bg-coral/10 border-coral/20' },
};

export default function SuggestedResources({ resources }: { resources: SuggestedResource[] }) {
  if (!resources?.length) return null;

  return (
    <section>
      <h2 className="text-lg font-bold text-cream mb-4 flex items-center gap-2">
        <BookOpen size={18} className="text-amber" /> Further Reading
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {resources.map((r, i) => {
          const cfg = TYPE_CONFIG[r.type] ?? TYPE_CONFIG.website;
          const { Icon } = cfg;

          const inner = (
            <div className={`h-full rounded-2xl border p-4 flex flex-col gap-2 transition-all ${cfg.bg} ${r.url ? 'hover:border-opacity-60 hover:scale-[1.01]' : ''}`}>
              {/* Type badge + optional link icon */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${cfg.color}`}>
                  <Icon size={12} />
                  {cfg.label}
                </span>
                {r.url && <ExternalLink size={12} className="text-cream-dark/40" />}
              </div>

              {/* Title */}
              <p className="text-cream font-semibold text-sm leading-snug">{r.title}</p>

              {/* Author */}
              {r.author && (
                <p className="text-cream-dark text-xs">{r.author}</p>
              )}

              {/* Description */}
              <p className="text-cream/60 text-xs leading-relaxed mt-auto">{r.description}</p>
            </div>
          );

          return r.url ? (
            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block">
              {inner}
            </a>
          ) : (
            <div key={i}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
