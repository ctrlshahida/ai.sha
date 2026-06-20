import { Verdict } from '@/types';
import { CheckCircle, XCircle, AlertCircle, HelpCircle } from 'lucide-react';

const CONFIG: Record<
  Verdict,
  { label: string; bg: string; text: string; border: string; Icon: React.ElementType }
> = {
  supported: {
    label: 'Evidenced',
    bg: 'bg-teal/15',
    text: 'text-teal-light',
    border: 'border-teal/30',
    Icon: CheckCircle,
  },
  contradicted: {
    label: 'Fabricated',
    bg: 'bg-coral/15',
    text: 'text-coral-light',
    border: 'border-coral/30',
    Icon: XCircle,
  },
  nuanced: {
    label: 'Nuanced',
    bg: 'bg-amber/15',
    text: 'text-amber-light',
    border: 'border-amber/30',
    Icon: AlertCircle,
  },
  unverified: {
    label: 'Unverified',
    bg: 'bg-cream/5',
    text: 'text-cream-dark',
    border: 'border-cream/15',
    Icon: HelpCircle,
  },
};

export default function VerdictBadge({ verdict, size = 'lg' }: { verdict: Verdict; size?: 'sm' | 'lg' }) {
  const { label, bg, text, border, Icon } = CONFIG[verdict];

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${bg} ${text} ${border}`}>
        <Icon size={10} />
        {label}
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-4 px-6 py-4 rounded-2xl border ${bg} ${text} ${border}`}>
      <Icon size={28} strokeWidth={1.5} />
      <div>
        <div className="text-xs font-medium uppercase tracking-widest opacity-60 mb-0.5">Verdict</div>
        <div className="text-2xl font-bold">{label}</div>
      </div>
    </div>
  );
}
