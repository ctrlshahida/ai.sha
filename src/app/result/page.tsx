'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Users } from 'lucide-react';
import { FactCheckResult } from '@/types';
import VerdictBadge from '@/components/results/VerdictBadge';
import ClaimSummary from '@/components/results/ClaimSummary';
import QuranEvidence from '@/components/results/QuranEvidence';
import HadithEvidence from '@/components/results/HadithEvidence';
import SchoolsOfThought from '@/components/results/SchoolsOfThought';
import SuggestedResources from '@/components/results/SuggestedResources';

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [originalInput, setOriginalInput] = useState('');

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('aisha_result');
      if (!stored) { router.replace('/'); return; }
      const parsed = JSON.parse(stored);
      setResult(parsed.result);
      setOriginalInput(parsed.originalInput ?? '');
    } catch {
      router.replace('/');
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-cream-dark hover:text-cream transition-colors"
      >
        <ArrowLeft size={14} /> New check
      </Link>

      {/* Claim */}
      <ClaimSummary originalInput={originalInput} extractedClaim={result.extractedClaim} />

      {/* Verdict */}
      <div className="space-y-3">
        <VerdictBadge verdict={result.verdict} />
        <p className="text-cream/70 leading-relaxed">{result.verdictExplanation}</p>
      </div>

      {/* Evidence sections */}
      <QuranEvidence refs={result.quranReferences} />
      <HadithEvidence hadiths={result.hadithReferences} />
      <SchoolsOfThought positions={result.schoolPositions} />

      {/* Caveats */}
      {result.importantCaveats.length > 0 && (
        <section className="card rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-bold text-amber uppercase tracking-widest flex items-center gap-2">
            <AlertTriangle size={14} /> Important Caveats
          </h2>
          <ul className="space-y-2">
            {result.importantCaveats.map((c, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-cream/70">
                <span className="text-amber mt-1 shrink-0">·</span>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Suggested resources */}
      <SuggestedResources resources={result.suggestedResources} />

      {/* Footer CTA */}
      <div className="border-t border-teal/15 pt-6 flex items-center justify-between flex-wrap gap-3">
        <Link
          href="/scholars"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal text-forest font-semibold rounded-xl hover:bg-teal-light transition-colors text-sm"
        >
          <Users size={14} /> Explore Scholars
        </Link>
        <Link href="/" className="text-sm text-cream-dark hover:text-cream transition-colors">
          Check another claim →
        </Link>
      </div>
    </div>
  );
}
