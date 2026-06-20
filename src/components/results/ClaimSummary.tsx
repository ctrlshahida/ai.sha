import { MessageSquare } from 'lucide-react';

export default function ClaimSummary({
  originalInput,
  extractedClaim,
}: {
  originalInput: string;
  extractedClaim: string;
}) {
  const isUrl = originalInput.startsWith('http');

  return (
    <div className="glass rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal/70">
        <MessageSquare size={13} />
        Claim analysed
      </div>

      {isUrl && (
        <p className="text-xs text-cream-dark truncate border-l-2 border-teal/30 pl-3">
          {originalInput}
        </p>
      )}

      <p className="text-cream font-medium leading-relaxed text-base">
        &ldquo;{extractedClaim}&rdquo;
      </p>
    </div>
  );
}
