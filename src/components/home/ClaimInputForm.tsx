'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Link2, FileText, AlertCircle, Music, Users, BookOpen, ShieldCheck } from 'lucide-react';
import LoadingSpinner from '@/components/results/LoadingSpinner';
import { FactCheckResult } from '@/types';

const EXAMPLES = [
  { text: 'Music is haram in Islam',                        Icon: Music    },
  { text: 'It is forbidden to celebrate birthdays in Islam', Icon: BookOpen },
  { text: 'A woman must have a wali to get married in Islam', Icon: Users   },
];

function isUrl(input: string) {
  return /^https?:\/\//i.test(input.trim());
}

export default function ClaimInputForm() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = useCallback(async (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/factcheck', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ input: trimmed, isUrl: isUrl(trimmed) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? `Error ${res.status}`);
      }
      const result = (await res.json()) as FactCheckResult;
      sessionStorage.setItem('aisha_result', JSON.stringify({ result, originalInput: trimmed }));
      router.push('/result');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <LoadingSpinner />;

  const inputIsUrl = isUrl(input);

  return (
    <div className="max-w-2xl mx-auto px-4 space-y-3 pb-8 sm:pb-16">

      {/* Input */}
      <div className="relative glass rounded-2xl">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber/50 pointer-events-none">
          {inputIsUrl ? <Link2 size={17} /> : <FileText size={17} />}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(input); }}
          placeholder="Paste a URL or describe an Islamic claim..."
          className="w-full pl-11 pr-4 py-4 bg-transparent text-cream placeholder-cream-dark/50 focus:outline-none text-sm rounded-2xl"
        />
        {inputIsUrl && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-amber bg-amber/10 border border-amber/20 px-2 py-0.5 rounded-full pointer-events-none">
            URL
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 text-sm text-coral-light bg-coral/10 border border-coral/20 rounded-xl px-4 py-3">
          <AlertCircle size={15} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {/* Full-width CTA */}
      <button
        onClick={() => submit(input)}
        disabled={!input.trim()}
        className="w-full flex items-center justify-center gap-2.5 py-4 bg-teal text-cream font-bold text-base rounded-2xl hover:bg-teal-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Search size={18} />
        Fact Check
      </button>

      {/* Examples */}
      <div className="pt-4">
        <p className="text-xs font-bold text-amber uppercase tracking-widest mb-3">
          Try an example
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {EXAMPLES.map(({ text, Icon }) => (
            <button
              key={text}
              onClick={() => { setInput(text); submit(text); }}
              className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber/15 bg-forest-light/60 text-left hover:border-amber/40 hover:bg-forest-light transition-all group"
            >
              <Icon size={15} className="text-amber/60 group-hover:text-amber mt-0.5 shrink-0 transition-colors" />
              <span className="text-xs text-cream/70 group-hover:text-cream leading-snug transition-colors">{text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trust line */}
      <div className="flex items-center justify-center gap-2 pt-2 text-xs text-cream-dark/50">
        <ShieldCheck size={13} className="text-teal/60" />
        Verified with authentic sources. Guided by scholars.
      </div>
    </div>
  );
}
