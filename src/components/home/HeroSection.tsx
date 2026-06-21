import { Link2, Brain, BookOpen, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    icon: Link2,
    title: 'Paste a link or input a claim',
    labelWidth: 'max-w-[80px]',
    color: 'text-amber',
    bg: 'bg-amber/10 border-amber/25',
  },
  {
    icon: Brain,
    title: 'AI reads & extracts data from link',
    labelWidth: 'max-w-[80px]',
    color: 'text-teal-light',
    bg: 'bg-teal/10 border-teal/25',
  },
  {
    icon: BookOpen,
    title: 'Checked against Quran & Hadith',
    labelWidth: 'max-w-[100px]',
    color: 'text-amber',
    bg: 'bg-amber/10 border-amber/25',
  },
  {
    icon: ShieldCheck,
    title: 'Verdict & evidence provided',
    labelWidth: 'max-w-[80px]',
    color: 'text-teal-light',
    bg: 'bg-teal/10 border-teal/25',
  },
];

export default function HeroSection() {
  return (
    <div className="relative flex flex-col items-center text-center px-4 pt-8 sm:pt-16 pb-6 sm:pb-10 overflow-hidden">

      <div
        className="pointer-events-none absolute -left-32 top-0 w-[480px] h-[480px] opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #C8931A 0%, transparent 65%)' }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 w-80 h-80 opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3A8A74 0%, transparent 65%)' }}
      />

      <p
        className="arabic-text text-4xl sm:text-5xl text-amber mb-4 sm:mb-6 select-none"
        style={{ textShadow: '0 0 32px rgba(200,147,26,0.4)' }}
      >
        ٱلْحَقُّ
      </p>

      <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-3 sm:mb-4">
        <span className="text-cream">Hi, I&apos;m </span>
        <span
          style={{
            background: 'linear-gradient(135deg, #C8931A 0%, #E0AE3A 50%, #C8931A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ai.
        </span>
        <span className="text-cream">sha</span>
      </h1>

      {/* Subtitle */}
      <p className="text-cream-dark text-sm sm:text-small leading-relaxed max-w-md mx-auto mb-5 sm:mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Paste a YouTube, TikTok, or Instagram link from any content creator -
        or type a claim directly. I&apos;ll verify it against the Quran,
        authentic Sunnah, and the four schools of thought.
      </p>

      {/* Workflow — 2×2 grid on mobile, single row with arrows on sm+ */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-5 sm:flex sm:flex-row sm:gap-0 items-start justify-center w-full max-w-2xl mx-auto">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isLast = i === STEPS.length - 1;
          return (
            <div key={i} className="flex flex-col sm:flex-row items-center">
              {/* Step */}
              <div className="flex flex-col items-center gap-2 px-3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${step.bg}`}>
                  <Icon size={18} className={step.color} strokeWidth={1.75} />
                </div>
                <p className={`text-xs text-cream/50 leading-tight text-center ${step.labelWidth}`}
                   style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
                  {step.title}
                </p>
              </div>

              {/* Horizontal connector — desktop only */}
              {!isLast && (
                <svg className="hidden sm:block shrink-0 mt-[-18px]" width="28" height="12" viewBox="0 0 28 12" fill="none">
                  <line x1="0" y1="6" x2="20" y2="6" stroke="rgba(200,147,26,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
                  <polyline points="16,2 22,6 16,10" stroke="rgba(200,147,26,0.4)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
